import type { CollectionConfig } from 'payload'

import { revalidateAfterChange } from '../hooks/revalidateContent'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
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
      name: 'certificates',
      type: 'array',
      label: 'Certificates',
      labels: {
        singular: 'Certificate',
        plural: 'Certificates',
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
