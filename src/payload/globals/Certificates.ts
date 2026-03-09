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
  ],
})

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
          label: 'Polski',
          fields: [localeTextFields('pl', 'Polish Content')],
        },
        {
          label: 'Українська',
          fields: [localeTextFields('ua', 'Ukrainian Content')],
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
