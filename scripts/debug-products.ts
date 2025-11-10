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

async function debugProducts() {
  console.log('\n🔍 Debugging Sanity Products...\n')

  try {
    // Check all products
    const allProducts = await client.fetch(`*[_type == "product"] { _id, title, slug, language }`)
    
    console.log(`📦 Total products in Sanity: ${allProducts.length}`)
    console.log('\nProducts by language:')
    
    const byLanguage = allProducts.reduce((acc: any, p: any) => {
      acc[p.language] = (acc[p.language] || 0) + 1
      return acc
    }, {})
    
    Object.entries(byLanguage).forEach(([lang, count]) => {
      console.log(`  ${lang}: ${count} products`)
    })
    
    console.log('\n📋 All products:')
    allProducts.forEach((p: any) => {
      console.log(`  - [${p.language}] ${p.title} (slug: ${p.slug?.current || 'NO SLUG'})`)
    })
    
    // Try fetching one product by slug
    console.log('\n🔎 Testing fetch by slug...')
    const testSlug = allProducts[0]?.slug?.current
    if (testSlug) {
      const product = await client.fetch(
        `*[_type == "product" && slug.current == $slug && language == $lang][0]`,
        { slug: testSlug, lang: 'ar' }
      )
      
      if (product) {
        console.log(`✅ Successfully fetched: ${product.title}`)
      } else {
        console.log(`❌ Failed to fetch product with slug: ${testSlug}`)
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

debugProducts()
