import {defineType, defineField} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
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
      to: [{type: 'product'}],
      description: 'Reference to the original language version (usually Arabic)',
      hidden: ({document}) => document?.language === 'ar',
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
        source: (doc: any) => `${doc.title}-${doc.language}`,
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scientificName',
      title: 'Scientific Name',
      type: 'string',
      description: 'Latin scientific name (e.g., Citrus × sinensis)',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Citrus', value: 'citrus'},
          {title: 'Vegetables', value: 'vegetables'},
          {title: 'Berries', value: 'berries'},
          {title: 'Lemons', value: 'lemons'},
          {title: 'Grapes', value: 'grapes'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'season',
      title: 'Season Status',
      type: 'string',
      options: {
        list: [
          {title: 'In Season', value: 'in-season'},
          {title: 'Coming Soon', value: 'coming-soon'},
          {title: 'Peak Season', value: 'peak'},
          {title: 'Last Weeks', value: 'last-weeks'},
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'availability',
      title: 'Monthly Availability',
      type: 'object',
      fields: [
        {name: 'january', type: 'boolean', title: 'January', initialValue: false},
        {name: 'february', type: 'boolean', title: 'February', initialValue: false},
        {name: 'march', type: 'boolean', title: 'March', initialValue: false},
        {name: 'april', type: 'boolean', title: 'April', initialValue: false},
        {name: 'may', type: 'boolean', title: 'May', initialValue: false},
        {name: 'june', type: 'boolean', title: 'June', initialValue: false},
        {name: 'july', type: 'boolean', title: 'July', initialValue: false},
        {name: 'august', type: 'boolean', title: 'August', initialValue: false},
        {name: 'september', type: 'boolean', title: 'September', initialValue: false},
        {name: 'october', type: 'boolean', title: 'October', initialValue: false},
        {name: 'november', type: 'boolean', title: 'November', initialValue: false},
        {name: 'december', type: 'boolean', title: 'December', initialValue: false},
      ],
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        {name: 'packaging', type: 'string', title: 'Packaging'},
        {name: 'sizes', type: 'string', title: 'Available Sizes'},
        {name: 'storage', type: 'string', title: 'Storage Conditions'},
        {name: 'shelfLife', type: 'string', title: 'Shelf Life'},
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'ISO 9001', value: 'ISO 9001'},
          {title: 'GlobalGAP', value: 'GlobalGAP'},
          {title: 'Organic', value: 'Organic'},
          {title: 'Fair Trade', value: 'Fair Trade'},
        ],
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {name: 'metaTitle', type: 'string', title: 'Meta Title'},
        {name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      media: 'image',
      category: 'category',
    },
    prepare({title, language, media, category}) {
      return {
        title: `${title} (${language.toUpperCase()})`,
        subtitle: category,
        media,
      }
    },
  },
})
