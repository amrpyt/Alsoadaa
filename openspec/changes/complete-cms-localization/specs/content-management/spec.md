# content-management Specification

## ADDED Requirements

### Requirement: Featured Products Fetching

The system SHALL fetch featured products for the Home Page from Sanity.

#### Scenario: Fetch featured products
- **WHEN** the home page loads
- **THEN** a GROQ query fetches products marked as "featured" or a specific set of products
- **AND** includes image, title, category, and season
- **AND** limits the result to 4 items
