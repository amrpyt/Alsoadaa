import {defineType, defineField} from 'sanity'

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
    {name: 'key', title: '🔑 Key', default: true},
    {name: 'translations', title: '🌍 Translations'},
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
      options: {
        list: [
          {title: '🧭 Navigation', value: 'navigation'},
          {title: '🎯 Hero Section', value: 'hero'},
          {title: '📦 Products', value: 'products'},
          {title: '📝 Forms', value: 'forms'},
          {title: '📞 Contact', value: 'contact'},
          {title: 'ℹ️ About', value: 'about'},
          {title: '🔧 Common', value: 'common'},
          {title: '📅 Calendar', value: 'calendar'},
          {title: '🏷️ Categories', value: 'categories'},
          {title: '🌤️ Seasons', value: 'seasons'},
          {title: '⚙️ System', value: 'system'},
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
    prepare({key, category, valueAr, valueEn, valueRu}) {
      const categoryIcons: Record<string, string> = {
        'navigation': '🧭',
        'hero': '🎯',
        'products': '📦',
        'forms': '📝',
        'contact': '📞',
        'about': 'ℹ️',
        'common': '🔧',
        'calendar': '📅',
        'categories': '🏷️',
        'seasons': '🌤️',
        'system': '⚙️',
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
        {field: 'category', direction: 'asc'},
        {field: 'key', direction: 'asc'},
      ],
    },
    {
      title: 'Key (A-Z)',
      name: 'keyAsc',
      by: [{field: 'key', direction: 'asc'}],
    },
  ],
})
