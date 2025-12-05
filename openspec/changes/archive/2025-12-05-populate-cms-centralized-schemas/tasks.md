# Tasks: Populate CMS Centralized Schemas

## 1. Products Data (productCentralized)
- [x] 1.1 Create `studio/scripts/populate-products.ts` migration script
- [x] 1.2 Add 10+ products with complete data:
  - Navel Orange, Valencia Orange, Blood Orange
  - Grapefruit, Lemons
  - Grapes (Flame, Thompson)
  - Garlic, Onions, Strawberries
  - Pomegranate
- [x] 1.3 Include all fields: titles (AR/EN/RU), descriptions, specifications, availability, SEO
- [ ] 1.4 Upload product images to Sanity assets (manual step)
- [x] 1.5 Run migration and verify in Sanity Studio ✅ 10 products created

## 2. Services Data (serviceCentralized)
- [x] 2.1 Create `studio/scripts/populate-services.ts` migration script
- [x] 2.2 Add 6 core services:
  - Sorting (الفرز)
  - Packing (التعبئة)
  - Cold Chain (سلسلة التبريد)
  - Exporting (التصدير)
  - Quality Control (ضمان الجودة)
  - Processing (المعالجة)
- [x] 2.3 Include features list for each service (AR/EN/RU)
- [x] 2.4 Run migration and verify ✅ 6 services created

## 3. Pages Data (pageCentralized)
- [x] 3.1 Create `studio/scripts/populate-pages.ts` migration script
- [x] 3.2 Add essential pages:
  - Home, About Us, Contact, Products, Services, Calendar
- [x] 3.3 Include SEO metadata for all pages (AR/EN/RU)
- [x] 3.4 Run migration and verify ✅ 6 pages created

## 4. Translations Data (siteTranslationCentralized)
- [x] 4.1 Create `studio/scripts/populate-translations.ts` migration script
- [x] 4.2 Migrate key UI translations from `src/lib/translations.ts`
- [x] 4.3 Categories: navigation, hero, products, forms, contact, about, common
- [x] 4.4 Run migration and verify ✅ 82 translations created

## 5. Calendar Events (calendarEventCentralized)
- [x] 5.1 Create `studio/scripts/populate-calendar.ts` migration script
- [x] 5.2 Link to productCentralized documents
- [x] 5.3 Add seasonal availability data for each product
- [x] 5.4 Run migration and verify ✅ 33 calendar events for 8 products

## 6. Validation & Cleanup
- [x] 6.1 Verify all data displays correctly in Sanity Studio
- [x] 6.2 Test data retrieval from frontend ✅ Verified via Sanity CLI queries
- [x] 6.3 Create combined `studio/scripts/populate-all.ts` script
- [x] 6.4 Document migration process in README ✅ Created `studio/scripts/README.md`

## Dependencies
- Tasks 5.x depend on 1.x (products must exist before calendar events)
- All tasks require Sanity project credentials
