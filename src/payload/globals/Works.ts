import type { GlobalConfig } from 'payload'

import { revalidateGlobalAfterChange } from '../hooks/revalidateContent.ts'

export const Works: GlobalConfig = {
  slug: 'works',
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
            {
              name: 'headerParagraph1',
              type: 'textarea',
              localized: true,
              label: 'Paragraph',
            },
          ],
        },
        {
          label: 'Images',
          fields: [
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
                  label: 'Image Description (alt)',
                  defaultValue: 'Praca podologiczna',
                  admin: {
                    description: 'Optional. Defaults to "Praca podologiczna" if left empty.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
