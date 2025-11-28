# Proposal: Complete CMS Integration and Localization

**Change ID:** `complete-cms-localization`
**Status:** Proposed
**Priority:** High
**Owner:** Development Team

## Problem Statement

The website currently has a mix of hardcoded content and Sanity-fetched content.
- `HomePage` uses hardcoded featured products.
- `ProductDetailPage` and `CalendarPage` contain hardcoded English text, breaking the multi-language experience.
- Some translations are missing or incomplete, leading to mixed language UI.
- The user requires strict language isolation (no English fallback visible).

## Proposed Solution

### 1. Complete CMS Integration
- Migrate `HomePage` featured products to fetch from Sanity.
- Ensure `SeasonalCalendar` fetches data from Sanity (it currently does, but needs verification of all fields).
- Verify all product data flows from Sanity.

### 2. Comprehensive Localization
- Extract all hardcoded strings from `ProductDetailPage`, `CalendarPage`, `HomePage`, and `SeasonalCalendar` into `translations.ts`.
- Add corresponding keys to `translations.ts` for `en`, `ar`, and `ru`.
- Ensure all keys are populated with correct translations.
- Update `LanguageContext` or usage to ensure strict language adherence.

### 3. Strict Language Isolation
- Verify that no hardcoded English strings remain in the UI components.
- Ensure `useSanityTranslations` handles loading states gracefully.

## Scope

- **Components**: `HomePage`, `ProductDetailPage`, `CalendarPage`, `SeasonalCalendar`.
- **Files**: `translations.ts`, `queries.ts`.
- **Specs**: `content-management`, `content-localization`.

## Risks

- **Translation Quality**: Machine translations might be imperfect.
- **Performance**: Fetching more data from Sanity might impact load time.
