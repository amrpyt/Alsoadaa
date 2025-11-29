## ADDED Requirements

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
