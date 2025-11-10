import {defineType, defineField} from 'sanity'

export const formSubmissionType = defineType({
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [
          {title: 'Contact', value: 'contact'},
          {title: 'Quote Request', value: 'quote'},
        ],
      },
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'language',
      title: 'Submission Language',
      type: 'string',
      description: 'Language the form was submitted in',
      readOnly: true,
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
      readOnly: true,
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'object',
      fields: [
        defineField({
          name: 'products',
          title: 'Products',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'productIds',
          title: 'Product IDs',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'quantity',
          title: 'Quantity',
          type: 'string',
        }),
        defineField({
          name: 'deliveryTimeframe',
          title: 'Delivery Timeframe',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
        }),
      ],
      description: 'For quote requests',
      readOnly: true,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Reviewed', value: 'reviewed'},
          {title: 'Responded', value: 'responded'},
          {title: 'Archived', value: 'archived'},
        ],
      },
      initialValue: 'new',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
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
      return {
        title: `${name} - ${type}`,
        subtitle: `${email} | ${status} | ${new Date(submittedAt).toLocaleDateString()}`,
      }
    },
  },
})
