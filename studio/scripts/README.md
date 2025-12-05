# CMS Migration Scripts

Scripts for populating Sanity CMS with production-ready data for Al Soadaa agricultural export website.

## Prerequisites

1. Ensure you have the Sanity project credentials in `.env.local`:
   ```
   VITE_SANITY_PROJECT_ID=your-project-id
   VITE_SANITY_DATASET=production
   VITE_SANITY_TOKEN=your-write-token
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

### Individual Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Products | `npx ts-node --esm studio/scripts/populate-products.ts` | 10+ products with AR/EN/RU content |
| Services | `npx ts-node --esm studio/scripts/populate-services.ts` | 6 core services |
| Pages | `npx ts-node --esm studio/scripts/populate-pages.ts` | 6 essential pages |
| Translations | `npx ts-node --esm studio/scripts/populate-translations.ts` | 80+ UI translations |
| Calendar | `npx ts-node --esm studio/scripts/populate-calendar.ts` | Seasonal availability events |

### Run All Scripts

```bash
npx ts-node --esm studio/scripts/populate-all.ts
```

## Script Details

### populate-products.ts
Populates `productCentralized` with production data:
- Citrus: Navel Orange, Valencia Orange, Blood Orange, Grapefruit
- Lemons: Egyptian Lemons
- Grapes: Flame Red, Thompson Green
- Berries: Pomegranates, Strawberries
- Vegetables: Garlic, Onions

Each product includes:
- Titles in AR/EN/RU
- Descriptions in AR/EN/RU
- SEO metadata in AR/EN/RU
- Monthly availability data
- Packaging, sizes, storage, shelf life
- Certifications

### populate-services.ts
Populates `serviceCentralized` with 6 services:
1. Sorting & Grading
2. Packing & Packaging
3. Cold Chain
4. Export & Shipping
5. Quality Assurance
6. Processing & Treatment

### populate-pages.ts
Populates `pageCentralized` with essential pages:
- Home, About, Products, Services, Contact, Calendar

### populate-translations.ts
Populates `siteTranslationCentralized` with UI translations:
- Navigation (9 keys)
- Hero section (4 keys)
- Products section (6 keys)
- Forms (10 keys)
- Contact (6 keys)
- About (5 keys)
- Common (6 keys)
- Calendar (4 keys)
- Categories (5 keys)
- Seasons (4 keys)
- Months (12 keys)
- Footer (4 keys)
- Trust indicators (4 keys)
- CTA (2 keys)

### populate-calendar.ts
Populates `calendarEventCentralized` with seasonal availability:
- Dynamically fetches products from Sanity
- Creates events for available months
- Marks peak season months with special status
- Adds localized notes for peak seasons

## Data Structure

All scripts use the centralized schema pattern where translations for all languages are stored in a single document:
- `titleAr`, `titleEn`, `titleRu` - Title in each language
- `descriptionAr`, `descriptionEn`, `descriptionRu` - Description in each language
- `seoAr`, `seoEn`, `seoRu` - SEO metadata in each language

## Re-running Scripts

Scripts are idempotent - they can be run multiple times safely:
- Existing documents with matching `_id` are updated
- New documents are created
- No duplicates are created

## Verification

After running scripts, verify the data in Sanity Studio:
- Open https://alsoadaa.sanity.studio/
- Check each content type has the expected documents
- Verify translations appear in all three languages
