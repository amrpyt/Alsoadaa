/**
 * Migration script to import mock data into Sanity CMS
 * 
 * This script:
 * 1. Imports products from mockData.ts as Arabic (ar) documents
 * 2. Uploads images to Sanity assets
 * 3. Creates initial page content in Arabic
 * 4. Creates initial services in Arabic
 * 
 * Usage:
 * 1. Ensure VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, and VITE_SANITY_TOKEN are set in .env.local
 * 2. Run: npx tsx scripts/migrate-to-sanity.ts
 */

import { createClient } from '@sanity/client'
import { products } from '../src/lib/mockData.js'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Validate environment variables
const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET
const token = process.env.VITE_SANITY_TOKEN

if (!projectId || !dataset || !token) {
  console.error('❌ Missing required environment variables:')
  console.error('   - VITE_SANITY_PROJECT_ID')
  console.error('   - VITE_SANITY_DATASET')
  console.error('   - VITE_SANITY_TOKEN')
  console.error('\nPlease set these in your .env.local file')
  process.exit(1)
}

// Create Sanity client with write permissions
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

/**
 * Upload an image from URL to Sanity
 */
async function uploadImageFromUrl(imageUrl: string, filename: string): Promise<any> {
  try {
    console.log(`   📸 Uploading image: ${filename}`)
    
    // For external URLs, fetch and upload
    if (imageUrl.startsWith('http')) {
      const response = await fetch(imageUrl)
      const buffer = await response.arrayBuffer()
      const asset = await client.assets.upload('image', Buffer.from(buffer), {
        filename,
      })
      return asset
    }
    
    // For local files in /public
    const publicPath = path.join(__dirname, '..', 'public', imageUrl.replace(/^\//, ''))
    if (fs.existsSync(publicPath)) {
      const buffer = fs.readFileSync(publicPath)
      const asset = await client.assets.upload('image', buffer, {
        filename,
      })
      return asset
    }
    
    console.warn(`   ⚠️  Image not found: ${imageUrl}`)
    return null
  } catch (error) {
    console.error(`   ❌ Failed to upload image ${filename}:`, error)
    return null
  }
}

/**
 * Migrate products to Sanity
 */
async function migrateProducts() {
  console.log('\n📦 Migrating Products...\n')
  
  const createdProducts: any[] = []
  
  for (const product of products) {
    try {
      console.log(`\n🔄 Processing: ${product.name}`)
      
      // Upload main image
      const mainImageAsset = await uploadImageFromUrl(
        product.image,
        `${product.slug}-main.jpg`
      )
      
      // Upload gallery images
      const galleryAssets = []
      for (let i = 0; i < product.gallery.length; i++) {
        const galleryAsset = await uploadImageFromUrl(
          product.gallery[i],
          `${product.slug}-gallery-${i + 1}.jpg`
        )
        if (galleryAsset) {
          galleryAssets.push({
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: galleryAsset._id,
            },
          })
        }
      }
      
      // Create product document
      const productDoc = {
        _type: 'product',
        language: 'ar',
        title: product.name,
        slug: {
          _type: 'slug',
          current: `${product.slug}-ar`,
        },
        scientificName: product.scientificName,
        category: product.category,
        description: product.description,
        season: product.season,
        image: mainImageAsset ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: mainImageAsset._id,
          },
        } : undefined,
        gallery: galleryAssets,
        availability: product.availability,
        specifications: {
          _type: 'object',
          packaging: product.specifications.packaging.join(', '),
          sizes: product.specifications.sizes.join(', '),
          storage: product.specifications.storage,
          shelfLife: product.specifications.shelfLife,
        },
        certifications: product.certifications,
      }
      
      const result = await client.create(productDoc)
      createdProducts.push(result)
      console.log(`   ✅ Created: ${product.name} (ID: ${result._id})`)
    } catch (error) {
      console.error(`   ❌ Failed to create ${product.name}:`, error)
    }
  }
  
  console.log(`\n✅ Migrated ${createdProducts.length}/${products.length} products`)
  return createdProducts
}

