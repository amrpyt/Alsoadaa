# Spec Delta: Content Management - Seasonal Calendar Mobile UX

## MODIFIED Requirements

### Requirement: Seasonal Calendar Display

The SeasonalCalendar component SHALL display product availability across all 12 months in a responsive table format. The product column SHALL remain fixed/sticky during horizontal scroll on all devices. The table SHALL provide a smooth, native scrolling experience on mobile devices without visual artifacts or overlays.

#### Scenario: Horizontal swipe on mobile without overlay
- **GIVEN** a user is viewing the seasonal calendar on a mobile device
- **WHEN** the user swipes horizontally to view more months
- **THEN** the table scrolls smoothly without any visible overlay, shadow artifacts, or content blocking

#### Scenario: Product images load without flickering
- **GIVEN** a user opens the seasonal calendar page on a mobile device
- **WHEN** the page loads and product data is fetched
- **THEN** product images SHALL appear once and remain visible without flickering, disappearing, or re-rendering

#### Scenario: Sticky column remains visible
- **GIVEN** a user is viewing the seasonal calendar
- **WHEN** the user scrolls horizontally
- **THEN** the product name column SHALL remain fixed/sticky on the start edge of the viewport

#### Scenario: Table renders correctly on desktop
- **GIVEN** a user is viewing the seasonal calendar on a desktop browser
- **WHEN** the page loads
- **THEN** the full table SHALL be displayed with all months visible (if viewport allows) and the product column SHALL have a subtle shadow indicator for scroll context
