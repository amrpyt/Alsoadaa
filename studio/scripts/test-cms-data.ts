/**
 * CMS Data Verification Test Script
 * 
 * Run with: npx tsx scripts/test-cms-data.ts
 * 
 * Tests that all products load correctly for each language
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wptd4h7v',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface TestResult {
  name: string
  passed: boolean
  details: string
}

const results: TestResult[] = []

function test(name: string, passed: boolean, details: string) {
  results.push({ name, passed, details })
  const icon = passed ? '✅' : '❌'
  console.log(`${icon} ${name}`)
  if (!passed) console.log(`   → ${details}`)
}

async function runTests() {
  console.log('\n' + '='.repeat(60))
  console.log('🧪 CMS DATA VERIFICATION TESTS')
  console.log('='.repeat(60) + '\n')

  // Test 1: Products exist for all languages
  console.log('📦 Testing Products...\n')
  
  for (const lang of ['ar', 'en', 'ru']) {
    const products = await client.fetch(
      `*[_type == "product" && language == $lang] { _id, title, slug }`,
      { lang }
    )
    test(
      `Products exist for ${lang.toUpperCase()}`,
      products.length > 0,
      `Found ${products.length} products`
    )
  }

  // Test 2: All EN/RU products have originalDocument
  console.log('\n🔗 Testing Translation Links...\n')
  
  for (const lang of ['en', 'ru']) {
    const unlinked = await client.fetch(
      `*[_type == "product" && language == $lang && !defined(originalDocument)] { _id, title }`,
      { lang }
    )
    test(
      `All ${lang.toUpperCase()} products linked to AR original`,
      unlinked.length === 0,
      unlinked.length > 0 ? `${unlinked.length} unlinked: ${unlinked.map((p: any) => p.title).join(', ')}` : 'All linked'
    )
  }

  // Test 3: Check for Arabic titles in AR products
  console.log('\n🌐 Testing Arabic Titles...\n')
  
  const arProducts = await client.fetch(
    `*[_type == "product" && language == "ar"] { _id, title }`
  )
  
  const hasArabic = (text: string) => /[\u0600-\u06FF]/.test(text)
  const englishOnlyAr = arProducts.filter((p: any) => !hasArabic(p.title))
  
  test(
    'Arabic products have Arabic titles',
    englishOnlyAr.length === 0,
    englishOnlyAr.length > 0 
      ? `${englishOnlyAr.length} with English titles: ${englishOnlyAr.map((p: any) => p.title).slice(0, 3).join(', ')}...`
      : 'All have Arabic titles'
  )

  // Test 4: Check for Russian titles in RU products
  console.log('\n🇷🇺 Testing Russian Titles...\n')
  
  const ruProducts = await client.fetch(
    `*[_type == "product" && language == "ru"] { _id, title }`
  )
  
  const hasCyrillic = (text: string) => /[\u0400-\u04FF]/.test(text)
  const englishOnlyRu = ruProducts.filter((p: any) => !hasCyrillic(p.title))
  
  test(
    'Russian products have Russian titles',
    englishOnlyRu.length === 0,
    englishOnlyRu.length > 0 
      ? `${englishOnlyRu.length} with English titles: ${englishOnlyRu.map((p: any) => p.title).slice(0, 3).join(', ')}...`
      : 'All have Russian titles'
  )

  // Test 5: All products have required fields
  console.log('\n📋 Testing Required Fields...\n')
  
  const incompleteProducts = await client.fetch(
    `*[_type == "product" && (!defined(title) || !defined(slug) || !defined(category) || !defined(image))] { _id, title, language }`
  )
  
  test(
    'All products have required fields',
    incompleteProducts.length === 0,
    incompleteProducts.length > 0 
      ? `${incompleteProducts.length} incomplete products`
      : 'All complete'
  )

  // Test 6: Slug uniqueness per language
  console.log('\n🔤 Testing Slug Uniqueness...\n')
  
  for (const lang of ['ar', 'en', 'ru']) {
    const duplicateSlugs = await client.fetch(
      `*[_type == "product" && language == $lang] {
        "slug": slug.current
      } | group(slug) [count > 1]`,
      { lang }
    )
    test(
      `No duplicate slugs in ${lang.toUpperCase()}`,
      duplicateSlugs.length === 0,
      duplicateSlugs.length > 0 ? `Found ${duplicateSlugs.length} duplicate slugs` : 'All unique'
    )
  }

  // Test 7: Calendar events (if any)
  console.log('\n📅 Testing Calendar Events...\n')
  
  const calendarEvents = await client.fetch(
    `*[_type == "calendarEvent"] { _id, month, "productId": product._ref }`
  )
  
  if (calendarEvents.length === 0) {
    test('Calendar events exist', false, 'No calendar events found - needs data entry')
  } else {
    const invalidEvents = calendarEvents.filter((e: any) => !e.productId)
    test(
      'All calendar events have product reference',
      invalidEvents.length === 0,
      invalidEvents.length > 0 ? `${invalidEvents.length} missing product ref` : `${calendarEvents.length} events OK`
    )
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  const passed = results.filter(r => r.passed).length
  const failed = results.filter(r => !r.passed).length
  console.log(`📊 SUMMARY: ${passed} passed, ${failed} failed`)
  console.log('='.repeat(60) + '\n')

  // Return exit code
  return failed > 0 ? 1 : 0
}

runTests()
  .then(code => process.exit(code))
  .catch(err => {
    console.error('❌ Test failed:', err)
    process.exit(1)
  })
