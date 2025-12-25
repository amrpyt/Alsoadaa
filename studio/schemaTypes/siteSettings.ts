import { defineType, defineField, defineArrayMember } from 'sanity'

/**
 * Site Settings - Singleton Document
 * Centralized settings for the entire website
 */
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: '⚙️ Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: '🌐 General', default: true },
    { name: 'header', title: '🧭 Header' },
    { name: 'footer', title: '👣 Footer' },
    { name: 'contact', title: '📞 Contact' },
    { name: 'social', title: '📱 Social Media' },
    { name: 'seo', title: '🔍 Global SEO' },
  ],
  fields: [
    // ============================================
    // GENERAL
    // ============================================
    defineField({
      name: 'companyNameAr',
      title: 'Company Name (Arabic)',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'companyNameEn',
      title: 'Company Name (English)',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'companyNameRu',
      title: 'Company Name (Russian)',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),

    // ============================================
    // CONTACT INFO
    // ============================================
    defineField({
      name: 'email',
      title: 'Primary Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Primary Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      group: 'contact',
      description: 'Format: +201234567890',
    }),
    defineField({
      name: 'addressAr',
      title: 'Address (Arabic)',
      type: 'text',
      group: 'contact',
      rows: 2,
    }),
    defineField({
      name: 'addressEn',
      title: 'Address (English)',
      type: 'text',
      group: 'contact',
      rows: 2,
    }),
    defineField({
      name: 'addressRu',
      title: 'Address (Russian)',
      type: 'text',
      group: 'contact',
      rows: 2,
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', options: { list: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'] }, validation: (rule) => rule.required() },
            { name: 'url', type: 'url', title: 'URL', validation: (rule) => rule.required() },
          ],
        }),
      ],
    }),

    // ============================================
    // FOOTER
    // ============================================
    defineField({
      name: 'footerDescAr',
      title: 'Footer Description (Arabic)',
      type: 'text',
      rows: 2,
      group: 'footer',
    }),
    defineField({
      name: 'footerDescEn',
      title: 'Footer Description (English)',
      type: 'text',
      rows: 2,
      group: 'footer',
    }),
    defineField({
      name: 'copyrightAr',
      title: 'Copyright Text (Arabic)',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'copyrightEn',
      title: 'Copyright Text (English)',
      type: 'string',
      group: 'footer',
    }),

    // ============================================
    // BUTTON TEXTS (Global UI)
    // ============================================
    defineField({
      name: 'requestQuoteAr',
      title: 'Request Quote Button (Arabic)',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'requestQuoteEn',
      title: 'Request Quote Button (English)',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'viewProductsAr',
      title: 'View Products Button (Arabic)',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'viewProductsEn',
      title: 'View Products Button (English)',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'viewAllProductsAr',
      title: 'View All Products Button (Arabic)',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'viewAllProductsEn',
      title: 'View All Products Button (English)',
      type: 'string',
      group: 'header',
    }),

    // ============================================
    // GLOBAL SEO
    // ============================================
    defineField({
      name: 'defaultSeoAr',
      title: 'Default SEO Arabic',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 2 },
      ],
    }),
    defineField({
      name: 'defaultSeoEn',
      title: 'Default SEO English',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 2 },
      ],
    }),
    defineField({
      name: 'defaultSeoRu',
      title: 'Default SEO Russian',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 2 },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Site Settings',
        subtitle: 'Manage company info, social links, and SEO',
      }
    },
  },
})
