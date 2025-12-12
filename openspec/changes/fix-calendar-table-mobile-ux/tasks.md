# Tasks: Fix Seasonal Calendar Table Mobile UX

## Summary
| Phase | Tasks | Status |
|-------|-------|--------|
| 1. Fix Overlay Issue | 3 | ⬜ Not Started |
| 2. Fix Image Flickering | 4 | ⬜ Not Started |
| 3. Testing & Validation | 3 | ⬜ Not Started |

---

## Phase 1: Fix Overlay Issue on Swipe 🎯

Fix the visual overlay that appears during horizontal swipe gestures.

- [ ] 1.1 Remove the shadow effect from the sticky product column
  - File: `src/components/SeasonalCalendar.tsx`
  - Current: `shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]`
  - Change: Remove shadow or apply only on non-touch devices using media queries

- [ ] 1.2 Add `will-change: transform` CSS hint for smoother scrolling
  - File: `src/components/SeasonalCalendar.tsx`
  - Apply to the scrollable container for GPU-accelerated scrolling

- [ ] 1.3 Add `-webkit-overflow-scrolling: touch` for smooth iOS swipe
  - File: `src/components/SeasonalCalendar.tsx`
  - Ensure native momentum scrolling on iOS devices

---

## Phase 2: Fix Image Flickering Issue 🖼️

Prevent product images from disappearing and reappearing on mobile.

- [ ] 2.1 Add image loading state management
  - File: `src/components/SeasonalCalendar.tsx`
  - Implement loading placeholder to prevent layout shift

- [ ] 2.2 Add `decoding="async"` attribute to images
  - File: `src/components/SeasonalCalendar.tsx`
  - Allows browser to decode images asynchronously

- [ ] 2.3 Preload product images on fetch completion
  - File: `src/components/SeasonalCalendar.tsx`
  - Use `Image` constructor to preload images before render

- [ ] 2.4 Remove `loading="lazy"` for table images
  - File: `src/components/SeasonalCalendar.tsx`
  - Table images are critical and should load immediately

---

## Phase 3: Testing & Validation ✅

- [ ] 3.1 Test horizontal swipe on mobile emulator (Chrome DevTools)
  - Verify no overlay appears during swipe
  - Test both iOS and Android viewports

- [ ] 3.2 Test image loading on mobile
  - Verify images don't flicker on page load
  - Test with slow network throttling

- [ ] 3.3 Verify desktop behavior unchanged
  - Confirm table still functions correctly on desktop
  - Check sticky column behavior on scroll

---

## Dependencies
- None (self-contained frontend fix)

## Notes
- Changes are isolated to `SeasonalCalendar.tsx`
- No breaking changes expected
- Mobile-specific CSS uses media queries to avoid affecting desktop
