# OpenSpec: Fix Missing Page Translations

## ID
`fix-missing-page-translations`

## Objective
Populate the missing page-specific translations in Sanity CMS that were not included in the original CMS migration, causing empty text on Packing, Sorting, and Exporting pages.

## Background

The `cms-editable-all-text` change migrated translations from hardcoded `translations.ts` to Sanity CMS. However, only **82 general UI translations** were populated via `populate-translations.ts`. 

**Page-specific translations** like `packingDesc1`, `sortingStage1Title`, `exportingFeature1Title` were **not migrated**, causing these texts to appear empty on the website.

### Current State
- ❌ Packing page: 13 translation keys missing
- ❌ Sorting page: 14 translation keys missing  
- ❌ Exporting page: 17 translation keys missing
- ❌ **Total: 44 missing translations**

### Target State
- ✅ All page translations migrated to Sanity
- ✅ All 3 languages (AR/EN/RU) populated with correct values
- ✅ Pages display full content

## User Review Required

> [!IMPORTANT]
> This is a **hotfix** for a broken production feature. The website currently shows empty text in multiple service pages.

## Proposed Changes

### [NEW] [populate-page-translations.ts](file:///d:/Vibe%20Coding/02-Real%20PRojects%20with%20Clints/Alsoadaa/studio/scripts/populate-page-translations.ts)

New migration script to add the 44 missing page-specific translations:

#### Packing Page (13 keys)
```
packingDesc1, packingDesc2, packingDesc3
packingFeature1Title, packingFeature1Desc
packingFeature2Title, packingFeature2Desc
packingFeature3Title, packingFeature3Desc
packingStandards, packingStandard1-4
packingImageCaption
```

#### Sorting Page (14 keys)
```
sortingDesc
sortingStage1Title, sortingStage1Desc
sortingStage2Title, sortingStage2Desc
sortingStage3Title, sortingStage3Desc
sortingKeyBenefits, sortingBenefit1-4
sortingImageCaption
```

#### Exporting Page (17 keys)
```
exportingDesc1, exportingDesc2, exportingDesc3
exportingFeature1Title, exportingFeature1Desc
exportingFeature2Title, exportingFeature2Desc
exportingFeature3Title, exportingFeature3Desc
exportingFeature4Title, exportingFeature4Desc
exportingCapabilities, exportingCap1-5
exportingImageCaption
```

---

### [MODIFY] [populate-all.ts](file:///d:/Vibe%20Coding/02-Real%20PRojects%20with%20Clints/Alsoadaa/studio/scripts/populate-all.ts)

Add the new `populate-page-translations.ts` script to the main populate-all workflow.

---

## Verification Plan

### Automated Tests
1. Run `npx ts-node --esm studio/scripts/populate-page-translations.ts`
2. Verify output shows `44 translations created/updated`
3. No errors during execution

### Manual Verification
1. Clear browser localStorage (to flush cached translations)
2. Navigate to `/#packing` - verify all text appears
3. Navigate to `/#sorting` - verify all text appears
4. Navigate to `/#exporting` - verify all text appears
5. Switch to Arabic language - verify Arabic translations display
6. Switch to Russian language - verify Russian translations display

## Translation Sources

Translations will be sourced from the business context:

| Page | Content Type | Source |
|------|--------------|--------|
| Packing | Packaging process descriptions | Industry standard agricultural export terminology |
| Sorting | Grading stages and benefits | Al Soadaa service descriptions |
| Exporting | Export capabilities | Company capabilities documentation |

## Benefits

1. **Fixes broken pages** - Users can now see full content
2. **Maintains CMS approach** - All content editable from Sanity Studio
3. **Complete migration** - Closes gap in original CMS migration
