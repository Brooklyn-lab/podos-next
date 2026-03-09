import type { GlobalConfig } from 'payload'

import { revalidateGlobalAfterChange } from '../hooks/revalidateContent'

const localeTextFields = (locale: string, label: string) => ({
  name: locale,
  type: 'group' as const,
  label,
  fields: [
    {
      name: 'title',
      type: 'text' as const,
      required: true,
      label: 'Section Title',
    },
    {
      name: 'description',
      type: 'textarea' as const,
      required: true,
      label: 'Description',
    },
    {
      name: 'headerParagraph1',
      type: 'textarea' as const,
      label: 'Paragraph',
    },
  ],
})

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
          label: 'Polski',
          fields: [localeTextFields('pl', 'Polish Content')],
        },
        {
          label: 'Українська',
          fields: [localeTextFields('ua', 'Ukrainian Content')],
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
