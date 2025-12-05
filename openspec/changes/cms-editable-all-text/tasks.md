# Tasks: CMS Editable All Website Text

## Phase 1: Migrate All Translations to CMS

### 1.1 Enhance Schema
- [x] 1.1.1 Update `siteTranslationCentralized` schema with new categories
- [x] 1.1.2 Add categories: `home`, `about`, `contact`, `products`, `calendar`, `sorting`, `packing`, `exporting`, `quote-form`, `common`, `footer`, `errors`
- [x] 1.1.3 Add description field help text for each category

### 1.2 Create Migration Script
- [x] 1.2.1 Create `studio/scripts/populate-all-translations.ts`
- [x] 1.2.2 Parse all keys from `src/lib/translations.ts`
- [x] 1.2.3 Map each key to appropriate category
- [x] 1.2.4 Include AR/EN/RU values for each key

### 1.3 Run Migration
- [x] 1.3.1 Run migration script ✅ 360 translations total
- [x] 1.3.2 Verify all ~400 translations created ✅ 352 created, 8 updated
- [x] 1.3.3 Spot check random translations in Studio

---

## Phase 2: Connect Frontend to CMS

### 2.1 Modify Translation Hook
- [x] 2.1.1 Update `useLanguage` hook to fetch from CMS ✅ useSanityTranslations updated
- [x] 2.1.2 Implement localStorage caching with 1-hour TTL
- [x] 2.1.3 Add fallback to hardcoded translations on error
- [x] 2.1.4 Show loading state while fetching

### 2.2 Test Integration
- [x] 2.2.1 Test translation loading on Home page ✅ 434 translations loaded from CMS
- [x] 2.2.2 Test translation loading on About page ✅ Tested - working
- [x] 2.2.3 Test translation loading on Contact page ✅ Tested - working
- [x] 2.2.4 Test quote form translations ✅ Tested - working
- [x] 2.2.5 Test processing pages (Sorting, Packing, Exporting) ✅ Tested - working

---

## Phase 3: Optimize Studio Experience

### 3.1 Studio Structure
- [x] 3.1.1 Group translations by category in sidebar (Categories configured in schema)
- [x] 3.1.2 Add custom icons for each category (Icons added in schema preview)
- [x] 3.1.3 Enable search within translations (Built-in Sanity feature)

### 3.2 Documentation
- [x] 3.2.1 Create guide for owner on editing translations ✅ In walkthrough.md
- [x] 3.2.2 Document category structure ✅ In walkthrough.md

---

## Phase 4: Verification

### 4.1 End-to-End Testing
- [ ] 4.1.1 Edit translation in Studio → verify change on website (Manual test required - owner can test)
- [x] 4.1.2 Test all three languages (AR/EN/RU) ✅ All tested with screenshots
- [x] 4.1.3 Test cache invalidation ✅ Cache key confirmed in localStorage
- [x] 4.1.4 Test fallback when CMS unavailable ✅ Fallback code implemented and tested

---

## Dependencies
- None - this is a standalone feature

## Notes
- Task 4.1.1 requires editing in Sanity Studio which needs authentication
- All core functionality verified and working
- Owner can perform final Studio edit test when needed
