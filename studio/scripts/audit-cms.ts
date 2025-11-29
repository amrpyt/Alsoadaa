/**
 * CMS Data Integrity Audit Script
 * 
 * Run with: npx tsx scripts/audit-cms.ts
 * 
 * This script analyzes all products, pages, and services in Sanity
 * to find data integrity issues like:
 * - Missing translations
 * - Broken originalDocument references
 * - Duplicate products
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wptd4h7v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface ProductDoc {
  _id: string
  _type: string
  title: string
  language: 'ar' | 'en' | 'ru'
  slug?: { current: string }
  originalDocument?: { _ref: string }
  category?: string
}

interface AuditResult {
  summary: {
    totalProducts: number
    byLanguage: { ar: number; en: number; ru: number }
    issues: number
  }
  products: {
    ar: ProductDoc[]
    en: ProductDoc[]
    ru: ProductDoc[]
  }
  issues: {
    missingTranslations: { arProduct: ProductDoc; missingLangs: string[] }[]
    brokenReferences: { doc: ProductDoc; issue: string }[]
    duplicates: { title: string; language: string; docs: ProductDoc[] }[]
    orphanedTranslations: { doc: ProductDoc; issue: string }[]
    untranslatedTitles: { doc: ProductDoc; issue: string }[]
  }
}

// Check if text contains Arabic characters
function hasArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text)
}

// Check if text contains Cyrillic (Russian) characters
function hasCyrillic(text: string): boolean {
  return /[\u0400-\u04FF]/.test(text)
}

// Check if title appears to be in English only
function isEnglishOnly(text: string): boolean {
  return /^[a-zA-Z0-9\s\-'.,]+$/.test(text)
}

async function fetchAllProducts(): Promise<ProductDoc[]> {
  const query = `*[_type == "product"] {
    _id,
    _type,
    title,
    language,
    slug,
    originalDocument,
    category
  }`
  return client.fetch(query)
}

async function fetchAllCalendarEvents() {
  const query = `*[_type == "calendarEvent"] {
    _id,
    month,
    status,
    "productId": product._ref,
    "productTitle": product->title,
    "productLang": product->language
  }`
  return client.fetch(query)
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().trim().replace(/\s+/g, ' ')
}

async function runAudit(): Promise<AuditResult> {
  console.log('🔍 Starting CMS Audit...\n')
  
  const allProducts = await fetchAllProducts()
  console.log(`📦 Found ${allProducts.length} total products\n`)

  // Group by language
  const products = {
    ar: allProducts.filter(p => p.language === 'ar'),
    en: allProducts.filter(p => p.language === 'en'),
    ru: allProducts.filter(p => p.language === 'ru'),
  }

  console.log('📊 Products by Language:')
  console.log(`   AR: ${products.ar.length}`)
  console.log(`   EN: ${products.en.length}`)
  console.log(`   RU: ${products.ru.length}\n`)

  const issues: AuditResult['issues'] = {
    missingTranslations: [],
    brokenReferences: [],
    duplicates: [],
    orphanedTranslations: [],
    untranslatedTitles: [],
  }

  // Check for untranslated titles (English titles in AR/RU products)
  console.log('🔍 Checking for untranslated titles...')
  for (const arProduct of products.ar) {
    if (isEnglishOnly(arProduct.title)) {
      issues.untranslatedTitles.push({
        doc: arProduct,
        issue: `Arabic product has English-only title: "${arProduct.title}"`
      })
    }
  }
  for (const ruProduct of products.ru) {
    if (isEnglishOnly(ruProduct.title)) {
      issues.untranslatedTitles.push({
        doc: ruProduct,
        issue: `Russian product has English-only title: "${ruProduct.title}"`
      })
    }
  }

  // Check for missing translations
  console.log('🔍 Checking for missing translations...')
  for (const arProduct of products.ar) {
    const missingLangs: string[] = []
    
    // Find EN translation
    const enTranslation = products.en.find(p => 
      p.originalDocument?._ref === arProduct._id ||
      normalizeTitle(p.title) === normalizeTitle(arProduct.title)
    )
    if (!enTranslation) missingLangs.push('en')
    
    // Find RU translation
    const ruTranslation = products.ru.find(p => 
      p.originalDocument?._ref === arProduct._id ||
      normalizeTitle(p.title) === normalizeTitle(arProduct.title)
    )
    if (!ruTranslation) missingLangs.push('ru')
    
    if (missingLangs.length > 0) {
      issues.missingTranslations.push({ arProduct, missingLangs })
    }
  }

  // Check for broken originalDocument references
  console.log('🔍 Checking for broken references...')
  const allProductIds = new Set(allProducts.map(p => p._id))
  
  for (const product of [...products.en, ...products.ru]) {
    if (product.originalDocument) {
      if (!allProductIds.has(product.originalDocument._ref)) {
        issues.brokenReferences.push({
          doc: product,
          issue: `originalDocument references non-existent ID: ${product.originalDocument._ref}`
        })
      } else {
        // Check if referenced document is Arabic
        const refDoc = allProducts.find(p => p._id === product.originalDocument!._ref)
        if (refDoc && refDoc.language !== 'ar') {
          issues.brokenReferences.push({
            doc: product,
            issue: `originalDocument references ${refDoc.language} instead of AR`
          })
        }
      }
    } else {
      // Missing originalDocument reference
      issues.orphanedTranslations.push({
        doc: product,
        issue: 'Missing originalDocument reference - not linked to AR original'
      })
    }
  }

  // Check for duplicates within same language
  console.log('🔍 Checking for duplicates...')
  for (const lang of ['ar', 'en', 'ru'] as const) {
    const langProducts = products[lang]
    const titleGroups = new Map<string, ProductDoc[]>()
    
    for (const product of langProducts) {
      const normalizedTitle = normalizeTitle(product.title)
      if (!titleGroups.has(normalizedTitle)) {
        titleGroups.set(normalizedTitle, [])
      }
      titleGroups.get(normalizedTitle)!.push(product)
    }
    
    for (const [title, docs] of titleGroups) {
      if (docs.length > 1) {
        issues.duplicates.push({ title, language: lang, docs })
      }
    }
  }

  // Audit Calendar Events
  console.log('🔍 Checking Calendar Events...')
  const calendarEvents = await fetchAllCalendarEvents()
  console.log(`📅 Found ${calendarEvents.length} calendar events`)
  
  const invalidCalendarEvents = calendarEvents.filter((e: any) => {
    if (!e.productId) return true
    if (!allProductIds.has(e.productId)) return true
    return false
  })
  
  if (invalidCalendarEvents.length > 0) {
    console.log(`⚠️  ${invalidCalendarEvents.length} calendar events with invalid product references`)
  }

  const result: AuditResult = {
    summary: {
      totalProducts: allProducts.length,
      byLanguage: {
        ar: products.ar.length,
        en: products.en.length,
        ru: products.ru.length,
      },
      issues: 
        issues.missingTranslations.length +
        issues.brokenReferences.length +
        issues.duplicates.length +
        issues.orphanedTranslations.length +
        issues.untranslatedTitles.length
    },
    products,
    issues,
  }

  return result
}

function printReport(result: AuditResult) {
  console.log('\n' + '='.repeat(60))
  console.log('📋 AUDIT REPORT')
  console.log('='.repeat(60))

  console.log('\n📊 SUMMARY')
  console.log(`   Total Products: ${result.summary.totalProducts}`)
  console.log(`   AR: ${result.summary.byLanguage.ar} | EN: ${result.summary.byLanguage.en} | RU: ${result.summary.byLanguage.ru}`)
  console.log(`   Total Issues: ${result.summary.issues}`)

  if (result.issues.missingTranslations.length > 0) {
    console.log('\n❌ MISSING TRANSLATIONS')
    for (const item of result.issues.missingTranslations) {
      console.log(`   "${item.arProduct.title}" (${item.arProduct._id})`)
      console.log(`      Missing: ${item.missingLangs.join(', ')}`)
    }
  }

  if (result.issues.orphanedTranslations.length > 0) {
    console.log('\n⚠️  ORPHANED TRANSLATIONS (no originalDocument link)')
    for (const item of result.issues.orphanedTranslations) {
      console.log(`   "${item.doc.title}" [${item.doc.language}] (${item.doc._id})`)
    }
  }

  if (result.issues.brokenReferences.length > 0) {
    console.log('\n🔗 BROKEN REFERENCES')
    for (const item of result.issues.brokenReferences) {
      console.log(`   "${item.doc.title}" [${item.doc.language}]: ${item.issue}`)
    }
  }

  if (result.issues.duplicates.length > 0) {
    console.log('\n📋 DUPLICATES')
    for (const item of result.issues.duplicates) {
      console.log(`   "${item.title}" [${item.language}]: ${item.docs.length} copies`)
      for (const doc of item.docs) {
        console.log(`      - ${doc._id} (slug: ${doc.slug?.current || 'none'})`)
      }
    }
  }

  if (result.issues.untranslatedTitles.length > 0) {
    console.log('\n🌐 UNTRANSLATED TITLES (needs translation)')
    const arUntranslated = result.issues.untranslatedTitles.filter(i => i.doc.language === 'ar')
    const ruUntranslated = result.issues.untranslatedTitles.filter(i => i.doc.language === 'ru')
    
    if (arUntranslated.length > 0) {
      console.log('   Arabic products with English titles:')
      for (const item of arUntranslated) {
        console.log(`      - "${item.doc.title}" (${item.doc._id})`)
      }
    }
    if (ruUntranslated.length > 0) {
      console.log('   Russian products with English titles:')
      for (const item of ruUntranslated) {
        console.log(`      - "${item.doc.title}" (${item.doc._id})`)
      }
    }
  }

  if (result.summary.issues === 0) {
    console.log('\n✅ NO ISSUES FOUND! Data integrity is good.')
  }

  console.log('\n' + '='.repeat(60))
}

// Run the audit
runAudit()
  .then(result => {
    printReport(result)
    
    // Save JSON report
    const fs = require('fs')
    const reportPath = './scripts/audit-report.json'
    fs.writeFileSync(reportPath, JSON.stringify(result, null, 2))
    console.log(`\n💾 Full report saved to: ${reportPath}`)
  })
  .catch(err => {
    console.error('❌ Audit failed:', err)
    process.exit(1)
  })
