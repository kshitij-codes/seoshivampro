import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: 'One Third', value: 'oneThird' },
      { label: 'Half', value: 'half' },
      { label: 'Two Thirds', value: 'twoThirds' },
      { label: 'Full', value: 'full' },
    ],
  },
  {
    name: 'contentType',
    type: 'select',
    required: true,
    defaultValue: 'richText',
    options: [
      { label: 'Rich Text', value: 'richText' },
      { label: 'Media', value: 'media' },
      { label: 'Quote', value: 'quote' },
    ],
    label: 'Content Type',
  },
  {
    name: 'richText',
    type: 'richText',
    admin: {
      condition: (_, { contentType }) => contentType === 'richText',
    },
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
    label: false,
  },
  {
    name: 'quoteText',
    type: 'text',
    admin: {
      condition: (_, { contentType }) => contentType === 'quote',
    },
    label: 'Quote Text',
    required: true,
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, { contentType }) => contentType === 'media',
    },
  },
  {
    name: 'subColumnBlocks',
    type: 'array',
    label: 'Sub Column Blocks',
    fields: [
      {
        name: 'type',
        type: 'select',
        required: true,
        options: [
          { label: 'Rich Text', value: 'richText' },
          { label: 'Media', value: 'media' },
          { label: 'List', value: 'list' },
        ],
      },
      {
        name: 'richText',
        type: 'richText',
        admin: {
          condition: (_, { type }) => type === 'richText',
        },
        editor: lexicalEditor({
          features: ({ rootFeatures }) => [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ],
        }),
      },
      {
        name: 'media',
        type: 'upload',
        relationTo: 'media',
        admin: {
          condition: (_, { type }) => type === 'media',
        },
      },
      {
        name: 'list',
        type: 'array',
        admin: {
          condition: (_, { type }) => type === 'list',
        },
        fields: [
          {
            name: 'item',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  },  
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
      },
    },
  }),
]


export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
