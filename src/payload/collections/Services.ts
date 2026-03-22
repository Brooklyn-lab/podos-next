import type { CollectionConfig } from 'payload'

import { revalidateAfterChange } from '../hooks/revalidateContent.ts'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
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
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Section Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Description',
    },
    {
      name: 'headerParagraph1',
      type: 'textarea',
      localized: true,
      label: 'Paragraph 1',
    },
    {
      name: 'headerParagraph2',
      type: 'textarea',
      localized: true,
      label: 'Paragraph 2',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Services',
      labels: {
        singular: 'Service',
        plural: 'Services',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Service Name',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'price',
              type: 'text',
              required: true,
              localized: true,
              label: 'Price',
              admin: {
                width: '33%',
              },
            },
            {
              name: 'duration',
              type: 'text',
              localized: true,
              label: 'Duration',
              admin: {
                width: '33%',
              },
            },
          ],
        },
        {
          name: 'treatment',
          type: 'textarea',
          localized: true,
          label: 'Treatment Description',
        },
      ],
    },
  ],
}
