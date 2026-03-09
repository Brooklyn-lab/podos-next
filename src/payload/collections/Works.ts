import type { CollectionConfig } from 'payload'

import { revalidateAfterChange } from '../hooks/revalidateContent'

export const Works: CollectionConfig = {
  slug: 'works',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'locale', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
  },
  fields: [
    {
      name: 'locale',
      type: 'select',
      required: true,
      defaultValue: 'ua',
      options: [
        { label: 'Ukrainian', value: 'ua' },
        { label: 'Polish', value: 'pl' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'headerParagraph1',
      type: 'textarea',
      label: 'Paragraph 1',
    },
    {
      name: 'works',
      type: 'array',
      label: 'Works',
      labels: {
        singular: 'Work',
        plural: 'Works',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'imageAlt',
          type: 'text',
          required: true,
          label: 'Image Description (alt)',
        },
      ],
    },
  ],
}
