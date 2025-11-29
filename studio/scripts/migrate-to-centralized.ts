/**
 * Migrate Products to Centralized Schema
 * 
 * Moves data from old per-language products to new centralized format
 * Run with: npx tsx scripts/migrate-to-centralized.ts --apply
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wptd4h7v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

interface OldProduct {
  _id: string
  title: string
  language: string
  slug: { current: string }
  scientificName?: string
  category?: string
  description?: string
  season?: string
  image?: any
  gallery?: any[]
  availability?: any
  specifications?: {
    packaging?: string
    sizes?: string
    storage?: string
    shelfLife?: string
  }
  certifications?: string[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  originalDocument?: { _ref: string }
}

async function migrate(dryRun = true) {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`🔄 MIGRATE TO CENTRALIZED SCHEMA ${dryRun ? '(DRY RUN)' : '(LIVE)'}`)
  console.log(`${'='.repeat(60)}\n`)

  if (!process.env.SANITY_TOKEN && !dryRun) {
    console.error('❌ SANITY_TOKEN required')
    process.exit(1)
  }

  // Get all Arabic products (they are the source of truth)
  console.log('📦 Fetching Arabic products...')
  const arProducts: OldProduct[] = await client.fetch(
    `*[_type == "product" && language == "ar"] {
      _id, title, slug, scientificName, category, description, season,
      image, gallery, availability, specifications, certifications, seo
    }`
  )
  console.log(`   Found ${arProducts.length} Arabic products\n`)

  // Get EN and RU products
  const enProducts: OldProduct[] = await client.fetch(
    `*[_type == "product" && language == "en"] {
      _id, title, description, seo, originalDocument
    }`
  )
  const ruProducts: OldProduct[] = await client.fetch(
    `*[_type == "product" && language == "ru"] {
      _id, title, description, seo, originalDocument
    }`
  )

  console.log('📝 Creating centralized products...\n')

  let created = 0
  for (const arProduct of arProducts) {
    // Find matching EN and RU products
    const enProduct = enProducts.find(p => p.originalDocument?._ref === arProduct._id)
    const ruProduct = ruProducts.find(p => p.originalDocument?._ref === arProduct._id)

    const slug = arProduct.slug?.current?.replace(/-ar$/, '') || 
                 arProduct.title.toLowerCase().replace(/\s+/g, '-')

    const centralizedProduct = {
      _type: 'productCentralized',
      slug: { _type: 'slug', current: slug },
      scientificName: arProduct.scientificName,
      category: arProduct.category,
      season: arProduct.season,
      
      // Localized titles
      titleAr: arProduct.title,
      titleEn: enProduct?.title || arProduct.title,
      titleRu: ruProduct?.title || enProduct?.title || arProduct.title,
      
      // Localized descriptions
      descriptionAr: arProduct.description,
      descriptionEn: enProduct?.description || arProduct.description,
      descriptionRu: ruProduct?.description || enProduct?.description,
      
      // Shared fields (from AR product)
      image: arProduct.image,
      gallery: arProduct.gallery,
      availability: arProduct.availability,
      packaging: arProduct.specifications?.packaging,
      sizes: arProduct.specifications?.sizes,
      storage: arProduct.specifications?.storage,
      shelfLife: arProduct.specifications?.shelfLife,
      certifications: arProduct.certifications,
      
      // Localized SEO
      seoAr: arProduct.seo,
      seoEn: enProduct?.seo,
      seoRu: ruProduct?.seo,
    }

    console.log(`   ${centralizedProduct.titleEn}:`)
    console.log(`      AR: ${centralizedProduct.titleAr}`)
    console.log(`      EN: ${centralizedProduct.titleEn}`)
    console.log(`      RU: ${centralizedProduct.titleRu}`)

    if (!dryRun) {
      await client.create(centralizedProduct)
      console.log(`      ✓ Created!`)
    }
    created++
  }

  console.log(`\n${'='.repeat(60)}`)
  console.log(`📊 SUMMARY`)
  console.log(`   ${dryRun ? 'Would create' : 'Created'}: ${created} centralized products`)
  console.log(`   Old products: ${arProducts.length + enProducts.length + ruProducts.length} (can be deleted later)`)
  
  if (dryRun) {
    console.log(`\n💡 To apply: npx tsx scripts/migrate-to-centralized.ts --apply`)
  } else {
    console.log(`\n✅ Migration complete!`)
    console.log(`   You can now delete old products from "Products (Old - Legacy)"`)
  }
  console.log(`${'='.repeat(60)}\n`)
}

const isLive = process.argv.includes('--apply')
migrate(!isLive)
