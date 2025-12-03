import {defineType, defineField} from 'sanity'

/**
 * Calendar Event Schema (Enhanced)
 * 
 * Track product availability by month
 * Note: This is better handled via the product's availability field,
 * but this schema is useful for special events/notes
 */
export const calendarEventCentralizedType = defineType({
  name: 'calendarEventCentralized',
  title: 'Calendar Event',
  type: 'document',
  groups: [
    {name: 'event', title: '📅 Event', default: true},
    {name: 'notes', title: '📝 Notes'},
  ],
  fields: [
    // ============================================
    // EVENT INFO
    // ============================================
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      group: 'event',
      to: [{type: 'productCentralized'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'month',
      title: 'Month',
      type: 'string',
      group: 'event',
      options: {
        list: [
          {title: '❄️ January', value: 'january'},
          {title: '❄️ February', value: 'february'},
          {title: '🌸 March', value: 'march'},
          {title: '🌸 April', value: 'april'},
          {title: '🌸 May', value: 'may'},
          {title: '☀️ June', value: 'june'},
          {title: '☀️ July', value: 'july'},
          {title: '☀️ August', value: 'august'},
          {title: '🍂 September', value: 'september'},
          {title: '🍂 October', value: 'october'},
          {title: '🍂 November', value: 'november'},
          {title: '❄️ December', value: 'december'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'event',
      initialValue: new Date().getFullYear(),
      validation: (rule) => rule.required().min(2020).max(2100),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'event',
      options: {
        list: [
          {title: '✅ Available', value: 'available'},
          {title: '🔥 Peak Season', value: 'peak'},
          {title: '⏳ Coming Soon', value: 'coming-soon'},
          {title: '⚠️ Last Weeks', value: 'last-weeks'},
          {title: '❌ Not Available', value: 'unavailable'},
        ],
      },
      validation: (rule) => rule.required(),
    }),

    // ============================================
    // LOCALIZED NOTES
    // ============================================
    defineField({
      name: 'notesAr',
      title: '🇪🇬 Notes (Arabic)',
      type: 'text',
      group: 'notes',
      rows: 2,
    }),
    defineField({
      name: 'notesEn',
      title: '🇬🇧 Notes (English)',
      type: 'text',
      group: 'notes',
      rows: 2,
    }),
    defineField({
      name: 'notesRu',
      title: '🇷🇺 Notes (Russian)',
      type: 'text',
      group: 'notes',
      rows: 2,
    }),
  ],

  preview: {
    select: {
      productTitle: 'product.titleEn',
      productTitleAr: 'product.titleAr',
      month: 'month',
      year: 'year',
      status: 'status',
    },
    prepare({productTitle, productTitleAr, month, year, status}) {
      const statusIcons: Record<string, string> = {
        'available': '✅',
        'peak': '🔥',
        'coming-soon': '⏳',
        'last-weeks': '⚠️',
        'unavailable': '❌',
      }
      const monthIcons: Record<string, string> = {
        'january': '❄️', 'february': '❄️', 'december': '❄️',
        'march': '🌸', 'april': '🌸', 'may': '🌸',
        'june': '☀️', 'july': '☀️', 'august': '☀️',
        'september': '🍂', 'october': '🍂', 'november': '🍂',
      }
      
      const sIcon = status ? statusIcons[status] || '' : ''
      const mIcon = month ? monthIcons[month] || '' : ''
      const monthName = month ? month.charAt(0).toUpperCase() + month.slice(1) : ''
      
      return {
        title: `${productTitle || productTitleAr || 'No Product'}`,
        subtitle: `${mIcon} ${monthName} ${year || ''} • ${sIcon} ${status || ''}`,
      }
    },
  },

  orderings: [
    {
      title: 'Month',
      name: 'monthAsc',
      by: [{field: 'month', direction: 'asc'}],
    },
    {
      title: 'Product',
      name: 'productAsc',
      by: [{field: 'product.titleEn', direction: 'asc'}],
    },
  ],
})
