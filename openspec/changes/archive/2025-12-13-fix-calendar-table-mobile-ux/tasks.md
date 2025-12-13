# Tasks: Fix Seasonal Calendar Table Mobile UX

## Summary
| Phase | Tasks | Status |
|-------|-------|--------|
| 1. Fix Overlay Issue | 3 | ✅ Complete |
| 2. Fix Image Flickering | 4 | ✅ Complete |
| 3. Testing & Validation | 3 | ⏳ Manual Testing Required |

---

## Phase 1: Fix Overlay Issue on Swipe 🎯

Fix the visual overlay that appears during horizontal swipe gestures.

- [x] 1.1 Remove the shadow effect from the sticky product column
  - File: `src/components/SeasonalCalendar.tsx`
  - Current: `shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]`
  - Change: ✅ Applied `@media (hover: hover) and (pointer: fine)` - shadow only shows on desktop with mouse

- [x] 1.2 Add `will-change: transform` CSS hint for smoother scrolling
  - File: `src/components/SeasonalCalendar.tsx`
  - ✅ Added `willChange: 'scroll-position'` to scroll container

- [x] 1.3 Add `-webkit-overflow-scrolling: touch` for smooth iOS swipe
  - File: `src/components/SeasonalCalendar.tsx`
  - ✅ Added `WebkitOverflowScrolling: 'touch'` for iOS momentum scrolling

---

## Phase 2: Fix Image Flickering Issue 🖼️

Prevent product images from disappearing and reappearing on mobile.

- [x] 2.1 Add image loading state management
  - File: `src/components/SeasonalCalendar.tsx`
  - ✅ Created `ProductImage` component with loading/error state management and placeholder

- [x] 2.2 Add `decoding="async"` attribute to images
  - File: `src/components/SeasonalCalendar.tsx`
  - ✅ Added to all images in the component

- [x] 2.3 Preload product images on fetch completion
  - File: `src/components/SeasonalCalendar.tsx`
  - ✅ Added image preloading in useEffect after product data fetch

- [x] 2.4 Remove `loading="lazy"` for table images
  - File: `src/components/SeasonalCalendar.tsx`
  - ✅ Removed lazy loading and replaced with async decoding

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

## Implementation Summary
### Changes Made:
1. **New `ProductImage` component** - Handles image loading with:
   - useMemo for stable image URLs
   - Loading state with placeholder animation
   - Error handling with fallback emoji
   - `decoding="async"` for smooth rendering

2. **CSS Media Query for Shadow** - Shadow only on hover-capable devices:
   ```css
   @media (hover: hover) and (pointer: fine) { /* Desktop with mouse */ }
   @media (hover: none), (pointer: coarse) { /* Touch devices */ }
   ```

3. **Mobile Scroll Optimizations**:
   - `WebkitOverflowScrolling: 'touch'` for iOS momentum
   - `willChange: 'scroll-position'` for GPU acceleration

