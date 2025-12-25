/**
 * Migrate SEO Fields
 * 
 * This script copies data from legacy SEO fields (seoAr, seoEn) 
 * to the new centralized seo object for all pages.
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID || 'wptd4h7v',
    dataset: process.env.VITE_SANITY_DATASET || 'production',
    useCdn: false,
    token: process.env.VITE_SANITY_TOKEN,
    apiVersion: '2024-01-01',
})

async function migrateSEO() {
    console.log('🔍 Searching for pages with legacy SEO data...\n')

    const pages = await client.fetch(`*[_type == "pageCentralized"]`)

    console.log(`📄 Found ${pages.length} pages.`)

    for (const page of pages) {
        console.log(`\n⚙️ Processing: ${page.titleEn || page._id}`)

        const updates: any = {
            seo: {
                ...page.seo,
                metaTitleAr: page.seo?.metaTitleAr || page.seoAr?.metaTitle || '',
                metaTitleEn: page.seo?.metaTitleEn || page.seoEn?.metaTitle || '',
                metaDescAr: page.seo?.metaDescAr || page.seoAr?.metaDescription || '',
                metaDescEn: page.seo?.metaDescEn || page.seoEn?.metaDescription || '',
            }
        }

        // Copy share image if it exists in legacy but not in new
        if (page.seoAr?.shareImage && !updates.seo.shareImage) {
            updates.seo.shareImage = page.seoAr.shareImage
        }

        await client.patch(page._id).set(updates).commit()
        console.log(`✅ SEO fields filled for ${page._id}`)
    }

    console.log('\n✨ All SEO fields have been updated!')
}

migrateSEO().catch(console.error)
