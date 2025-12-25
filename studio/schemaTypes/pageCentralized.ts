import { defineType, defineField, defineArrayMember } from 'sanity'

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
    { name: 'general', title: '🌐 General', default: true },
    { name: 'homeHero', title: '🚀 Home: Hero' },
    { name: 'homeTrust', title: '🛡️ Home: Trust Strip' },
    { name: 'homeWhy', title: '🤔 Home: Why Choose Us' },
    { name: 'homeTestimonials', title: '💬 Home: Testimonials' },
    { name: 'homeCTA', title: '📢 Home: CTA' },
    { name: 'aboutContent', title: 'ℹ️ About: Content' },
    { name: 'content', title: '📝 Content', hidden: true }, // Hidden - not used on website
    { name: 'seo', title: '🔍 SEO' },
    { name: 'settings', title: '⚙️ Settings' },
  ],
  fields: [
    // ============================================
    // SETTINGS
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
          { title: '🏠 Home', value: 'home' },
          { title: 'ℹ️ About', value: 'about' },
          { title: '📞 Contact', value: 'contact' },
          { title: '📋 Services', value: 'services' },
          { title: '📄 Generic', value: 'generic' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Menu Order',
      type: 'number',
      group: 'settings',
      initialValue: 0,
    }),

    // ============================================
    // TITLES (Common)
    // ============================================
    defineField({
      name: 'titleAr',
      title: 'Title (Arabic)',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleRu',
      title: 'Title (Russian)',
      type: 'string',
      group: 'general',
    }),

    // ============================================
    // HOME: HERO SECTION
    // ============================================
    defineField({
      name: 'heroTitleAr',
      title: 'Hero Title (Arabic)',
      type: 'string',
      group: 'homeHero',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'heroTitleEn',
      title: 'Hero Title (English)',
      type: 'string',
      group: 'homeHero',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'heroSubtitleAr',
      title: 'Hero Subtitle (Arabic)',
      type: 'text',
      rows: 2,
      group: 'homeHero',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'heroSubtitleEn',
      title: 'Hero Subtitle (English)',
      type: 'text',
      rows: 2,
      group: 'homeHero',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video File (URL)',
      type: 'string',
      description: 'URL to the background video (e.g., /hero-video.MOV)',
      group: 'homeHero',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),

    // ============================================
    // HOME: TRUST STRIP
    // ============================================
    defineField({
      name: 'yearsExportingAr',
      title: 'Years (Arabic) [e.g. ١٥+ سنة]',
      type: 'string',
      group: 'homeTrust',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'yearsExportingEn',
      title: 'Years (English) [e.g. 15+ Years]',
      type: 'string',
      group: 'homeTrust',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'countriesServedAr',
      title: 'Countries (Arabic)',
      type: 'string',
      group: 'homeTrust',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'countriesServedEn',
      title: 'Countries (English)',
      type: 'string',
      group: 'homeTrust',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'certifiedAr',
      title: 'Certified Text (Arabic)',
      type: 'string',
      group: 'homeTrust',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'certifiedEn',
      title: 'Certified Text (English)',
      type: 'string',
      group: 'homeTrust',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'containersPerYearAr',
      title: 'Containers Text (Arabic)',
      type: 'string',
      group: 'homeTrust',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'containersPerYearEn',
      title: 'Containers Text (English)',
      type: 'string',
      group: 'homeTrust',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),

    // ============================================
    // HOME: PRODUCTS INTRO
    // ============================================
    defineField({
      name: 'ourPremiumProductsAr',
      title: 'Products Title (Arabic)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'ourPremiumProductsEn',
      title: 'Products Title (English)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'freshCertifiedDeliveredAr',
      title: 'Products Tagline (Arabic)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'freshCertifiedDeliveredEn',
      title: 'Products Tagline (English)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),

    // ============================================
    // HOME: WHY CHOOSE US
    // ============================================
    defineField({
      name: 'whyChooseUsAr',
      title: 'Why Choose Us Title (Arabic)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'whyChooseUsEn',
      title: 'Why Choose Us Title (English)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    // Individual Card 1
    defineField({
      name: 'qualityCertifiedAr',
      title: 'Quality Card Title (Arabic)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'qualityCertifiedEn',
      title: 'Quality Card Title (English)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'qualityCertifiedDescAr',
      title: 'Quality Card Desc (Arabic)',
      type: 'text',
      rows: 2,
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'qualityCertifiedDescEn',
      title: 'Quality Card Desc (English)',
      type: 'text',
      rows: 2,
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    // Individual Card 2
    defineField({
      name: 'reliableDeliveryAr',
      title: 'Delivery Card Title (Arabic)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'reliableDeliveryEn',
      title: 'Delivery Card Title (English)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'reliableDeliveryDescAr',
      title: 'Delivery Card Desc (Arabic)',
      type: 'text',
      rows: 2,
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'reliableDeliveryDescEn',
      title: 'Delivery Card Desc (English)',
      type: 'text',
      rows: 2,
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    // Individual Card 3
    defineField({
      name: 'freshGuaranteeAr',
      title: 'Guarantee Card Title (Arabic)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'freshGuaranteeEn',
      title: 'Guarantee Card Title (English)',
      type: 'string',
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'freshGuaranteeDescAr',
      title: 'Guarantee Card Desc (Arabic)',
      type: 'text',
      rows: 2,
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'freshGuaranteeDescEn',
      title: 'Guarantee Card Desc (English)',
      type: 'text',
      rows: 2,
      group: 'homeWhy',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),

    // ============================================
    // HOME: TESTIMONIALS (Raw for speed, maps to testimonialXQuote)
    // ============================================
    defineField({
      name: 'testimonial1QuoteAr',
      title: 'Testimonial 1 Quote (Arabic)',
      type: 'text',
      rows: 2,
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial1QuoteEn',
      title: 'Testimonial 1 Quote (English)',
      type: 'text',
      rows: 2,
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial1AuthorAr',
      title: 'Testimonial 1 Author (Arabic)',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial1AuthorEn',
      title: 'Testimonial 1 Author (English)',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial1Company',
      title: 'Testimonial 1 Company',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial1Country',
      title: 'Testimonial 1 Country',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    // Testimonial 2
    defineField({
      name: 'testimonial2QuoteAr',
      title: 'Testimonial 2 Quote (Arabic)',
      type: 'text',
      rows: 2,
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial2QuoteEn',
      title: 'Testimonial 2 Quote (English)',
      type: 'text',
      rows: 2,
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial2AuthorAr',
      title: 'Testimonial 2 Author (Arabic)',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial2AuthorEn',
      title: 'Testimonial 2 Author (English)',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial2Company',
      title: 'Testimonial 2 Company',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial2Country',
      title: 'Testimonial 2 Country',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    // Testimonial 3
    defineField({
      name: 'testimonial3QuoteAr',
      title: 'Testimonial 3 Quote (Arabic)',
      type: 'text',
      rows: 2,
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial3QuoteEn',
      title: 'Testimonial 3 Quote (English)',
      type: 'text',
      rows: 2,
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial3AuthorAr',
      title: 'Testimonial 3 Author (Arabic)',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial3AuthorEn',
      title: 'Testimonial 3 Author (English)',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial3Company',
      title: 'Testimonial 3 Company',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'testimonial3Country',
      title: 'Testimonial 3 Country',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    // Section Title
    defineField({
      name: 'whatClientsSayAr',
      title: 'Testimonials Section Title (Arabic)',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'whatClientsSayEn',
      title: 'Testimonials Section Title (English)',
      type: 'string',
      group: 'homeTestimonials',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),

    // ============================================
    // HOME: CTA SECTION
    // ============================================
    defineField({
      name: 'readyToImportAr',
      title: 'CTA Title (Arabic)',
      type: 'string',
      group: 'homeCTA',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'readyToImportEn',
      title: 'CTA Title (English)',
      type: 'string',
      group: 'homeCTA',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'getCustomizedQuoteAr',
      title: 'CTA Subtitle (Arabic)',
      type: 'string',
      group: 'homeCTA',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'getCustomizedQuoteEn',
      title: 'CTA Subtitle (English)',
      type: 'string',
      group: 'homeCTA',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'getYourQuoteTodayAr',
      title: 'CTA Button Text (Arabic)',
      type: 'string',
      group: 'homeCTA',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),
    defineField({
      name: 'getYourQuoteTodayEn',
      title: 'CTA Button Text (English)',
      type: 'string',
      group: 'homeCTA',
      hidden: ({ document }) => document?.pageType !== 'home',
    }),


    // ============================================
    // ABOUT PAGE SPECIFIC
    // ============================================
    defineField({
      name: 'aboutSections',
      title: 'About Page Sections',
      type: 'array',
      group: 'aboutContent',
      hidden: ({ document }) => document?.pageType !== 'about',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Section',
          fields: [
            { name: 'titleAr', type: 'string', title: 'Title (Arabic)', validation: (rule) => rule.required() },
            { name: 'titleEn', type: 'string', title: 'Title (English)', validation: (rule) => rule.required() },
            { name: 'contentAr', type: 'text', title: 'Content (Arabic)', rows: 4 },
            { name: 'contentEn', type: 'text', title: 'Content (English)', rows: 4 },
            { name: 'image', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: {
              title: 'titleEn',
              subtitle: 'titleAr',
              media: 'image',
            },
          },
        })
      ]
    }),

    // ============================================
    // GENERIC CONTENT (Rich Text)
    // ============================================
    defineField({
      name: 'contentAr',
      title: 'Arabic Content',
      type: 'array',
      group: 'content',
      hidden: true, // Not used on website
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'image' })
      ],
    }),
    defineField({
      name: 'contentEn',
      title: 'English Content',
      type: 'array',
      group: 'content',
      hidden: true, // Not used on website
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'image' })
      ],
    }),

    // ============================================
    // SEO
    // ============================================
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitleAr', type: 'string', title: 'Meta Title (Ar)' },
        { name: 'metaTitleEn', type: 'string', title: 'Meta Title (En)' },
        { name: 'metaDescAr', type: 'text', title: 'Meta Description (Ar)', rows: 3 },
        { name: 'metaDescEn', type: 'text', title: 'Meta Description (En)', rows: 3 },
        { name: 'shareImage', type: 'image' },
      ]
    }),
    // Legacy SEO fields (for backward compatibility with existing data)
    defineField({
      name: 'seoAr',
      title: 'SEO (Arabic) - Legacy',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3 },
      ]
    }),
    defineField({
      name: 'seoEn',
      title: 'SEO (English) - Legacy',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3 },
      ]
    }),
    defineField({
      name: 'seoRu',
      title: 'SEO (Russian) - Legacy',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3 },
      ]
    }),

  ],

  preview: {
    select: {
      titleEn: 'titleEn',
      titleAr: 'titleAr',
      pageType: 'pageType',
      isPublished: 'isPublished',
    },
    prepare({ titleEn, titleAr, pageType, isPublished }) {
      const typeIcons: Record<string, string> = {
        'home': '🏠',
        'about': 'ℹ️',
        'contact': '📞',
        'services': '📋',
        'generic': '📄',
      }
      const icon = pageType ? typeIcons[pageType] || '📄' : '📄'
      const status = isPublished ? '✅' : '📝'

      return {
        title: `${icon} ${titleEn || titleAr || 'Untitled'}`,
        subtitle: `${status} ${pageType || 'No Type'} • ${titleAr || ''}`,
      }
    },
  },

  orderings: [
    {
      title: 'Menu Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'titleEn', direction: 'asc' }],
    },
  ],
})
