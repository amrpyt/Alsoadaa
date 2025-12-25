/**
 * Cleanup Site Settings
 * 
 * This script removes all the translation fields that were incorrectly
 * added to siteSettings. These translations should NOT be in siteSettings.
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID || 'wptd4h7v',
    dataset: process.env.VITE_SANITY_DATASET || 'production',
    useCdn: false,
    token: process.env.VITE_SANITY_TOKEN,
    apiVersion: '2024-01-01',
})

// These are the ONLY fields that should exist in siteSettings
const VALID_FIELDS = [
    '_id',
    '_type',
    '_rev',
    '_createdAt',
    '_updatedAt',
    // General
    'companyNameAr',
    'companyNameEn',
    'companyNameRu',
    'logo',
    // Contact
    'email',
    'phone',
    'whatsapp',
    'addressAr',
    'addressEn',
    'addressRu',
    // Social
    'socialLinks',
    // Footer
    'footerDescAr',
    'footerDescEn',
    'copyrightAr',
    'copyrightEn',
    // Header buttons
    'requestQuoteAr',
    'requestQuoteEn',
    'viewProductsAr',
    'viewProductsEn',
    'viewAllProductsAr',
    'viewAllProductsEn',
    // SEO
    'defaultSeoAr',
    'defaultSeoEn',
    'defaultSeoRu',
]

async function cleanupSiteSettings() {
    console.log('🧹 Starting Site Settings Cleanup...\n')

    // Fetch current siteSettings
    const doc = await client.fetch(`*[_type == "siteSettings"][0]`)

    if (!doc) {
        console.log('❌ No siteSettings document found!')
        return
    }

    console.log(`📄 Found siteSettings document with ${Object.keys(doc).length} fields`)

    // Find fields to remove
    const fieldsToRemove: string[] = []
    for (const key of Object.keys(doc)) {
        if (!VALID_FIELDS.includes(key)) {
            fieldsToRemove.push(key)
        }
    }

    console.log(`\n🗑️  Found ${fieldsToRemove.length} extra fields to remove`)
    console.log(`   Examples: ${fieldsToRemove.slice(0, 5).join(', ')}...`)

    if (fieldsToRemove.length === 0) {
        console.log('\n✅ No cleanup needed!')
        return
    }

    // Build the clean document with only valid fields
    const cleanDoc: Record<string, any> = {}
    for (const key of VALID_FIELDS) {
        if (doc[key] !== undefined) {
            cleanDoc[key] = doc[key]
        }
    }

    // Keep the required fields
    cleanDoc._id = 'siteSettings'
    cleanDoc._type = 'siteSettings'

    // Fix socialLinks missing keys
    if (cleanDoc.socialLinks && Array.isArray(cleanDoc.socialLinks)) {
        cleanDoc.socialLinks = cleanDoc.socialLinks.map((link: any, index: number) => ({
            ...link,
            _key: link._key || `social-${index}-${Date.now()}`,
        }))
        console.log('\n🔗 Fixed socialLinks keys')
    }

    console.log('\n📝 Cleaned document fields:')
    console.log(Object.keys(cleanDoc).filter(k => !k.startsWith('_')).join(', '))

    // Replace the document
    await client.createOrReplace(cleanDoc)

    console.log('\n✅ Site Settings cleaned successfully!')
    console.log(`   Removed ${fieldsToRemove.length} extra fields`)
    console.log('   Refresh Sanity Studio to see the clean version')
}

cleanupSiteSettings().catch(console.error)
