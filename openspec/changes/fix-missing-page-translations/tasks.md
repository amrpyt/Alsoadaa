# Tasks: Fix Missing Page Translations

## Summary
- **Total Tasks**: 8
- **Completed**: 0
- **In Progress**: 0
- **Estimated Time**: 30 minutes

---

## Phase 1: Create Migration Script

- [ ] 1.1 Create `populate-page-translations.ts` script
  - Define all 44 translation keys with AR/EN/RU values
  - Group by page: packing, sorting, exporting
  - Use same pattern as existing `populate-translations.ts`

- [ ] 1.2 Add Packing page translations (13 keys)
  - packingDesc1-3: Main content descriptions
  - packingFeature1-3 Title/Desc: Feature cards
  - packingStandards + standard1-4: Standards list
  - packingImageCaption: Image caption

- [ ] 1.3 Add Sorting page translations (14 keys)
  - sortingDesc: Main description
  - sortingStage1-3 Title/Desc: Process stages
  - sortingKeyBenefits + benefit1-4: Benefits list
  - sortingImageCaption: Image caption

- [ ] 1.4 Add Exporting page translations (17 keys)
  - exportingDesc1-3: Main content descriptions
  - exportingFeature1-4 Title/Desc: Feature cards
  - exportingCapabilities + cap1-5: Capabilities list
  - exportingImageCaption: Image caption

---

## Phase 2: Execute Migration

- [ ] 2.1 Run migration script
  ```bash
  npx ts-node --esm studio/scripts/populate-page-translations.ts
  ```
  - Verify 44 translations created/updated
  - No errors in output

- [ ] 2.2 Update populate-all.ts to include new script
  - Import and execute populate-page-translations
  - Ensure idempotent execution

---

## Phase 3: Verification

- [ ] 3.1 Clear browser cache and test pages
  - Clear localStorage in DevTools
  - Refresh each page: packing, sorting, exporting
  - Verify all text content displays correctly

- [ ] 3.2 Language switching test
  - Switch to Arabic - verify Arabic translations
  - Switch to Russian - verify Russian translations
  - Switch back to English - verify English translations

---

## Dependencies
- Requires Sanity token with write permissions (already configured)
- Depends on existing `siteTranslationCentralized` schema

## Blocking Issues
None identified.
