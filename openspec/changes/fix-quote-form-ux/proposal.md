# Fix Quote Request Form UI/UX and Functionality

**Change ID:** `fix-quote-form-ux`  
**Status:** Proposed  
**Priority:** High  
**Owner:** Development Team

## Problem Statement

The Quote Request Form (`QuoteRequestForm.tsx`) has critical UI/UX and functionality issues that prevent users from successfully submitting quote requests:

### Critical Issues Identified

1. **Products Not Loading in Step 2** (BLOCKER)
   - Product selection step shows no product cards
   - Users cannot proceed past Step 2 without selecting products
   - No loading spinner visible, suggesting products array is empty after fetch
   - Possible causes: 
     - Sanity client error silently failing
     - Products array not being set in state
     - Conditional rendering hiding products incorrectly

2. **Poor Error Handling**
   - Errors during product fetch are logged to console but not shown to users
   - No retry mechanism when fetch fails
   - Users left on broken screen with no guidance

3. **Form State Not Persistent**
   - If user navigates away or refreshes, all entered data is lost
   - No localStorage or session storage backup
   - Poor UX for multi-step forms

4. **Inadequate Loading States**
   - Loading spinner only shows briefly during initial fetch
   - No indication when form is submitting
   - Users may click submit multiple times

5. **Validation Feedback Missing**
   - Next/Submit buttons disabled without explanation
   - Users don't know which fields need completion
   - No inline validation messages

6. **Success/Failure States Minimal**
   - Success message is basic
   - No confirmation number or next steps
   - Error messages are generic

7. **Incomplete Multi-Language Support**
   - Step labels hardcoded in English
   - Field labels not translatable
   - Error messages in English only

8. **Poor Accessibility**
   - No ARIA labels for screen readers
   - Form validation errors not announced
   - Keyboard navigation incomplete

## Proposed Solution

### Phase 1: Fix Critical Blocker (Products Not Loading)

**Root Cause Investigation:**
- Add comprehensive console logging to track fetch lifecycle
- Check if `allProductsQuery` is defined correctly
- Verify Sanity client is properly initialized
- Test if products state is being updated

**Immediate Fixes:**
1. Add error boundary around product fetch
2. Display error message when products fail to load
3. Add retry button for failed fetches
4. Show loading skeleton instead of empty space
5. Add fallback to localStorage cached products if fetch fails

### Phase 2: Improve Error Handling

1. **User-Visible Error States:**
   ```typescript
   - "Unable to load products. Please check your connection and try again."
   - Retry button with exponential backoff
   - Support contact information if retries fail
   ```

2. **Error Recovery:**
   - Auto-retry failed fetches (3 attempts)
   - Cache successful fetches in localStorage
   - Graceful degradation to cached data

### Phase 3: Form State Management

1. **Persist Form Data:**
   - Save to localStorage on every field change
   - Restore on component mount
   - Clear on successful submission
   - Add "Resume previous request?" prompt

2. **Progress Tracking:**
   - Visual indicator of form completion percentage
   - Save step number in state
   - Allow users to jump between completed steps

### Phase 4: Enhanced UX

1. **Loading States:**
   - Skeleton loaders for products
   - Spinner with percentage for submission
   - Disabled state styling for buttons
   - "Processing..." text on submit button

2. **Validation Feedback:**
   - Inline error messages below fields
   - Highlight missing required fields
   - Show field requirements on focus
   - Enable Next button with tooltip when invalid

3. **Success/Failure:**
   - Animated success confirmation
   - Reference number for quote request
   - Email confirmation sent message
   - Download PDF summary option
   - Better error messages with actionable advice

### Phase 5: Multi-Language Support

1. **Translate All UI Strings:**
   - Step titles
   - Field labels
   - Validation messages
   - Button text
   - Error messages
   - Success messages

2. **Use Translation Context:**
   ```typescript
   const { t } = useTranslation();
   <Label>{t('form.company_name')}</Label>
   ```

### Phase 6: Accessibility

1. **ARIA Support:**
   - `aria-label` on all form fields
   - `aria-describedby` for error messages
   - `aria-invalid` for failed validation
   - `aria-live` regions for dynamic updates

2. **Keyboard Navigation:**
   - Tab order follows visual flow
   - Enter key submits forms
   - Escape key closes modal
   - Arrow keys navigate steps

## Success Criteria

- [ ] Products load successfully in Step 2 (100% of page loads)
- [ ] Error messages visible and actionable
- [ ] Form data persists across page refreshes
- [ ] Loading states provide clear feedback
- [ ] Validation errors guide user to fix issues
- [ ] Form submits successfully with confirmation
- [ ] All text supports Arabic, English, Russian
- [ ] Form passes WCAG 2.1 AA accessibility standards
- [ ] < 2% form abandonment rate in analytics

## Testing Requirements

1. **Unit Tests:**
   - Product fetch with success/error states
   - Form validation logic
   - State persistence to localStorage
   - Multi-step navigation

2. **Integration Tests:**
   - End-to-end form submission
   - Error recovery flows
   - Multi-language switching

3. **User Testing:**
   - 5 users complete form in each language
   - Screen reader testing
   - Mobile device testing
   - Network throttling (slow 3G)

## Dependencies

- Existing Sanity CMS integration
- Translation system (i18next or similar)
- Form validation library (existing)
- Error boundary component

## Risks & Mitigation

**Risk:** Breaking existing form submissions  
**Mitigation:** Comprehensive regression testing, feature flag for new version

**Risk:** Performance impact from localStorage operations  
**Mitigation:** Debounce writes, use efficient serialization

**Risk:** Translation delays  
**Mitigation:** Ship English first, add translations incrementally

## Timeline Estimate

- Phase 1 (Critical Fix): 1 day
- Phase 2 (Error Handling): 1 day
- Phase 3 (State Management): 2 days
- Phase 4 (Enhanced UX): 2 days
- Phase 5 (Multi-Language): 1 day
- Phase 6 (Accessibility): 1 day
- Testing & QA: 2 days

**Total:** ~10 days

## Related Changes

- Relates to: `add-sanity-cms` (depends on working Sanity queries)
- Blocks: Production deployment (form is critical user path)
