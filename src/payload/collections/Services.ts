import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'locale', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true, // Public read access
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
      name: 'headerParagraph2',
      type: 'textarea',
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
          label: 'Service Name',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'price',
              type: 'text',
              required: true,
              label: 'Price',
              admin: {
                width: '33%',
              },
            },
            {
              name: 'duration',
              type: 'text',
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
          label: 'Treatment Description',
        },
      ],
    },
  ],
}