/**
 * Create initial page content
 */
async function createInitialPages() {
  console.log('\n📄 Creating Initial Pages...\n')
  
  const pages = [
    {
      _type: 'page',
      language: 'ar',
      title: 'من نحن',
      slug: {
        _type: 'slug',
        current: 'about-ar',
      },
      content: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'شركة الصعدة للتصدير' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'نحن شركة رائدة في تصدير الفواكه والخضروات الطازجة من مصر إلى الأسواق العالمية. مع أكثر من 15 عامًا من الخبرة، نلتزم بتقديم منتجات عالية الجودة تلبي المعايير الدولية.',
            },
          ],
        },
      ],
    },
    {
      _type: 'page',
      language: 'ar',
      title: 'اتصل بنا',
      slug: {
        _type: 'slug',
        current: 'contact-ar',
      },
      content: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'تواصل معنا' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'نحن هنا للإجابة على استفساراتكم وتلبية احتياجاتكم. يرجى ملء النموذج أدناه وسنتواصل معكم في أقرب وقت ممكن.',
            },
          ],
        },
      ],
    },
  ]
  
  for (const page of pages) {
    try {
      const result = await client.create(page)
      console.log(`   ✅ Created page: ${page.title} (ID: ${result._id})`)
    } catch (error) {
      console.error(`   ❌ Failed to create page ${page.title}:`, error)
    }
  }
}

/**
 * Create initial services
 */
async function createInitialServices() {
  console.log('\n🛠️  Creating Initial Services...\n')
  
  const services = [
    {
      _type: 'service',
      language: 'ar',
      title: 'تصدير الفواكه الطازجة',
      slug: {
        _type: 'slug',
        current: 'fresh-fruit-export-ar',
      },
      description: 'نقدم خدمات تصدير شاملة للفواكه الطازجة بما في ذلك الحمضيات والعنب والرمان.',
      icon: '🍊',
      order: 1,
    },
    {
      _type: 'service',
      language: 'ar',
      title: 'تصدير الخضروات',
      slug: {
        _type: 'slug',
        current: 'vegetable-export-ar',
      },
      description: 'تصدير مجموعة متنوعة من الخضروات الطازجة المزروعة بأفضل الممارسات الزراعية.',
      icon: '🥬',
      order: 2,
    },
    {
      _type: 'service',
      language: 'ar',
      title: 'مراقبة الجودة',
      slug: {
        _type: 'slug',
        current: 'quality-control-ar',
      },
      description: 'نظام صارم لمراقبة الجودة يضمن أن جميع المنتجات تلبي المعايير الدولية.',
      icon: '✓',
      order: 3,
    },
    {
      _type: 'service',
      language: 'ar',
      title: 'الخدمات اللوجستية',
      slug: {
        _type: 'slug',
        current: 'logistics-ar',
      },
      description: 'حلول شحن وخدمات لوجستية موثوقة لضمان وصول المنتجات في الوقت المحدد.',
      icon: '🚢',
      order: 4,
    },
  ]
  
  for (const service of services) {
    try {
      const result = await client.create(service)
      console.log(`   ✅ Created service: ${service.title} (ID: ${result._id})`)
    } catch (error) {
      console.error(`   ❌ Failed to create service ${service.title}:`, error)
    }
  }
}

/**
 * Main migration function
 */
async function main() {
  console.log('🚀 Starting Sanity Migration...')
  console.log(`📍 Project: ${projectId}`)
  console.log(`📍 Dataset: ${dataset}\n`)
  
  try {
    // Migrate products
    await migrateProducts()
    
    // Create initial pages
    await createInitialPages()
    
    // Create initial services
    await createInitialServices()
    
    console.log('\n✅ Migration completed successfully!')
    console.log('\n📝 Next steps:')
    console.log('   1. Open Sanity Studio and verify the imported data')
    console.log('   2. Use AI Assist to translate products to English and Russian')
    console.log('   3. Review and adjust translations as needed')
    console.log('   4. Test the application with the new Sanity data\n')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
main()
