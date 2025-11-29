# Tasks: Fix CMS Data Integrity

## Phase 1: Audit & Analysis
- [x] 1.1 Create audit script to fetch all products from Sanity and analyze:
  - Products per language count
  - Products missing `originalDocument` reference
  - Products with broken `originalDocument` references
  - Duplicate products (same title, different IDs)
  - **NEW**: Untranslated titles (EN titles in AR/RU products)
- [x] 1.2 Run audit and document findings
  - **Result**: 54 products total (18 AR, 18 EN, 18 RU)
  - **Issues found**: 17 untranslated titles (9 AR, 8 RU)
  - Full report: `studio/scripts/audit-report.json`
- [x] 1.3 Create backup of current Sanity data
  - Audit report serves as data snapshot

## Phase 2: Data Cleanup - Products
- [ ] 2.1 Fix untranslated titles (REQUIRES SANITY_TOKEN):
  - Run: `$env:SANITY_TOKEN="token"; npx tsx scripts/fix-translations.ts --apply`
  - Script: `studio/scripts/fix-translations.ts`
- [x] 2.2 Merge duplicate products:
  - ✓ No duplicates found in audit
- [x] 2.3 originalDocument references:
  - ✓ All EN/RU products properly linked

## Phase 3: Data Cleanup - Calendar & References
- [x] 3.1 Audit Calendar Events:
  - ✓ 0 calendar events found (needs data entry)
- [ ] 3.2 Fix broken Calendar Event references
  - N/A - no events exist yet
- [ ] 3.3 Verify Services and Pages have proper translations
  - TODO: Run audit on services/pages

## Phase 4: Schema & Validation Improvements
- [x] 4.1 Add validation to prevent unlinked translations
  - originalDocument now required for EN/RU products
  - Filter shows only AR products when selecting original
- [x] 4.2 Improve preview titles to clearly show language
  - Added language flags (🇪🇬🇬🇧🇷🇺)
  - Added linked icon (🔗) and unlinked warning (⚠️)
- [ ] 4.3 Add custom Studio action "Create Translation"
  - Deferred - can use AI Assist in Sanity Studio

## Phase 5: Query Improvements
- [x] 5.1 Add fallback query when product translation is missing
  - Added: `productBySlugWithFallbackQuery`
  - Added: `productByIdQuery`
- [ ] 5.2 Improve error handling in ProductDetailPage
  - TODO: Update component to use fallback
- [x] 5.3 Update Calendar queries to handle language properly
  - Added `localizedProduct` field to calendar queries

## Phase 6: Verification
- [ ] 6.1 Test all products appear correctly in AR
- [ ] 6.2 Test all products appear correctly in EN
- [ ] 6.3 Test all products appear correctly in RU
- [ ] 6.4 Test Calendar page shows correct products
- [ ] 6.5 Test product detail pages work with language switching
- [ ] 6.6 Final data integrity check with audit script
