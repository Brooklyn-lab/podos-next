import type { GlobalConfig } from 'payload'

import { revalidateGlobalAfterChange } from '../hooks/revalidateContent.ts'

export const Certificates: GlobalConfig = {
  slug: 'certificates',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
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
          ],
        },
        {
          label: 'Certificates',
          fields: [
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
                  label: 'Image Description (alt)',
                  defaultValue: 'Certificate',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
