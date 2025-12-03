import {defineType, defineField} from 'sanity'

/**
 * Form Submission Schema
 * 
 * Stores all form submissions from the website
 * (Contact forms and Quote requests)
 */
export const formSubmissionType = defineType({
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  groups: [
    {name: 'contact', title: '👤 Contact Info', default: true},
    {name: 'request', title: '📦 Request Details'},
    {name: 'management', title: '⚙️ Management'},
  ],
  fields: [
    // ============================================
    // CONTACT INFO
    // ============================================
    defineField({
      name: 'type',
      title: 'Form Type',
      type: 'string',
      group: 'contact',
      options: {
        list: [
          {title: '📞 Contact', value: 'contact'},
          {title: '💰 Quote Request', value: 'quote'},
        ],
      },
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'language',
      title: 'Submission Language',
      type: 'string',
      group: 'contact',
      description: 'Language the form was submitted in',
      readOnly: true,
    }),
    defineField({
      name: 'name',
      title: '👤 Name',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: '📧 Email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: '📱 Phone',
      type: 'string',
      group: 'contact',
      readOnly: true,
    }),
    defineField({
      name: 'company',
      title: '🏢 Company',
      type: 'string',
      group: 'contact',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: '💬 Message',
      type: 'text',
      group: 'contact',
      rows: 5,
      readOnly: true,
    }),

    // ============================================
    // REQUEST DETAILS (for quote requests)
    // ============================================
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'object',
      group: 'request',
      fields: [
        defineField({
          name: 'products',
          title: '📦 Products',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'productIds',
          title: '🔑 Product IDs',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'quantity',
          title: '📊 Quantity',
          type: 'string',
        }),
        defineField({
          name: 'deliveryTimeframe',
          title: '🚚 Delivery Timeframe',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: '🌍 Country',
          type: 'string',
        }),
      ],
      description: 'For quote requests',
      readOnly: true,
    }),

    // ============================================
    // MANAGEMENT
    // ============================================
    defineField({
      name: 'submittedAt',
      title: '📅 Submitted At',
      type: 'datetime',
      group: 'management',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: '📊 Status',
      type: 'string',
      group: 'management',
      options: {
        list: [
          {title: '🆕 New', value: 'new'},
          {title: '👀 Reviewed', value: 'reviewed'},
          {title: '✅ Responded', value: 'responded'},
          {title: '📁 Archived', value: 'archived'},
        ],
      },
      initialValue: 'new',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'notes',
      title: '📝 Internal Notes',
      type: 'text',
      group: 'management',
      rows: 3,
      description: 'Internal notes for team members',
    }),
  ],

  preview: {
    select: {
      name: 'name',
      email: 'email',
      type: 'type',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare({name, email, type, status, submittedAt}) {
      const typeIcons: Record<string, string> = {
        'contact': '📞',
        'quote': '💰',
      }
      const statusIcons: Record<string, string> = {
        'new': '🆕',
        'reviewed': '👀',
        'responded': '✅',
        'archived': '📁',
      }
      const tIcon = type ? typeIcons[type] || '' : ''
      const sIcon = status ? statusIcons[status] || '' : ''
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : ''
      
      return {
        title: `${tIcon} ${name}`,
        subtitle: `${sIcon} ${status} • ${email} • ${date}`,
      }
    },
  },

  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{field: 'status', direction: 'asc'}],
    },
  ],
})
