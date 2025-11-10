# AI-Powered Translation Guide (Arabic, English, Russian)

## Overview

This guide explains how to implement **Sanity AI Assist** for automated translation between Arabic (ar), English (en), and Russian (ru) using AI-powered translation.

## Why AI Assist Translation?

✅ **Automated Translation**: AI translates content automatically
✅ **FREE**: Google Translate offers 500,000 characters/month for free
✅ **Multiple Providers**: Supports Google Translate, DeepL, OpenAI
✅ **Context-Aware**: Maintains formatting and context
✅ **Protected Phrases**: Keep brand names untranslated
✅ **One-Click**: Translate with a single button in Studio

## Architecture

### Option 1: Document-Level Translation (Recommended)

Each language is a separate document with a `language` field:

```
product-123-ar (Arabic)
product-123-en (English)  
product-123-ru (Russian)
```

**Benefits:**
- Clear separation of languages
- Easy to manage translations
- Better for SEO (separate URLs)
- Simple GROQ queries

### Option 2: Field-Level Translation

All languages in one document with locale objects:

```typescript
{
  title: {
    ar: "برتقال نافل",
    en: "Navel Orange",
    ru: "Апельсин Навел"
  }
}
```

**We'll use Option 1 (Document-Level)** for this project.

---

## Implementation Steps

### 1. Install AI Assist Plugin

```bash
cd studio
npm install @sanity/assist
```

### 2. Configure AI Assist with Google Translate (FREE)

```typescript
// studio/sanity.config.ts
import { defineConfig } from 'sanity'
import { assist } from '@sanity/assist'

export default defineConfig({
  // ... other config
  plugins: [
    assist({
      translate: {
        // Use Google Translate (FREE - 500k chars/month)
        provider: 'google',
        
        // Style guide for translations (max 2000 chars)
        styleguide: 'Use professional, clear language. Maintain brand voice. Keep technical terms in English when appropriate.',
        
        document: {
          // Field that contains language code
          languageField: 'language',
          
          // Document types that support translation
          documentTypes: ['product', 'page', 'service'],
        },
      },
    }),
  ],
})
```

### 3. Update Schemas with Language Field

```typescript
// studio/schemas/product.ts
import { defineType, defineField } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // Language field (REQUIRED for AI Assist)
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'العربية', value: 'ar' },
          { title: 'English', value: 'en' },
          { title: 'Русский', value: 'ru' },
        ],
      },
      validation: (rule) => rule.required(),
      initialValue: 'ar', // Default to Arabic
    }),
    
    // Reference to original document (for translations)
    defineField({
      name: 'originalDocument',
      title: 'Original Document',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Link to the original language version',
    }),
    
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        // Include language in slug
        slugify: (input, type, context) => {
          const lang = context.parent?.language || 'ar'
          return `${input.toLowerCase().replace(/\s+/g, '-')}-${lang}`
        },
      },
    }),
    
    defineField({
      name: 'scientificName',
      title: 'Scientific Name',
      type: 'string',
      description: 'Keep in Latin (will not be translated)',
    }),
    
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Citrus', value: 'citrus' },
          { title: 'Vegetables', value: 'vegetables' },
          { title: 'Berries', value: 'berries' },
          { title: 'Lemons', value: 'lemons' },
          { title: 'Grapes', value: 'grapes' },
        ],
      },
    }),
    
    // ... other fields
  ],
})
```

### 4. Using AI Assist in Studio

#### Translate Entire Document:

1. Open a product in Arabic (ar)
2. Click **"Translate"** button in Studio toolbar
3. Select target language (English or Russian)
4. AI Assist creates a new document with translated content
5. Review and publish the translation

#### Protected Phrases:

```typescript
// In Studio, when translating
{
  protectedPhrases: [
    'Alsoadaa',
    'Navel Orange', // Keep scientific/brand names
    'ISO',
    'GAP',
  ]
}
```

### 5. Frontend Language Switcher

```typescript
// src/components/LanguageSwitcher.tsx
import { useState, useEffect } from 'react'

const LANGUAGES = [
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
]

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('ar')
  
  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('language') || 'ar'
    setCurrentLang(saved)
    
    // Set document direction
    const lang = LANGUAGES.find(l => l.code === saved)
    document.documentElement.dir = lang?.dir || 'rtl'
    document.documentElement.lang = saved
  }, [])
  
  const switchLanguage = (code: string) => {
    setCurrentLang(code)
    localStorage.setItem('language', code)
    
    const lang = LANGUAGES.find(l => l.code === code)
    document.documentElement.dir = lang?.dir || 'rtl'
    document.documentElement.lang = code
    
    // Reload to fetch new language content
    window.location.reload()
  }
  
  return (
    <div className="flex gap-2">
      {LANGUAGES.map(lang => (
        <button
          key={lang.code}
          onClick={() => switchLanguage(lang.code)}
          className={`px-3 py-1 rounded ${
            currentLang === lang.code 
              ? 'bg-primary text-white' 
              : 'bg-gray-200'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  )
}
```

### 6. Fetch Content by Language

```typescript
// src/lib/queries.ts
import { defineQuery } from 'groq'

// Get current language from localStorage
const getCurrentLanguage = () => {
  return localStorage.getItem('language') || 'ar'
}

