/**
 * Fix Untranslated Titles Script
 * 
 * Run with: npx tsx scripts/fix-translations.ts
 * 
 * This script updates product titles that are in English
 * but should be in Arabic or Russian.
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wptd4h7v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // Need write token
})

// Translation mappings
const arabicTranslations: Record<string, string> = {
  'Fresh Lemons': 'ليمون طازج',
  'Valencia Orange': 'برتقال فالنسيا',
  'Vermont': 'فيرمونت',
  'Mango': 'مانجو',
  'Fresh Vegetables': 'خضروات طازجة',
  'Murcott': 'يوسفي ميركوت',
  'Green Beans': 'فاصوليا خضراء',
  'Lettuce Al-Kabouchy': 'خس كابوتشي',
  'Red Onion': 'بصل أحمر',
}

const russianTranslations: Record<string, string> = {
  'Valencia Orange': 'Апельсин Валенсия',
  'Lanylet Orange': 'Апельсин Ланилет',
  'Mango': 'Манго',
  'Murcott': 'Мандарин Муркотт',
  'Red Onion': 'Красный лук',
  'Vermont': 'Вермонт',
  'Green Beans': 'Зеленая фасоль',
  'Lettuce Al-Kabouchy': 'Салат Кабучи',
}

// Products to fix (from audit)
const arabicProductsToFix = [
  { id: 'CP4L9iYvntAeS3zWeW8MNg', currentTitle: 'Fresh Lemons' },
  { id: 'CP4L9iYvntAeS3zWeW8Q3u', currentTitle: 'Valencia Orange' },
  { id: 'CP4L9iYvntAeS3zWeW8ups', currentTitle: 'Vermont' },
  { id: 'CP4L9iYvntAeS3zWeW8vrm', currentTitle: 'Mango' },
  { id: 'TLbSBIZTx3rbZtjVmwrW6a', currentTitle: 'Fresh Vegetables' },
  { id: 'd1n9NUdu5CwUlXOr5TOF7W', currentTitle: 'Murcott' },
  { id: 'd1n9NUdu5CwUlXOr5TOGrQ', currentTitle: 'Green Beans' },
  { id: 'd1n9NUdu5CwUlXOr5TOHRO', currentTitle: 'Lettuce Al-Kabouchy' },
  { id: 'd1n9NUdu5CwUlXOr5TOIQX', currentTitle: 'Red Onion' },
]

const russianProductsToFix = [
  { id: 'CP4L9iYvntAeS3zWeYg8VV', currentTitle: 'Valencia Orange' },
  { id: 'TLbSBIZTx3rbZtjVmy0Qx4', currentTitle: 'Lanylet Orange' },
  { id: 'TLbSBIZTx3rbZtjVmy0REd', currentTitle: 'Mango' },
  { id: 'TLbSBIZTx3rbZtjVmy0RL1', currentTitle: 'Murcott' },
  { id: 'TLbSBIZTx3rbZtjVmy0RWC', currentTitle: 'Red Onion' },
  { id: 'TLbSBIZTx3rbZtjVmy0RmA', currentTitle: 'Vermont' },
  { id: 'd1n9NUdu5CwUlXOr5VIQDI', currentTitle: 'Green Beans' },
  { id: 'd1n9NUdu5CwUlXOr5VIQcT', currentTitle: 'Lettuce Al-Kabouchy' },
]

async function fixTranslations(dryRun = true) {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`🔧 FIX TRANSLATIONS ${dryRun ? '(DRY RUN)' : '(LIVE)'}`)
  console.log(`${'='.repeat(60)}\n`)

  if (!process.env.SANITY_TOKEN && !dryRun) {
    console.error('❌ SANITY_TOKEN environment variable is required for live mode')
    console.log('   Set it with: $env:SANITY_TOKEN="your-token-here"')
    process.exit(1)
  }

  let fixedCount = 0
  let errorCount = 0

  // Fix Arabic products
  console.log('📝 Fixing Arabic products...\n')
  for (const product of arabicProductsToFix) {
    const newTitle = arabicTranslations[product.currentTitle]
    if (!newTitle) {
      console.log(`   ⚠️ No translation found for: "${product.currentTitle}"`)
      errorCount++
      continue
    }

    console.log(`   "${product.currentTitle}" → "${newTitle}"`)
    
    if (!dryRun) {
      try {
        await client.patch(product.id).set({ title: newTitle }).commit()
        console.log(`      ✓ Updated`)
        fixedCount++
      } catch (err) {
        console.log(`      ❌ Error: ${err}`)
        errorCount++
      }
    } else {
      fixedCount++
    }
  }

  // Fix Russian products
  console.log('\n📝 Fixing Russian products...\n')
  for (const product of russianProductsToFix) {
    const newTitle = russianTranslations[product.currentTitle]
    if (!newTitle) {
      console.log(`   ⚠️ No translation found for: "${product.currentTitle}"`)
      errorCount++
      continue
    }

    console.log(`   "${product.currentTitle}" → "${newTitle}"`)
    
    if (!dryRun) {
      try {
        await client.patch(product.id).set({ title: newTitle }).commit()
        console.log(`      ✓ Updated`)
        fixedCount++
      } catch (err) {
        console.log(`      ❌ Error: ${err}`)
        errorCount++
      }
    } else {
      fixedCount++
    }
  }

  console.log(`\n${'='.repeat(60)}`)
  console.log(`📊 SUMMARY`)
  console.log(`   ${dryRun ? 'Would fix' : 'Fixed'}: ${fixedCount} products`)
  console.log(`   Errors: ${errorCount}`)
  
  if (dryRun) {
    console.log(`\n💡 To apply changes, run with --apply flag:`)
    console.log(`   $env:SANITY_TOKEN="your-token"; npx tsx scripts/fix-translations.ts --apply`)
  }
  console.log(`${'='.repeat(60)}\n`)
}

// Check for --apply flag
const isLive = process.argv.includes('--apply')
fixTranslations(!isLive)
