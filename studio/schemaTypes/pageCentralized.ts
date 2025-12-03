import {defineType, defineField} from 'sanity'

/**
 * Centralized Page Schema
 * 
 * ONE document per page with:
 * - Shared fields (slug, published status) - fill ONCE
 * - Localized fields (title, content, SEO) - translate
 */
export const pageCentralizedType = defineType({
  name: 'pageCentralized',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'content', title: '📝 Content', default: true},
    {name: 'seo', title: '🔍 SEO'},
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
        source: 'titleEn',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: '🏠 Home', value: 'home'},
          {title: '📦 Products', value: 'products'},
          {title: 'ℹ️ About', value: 'about'},
          {title: '📞 Contact', value: 'contact'},
          {title: '📋 Services', value: 'services'},
          {title: '📄 Legal', value: 'legal'},
          {title: '📰 Blog', value: 'blog'},
        ],
      },
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      group: 'settings',
      description: 'Page is visible on the website',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Menu Order',
      type: 'number',
      group: 'settings',
      description: 'Order in navigation menu (lower = first)',
      initialValue: 0,
    }),

    // ============================================
    // LOCALIZED TITLES
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
    // LOCALIZED CONTENT (Rich Text)
    // ============================================
    defineField({
      name: 'contentAr',
      title: '🇪🇬 Content (Arabic)',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'contentEn',
      title: '🇬🇧 Content (English)',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'contentRu',
      title: '🇷🇺 Content (Russian)',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),

    // ============================================
    // HERO IMAGE (shared)
    // ============================================
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
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
        {name: 'metaTitle', type: 'string', title: 'Meta Title'},
        {name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 2},
      ],
    }),
    defineField({
      name: 'seoEn',
      title: '🇬🇧 SEO English',
      type: 'object',
      group: 'seo',
      fields: [
        {name: 'metaTitle', type: 'string', title: 'Meta Title'},
        {name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 2},
      ],
    }),
    defineField({
      name: 'seoRu',
      title: '🇷🇺 SEO Russian',
      type: 'object',
      group: 'seo',
      fields: [
        {name: 'metaTitle', type: 'string', title: 'Meta Title'},
        {name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 2},
      ],
    }),
  ],

  preview: {
    select: {
      titleEn: 'titleEn',
      titleAr: 'titleAr',
      pageType: 'pageType',
      isPublished: 'isPublished',
      media: 'heroImage',
    },
    prepare({titleEn, titleAr, pageType, isPublished, media}) {
      const typeIcons: Record<string, string> = {
        'home': '🏠',
        'products': '📦',
        'about': 'ℹ️',
        'contact': '📞',
        'services': '📋',
        'legal': '📄',
        'blog': '📰',
      }
      const icon = pageType ? typeIcons[pageType] || '📄' : '📄'
      const status = isPublished ? '✅' : '📝'
      
      return {
        title: `${icon} ${titleEn || titleAr}`,
        subtitle: `${status} ${isPublished ? 'Published' : 'Draft'} • ${titleAr || ''}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Menu Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{field: 'titleEn', direction: 'asc'}],
    },
  ],
})
