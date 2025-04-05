import type { Field } from 'payload'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'leftColumn',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'textarea',
        },
        {
          name: 'cta',
          type: 'relationship',
          relationTo: 'pages',
        },
      ],
    },
    {
      name: 'middleImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rightColumn',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'textarea',
        },
        {
          name: 'cta',
          type: 'relationship',
          relationTo: 'pages',
        },
      ],
    },
  ],
  label: 'Hero Section',
}
