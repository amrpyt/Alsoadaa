# OpenSpec: CMS Editable All Website Text

## ID
`cms-editable-all-text`

## Objective
Enable the website owner to edit **ALL text content** on the website directly from Sanity CMS, without requiring any code changes.

## Background

Currently, the website has ~400+ translation keys hardcoded in `src/lib/translations.ts`. While products, services, and pages are editable in the CMS, UI text (buttons, labels, headings, descriptions) requires code changes to modify.

**Current State:**
- ❌ ~400 translation keys hardcoded in TypeScript
- ❌ Frontend uses `useLanguage()` hook which reads from hardcoded file
- ✅ 82 translations in CMS but **not connected** to frontend

**Target State:**
- ✅ ALL translations stored in Sanity CMS
- ✅ Frontend dynamically fetches translations from CMS
- ✅ Grouped by page/section for easy navigation
- ✅ Fallback to hardcoded values if CMS unavailable

## User Review Required

> [!IMPORTANT]
> This change will make the frontend depend on Sanity for all text content. If Sanity is down, the site will fall back to hardcoded defaults.

> [!WARNING]
> Initial load time may increase slightly due to translation fetching. We'll implement caching to minimize this.

## Proposed Changes

### Phase 1: Migrate All Translations to CMS

---

#### [MODIFY] [siteTranslationCentralized.ts](file:///d:/Vibe%20Coding/02-Real%20PRojects%20with%20Clints/Alsoadaa/studio/schemaTypes/siteTranslationCentralized.ts)

- Add better categorization for easier navigation
- Group translations by page: `home`, `about`, `contact`, `products`, `calendar`, `sorting`, `packing`, `exporting`, `quote-form`, `common`, `footer`, `errors`

---

#### [NEW] [populate-all-translations.ts](file:///d:/Vibe%20Coding/02-Real%20PRojects%20with%20Clints/Alsoadaa/studio/scripts/populate-all-translations.ts)

- Migrate ALL ~400 translation keys from `translations.ts` to Sanity
- Preserve all three languages (AR/EN/RU)
- Assign proper categories for each key

---

### Phase 2: Connect Frontend to CMS

---

#### [MODIFY] [useLanguage.tsx](file:///d:/Vibe%20Coding/02-Real%20PRojects%20with%20Clints/Alsoadaa/src/hooks/useLanguage.tsx)

- Fetch translations from `siteTranslationCentralized` instead of hardcoded file
- Implement caching (localStorage) with 1-hour TTL
- Fall back to hardcoded translations if fetch fails

---

#### [MODIFY] [translations.ts](file:///d:/Vibe%20Coding/02-Real%20PRojects%20with%20Clints/Alsoadaa/src/lib/translations.ts)

- Keep as fallback translations
- No changes to structure, just serves as backup

---

### Phase 3: Optimize Studio Experience

---

#### [MODIFY] [structure.ts](file:///d:/Vibe%20Coding/02-Real%20PRojects%20with%20Clints/Alsoadaa/studio/structure.ts)

- Group translations by page in Studio sidebar
- Add custom icons for each page group
- Enable filtering by category

---

## Categories Breakdown

| Category | Count | Description |
|----------|-------|-------------|
| `home` | ~40 | Hero, trust indicators, CTA, why choose us |
| `about` | ~30 | About page content, journey, values |
| `contact` | ~35 | Contact form, info, global reach |
| `products` | ~25 | Product labels, filters, specifications |
| `calendar` | ~20 | Months, availability, seasons |
| `quote-form` | ~60 | Multi-step form, validation, errors |
| `sorting` | ~15 | Sorting page content |
| `packing` | ~15 | Packing page content |
| `exporting` | ~20 | Exporting page content |
| `footer` | ~10 | Footer links, copyright |
| `common` | ~50 | Buttons, loading, errors, shared text |
| `errors` | ~20 | Error messages, validation |
| **Total** | **~400** | All website text |

## Verification Plan

### Automated Tests
1. Run migration script and verify count matches
2. Test frontend loads translations from CMS
3. Verify fallback works when CMS is unreachable
4. Check all three languages display correctly

### Manual Verification
1. Edit a translation in Sanity Studio
2. Refresh website and verify change appears
3. Test on all pages: Home, About, Products, Contact, Calendar, Sorting, Packing, Exporting
4. Test quote form with all form labels

## Benefits

1. **Easy for owner** - Just log into Sanity Studio and edit any text
2. **No developer needed** - Owner can fix typos, update content anytime
3. **Multi-language** - Edit AR/EN/RU all in one place
4. **Organized** - Grouped by page for intuitive navigation
5. **Safe** - Falls back to defaults if CMS has issues
