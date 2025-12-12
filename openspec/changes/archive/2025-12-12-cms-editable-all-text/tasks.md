# Tasks: CMS Editable All Website Text - REFACTORED APPROACH

## Overview
Restructure CMS to follow industry standards (Framer, WordPress, Webflow):
- **8 Page documents** with embedded text content
- **1 Site Settings** singleton for global content
- **Clean, intuitive** for the owner

---

## Phase 1: Schema Design ⏳

### 1.1 Create Site Settings Schema
- [ ] 1.1.1 Create `studio/schemaTypes/siteSettings.ts` (singleton)
- [ ] 1.1.2 Add Navigation section (menu items, AR/EN/RU)
- [ ] 1.1.3 Add Footer section (links, copyright, AR/EN/RU)
- [ ] 1.1.4 Add Common Buttons section (submit, cancel, back, next, AR/EN/RU)
- [ ] 1.1.5 Add Form Labels section (email, phone, company, message, AR/EN/RU)
- [ ] 1.1.6 Add Error Messages section (validation, network, server, AR/EN/RU)
- [ ] 1.1.7 Register in schemaTypes/index.ts

### 1.2 Extend Page Schema with Content Fields
- [ ] 1.2.1 Create `studio/schemaTypes/pageContent/homeContent.ts`
  - Hero title, subtitle, CTA (AR/EN/RU)
  - Trust indicators (years, countries, certified)
  - Why choose us (quality, delivery, guarantee)
  - Testimonials section labels
  - CTA section
- [ ] 1.2.2 Create `studio/schemaTypes/pageContent/aboutContent.ts`
  - About hero, mission, vision
  - Values (quality first, global reach, sustainability, etc.)
  - Journey timeline labels
  - Certifications descriptions
- [ ] 1.2.3 Create `studio/schemaTypes/pageContent/contactContent.ts`
  - Contact hero, form labels
  - Office information labels
  - Contact methods (quote, call, email)
  - Business hours labels
- [ ] 1.2.4 Create `studio/schemaTypes/pageContent/productsContent.ts`
  - Page title, filters, search
  - Product card labels (specifications, availability)
  - Related products, view details
- [ ] 1.2.5 Create `studio/schemaTypes/pageContent/calendarContent.ts`
  - Month names, legend labels
  - Seasonal availability labels
  - Peak season, in season
- [ ] 1.2.6 Create `studio/schemaTypes/pageContent/processingContent.ts`
  - Sorting page content (stages, benefits)
  - Packing page content (features, standards)
  - Exporting page content (capabilities, features)
- [ ] 1.2.7 Create `studio/schemaTypes/pageContent/quoteFormContent.ts`
  - Step labels, field labels
  - Quantity options, delivery timeframes
  - Success/error messages
  - Resume request prompts
- [ ] 1.2.8 Modify `pageCentralized.ts` to conditionally show content based on slug
  - If slug = "/" → show homeContent fields
  - If slug = "/about" → show aboutContent fields
  - etc.

---

## Phase 2: Migration Scripts

### 2.1 Create Site Settings Migration
- [ ] 2.1.1 Create `studio/scripts/migrate-to-site-settings.ts`
- [ ] 2.1.2 Extract navigation translations (9 items)
- [ ] 2.1.3 Extract footer translations (6 items)
- [ ] 2.1.4 Extract common buttons (17 items)
- [ ] 2.1.5 Extract form labels (30 items)
- [ ] 2.1.6 Extract error messages (21 items)
- [ ] 2.1.7 Create/update siteSettings singleton document

### 2.2 Create Page Content Migration
- [ ] 2.2.1 Create `studio/scripts/migrate-to-page-content.ts`
- [ ] 2.2.2 Migrate home translations (42 items) → Home page document
- [ ] 2.2.3 Migrate about translations (33 items) → About page document
- [ ] 2.2.4 Migrate contact translations (29 items) → Contact page document
- [ ] 2.2.5 Migrate products translations (31 items) → Products page document
- [ ] 2.2.6 Migrate calendar translations (37 items) → Calendar page document
- [ ] 2.2.7 Migrate sorting translations (13 items) → Sorting page document
- [ ] 2.2.8 Migrate packing translations (15 items) → Packing page document
- [ ] 2.2.9 Migrate exporting translations (18 items) → Exporting page document
- [ ] 2.2.10 Migrate quote form translations (89 items) → Quote Form page document

