import {defineType, defineField} from 'sanity'

export const calendarEventType = defineType({
  name: 'calendarEvent',
  title: 'Calendar Event',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (rule) => rule.required(),
      description: 'Reference to the product (use Arabic version)',
    }),
    defineField({
      name: 'month',
      title: 'Month',
      type: 'string',
      options: {
        list: [
          {title: 'January', value: 'january'},
          {title: 'February', value: 'february'},
          {title: 'March', value: 'march'},
          {title: 'April', value: 'april'},
          {title: 'May', value: 'may'},
          {title: 'June', value: 'june'},
          {title: 'July', value: 'july'},
          {title: 'August', value: 'august'},
          {title: 'September', value: 'september'},
          {title: 'October', value: 'october'},
          {title: 'November', value: 'november'},
          {title: 'December', value: 'december'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Peak Season', value: 'peak'},
          {title: 'Coming Soon', value: 'coming-soon'},
          {title: 'Last Weeks', value: 'last-weeks'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 2,
      description: 'Additional notes about availability',
    }),
  ],
  preview: {
    select: {
      productTitle: 'product.title',
      month: 'month',
      status: 'status',
    },
    prepare({productTitle, month, status}) {
      return {
        title: `${productTitle} - ${month}`,
        subtitle: status,
      }
    },
  },
})
