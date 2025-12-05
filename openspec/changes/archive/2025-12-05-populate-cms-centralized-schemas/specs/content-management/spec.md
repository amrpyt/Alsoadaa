## ADDED Requirements

### Requirement: CMS Data Population Scripts
The system SHALL provide migration scripts to populate all centralized CMS schemas with production-ready data.

#### Scenario: Populate products
- **WHEN** `populate-products.ts` script is executed
- **THEN** 10+ products are created in `productCentralized` collection
- **AND** each product includes titles in AR/EN/RU
- **AND** each product includes descriptions, specifications, and availability data
- **AND** each product includes SEO metadata for all languages

#### Scenario: Populate services
- **WHEN** `populate-services.ts` script is executed
- **THEN** 4 core services (Sorting, Packing, Exporting, Processing) are created
- **AND** each service includes names and descriptions in AR/EN/RU
- **AND** each service includes a features list in all languages

#### Scenario: Populate pages
- **WHEN** `populate-pages.ts` script is executed
- **THEN** essential pages (Home, About, Contact, Products, Services) are created
- **AND** each page includes content and SEO metadata in AR/EN/RU

#### Scenario: Populate translations
- **WHEN** `populate-translations.ts` script is executed
- **THEN** UI translations are migrated from static translations file
- **AND** translations are categorized (navigation, hero, products, etc.)
- **AND** all three languages (AR/EN/RU) are populated

### Requirement: Calendar Event Population
The system SHALL populate calendar events with product availability data.

#### Scenario: Link calendar to products
- **WHEN** `populate-calendar.ts` script is executed
- **THEN** calendar events reference existing productCentralized documents
- **AND** each event includes month, year, and availability status
- **AND** each event includes localized notes (AR/EN/RU)

### Requirement: Combined Migration Script
The system SHALL provide a single script to run all migrations in correct order.

#### Scenario: Run all migrations
- **WHEN** `populate-all.ts` script is executed
- **THEN** products are populated first
- **AND** services, pages, and translations are populated
- **AND** calendar events are populated last (after products exist)
- **AND** script reports success/failure for each migration
