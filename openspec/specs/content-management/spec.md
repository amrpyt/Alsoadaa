# content-management Specification

## Purpose
TBD - created by archiving change add-sanity-cms. Update Purpose after archive.
## Requirements
### Requirement: Sanity Client Configuration
The system SHALL provide a configured Sanity client for fetching content from the Sanity.io API.

#### Scenario: Client initialization with environment variables
- **WHEN** the application initializes
- **THEN** a Sanity client is created with project ID, dataset, and API version from environment variables
- **AND** the client is configured to use CDN for production environments

#### Scenario: Client error handling
- **WHEN** Sanity client configuration is missing or invalid
- **THEN** the application logs a clear error message
- **AND** provides fallback behavior or error boundary

### Requirement: Product Content Fetching
The system SHALL fetch product data from Sanity instead of using hardcoded mock data.

#### Scenario: Fetch all products
- **WHEN** the products page loads
- **THEN** a GROQ query fetches all published products with their fields (name, description, category, season, image, certifications, availability, specifications, gallery)
- **AND** products are sorted by category and name
- **AND** loading state is shown while fetching

#### Scenario: Fetch single product by slug
- **WHEN** a product detail page is requested with a slug
- **THEN** a GROQ query fetches the product matching the slug
- **AND** returns 404 if product is not found

#### Scenario: Filter products by category
- **WHEN** user filters products by category
- **THEN** a GROQ query fetches only products matching the selected category
- **AND** results update without full page reload

#### Scenario: Filter products by season
- **WHEN** user filters products by season status
- **THEN** a GROQ query fetches only products matching the selected season
- **AND** results update dynamically

### Requirement: Page Content Fetching
The system SHALL fetch page content (About, Services, Contact) from Sanity.

#### Scenario: Fetch page by slug
- **WHEN** a page route is accessed
- **THEN** a GROQ query fetches the page content by slug
- **AND** renders Portable Text content using React components
- **AND** applies SEO metadata from page data

#### Scenario: Render rich text content
- **WHEN** page content includes Portable Text
- **THEN** the content is rendered with proper formatting (headings, paragraphs, lists, links, images)
- **AND** custom blocks are rendered with appropriate React components

### Requirement: Service Content Fetching
The system SHALL fetch service information from Sanity.

#### Scenario: Fetch all services
- **WHEN** the services page loads
- **THEN** a GROQ query fetches all published services
- **AND** services are sorted by the order field
- **AND** each service includes name, description, icon, and features

### Requirement: Calendar Event Fetching
The system SHALL fetch seasonal calendar events from Sanity.

#### Scenario: Fetch calendar events for all months
- **WHEN** the calendar page loads
- **THEN** a GROQ query fetches all calendar events with product references
- **AND** events are grouped by month
- **AND** product details are populated through references

#### Scenario: Fetch events for specific month
- **WHEN** user selects a specific month
- **THEN** a GROQ query fetches only events for that month
- **AND** includes related product information

### Requirement: Image Optimization
The system SHALL use Sanity's Image CDN for optimized image delivery.

#### Scenario: Generate optimized image URLs
- **WHEN** rendering product or page images
- **THEN** image URLs are generated using Sanity's image URL builder
- **AND** images are automatically converted to WebP/AVIF format
- **AND** images are resized to appropriate dimensions
- **AND** images include srcset for responsive loading

#### Scenario: Lazy load images
- **WHEN** images are below the fold
- **THEN** images are lazy loaded to improve initial page load
- **AND** placeholder blur is shown while loading

### Requirement: Form Submission Storage
The system SHALL store contact and quote form submissions in Sanity.

#### Scenario: Submit contact form
- **WHEN** user submits a valid contact form
- **THEN** a new formSubmission document is created in Sanity with type "contact"
- **AND** includes name, email, phone, message, and timestamp
- **AND** submission status is set to "new"
- **AND** success toast notification is shown to user

#### Scenario: Submit quote request form
- **WHEN** user submits a valid quote request form
- **THEN** a new formSubmission document is created in Sanity with type "quote"
- **AND** includes name, email, phone, company, requirements, and timestamp
- **AND** submission status is set to "new"
- **AND** success toast notification is shown to user

#### Scenario: Form submission error handling
- **WHEN** form submission to Sanity fails
- **THEN** an error toast notification is shown to user
- **AND** form data is preserved for retry
- **AND** error is logged for debugging

### Requirement: Content Preview Mode
The system SHALL support previewing draft content before publishing.

#### Scenario: Enable preview mode
- **WHEN** preview mode is enabled via URL parameter or toggle
- **THEN** Sanity client fetches draft content instead of published content
- **AND** draft indicator is shown in the UI

#### Scenario: Preview draft products
- **WHEN** viewing products in preview mode
- **THEN** both published and draft products are visible
- **AND** draft products are visually distinguished

### Requirement: TypeScript Type Safety
The system SHALL provide TypeScript types for all Sanity content.

#### Scenario: Use generated types for products
- **WHEN** working with product data in code
- **THEN** TypeScript types are available for all product fields
- **AND** autocomplete works for nested properties
- **AND** type errors are caught at compile time

