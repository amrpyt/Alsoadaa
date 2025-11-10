import {defineType, defineField} from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
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
      initialValue: 'ar',
    }),
    defineField({
      name: 'originalDocument',
      title: 'Original Document',
      type: 'reference',
      to: [{type: 'service'}],
      description: 'Reference to the original language version (usually Arabic)',
      hidden: ({document}) => document?.language === 'ar',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., Truck, Package, Shield)',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of key features for this service',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which services are displayed (lower numbers first)',
      validation: (rule) => rule.required().min(0),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      language: 'language',
      order: 'order',
    },
    prepare({title, language, order}) {
      return {
        title: `${title} (${language.toUpperCase()})`,
        subtitle: `Order: ${order}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
