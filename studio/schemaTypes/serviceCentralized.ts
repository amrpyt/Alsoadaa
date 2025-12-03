import {defineType, defineField} from 'sanity'

/**
 * Centralized Service Schema
 * 
 * ONE document per service with:
 * - Shared fields (icon, order) - fill ONCE
 * - Localized fields (name, description, features) - translate
 */
export const serviceCentralizedType = defineType({
  name: 'serviceCentralized',
  title: 'Service',
  type: 'document',
  groups: [
    {name: 'content', title: '📝 Content', default: true},
    {name: 'features', title: '✨ Features'},
    {name: 'settings', title: '⚙️ Settings'},
  ],
  fields: [
    // ============================================
    // SHARED FIELDS (fill once)
    // ============================================
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'nameEn',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      group: 'settings',
      description: 'Lucide icon name (e.g., Truck, Package, Shield, Factory)',
      options: {
        list: [
          {title: '📦 Package', value: 'Package'},
          {title: '🚚 Truck', value: 'Truck'},
          {title: '🛡️ Shield', value: 'Shield'},
          {title: '🏭 Factory', value: 'Factory'},
          {title: '✅ CheckCircle', value: 'CheckCircle'},
          {title: '🌍 Globe', value: 'Globe'},
          {title: '❄️ Snowflake', value: 'Snowflake'},
          {title: '📋 ClipboardCheck', value: 'ClipboardCheck'},
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      description: 'Lower numbers appear first',
      validation: (rule) => rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      description: 'Show this service on the website',
      initialValue: true,
    }),

    // ============================================
    // LOCALIZED NAMES
    // ============================================
    defineField({
      name: 'nameAr',
      title: '🇪🇬 Name (Arabic)',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: '🇬🇧 Name (English)',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nameRu',
      title: '🇷🇺 Name (Russian)',
      type: 'string',
      group: 'content',
    }),

    // ============================================
    // LOCALIZED DESCRIPTIONS
    // ============================================
    defineField({
      name: 'descriptionAr',
      title: '🇪🇬 Description (Arabic)',
      type: 'text',
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'descriptionEn',
      title: '🇬🇧 Description (English)',
      type: 'text',
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'descriptionRu',
      title: '🇷🇺 Description (Russian)',
      type: 'text',
      group: 'content',
      rows: 3,
    }),

    // ============================================
    // LOCALIZED FEATURES
    // ============================================
    defineField({
      name: 'featuresAr',
      title: '🇪🇬 Features (Arabic)',
      type: 'array',
      group: 'features',
      of: [{type: 'string'}],
      description: 'Key features in Arabic',
    }),
    defineField({
      name: 'featuresEn',
      title: '🇬🇧 Features (English)',
      type: 'array',
      group: 'features',
      of: [{type: 'string'}],
      description: 'Key features in English',
    }),
    defineField({
      name: 'featuresRu',
      title: '🇷🇺 Features (Russian)',
      type: 'array',
      group: 'features',
      of: [{type: 'string'}],
      description: 'Key features in Russian',
    }),

    // ============================================
    // IMAGE (optional)
    // ============================================
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      nameEn: 'nameEn',
      nameAr: 'nameAr',
      icon: 'icon',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({nameEn, nameAr, icon, order, isActive}) {
      const iconMap: Record<string, string> = {
        'Package': '📦',
        'Truck': '🚚',
        'Shield': '🛡️',
        'Factory': '🏭',
        'CheckCircle': '✅',
        'Globe': '🌍',
        'Snowflake': '❄️',
        'ClipboardCheck': '📋',
      }
      const emoji = icon ? iconMap[icon] || '⚡' : '⚡'
      const status = isActive ? '' : '🚫'
      
      return {
        title: `${emoji} ${nameEn || nameAr} ${status}`,
        subtitle: `#${order} • ${nameAr || ''}`,
      }
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Name (A-Z)',
      name: 'nameAsc',
      by: [{field: 'nameEn', direction: 'asc'}],
    },
  ],
})
