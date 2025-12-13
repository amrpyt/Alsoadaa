# Change: Fix Seasonal Calendar Table Mobile UX Issues

## Why
The SeasonalCalendar product availability table has two critical mobile UX bugs:
1. **Overlay on swipe**: A visual overlay/shadow appears when horizontally swiping the table, blocking content
2. **Image flickering**: Product images disappear and reappear when the page loads on mobile devices

These issues degrade the user experience on mobile devices, which is a significant portion of the target audience browsing the seasonal calendar.

## What Changes
- **Fix sticky column overlay**: Remove or adjust the shadow effect on the sticky product column that creates a visual overlay during horizontal swipe gestures on mobile
- **Fix image loading stability**: Implement proper image loading state management to prevent flickering caused by React re-renders and lazy loading timing issues on mobile
- Add `will-change` CSS hints for smoother scrolling on mobile
- Use `decoding="async"` and proper image placeholder handling

## Impact
- Affected specs: `content-management` (SeasonalCalendar component display)
- Affected code:
  - `src/components/SeasonalCalendar.tsx` - Primary component requiring fixes
  - Possibly `src/lib/sanity.ts` - Image URL generation (if caching needed)

## User Stories
1. As a mobile user, I want to swipe the calendar table horizontally without seeing a blocking overlay
2. As a mobile user, I want to see product images immediately without them flickering in and out

## Success Criteria
- [ ] No visual overlay appears during horizontal table swipe on mobile
- [ ] Product images load smoothly without disappearing/reappearing
- [ ] Table scrolling feels smooth and native on mobile devices
- [ ] Desktop behavior remains unchanged
