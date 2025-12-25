import { defineType, defineField } from 'sanity'

/**
 * Centralized Product Schema
 * 
 * ONE document per product with:
 * - Shared fields (image, specs, availability) - fill ONCE
 * - Localized fields (title, description, SEO) - translate
 */
export const productCentralizedType = defineType({
  name: 'productCentralized',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'content', title: '📝 Content', default: true },
    { name: 'media', title: '🖼️ Media' },
    { name: 'specs', title: '📋 Specifications' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    // ============================================
    // SHARED FIELDS (fill once)
    // ============================================
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'content',
      options: {
        source: 'titleEn',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scientificName',
      title: 'Scientific Name',
      type: 'string',
      group: 'content',
      description: 'Latin name (e.g., Citrus sinensis)',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: '🍊 Citrus', value: 'citrus' },
          { title: '🥬 Vegetables', value: 'vegetables' },
          { title: '🍇 Grapes', value: 'grapes' },
          { title: '🥭 Tropical', value: 'tropical' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Site',
      type: 'boolean',
      group: 'content',
      initialValue: true,
      description: 'Turn off to hide this product from the website without deleting it.',
    }),
    defineField({
      name: 'season',
      title: 'Season Status',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: '✅ In Season', value: 'in-season' },
          { title: '⏳ Coming Soon', value: 'coming-soon' },
          { title: '🔥 Peak Season', value: 'peak' },
          { title: '⚠️ Last Weeks', value: 'last-weeks' },
        ],
      },
    }),

    // ============================================
    // LOCALIZED TITLES (Arabic, English, Russian)
    // ============================================
    defineField({
      name: 'titleAr',
      title: '🇪🇬 Title (Arabic)',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: '🇬🇧 Title (English)',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleRu',
      title: '🇷🇺 Title (Russian)',
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
    // MEDIA (upload ONCE!)
    // ============================================
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    // ============================================
    // SPECIFICATIONS (fill ONCE!)
    // ============================================
    defineField({
      name: 'availability',
      title: 'Monthly Availability',
      type: 'object',
      group: 'specs',
      description: 'Check the months when this product is available',
      options: {
        columns: 6,
        collapsible: false,
      },
      fields: [
        { name: 'january', type: 'boolean', title: 'Jan', initialValue: false },
        { name: 'february', type: 'boolean', title: 'Feb', initialValue: false },
        { name: 'march', type: 'boolean', title: 'Mar', initialValue: false },
        { name: 'april', type: 'boolean', title: 'Apr', initialValue: false },
        { name: 'may', type: 'boolean', title: 'May', initialValue: false },
        { name: 'june', type: 'boolean', title: 'Jun', initialValue: false },
        { name: 'july', type: 'boolean', title: 'Jul', initialValue: false },
        { name: 'august', type: 'boolean', title: 'Aug', initialValue: false },
        { name: 'september', type: 'boolean', title: 'Sep', initialValue: false },
        { name: 'october', type: 'boolean', title: 'Oct', initialValue: false },
        { name: 'november', type: 'boolean', title: 'Nov', initialValue: false },
        { name: 'december', type: 'boolean', title: 'Dec', initialValue: false },
      ],
    }),
    defineField({
      name: 'packaging',
      title: 'Packaging',
      type: 'string',
      group: 'specs',
      description: 'e.g., Master carton 15 KGs',
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'string',
      group: 'specs',
      description: 'e.g., 40, 48, 56, 64, 72, 80 per carton',
    }),
    defineField({
      name: 'storage',
      title: 'Storage Conditions',
      type: 'string',
      group: 'specs',
      description: 'e.g., 8-10°C with 85-90% humidity',
    }),
    defineField({
      name: 'shelfLife',
      title: 'Shelf Life',
      type: 'string',
      group: 'specs',
      description: 'e.g., 4-6 weeks',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      group: 'specs',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'GlobalGAP', value: 'GlobalGAP' },
          { title: 'ISO 9001', value: 'ISO 9001' },
          { title: 'Organic', value: 'Organic' },
          { title: 'HACCP', value: 'HACCP' },
        ],
      },
    }),

    // ============================================
    // SEO (localized)
    // ============================================
    defineField({
      name: 'seoAr',
      title: '🇪🇬 SEO Arabic',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 2 },
      ],
    }),
    defineField({
      name: 'seoEn',
      title: '🇬🇧 SEO English',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 2 },
      ],
    }),
    defineField({
      name: 'seoRu',
      title: '🇷🇺 SEO Russian',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 2 },
      ],
    }),
  ],

  preview: {
    select: {
      titleAr: 'titleAr',
      titleEn: 'titleEn',
      media: 'image',
      category: 'category',
      season: 'season',
    },
    prepare({ titleAr, titleEn, media, category, season }) {
      const seasonIcons: Record<string, string> = {
        'in-season': '✅',
        'coming-soon': '⏳',
        'peak': '🔥',
        'last-weeks': '⚠️',
      }
      const icon = season ? seasonIcons[season] || '' : ''

      return {
        title: `${titleEn || titleAr}`,
        subtitle: `${icon} ${category || ''} • ${titleAr || ''}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Name (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'titleEn', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }, { field: 'titleEn', direction: 'asc' }],
    },
  ],
})
