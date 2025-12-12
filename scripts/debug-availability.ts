import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID!,
    dataset: process.env.VITE_SANITY_DATASET!,
    apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
    useCdn: false,
    token: process.env.VITE_SANITY_TOKEN,
    perspective: 'previewDrafts',
})

async function debugAvailability() {
    console.log('\n🔍 Debugging Product Availability...\n')

    try {
        // Fetch first 3 products with availability
        const products = await client.fetch(`
      *[_type == "productCentralized" || _type == "product"][0...3] { 
        title, 
        _type,
        availability 
      }
    `)

        products.forEach((p: any) => {
            console.log(`\n🍊 Product: ${p.title || p.titleEn} (${p._type})`)
            console.log('Availability Object Keys:', Object.keys(p.availability || {}))
            console.log('Availability Object:', JSON.stringify(p.availability, null, 2))
        })

    } catch (error) {
        console.error('❌ Error:', error)
    }
}

debugAvailability()