#### Scenario: Use generated types for GROQ queries
- **WHEN** writing GROQ queries
- **THEN** query results are typed based on projection
- **AND** type safety is maintained throughout the data flow

### Requirement: Error Handling and Loading States
The system SHALL provide clear feedback during content loading and errors.

#### Scenario: Show loading state while fetching
- **WHEN** content is being fetched from Sanity
- **THEN** skeleton loaders or loading indicators are shown
- **AND** UI remains responsive

#### Scenario: Handle network errors
- **WHEN** Sanity API is unreachable
- **THEN** a user-friendly error message is displayed
- **AND** retry option is provided
- **AND** error details are logged for debugging

#### Scenario: Handle missing content
- **WHEN** requested content does not exist in Sanity
- **THEN** a 404 page or appropriate fallback is shown
- **AND** user is provided with navigation options

### Requirement: Sanity Studio Configuration
The system SHALL provide a Sanity Studio for content management.

#### Scenario: Access Sanity Studio
- **WHEN** authorized user navigates to Studio URL
- **THEN** Sanity Studio interface loads
- **AND** user can authenticate with Sanity credentials
- **AND** all content types are available for editing

#### Scenario: Edit product in Studio
- **WHEN** user edits a product in Sanity Studio
- **THEN** all product fields are editable with appropriate input types
- **AND** validation rules are enforced (required fields, slug uniqueness)
- **AND** image uploads are supported with preview
- **AND** changes can be saved as draft or published

#### Scenario: Manage form submissions in Studio
- **WHEN** user views form submissions in Sanity Studio
- **THEN** all submissions are listed with filtering and sorting
- **AND** submission status can be updated (new, reviewed, responded)
- **AND** submission details are readable in a structured format

### Requirement: Environment Configuration
The system SHALL use environment variables for Sanity configuration.

#### Scenario: Configure Sanity project in development
- **WHEN** running the application in development mode
- **THEN** Sanity configuration is read from `.env.local` file
- **AND** includes project ID, dataset, and API version
- **AND** CDN usage is configurable

#### Scenario: Configure Sanity project in production
- **WHEN** deploying to production
- **THEN** Sanity configuration is read from environment variables
- **AND** production dataset is used
- **AND** CDN is enabled for optimal performance

### Requirement: Content Migration
The system SHALL support migrating existing mock data to Sanity.

#### Scenario: Import products from mock data
- **WHEN** running the migration script
- **THEN** all products from mockData.ts are imported to Sanity
- **AND** product fields are mapped correctly
- **AND** images are uploaded to Sanity assets
- **AND** import progress is logged

#### Scenario: Verify migrated content
- **WHEN** migration is complete
- **THEN** all products are accessible via GROQ queries
- **AND** product count matches mock data
- **AND** all fields are populated correctly

### Requirement: Featured Products Fetching

The system SHALL fetch featured products for the Home Page from Sanity.

#### Scenario: Fetch featured products
- **WHEN** the home page loads
- **THEN** a GROQ query fetches products marked as "featured" or a specific set of products
- **AND** includes image, title, category, and season
- **AND** limits the result to 4 items

### Requirement: Product Data Integrity Validation
The system SHALL validate product data to ensure consistency across translations.

#### Scenario: Prevent duplicate products in same language
- **WHEN** a user creates a new product in Sanity Studio
- **AND** a product with the same title and language already exists
- **THEN** the system shows a validation warning
- **AND** suggests linking to existing product instead

#### Scenario: Require originalDocument for translations
- **WHEN** a user creates a product with language other than Arabic
- **THEN** the system requires selecting an originalDocument reference
- **AND** the reference must point to an Arabic product

#### Scenario: Validate originalDocument reference integrity
- **WHEN** a product references an originalDocument
- **THEN** the referenced document must exist
- **AND** the referenced document must be in Arabic
- **AND** the referenced document must be of the same type

### Requirement: Translation Audit Tools
The system SHALL provide tools to audit and fix translation data.

#### Scenario: Run translation audit
- **WHEN** an administrator runs the audit script
- **THEN** the system analyzes all products and translations
- **AND** reports missing translations (AR products without EN/RU)
- **AND** reports broken references (invalid originalDocument)
- **AND** reports duplicates (same title, multiple documents)

#### Scenario: Fix missing translations
- **WHEN** an administrator runs the fix script for missing translations
- **AND** confirms the operation
- **THEN** the system creates translation documents from Arabic originals
- **AND** sets correct originalDocument references
- **AND** logs all created documents

#### Scenario: Fix broken references
- **WHEN** an administrator runs the fix script for broken references
- **THEN** the system identifies the correct Arabic original
- **AND** updates originalDocument to point to it
- **AND** logs all fixed references

### Requirement: Product Fallback Behavior
The system SHALL gracefully handle missing translations.

#### Scenario: Display fallback when translation missing
- **WHEN** a user views a product in a language
- **AND** no translation exists for that language
- **THEN** the system displays the Arabic version
- **AND** shows a notice that translation is unavailable
- **AND** does not throw an error

#### Scenario: Calendar events use source product
- **WHEN** calendar events reference products
- **THEN** references should point to Arabic products (source of truth)
- **AND** the frontend resolves the correct language at display time

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

