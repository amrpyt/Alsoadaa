# content-localization Specification

## Purpose
TBD - created by archiving change add-sanity-localization. Update Purpose after archive.
## Requirements
### Requirement: Sanity Translation Schema

The system SHALL provide a Sanity document type for storing translations with key-value pairs.

**Fields**:
- `key`: Unique translation identifier (e.g., "hero.title")
- `language`: Language code (ar, en, ru)
- `value`: Translated text
- `category`: Organizational category
- `description`: Optional context

#### Scenario: Create New Translation

**Given** a content editor is in Sanity Studio  
**When** they create a new Site Translation document  
**And** they set key="header.welcome", language="en", value="Welcome"  
**And** they publish the document  
**Then** the translation is saved to Sanity  
**And** the website displays "Welcome" in the header when English is selected

#### Scenario: Update Existing Translation

**Given** a translation with key="button.submit" exists in Arabic  
**When** a content editor changes the value from "إرسال" to "أرسل الآن"  
**And** they publish the changes  
**Then** the website displays "أرسل الآن" on all submit buttons  
**And** the previous version is preserved in Sanity history

#### Scenario: Organize by Category

**Given** translations exist for navigation items  
**When** a content editor filters by category="navigation"  
**Then** only navigation-related translations are shown  
**And** translations are grouped logically in the Studio interface

### Requirement: Translation Fetching System

The system SHALL fetch translations from Sanity and provide them to React components.

#### Scenario: Fetch Translations on Load

**Given** a user visits the website  
**When** the page loads with Arabic selected  
**And** Sanity contains Arabic translations  
**Then** the useSanityTranslations hook fetches all Arabic translations  
**And** translations are merged with local fallbacks  
**And** components receive the merged translations

#### Scenario: Handle Fetch Error

**Given** Sanity API is unavailable  
**When** the useSanityTranslations hook attempts to fetch  
**And** the request fails  
**Then** the hook returns local translations from translations.ts  
**And** an error is logged to console  
**And** the website continues to function normally

#### Scenario: Switch Language

**Given** the website is displaying English translations  
**When** the user switches to Russian  
**Then** the hook fetches Russian translations from Sanity  
**And** all UI text updates to Russian  
**And** the fetch completes in less than 200ms

### Requirement: Translation Key Convention

The system SHALL use dot notation in Sanity and camelCase in code for translation keys.

#### Scenario: Convert Dot Notation Key

**Given** a translation with key="hero.title" exists in Sanity  
**When** the useSanityTranslations hook fetches translations  
**Then** the key is converted to "heroTitle"  
**And** components can access it via t.heroTitle  
**And** the original Sanity key remains "hero.title"

#### Scenario: Multi-Level Key Conversion

**Given** a translation with key="form.submit.button"  
**When** the hook converts the key  
**Then** it becomes "formSubmitButton" in code  
**And** maintains consistency with TypeScript naming conventions

### Requirement: Graceful Fallback

The system SHALL fall back to local translations when Sanity is unavailable.

#### Scenario: Sanity Downtime

**Given** Sanity API is down  
**When** a user visits the website  
**Then** local translations from translations.ts are used immediately  
**And** no loading delay occurs  
**And** all UI text displays correctly

#### Scenario: Network Timeout

**Given** Sanity fetch times out after 10 seconds  
**When** the timeout occurs  
**Then** the system switches to local translations  
**And** the user experience is not affected  
**And** subsequent renders use cached local translations

### Requirement: AI-Assisted Translation

The system SHALL support AI-powered translation through Sanity AI Assist.

#### Scenario: Auto-Translate to New Language

**Given** a translation exists in English  
**When** a content editor clicks "Translate" in Sanity Studio  
**And** selects Russian as the target language  
**Then** AI Assist generates a Russian translation  
**And** the editor can review and adjust before publishing  
**And** the translated document is created with language="ru"

#### Scenario: Translation Suggestion Quality

**Given** an English translation "Contact our sales team"  
**When** AI Assist translates to Arabic  
**Then** the suggestion is contextually appropriate  
**And** the editor can edit the suggestion  
**And** the final translation preserves meaning

### Requirement: Translation Migration

The system SHALL provide tools to migrate existing translations to Sanity.

#### Scenario: Import from Code

**Given** 471 translations exist in translations.ts  
**When** the migration script runs with npm run import-translations  
**Then** all translations are created in Sanity  
**And** each translation is categorized correctly  
**And** the import completes in less than 5 minutes

#### Scenario: Idempotent Import

**Given** translations already exist in Sanity  
**When** the migration script runs again  
**Then** existing translations are updated, not duplicated  
**And** manual edits in Sanity are preserved  
**And** only changed translations are modified

#### Scenario: Category Assignment

**Given** a translation key="nav.products" from code  
**When** the migration script processes it  
**Then** the category is set to "navigation"  
**And** related keys are grouped in the same category  
**And** the categorization logic is consistent

### Requirement: Loading State Management

The system SHALL provide loading states during translation fetching.

#### Scenario: Show Loading Indicator

**Given** translations are being fetched from Sanity  
**When** a component uses the useLanguage hook  
**Then** loading state is available via context  
**And** components can show a loading indicator  
**And** loading becomes false when fetch completes

#### Scenario: Immediate Fallback Display

**Given** Sanity fetch is in progress  
**When** 50ms have elapsed  
**Then** local translations are displayed  
**And** the loading state remains true  
**And** Sanity translations replace them when loaded

### Requirement: Performance Optimization

The system SHALL maintain fast translation load times.

#### Scenario: Initial Load Performance

**Given** a user visits the website for the first time  
**When** translations are fetched from Sanity  
**Then** the fetch completes in less than 100ms  
**And** the total page load time increases by less than 50ms  
**And** local fallback is available synchronously

#### Scenario: Language Switch Performance

**Given** the user has Arabic loaded  
**When** they switch to English  
**Then** English translations load in less than 200ms  
**And** the UI remains responsive during fetch  
**And** fallback English text displays immediately

### Requirement: Error Handling and Logging

The system SHALL log errors clearly for debugging.

#### Scenario: Log Fetch Failure

**Given** Sanity API returns a 500 error  
**When** the fetch fails  
**Then** an error is logged to console with details  
**And** the fallback mechanism activates  
**And** the error includes the HTTP status code

#### Scenario: Log Key Conversion Issues

**Given** a Sanity translation has an invalid key format  
**When** the key conversion runs  
**Then** the invalid key is logged as a warning  
**And** the translation is skipped  
**And** other translations continue to load

### Requirement: Complete Translation Coverage

The system SHALL ensure all user-visible text is localized for all supported languages (English, Arabic, Russian).

#### Scenario: Verify Arabic Completeness
- **WHEN** the user selects Arabic
- **THEN** all UI elements (buttons, labels, descriptions) are displayed in Arabic
- **AND** no English text is visible (strict isolation)

#### Scenario: Verify Russian Completeness
- **WHEN** the user selects Russian
- **THEN** all UI elements are displayed in Russian
- **AND** no English text is visible

