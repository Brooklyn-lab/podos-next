import type { GlobalConfig } from 'payload'

import { revalidateGlobalAfterChange } from '../hooks/revalidateContent'

const localeAddressFields = (locale: string, label: string) => ({
  name: locale,
  type: 'group' as const,
  label,
  fields: [
    {
      name: 'addressTitle',
      type: 'text' as const,
      required: true,
      label: 'Address Section Title',
    },
    {
      name: 'address',
      type: 'text' as const,
      required: true,
      label: 'Street Address',
    },
    {
      name: 'building',
      type: 'text' as const,
      label: 'Building Details',
    },
    {
      name: 'additionalTitle',
      type: 'text' as const,
      label: 'Additional Info Title',
    },
    {
      name: 'additionalItems',
      type: 'array' as const,
      label: 'Additional Info Items',
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        {
          name: 'text',
          type: 'text' as const,
          required: true,
        },
      ],
    },
  ],
})

export const Settings: GlobalConfig = {
  slug: 'settings',
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
          label: 'Contact Info',
          fields: [
            {
              name: 'phone',
              type: 'text',
              required: true,
              label: 'Phone Number',
              admin: { description: 'e.g. +48574154801' },
            },
            {
              name: 'email',
              type: 'text',
              required: true,
              label: 'Email Address',
              admin: { description: 'e.g. podoswroclaw@gmail.com' },
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialMedia',
              type: 'array',
              label: 'Social Media Links',
              labels: { singular: 'Link', plural: 'Links' },
              fields: [
                {
                  name: 'platform',
                  type: 'text',
                  required: true,
                  label: 'Platform Name',
                  admin: { description: 'e.g. Facebook, Instagram' },
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'URL',
                },
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Icon',
                },
              ],
            },
          ],
        },
        {
          label: 'Map',
          fields: [
            {
              name: 'mapEmbedUrl',
              type: 'text',
              required: true,
              label: 'Google Maps Embed URL',
              admin: { description: 'URL for the iframe embed' },
            },
            {
              name: 'mapLinkUrl',
              type: 'text',
              required: true,
              label: 'Google Maps Link URL',
              admin: { description: 'Clickable link that opens in Google Maps' },
            },
            {
              name: 'mapIcon',
              type: 'upload',
              relationTo: 'media',
              label: 'Map Pin Icon',
            },
          ],
        },
        {
          label: 'Address — Polski',
          fields: [localeAddressFields('pl', 'Polish Address')],
        },
        {
          label: 'Address — Українська',
          fields: [localeAddressFields('ua', 'Ukrainian Address')],
        },
      ],
    },
  ],
}
