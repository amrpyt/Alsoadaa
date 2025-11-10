import {defineType, defineField} from 'sanity'

export const siteTranslationType = defineType({
  name: 'siteTranslation',
  title: 'Site Translation',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Translation Key',
      type: 'string',
      description: 'Unique identifier for this translation (e.g., "hero.title", "nav.products")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Group translations by category for better organization',
      options: {
        list: [
          {title: 'Navigation', value: 'navigation'},
          {title: 'Hero Section', value: 'hero'},
          {title: 'Products', value: 'products'},
          {title: 'Forms', value: 'forms'},
          {title: 'Contact', value: 'contact'},
          {title: 'About', value: 'about'},
          {title: 'Common', value: 'common'},
          {title: 'Calendar', value: 'calendar'},
          {title: 'Categories', value: 'categories'},
          {title: 'Seasons', value: 'seasons'},
        ],
      },
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'العربية', value: 'ar'},
          {title: 'English', value: 'en'},
          {title: 'Русский', value: 'ru'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Translation Value',
      type: 'text',
      rows: 3,
      description: 'The translated text for this key in the specified language',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional: Provide context about where and how this translation is used',
    }),
  ],
  preview: {
    select: {
      key: 'key',
      language: 'language',
      value: 'value',
      category: 'category',
    },
    prepare({key, language, value, category}) {
      return {
        title: `${key} (${language.toUpperCase()})`,
        subtitle: `${category || 'Uncategorized'} • ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`,
      }
    },
  },
})