// Fetch products in current language
export const getProductsQuery = () => {
  const lang = getCurrentLanguage()
  
  return defineQuery(`
    *[_type == "product" && language == $lang]{
      _id,
      title,
      slug,
      description,
      category,
      season,
      image,
      scientificName,
      certifications,
      availability,
      specifications,
      gallery
    }
  `)
}

// Usage in component
import { client } from '@/lib/sanity'
import { getProductsQuery } from '@/lib/queries'

const lang = localStorage.getItem('language') || 'ar'
const products = await client.fetch(getProductsQuery(), { lang })
```

### 7. RTL/LTR Support

```css
/* src/styles/globals.css */

/* RTL for Arabic */
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

html[dir="rtl"] .flex-row {
  flex-direction: row-reverse;
}

/* LTR for English and Russian */
html[dir="ltr"] {
  direction: ltr;
  text-align: left;
}
```

---

## Translation Workflow

### Creating Translations:

1. **Create Original (Arabic)**
   - Create product in Arabic
   - Set `language: 'ar'`
   - Publish

2. **Translate to English**
   - Open Arabic product
   - Click "Translate" button
   - Select "English (en)"
   - AI creates new document with English content
   - Review translation
   - Adjust if needed
   - Publish

3. **Translate to Russian**
   - Repeat process for Russian
   - Or translate from English to Russian

### Updating Translations:

When original content changes:
1. Update the original document
2. AI Assist can detect changes
3. Re-translate updated fields only
4. Review and publish updates

---

## GROQ Queries for Multi-Language

### Get All Languages of a Product:

```groq
*[_type == "product" && slug.current match "navel-orange-*"]{
  _id,
  title,
  language,
  slug
}
```

### Get Product with All Translations:

```groq
*[_type == "product" && _id == $productId][0]{
  _id,
  title,
  language,
  "translations": *[_type == "product" && originalDocument._ref == ^._id]{
    _id,
    title,
    language,
    slug
  }
}
```

### Get Products in Specific Language:

```groq
*[_type == "product" && language == $lang]{
  _id,
  title,
  slug,
  description
}
```

---

## AI Translation Providers

Sanity AI Assist supports multiple providers:

### 1. **Google Translate (FREE - RECOMMENDED)** ⭐
- **FREE**: 500,000 characters/month
- Fast and reliable
- 100+ languages
- Good quality for Arabic, English, Russian
- No API key needed (uses Sanity's integration)

### 2. **DeepL**
- Highest quality for European languages
- Great for Russian
- Limited language support
- Paid service

### 3. **OpenAI**
- Best quality translations
- Supports 95+ languages
- Context-aware
- Requires paid API key

**For this project, we'll use Google Translate FREE tier** - perfect for Arabic, English, and Russian without any costs!

---

## Environment Variables

```env
# .env.local (Studio)
# No API key needed for Google Translate!
# Sanity handles it automatically through AI Assist
```

---

## Cost Estimation

### Google Translate FREE Tier:
- **FREE**: 500,000 characters/month
- Average product: 500 characters
- 100 products × 2 languages = 100,000 characters
- **Cost: $0.00** (completely free!)

**Completely FREE!** 🎉💰

### Usage Calculation:
- Monthly limit: 500,000 chars
- Your usage: ~100,000 chars (100 products × 2 languages)
- **Remaining: 400,000 chars** for updates and new content

---

## Best Practices

1. ✅ **Always review AI translations** before publishing
2. ✅ **Use protected phrases** for brand names and technical terms
3. ✅ **Set a style guide** for consistent tone
4. ✅ **Link translations** with `originalDocument` reference
5. ✅ **Use language-specific slugs** (e.g., `navel-orange-ar`, `navel-orange-en`)
6. ✅ **Test RTL/LTR** layouts for all languages
7. ✅ **Cache language preference** in localStorage
8. ✅ **Provide language switcher** in header

---

## Testing Translation

```bash
# In Studio
1. Create a product in Arabic
2. Click "Translate" → Select "English"
3. Review generated translation
4. Adjust if needed
5. Publish

# In Frontend
1. Switch language to English
2. Verify content loads in English
3. Check RTL/LTR direction
4. Test all pages
```

---

## Migration Strategy

### Phase 1: Setup (Day 1)
- Install `@sanity/assist`
- Configure AI Assist in Studio
- Update schemas with `language` field

### Phase 2: Create Arabic Content (Day 2)
- Migrate existing mock data to Arabic documents
- Set `language: 'ar'` for all

### Phase 3: Translate to English (Day 3)
- Use AI Assist to translate all products to English
- Review and adjust translations
- Publish English versions

### Phase 4: Translate to Russian (Day 4)
- Translate all products to Russian
- Review and publish

### Phase 5: Frontend Integration (Day 5)
- Add language switcher component
- Update queries to filter by language
- Add RTL/LTR support
- Test all languages

---

## Summary

✅ **AI-Powered**: Automatic translation with Google Translate
✅ **100% FREE**: 500k characters/month at no cost
✅ **3 Languages**: Arabic, English, Russian
✅ **One-Click**: Translate in Studio with a button
✅ **Professional**: Review and adjust before publishing
✅ **SEO-Friendly**: Separate documents per language
✅ **User-Friendly**: Language switcher in frontend

**Ready to implement - completely FREE!** 🚀🎉
