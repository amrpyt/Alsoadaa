## MODIFIED Requirements
### Requirement: Sanity Studio Configuration
The system SHALL provide a Sanity Studio for content management with singleton access to key pages.

#### Scenario: Access Home Page Singleton
- **WHEN** authorized user navigates to "🏠 Home Page" in the Sanity Studio sidebar
- **THEN** the existing Home page document (`page-home`) opens directly
- **AND** all Home-specific content groups (Hero, Trust Strip, Why Choose Us, Testimonials, CTA) are visible
- **AND** the document is not duplicated in "Other Pages"

#### Scenario: Access About Page Singleton
- **WHEN** authorized user navigates to "ℹ️ About Page" in the Sanity Studio sidebar
- **THEN** the existing About page document opens directly
- **AND** the About-specific content groups are visible
- **AND** the document is not duplicated in "Other Pages"

#### Scenario: Filter Other Pages
- **WHEN** user navigates to "📄 Other Pages" in the Sanity Studio sidebar
- **THEN** only pages that are NOT Home or About are displayed
- **AND** singleton pages are excluded from the list