### 2.3 Cleanup
- [ ] 2.3.1 Verify all 360 translations migrated
- [ ] 2.3.2 Archive old `siteTranslationCentralized` documents
- [ ] 2.3.3 Update schema to hide old translation type

---

## Phase 3: Frontend Integration

### 3.1 Create New Hooks
- [ ] 3.1.1 Create `src/hooks/useSiteSettings.ts`
  - Fetch siteSettings singleton
  - Cache for 1 hour
  - Fallback to hardcoded navigation/footer
- [ ] 3.1.2 Create `src/hooks/usePageContent.ts`
  - Fetch page content by slug
  - Cache per page
  - Fallback to hardcoded page text

### 3.2 Update Components
- [ ] 3.2.1 Update `Header.tsx` to use `useSiteSettings().navigation`
- [ ] 3.2.2 Update `Footer.tsx` to use `useSiteSettings().footer`
- [ ] 3.2.3 Update `Home.tsx` to use `usePageContent('/')` 
- [ ] 3.2.4 Update `About.tsx` to use `usePageContent('/about')`
- [ ] 3.2.5 Update `Contact.tsx` to use `usePageContent('/contact')`
- [ ] 3.2.6 Update `Products.tsx` to use `usePageContent('/products')`
- [ ] 3.2.7 Update `Calendar.tsx` to use `usePageContent('/calendar')`
- [ ] 3.2.8 Update `ProcessingPages` to use `usePageContent`
- [ ] 3.2.9 Update `QuoteForm.tsx` to use page content + siteSettings

### 3.3 Update Queries
- [ ] 3.3.1 Create `src/lib/sanity/queries/siteSettings.ts`
- [ ] 3.3.2 Create `src/lib/sanity/queries/pageContent.ts`
- [ ] 3.3.3 Remove old translation queries

---

## Phase 4: Studio UI Optimization

### 4.1 Update Studio Structure
- [ ] 4.1.1 Add Site Settings as top-level singleton in sidebar
- [ ] 4.1.2 Keep Pages section as is (already clean)
- [ ] 4.1.3 Add custom input components for better UX
- [ ] 4.1.4 Add field grouping/tabs for large page documents

### 4.2 Documentation
- [ ] 4.2.1 Update walkthrough with new structure
- [ ] 4.2.2 Create guide for editing page content
- [ ] 4.2.3 Create guide for editing site settings
- [ ] 4.2.4 Document migration from old structure

---

## Phase 5: Testing & Deployment

### 5.1 Local Testing
- [ ] 5.1.1 Test Site Settings editing in Studio
- [ ] 5.1.2 Test Page Content editing for all pages
- [ ] 5.1.3 Verify all 3 languages (AR/EN/RU)
- [ ] 5.1.4 Test cache and fallback mechanisms
- [ ] 5.1.5 Verify no broken pages

### 5.2 Production Deployment
- [ ] 5.2.1 Run migration scripts on production dataset
- [ ] 5.2.2 Verify data in Sanity Studio production
- [ ] 5.2.3 Deploy frontend code to Vercel
- [ ] 5.2.4 Smoke test on production
- [ ] 5.2.5 Archive old translation documents

---

## Estimated Effort
- Phase 1 (Schema): 4-6 hours
- Phase 2 (Migration): 3-4 hours
- Phase 3 (Frontend): 4-6 hours
- Phase 4 (Studio UI): 2-3 hours
- Phase 5 (Testing): 2-3 hours
- **Total: ~15-22 hours**

## Benefits After Completion
✅ **9 documents** instead of 360 (much cleaner)
✅ **Intuitive**: Edit "Home Page" to change home text
✅ **Industry standard**: Like Framer/WordPress/Webflow
✅ **Better organized**: Content grouped logically
✅ **Easier for owner**: No hunting through 360 translations
