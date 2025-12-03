# Change: Populate CMS Centralized Schemas with Production Data

## Why
The new centralized CMS schemas (`productCentralized`, `serviceCentralized`, `pageCentralized`, `siteTranslationCentralized`, `calendarEventCentralized`) have been created but contain no data. The website needs production-ready content in all three languages (Arabic, English, Russian) to function properly.

## What Changes
- Create migration script to populate `productCentralized` with 10+ products (citrus, vegetables, grapes)
- Create migration script to populate `serviceCentralized` with 4 core services (Sorting, Packing, Exporting, Processing)
- Create migration script to populate `pageCentralized` with key pages (Home, About, Contact, Products, Services)
- Create seed data for `siteTranslationCentralized` with essential UI translations
- Update `calendarEventCentralized` with product availability data

## Impact
- Affected specs: `content-management`, `content-localization`
- Affected code: 
  - `studio/scripts/` - New migration scripts
  - `studio/schemaTypes/` - Schema files (no changes, just data population)
- Dependencies: Requires Sanity CLI and project credentials
