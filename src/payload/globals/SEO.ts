import type { GlobalConfig } from 'payload'

import { revalidateGlobalAfterChange } from '../hooks/revalidateContent.ts'

export const SEO: GlobalConfig = {
  slug: 'seo',
  label: 'SEO',
  admin: {
    group: 'Settings',
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
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              label: 'Page Title',
              admin: { description: 'Main <title> tag and default OG/Twitter title' },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              localized: true,
              label: 'Meta Description',
            },
          ],
        },
        {
          label: 'Open Graph',
          fields: [
            {
              name: 'ogTitle',
              type: 'text',
              localized: true,
              label: 'OG Title',
              admin: { description: 'Falls back to Page Title if empty' },
            },
            {
              name: 'ogDescription',
              type: 'textarea',
              localized: true,
              label: 'OG Description',
              admin: { description: 'Falls back to Meta Description if empty' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'OG Image',
            },
          ],
        },
        {
          label: 'Twitter',
          fields: [
            {
              name: 'twitterTitle',
              type: 'text',
              localized: true,
              label: 'Twitter Title',
              admin: { description: 'Falls back to Page Title if empty' },
            },
            {
              name: 'twitterDescription',
              type: 'textarea',
              localized: true,
              label: 'Twitter Description',
              admin: { description: 'Falls back to Meta Description if empty' },
            },
          ],
        },
        {
          label: 'Schema.org',
          fields: [
            {
              name: 'schemaName',
              type: 'text',
              localized: true,
              label: 'Business Name',
              admin: { description: 'Schema.org name property' },
            },
            {
              name: 'schemaDescription',
              type: 'textarea',
              localized: true,
              label: 'Business Description',
              admin: { description: 'Schema.org description property' },
            },
            {
              name: 'schemaServiceName',
              type: 'text',
              localized: true,
              label: 'Service Name',
              admin: { description: 'Schema.org offered service name' },
            },
          ],
        },
      ],
    },
  ],
}
