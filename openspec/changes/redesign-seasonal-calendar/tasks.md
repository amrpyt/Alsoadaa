# Tasks: Redesign Seasonal Calendar

## Summary
| Phase | Tasks | Status |
|-------|-------|--------|
| 1. Architecture & Styles | 3 | ✅ Completed |
| 2. Timeline Component | 3 | ✅ Completed |
| 3. Mobile Optimization | 3 | ✅ Completed |
| 4. Polish & Animation | 2 | ✅ Completed |

---

## Phase 1: Architecture & Styles 🎨
Establishing the new visual language.

- [x] 1.1 Create new layout structure
  - File: `src/components/SeasonalCalendar.tsx`
  - Implement a container with a toggler (Timeline vs Card View).
  - Add glassmorphism classes to sticky headers using Tailwind utility classes (e.g., `backdrop-blur-md`, `bg-white/80`).

- [x] 1.2 Redesign Month Selector
  - File: `src/components/SeasonalCalendar.tsx`
  - Replace current buttons with a scrollable "Pill" carousel.
  - Add active state animations (`layoutId` framer-motion equivalent or CSS transitions).

- [x] 1.3 Refine Product Card Styles
  - File: `src/components/SeasonalCalendar.tsx`
  - Update the "Month View" cards to be more modern (cleaner typography, better image aspect ratio, subtle shadows).

---

## Phase 2: Timeline Visualization (Desktop) 📊
Turning the grid into a timeline.

- [x] 2.1 Implement "Season Bar" Component
  - File: `src/components/SeasonalCalendar.tsx`
  - Create a sub-component that renders a 12-segment bar.
  - Logic: If month `i` and `i+1` are available, render a connected bar. If gap, render empty space.
  - Visuals: Use brand gradient for the "active" segments.

- [x] 2.2 Update Table/Grid Layout
  - File: `src/components/SeasonalCalendar.tsx`
  - Replace the old `<table>` (if possible) or heavily style it.
  - Ensure the "Product Info" column is sticky with the new glassmorphism style.
  - Align the "Season Bar" perfectly with the 12 month headers.

- [x] 2.3 Add Tooltips/Hover Effects
  - File: `src/components/SeasonalCalendar.tsx`
  - Hovering a product highlights the row and shows exact months in a tooltip or legend update.

---

## Phase 3: Mobile Optimization 📱
Making it work beautifully on phones.

- [x] 3.1 Implement Mobile Card View (Default)
  - File: `src/components/SeasonalCalendar.tsx`
  - Default the mobile view to "Month" mode (showing current month's products).
  - Ensure images are large and tappable.

- [x] 3.2 Design Mobile Timeline
  - File: `src/components/SeasonalCalendar.tsx`
  - A simplified version of the timeline for mobile.
  - Alternatively, keep the horizontal scroll but make the product column stickier and the timeline cleaner (mini-bars).

- [x] 3.3 Optimize Touch Interactions
  - Ensure horizontal swipes on the timeline are native and smooth (using the previous fixes: `will-change`, `overflow-scrolling`).

---

## Phase 4: Polish & Animation ✨

- [x] 4.1 Add Entrance Animations
  - Use `framer-motion` or CSS animations to fade in items when switching views.

- [x] 4.2 Fix Image Loading (Carry over previous fix)
  - Ensure the `ProductImage` component (from previous fix) is used in the new design to prevent flickering.

---

## Dependencies
- `lucide-react` (icons)
- Tailwind CSS (styling)
