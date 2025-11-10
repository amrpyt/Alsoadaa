# Localization System Guide 🌍

## Overview

This project uses a **hybrid localization system** that combines:
1. **Sanity CMS** - For dynamic, editable translations
2. **Local Translation Files** - As fallback and initial load

---

## 📁 System Components

### 1. Sanity Schema
**File:** `studio/schemaTypes/siteTranslation.ts`

```typescript
{
  key: string;        // e.g., "hero.title" or "products"
  language: string;   // "ar" | "en" | "ru"
  value: string;      // The translated text
  category: string;   // Organization category
  description: string; // Optional context
}
```

### 2. Translation Hook
**File:** `src/hooks/useSanityTranslations.ts`

Automatically fetches translations from Sanity and merges with fallback translations.

### 3. Language Context
**File:** `src/lib/LanguageContext.tsx`

Provides translations and language state to the entire app.

---

## 🚀 How to Use

### Adding New Translations

#### Option 1: Via Sanity Studio (Recommended)
1. Open Sanity Studio: `http://localhost:3333`
2. Navigate to **Site Translations**
3. Select language (Arabic, English, or Russian)
4. Click **+ Create** → **Site Translation**
5. Fill in:
   - **Key:** Unique identifier (e.g., `footer.copyright`)
   - **Category:** Choose appropriate category
   - **Language:** Select language
   - **Value:** Enter the translated text
   - **Description:** Add context (optional)
6. Click **Publish**

#### Option 2: Via Code (For Initial Setup)
1. Add to `src/lib/translations.ts`:
```typescript
export const translations = {
  en: {
    // ... existing translations
    myNewKey: 'My New Text',
  },
  ar: {
    // ... existing translations
    myNewKey: 'النص الجديد',
  },
  ru: {
    // ... existing translations
    myNewKey: 'Мой новый текст',
  },
};
```

2. Import to Sanity:
```bash
npm run import-translations
```

---

## 🔧 Using Translations in Components

### Basic Usage
```tsx
import { useLanguage } from '../lib/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  
  return <h1>{t.heroTitle}</h1>;
}
```

### With Loading State
```tsx
import { useLanguage } from '../lib/LanguageContext';

function MyComponent() {
  const { t, loading } = useLanguage();
  
  if (loading) {
    return <div>Loading translations...</div>;
  }
  
  return <h1>{t.heroTitle}</h1>;
}
```

---

## 🎯 Translation Key Naming Convention

### Format
Use **dot notation** in Sanity, which automatically converts to **camelCase** in code:

| Sanity Key | Code Key | Example |
|-----------|----------|---------|
| `hero.title` | `heroTitle` | `t.heroTitle` |
| `nav.products` | `navProducts` | `t.navProducts` |
| `footer.copyright` | `footerCopyright` | `t.footerCopyright` |

### Categories
Organize translations by category:
- **navigation** - Menu items, links
- **hero** - Hero section text
- **products** - Product-related text
- **forms** - Form labels, buttons, messages
- **contact** - Contact page text
- **about** - About page text
- **common** - Shared/general text
- **calendar** - Calendar and date-related
- **categories** - Product categories
- **seasons** - Season indicators

---

## 🤖 AI-Powered Translation

### Using AI Assist in Sanity Studio

1. Create a translation in one language (e.g., English)
2. Click on the **AI Assist** icon
3. Select **Translate**
4. Choose target language
5. Review and publish

AI Assist is configured for:
- Arabic (ar)
- English (en)
- Russian (ru)

---

## 📊 Current Statistics

- **Total Translations:** 471
- **Languages:** 3 (Arabic, English, Russian)
- **Categories:** 10
- **Auto-import:** ✅ Available via `npm run import-translations`

---

## 🔄 Syncing Translations

### Import from Code to Sanity
```bash
npm run import-translations
```

This will:
- ✅ Create new translations in Sanity
- ✅ Update existing translations
- ✅ Preserve manual edits in Sanity
- ✅ Organize by category

### Fetch from Sanity to Website
Translations are automatically fetched when:
- ✅ User changes language
- ✅ Page loads
- ✅ Component mounts

**Fallback:** If Sanity is unavailable, local translations are used automatically.

---

## 🛠 Scripts

| Command | Description |
|---------|-------------|
| `npm run import-translations` | Import translations from `translations.ts` to Sanity |
| `npm run translate` | Auto-translate products to all languages |
| `npm run complete-data` | Complete all product data entry |

---

## 🎨 Best Practices

### 1. **Always use keys, never hardcode text**
```tsx
// ❌ Bad
<button>Submit</button>

// ✅ Good
<button>{t.submitButton}</button>
```

### 2. **Add descriptions in Sanity**
Help future editors understand context:
```
Key: submitButton
Description: Submit button text on the quote request form
```

### 3. **Test in all languages**
Always verify translations appear correctly in:
- Arabic (RTL)
- English (LTR)
- Russian (LTR)

### 4. **Use categories**
Organize translations for easier management:
- Group related keys
- Use consistent naming
- Document dependencies

---

## 🐛 Troubleshooting

### Translations not updating?
1. Check Sanity Studio - are they published?
2. Clear browser cache
3. Check browser console for errors
4. Verify `useSanityTranslations` hook is loading

### Translation missing?
1. Check if key exists in Sanity
2. Verify key naming (dot notation vs camelCase)
3. Check fallback translations in `translations.ts`

### Loading too slow?
- Translations are cached after first load
- Consider adding more aggressive caching
- Check Sanity CDN is enabled

---

## 📝 Future Enhancements

- [ ] Real-time translation updates (Sanity webhooks)
- [ ] Translation versioning
- [ ] Bulk translation operations
- [ ] Translation coverage reports
- [ ] Missing translation detection

---

## 🌟 Summary

You now have a powerful, CMS-managed localization system that:
- ✅ Allows non-developers to edit translations
- ✅ Supports 3 languages out of the box
- ✅ Has AI-powered translation
- ✅ Falls back gracefully
- ✅ Is developer-friendly
- ✅ Scales easily

**Edit translations in Sanity Studio:** `http://localhost:3333`

Happy translating! 🚀
