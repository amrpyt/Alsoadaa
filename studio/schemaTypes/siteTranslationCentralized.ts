import { defineType, defineField } from 'sanity'

/**
 * Centralized Site Translation Schema
 * 
 * ONE document per translation KEY with:
 * - Translation key (unique identifier)
 * - All language values in one place
 */
export const siteTranslationCentralizedType = defineType({
  name: 'siteTranslationCentralized',
  title: 'Translation',
  type: 'document',
  groups: [
    { name: 'key', title: '🔑 Key', default: true },
    { name: 'translations', title: '🌍 Translations' },
  ],
  fields: [
    // ============================================
    // KEY INFO
    // ============================================
    defineField({
      name: 'key',
      title: 'Translation Key',
      type: 'string',
      group: 'key',
      description: 'Unique identifier (e.g., "hero.title", "nav.products")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'key',
      description: 'Which page/section does this text appear on?',
      options: {
        list: [
          // Pages
          { title: '🏠 Home Page', value: 'home' },
          { title: '👥 About Page', value: 'about' },
          { title: '📞 Contact Page', value: 'contact' },
          { title: '📦 Products Page', value: 'products' },
          { title: '📅 Calendar Page', value: 'calendar' },
          { title: '🔧 Sorting Page', value: 'sorting' },
          { title: '📦 Packing Page', value: 'packing' },
          { title: '🚢 Exporting Page', value: 'exporting' },
          // Components
          { title: '📝 Quote Form', value: 'quote-form' },
          { title: '🧭 Navigation', value: 'navigation' },
          { title: '👣 Footer', value: 'footer' },
          // Shared
          { title: '🔧 Common/Shared', value: 'common' },
          { title: '❌ Errors & Validation', value: 'errors' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Context/Usage',
      type: 'string',
      group: 'key',
      description: 'Where is this translation used?',
    }),

    // ============================================
    // ALL TRANSLATIONS IN ONE PLACE
    // ============================================
    defineField({
      name: 'valueAr',
      title: '🇪🇬 Arabic',
      type: 'text',
      group: 'translations',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'valueEn',
      title: '🇬🇧 English',
      type: 'text',
      group: 'translations',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'valueRu',
      title: '🇷🇺 Russian',
      type: 'text',
      group: 'translations',
      rows: 2,
    }),
  ],

  preview: {
    select: {
      key: 'key',
      category: 'category',
      valueAr: 'valueAr',
      valueEn: 'valueEn',
      valueRu: 'valueRu',
    },
    prepare({ key, category, valueAr, valueEn, valueRu }) {
      const categoryIcons: Record<string, string> = {
        'home': '🏠',
        'about': '👥',
        'contact': '📞',
        'products': '📦',
        'calendar': '📅',
        'sorting': '🔧',
        'packing': '📦',
        'exporting': '🚢',
        'quote-form': '📝',
        'navigation': '🧭',
        'footer': '👣',
        'common': '🔧',
        'errors': '❌',
      }
      const icon = category ? categoryIcons[category] || '📝' : '📝'

      // Show completion status
      const hasAr = valueAr ? '🇪🇬' : '⬜'
      const hasEn = valueEn ? '🇬🇧' : '⬜'
      const hasRu = valueRu ? '🇷🇺' : '⬜'

      return {
        title: `${icon} ${key}`,
        subtitle: `${hasAr}${hasEn}${hasRu} • ${(valueEn || valueAr || '').substring(0, 40)}...`,
      }
    },
  },

  orderings: [
    {
      title: 'Category, then Key',
      name: 'categoryKeyAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'key', direction: 'asc' },
      ],
    },
    {
      title: 'Key (A-Z)',
      name: 'keyAsc',
      by: [{ field: 'key', direction: 'asc' }],
    },
  ],
})
