/**
 * Update Products Script
 * 
 * Updates CMS to have only the 8 specified products with correct data
 * Run with: npx tsx scripts/update-products.ts --apply
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wptd4h7v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

// The 8 products we want to keep
const products = [
  {
    titleEn: 'Baladi Orange',
    titleAr: 'برتقان صيفي',
    titleRu: 'Апельсин Балади',
    category: 'citrus',
    availability: {
      january: true, february: true, march: true, april: true,
      may: false, june: false, july: false, august: false,
      september: false, october: false, november: true, december: true
    },
    descriptionEn: 'Premium Egyptian Baladi Orange, known for its sweet taste and juicy texture.',
    descriptionAr: 'برتقال بلدي مصري ممتاز، معروف بطعمه الحلو وقوامه العصيري.',
    descriptionRu: 'Премиальный египетский апельсин Балади, известный своим сладким вкусом и сочной текстурой.',
    specifications: {
      sizes: '40, 48, 56, 64, 72, 80, 88, 100, 113, 125',
      packaging: 'Master carton 15 KGs',
    }
  },
  {
    titleEn: 'Navel Orange',
    titleAr: 'برتقان بسرة',
    titleRu: 'Апельсин Навел',
    category: 'citrus',
    availability: {
      january: true, february: true, march: true, april: false,
      may: false, june: false, july: false, august: false,
      september: false, october: true, november: true, december: true
    },
    descriptionEn: 'Navel Orange - Colored product: October to November. Natural color: December to March.',
    descriptionAr: 'برتقال بسرة - ملون: أكتوبر إلى نوفمبر. لون طبيعي: ديسمبر إلى مارس.',
    descriptionRu: 'Апельсин Навел - Цветной продукт: октябрь-ноябрь. Натуральный цвет: декабрь-март.',
    specifications: {
      sizes: '36, 40, 48, 56, 64, 72, 80, 88, 100, 113',
      packaging: 'Carton 15 KG',
    }
  },
  {
    titleEn: 'Mandarin Murcott',
    titleAr: 'يوسفي',
    titleRu: 'Мандарин Муркотт',
    category: 'citrus',
    availability: {
      january: false, february: true, march: true, april: false,
      may: false, june: false, july: false, august: false,
      september: false, october: false, november: false, december: false
    },
    descriptionEn: 'Fresh Egyptian Mandarin Murcott, sweet and easy to peel.',
    descriptionAr: 'يوسفي مصري طازج، حلو وسهل التقشير.',
    descriptionRu: 'Свежий египетский мандарин Муркотт, сладкий и легко чистится.',
    specifications: {
      sizes: 'Various sizes',
      packaging: 'Master carton 8 KG, 10 KG',
    }
  },
  {
    titleEn: 'Lemon',
    titleAr: 'ليمون',
    titleRu: 'Лимон',
    category: 'citrus',
    availability: {
      january: false, february: false, march: false, april: false,
      may: true, june: true, july: true, august: false,
      september: false, october: false, november: true, december: true
    },
    descriptionEn: 'Fresh Egyptian lemons, packed in cartons or plastic boxes.',
    descriptionAr: 'ليمون مصري طازج، معبأ في كراتين أو صناديق بلاستيك.',
    descriptionRu: 'Свежие египетские лимоны, упакованные в картонные или пластиковые коробки.',
    specifications: {
      sizes: '56, 64, 72, 80, 88, 100, 113, 125, 135',
      packaging: 'Cartons or Plastic boxes',
    }
  },
  {
    titleEn: 'Grapefruit',
    titleAr: 'جريب فروت',
    titleRu: 'Грейпфрут',
    category: 'citrus',
    availability: {
      january: false, february: false, march: false, april: false,
      may: false, june: false, july: false, august: false,
      september: false, october: true, november: true, december: false
    },
    descriptionEn: 'Fresh Egyptian Grapefruit with refreshing citrus flavor.',
    descriptionAr: 'جريب فروت مصري طازج بنكهة الحمضيات المنعشة.',
    descriptionRu: 'Свежий египетский грейпфрут с освежающим цитрусовым вкусом.',
    specifications: {
      sizes: '36, 40, 48, 56, 64',
      packaging: 'Master carton 15 KGs',
    }
  },
  {
    titleEn: 'Grapes',
    titleAr: 'عنب',
    titleRu: 'Виноград',
    category: 'grapes',
    availability: {
      january: false, february: false, march: false, april: false,
      may: false, june: true, july: true, august: true,
      september: true, october: false, november: false, december: false
    },
    descriptionEn: 'Fresh Egyptian grapes, available in various varieties.',
    descriptionAr: 'عنب مصري طازج، متوفر بأصناف متعددة.',
    descriptionRu: 'Свежий египетский виноград, доступен в различных сортах.',
    specifications: {
      sizes: 'Various',
      packaging: 'Carton 4.5 Kg, Plastic Box 5 Kg',
    }
  },
  {
    titleEn: 'Mango',
    titleAr: 'مانجو',
    titleRu: 'Манго',
    category: 'berries',
    availability: {
      january: false, february: false, march: false, april: false,
      may: false, june: false, july: true, august: true,
      september: true, october: true, november: true, december: false
    },
    descriptionEn: 'Premium Egyptian Mango, known for its sweet and aromatic taste.',
    descriptionAr: 'مانجو مصري ممتاز، معروف بطعمه الحلو والعطري.',
    descriptionRu: 'Премиальное египетское манго, известное своим сладким и ароматным вкусом.',
    specifications: {
      sizes: 'Various',
      packaging: 'Carton 5 Kg / Plastic Box 5 Kg / Plastic Box 10 Kg',
    }
  },
  {
    titleEn: 'Pomegranate',
    titleAr: 'رمان',
    titleRu: 'Гранат',
    category: 'berries',
    availability: {
      january: false, february: false, march: false, april: false,
      may: false, june: false, july: false, august: false,
      september: true, october: true, november: true, december: true
    },
    descriptionEn: 'Fresh Egyptian Pomegranate, packed in open top cartons (5 kg, 6-14 fruits) or plastic containers (20 kg).',
    descriptionAr: 'رمان مصري طازج، معبأ في كراتين مفتوحة (5 كجم، 6-14 ثمرة) أو حاويات بلاستيكية (20 كجم).',
    descriptionRu: 'Свежий египетский гранат, упакован в открытые картонные коробки (5 кг, 6-14 плодов) или пластиковые контейнеры (20 кг).',
    specifications: {
      sizes: '6-14 fruits per carton',
      packaging: 'Open top cartons 5 Kg / Plastic containers 20 Kg',
    }
  },
]

async function updateProducts(dryRun = true) {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`🔧 UPDATE PRODUCTS ${dryRun ? '(DRY RUN)' : '(LIVE)'}`)
  console.log(`${'='.repeat(60)}\n`)

  if (!process.env.SANITY_TOKEN && !dryRun) {
    console.error('❌ SANITY_TOKEN required for live mode')
    process.exit(1)
  }

  // Step 1: Get all existing products
  console.log('📦 Fetching existing products...')
  const existingProducts = await client.fetch(`*[_type == "product"] { _id, title, language }`)
  console.log(`   Found ${existingProducts.length} existing products\n`)

  // Step 2: Delete all existing products (translations first, then originals)
  if (!dryRun) {
    console.log('🗑️ Deleting existing products...')
    
    // Delete translations first (EN, RU) - they reference AR
    const translations = existingProducts.filter((p: any) => p.language !== 'ar')
    for (const product of translations) {
      try {
        await client.delete(product._id)
        console.log(`   Deleted: ${product.title} (${product.language})`)
      } catch (e: any) {
        console.log(`   ⚠️ Could not delete: ${product.title} - ${e.message}`)
      }
    }
    
    // Then delete originals (AR)
    const originals = existingProducts.filter((p: any) => p.language === 'ar')
    for (const product of originals) {
      try {
        await client.delete(product._id)
        console.log(`   Deleted: ${product.title} (${product.language})`)
      } catch (e: any) {
        console.log(`   ⚠️ Could not delete: ${product.title} - ${e.message}`)
      }
    }
    console.log('')
  } else {
    console.log(`🗑️ Would delete ${existingProducts.length} existing products\n`)
  }

  // Step 3: Create new products (AR, EN, RU for each)
  console.log('📝 Creating new products...\n')

  for (const product of products) {
    console.log(`   ${product.titleEn}:`)
    
    // Create Arabic version (original)
    const arSlug = product.titleAr.replace(/\s+/g, '-').toLowerCase()
    const arDoc = {
      _type: 'product',
      language: 'ar',
      title: product.titleAr,
      slug: { _type: 'slug', current: `${arSlug}-ar` },
      category: product.category,
      description: product.descriptionAr,
      availability: product.availability,
      specifications: product.specifications,
    }
    
    if (!dryRun) {
      const arResult = await client.create(arDoc)
      console.log(`      ✓ AR: ${product.titleAr}`)
      
      // Create English version
      const enSlug = product.titleEn.toLowerCase().replace(/\s+/g, '-')
      const enDoc = {
        _type: 'product',
        language: 'en',
        title: product.titleEn,
        slug: { _type: 'slug', current: `${enSlug}-en` },
        category: product.category,
        description: product.descriptionEn,
        availability: product.availability,
        specifications: product.specifications,
        originalDocument: { _type: 'reference', _ref: arResult._id }
      }
      await client.create(enDoc)
      console.log(`      ✓ EN: ${product.titleEn}`)
      
      // Create Russian version
      const ruDoc = {
        _type: 'product',
        language: 'ru',
        title: product.titleRu,
        slug: { _type: 'slug', current: `${enSlug}-ru` },
        category: product.category,
        description: product.descriptionRu,
        availability: product.availability,
        specifications: product.specifications,
        originalDocument: { _type: 'reference', _ref: arResult._id }
      }
      await client.create(ruDoc)
      console.log(`      ✓ RU: ${product.titleRu}`)
    } else {
      console.log(`      Would create: AR, EN, RU versions`)
    }
  }

  console.log(`\n${'='.repeat(60)}`)
  console.log(`📊 SUMMARY`)
  console.log(`   ${dryRun ? 'Would delete' : 'Deleted'}: ${existingProducts.length} products`)
  console.log(`   ${dryRun ? 'Would create' : 'Created'}: ${products.length * 3} products (${products.length} × 3 languages)`)
  
  if (dryRun) {
    console.log(`\n💡 To apply changes, run with --apply flag:`)
    console.log(`   $env:SANITY_TOKEN="your-token"; npx tsx scripts/update-products.ts --apply`)
  }
  console.log(`${'='.repeat(60)}\n`)
}

const isLive = process.argv.includes('--apply')
updateProducts(!isLive)
