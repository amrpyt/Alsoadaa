# Change: Complete CMS Content Integration

## Why
The client needs to edit **ALL text** on the website from the CMS. Currently:
- The frontend correctly fetches from Sanity and falls back to hardcoded `translations.ts`
- The Home page document exists (`page-home`) but is not connected to the singleton structure
- Most translation keys are defined in code but not populated in the CMS

## What Changes
1. **Fix singleton connection** - Point Home/About singletons to existing documents
2. **Populate Home page document** - Add all missing field values from `translations.ts`
3. **Update hooks** - Ensure `usePageContent` fetches by `pageType` for Home page
4. **Verify frontend mapping** - Confirm all `t.keyName` values can be edited in CMS

**BREAKING**: None. This enhances existing CMS capability without breaking anything.

## Impact
- Affected specs: `content-management`
- Affected code:
  - `studio/sanity.config.ts` (desk structure)
  - `src/hooks/usePageContent.ts` (query adjustment)
  - Sanity documents (data population)

## Technical Analysis

### Current Architecture (Already Good ✅)
```
Frontend Component
    ↓
useSiteSettings() + usePageContent()
    ↓
Merge: { ...fallbackTranslations, ...sanityData }
    ↓
Render with t.keyName
```

### What's Missing
1. **Singleton pointing to wrong document ID**
2. **Page content not populated in CMS**
3. **usePageContent query** should fetch by `pageType: "home"` for Home page

### Translation Keys Needed in CMS (Home Page)
All these keys from `translations.ts` should be editable:
- `heroTitle`, `heroSubtitle`
- `yearsExporting`, `countriesServed`, `certified`, `containersPerYear`
- `ourPremiumProducts`, `freshCertifiedDelivered`, `viewAllProducts`
- `whyChooseUs`, `qualityCertified`, `qualityCertifiedDesc`
- `reliableDelivery`, `reliableDeliveryDesc`
- `freshGuarantee`, `freshGuaranteeDesc`
- `whatClientsSay`
- `testimonial1Quote/Author/Company/Country` (and 2, 3)
- `readyToImport`, `getCustomizedQuote`, `getYourQuoteToday`
- `requestQuote`, `viewProducts` (button texts)
