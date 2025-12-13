# Change: Redesign Seasonal Calendar for Premium UX

## Why
The current Seasonal Calendar uses a basic table grid with check/cross icons. While functional, this design:
- **Lacks visual impact**: It looks like a spreadsheet rather than a modern e-commerce feature.
- **Is hard to scan**: Users have to hunt for individual checkmarks to understand season duration.
- **Suffers on mobile**: Large tables are inherently difficult to navigate on small screens.

"Redesigning" for better UI/UX requires shifting from a "Data Grid" to a "Visual Timeline" approach.

## What Changes
1.  **Visual Timeline Transformation**:
    -   Replace the 12-column grid with a **linear timeline visualization**.
    -   Available months will be represented by connected colored bars (Gantt-style) rather than individual icons.
    -   This allows users to instantly perceive "Season Duration" (e.g., "Available Spring to Summer").

2.  **Premium Aesthetics**:
    -   Implement **Glassmorphism** for sticky headers.
    -   Use **Smooth Gradient Pills** for the month selector.
    -   Add **Micro-animations** for row interactions and month switching.

3.  **Mobile-First Adaptations**:
    -   Primary Mobile View: **"Current Month" Cards**. Focusing on "What can I busy *now*?" is the primary mobile use case.
    -   Timeline View: A condensed, horizontally scrollable timeline for checking specific products.

## Impact
- **Affected Specs**: `content-management` (Seasonal Calendar)
- **Affected Code**: `src/components/SeasonalCalendar.tsx` (Major refactor/rewrite)

## User Stories
- As a user, I want to scan a product list and instantly see its seasonal availability as a continuous bar.
- As a mobile user, I want a beautiful, swipe-able interface to see what is in season right now.
- As a stakeholder, I want the calendar to look "Premium" and reflect high-quality brand aesthetics.

## Success Criteria
- [ ] Table grid replaced with "Timeline/Bar" visualization.
- [ ] UI incorporates glassmorphism and modern shadows.
- [ ] Mobile view is optimized for touch and readability (no horizontal scroll struggle).
- [ ] Animations are smooth (60fps) and enhance the experience.
