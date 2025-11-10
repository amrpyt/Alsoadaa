# Testing Checklist - Sanity CMS Integration

## ✅ Automated Testing Completed

### Build & TypeScript
- ✅ Production build successful (`npm run build`)
- ✅ TypeScript compilation passes with no errors
- ✅ Bundle size: 502.33 kB (gzipped: 152.70 kB)
- ⚠️ Note: Main chunk is large (>500KB) - consider code splitting for optimization

### Dependencies & Configuration
- ✅ All Sanity packages installed (@sanity/client v6.29.1, @sanity/image-url v1.2.0)
- ✅ GROQ package installed (v3.99.0)
- ✅ Portable Text renderer installed (@portabletext/react v3.2.4)
- ✅ Environment variables configured in .env.local
- ✅ Vite configuration valid

### Accessibility (Code Review)
- ✅ Uses shadcn/ui components with built-in ARIA attributes
- ✅ 40+ aria-* attributes found across components
- ✅ Semantic HTML structure in place
- ✅ Form components have proper labels and validation

## 🔄 Manual Testing Required

### Cross-Browser Testing (Task 17.8)
Test the application in the following browsers:

#### Chrome/Edge (Chromium-based)
- [ ] Navigate to all pages (Home, Products, About, Contact, Calendar, Quote)
- [ ] Test language switching (Arabic, English, Russian)
- [ ] Test RTL layout in Arabic mode
- [ ] Test product filtering and search
- [ ] Test quote request form submission
- [ ] Test contact form submission
- [ ] Test image loading and optimization
- [ ] Check console for errors

#### Firefox
- [ ] Navigate to all pages
- [ ] Test language switching
- [ ] Test RTL layout
- [ ] Test forms and interactions
- [ ] Check console for errors

#### Safari (macOS/iOS)
- [ ] Navigate to all pages
- [ ] Test language switching
- [ ] Test RTL layout
- [ ] Test forms and interactions
- [ ] Check console for errors

#### Known Browser Compatibility
- ✅ Vite targets modern browsers (ES2020+)
- ✅ React 18 compatible with all modern browsers
- ✅ Sanity client supports all major browsers
- ✅ No polyfills needed for target browsers

### Mobile Responsiveness Testing (Task 17.9)

#### Viewport Sizes to Test
- [ ] Mobile Portrait (375x667 - iPhone SE)
- [ ] Mobile Landscape (667x375)
- [ ] Tablet Portrait (768x1024 - iPad)
- [ ] Tablet Landscape (1024x768)
- [ ] Desktop (1920x1080)

#### Features to Test on Mobile
- [ ] Navigation menu (hamburger/drawer)
- [ ] Language switcher
- [ ] Product cards layout
- [ ] Product detail pages
- [ ] Quote request form (3-step wizard)
- [ ] Contact form
- [ ] Calendar view
- [ ] Image loading and lazy loading
- [ ] Touch interactions
- [ ] RTL layout on mobile (Arabic)

#### Tools to Use
- Chrome DevTools Device Toolbar
- Firefox Responsive Design Mode
- Real devices (iOS/Android)
- BrowserStack or similar service

### Accessibility Testing (Task 17.10)

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Test focus indicators are visible
- [ ] Test keyboard shortcuts (if any)
- [ ] Test form navigation with Tab/Shift+Tab
- [ ] Test dropdown/select navigation with arrow keys
- [ ] Test modal/dialog keyboard controls (Escape to close)

#### Screen Reader Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Verify all images have alt text
- [ ] Verify form labels are announced
- [ ] Verify error messages are announced
- [ ] Verify page titles are descriptive

#### Color Contrast
- [ ] Run WAVE browser extension
- [ ] Check text contrast ratios (WCAG AA minimum: 4.5:1)
- [ ] Check interactive element contrast
- [ ] Test in high contrast mode

#### Other Accessibility Checks
- [ ] Verify heading hierarchy (h1, h2, h3, etc.)
- [ ] Test with zoom at 200%
- [ ] Test with reduced motion preference
- [ ] Verify no content is keyboard-trapped

## 🔧 Testing Tools & Commands

### Local Testing
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Browser DevTools
- **Chrome DevTools**: F12 or Ctrl+Shift+I
- **Firefox DevTools**: F12 or Ctrl+Shift+I
- **Safari Web Inspector**: Cmd+Option+I

### Accessibility Tools
- **WAVE**: https://wave.webaim.org/extension/
- **axe DevTools**: Browser extension
- **Lighthouse**: Built into Chrome DevTools
- **NVDA**: https://www.nvaccess.org/download/

### Performance Testing
- **Lighthouse**: Run in Chrome DevTools
- **WebPageTest**: https://www.webpagetest.org/
- **GTmetrix**: https://gtmetrix.com/

## 📋 Test Scenarios

### Scenario 1: New User Journey
1. Land on homepage
2. Switch language to English
3. Browse products
4. View product details
5. Submit quote request
6. Verify form submission in Sanity Studio

### Scenario 2: Content Editor Journey
1. Log into Sanity Studio
2. Create new product in Arabic
3. Use AI Assist to translate to English
4. Publish product
5. Verify product appears on website

### Scenario 3: RTL Layout Testing
1. Switch to Arabic language
2. Verify text alignment (right-aligned)
3. Verify navigation menu (right-to-left)
4. Verify forms (labels on right)
5. Verify product cards (image on right)

### Scenario 4: Error Handling
1. Disconnect network
2. Try to load products
3. Verify error message displays
4. Reconnect network
5. Verify retry mechanism works

## 🐛 Known Issues & Limitations

### Performance
- Main bundle is large (502KB) - consider code splitting
- Initial load shows loading state (client-side fetching)

### Browser Support
- Requires modern browsers with ES2020+ support
- No IE11 support (by design)

### Accessibility
- Some dynamic content may need ARIA live regions
- Consider adding skip navigation link

## ✅ Testing Sign-off

Once all manual tests are complete, sign off below:

- [ ] Cross-browser testing complete (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verified on multiple devices
- [ ] Accessibility testing passed (keyboard, screen reader, contrast)
- [ ] Performance acceptable (< 3s initial load on 3G)
- [ ] All critical user journeys tested
- [ ] No blocking bugs found

**Tested by**: _________________  
**Date**: _________________  
**Notes**: _________________
