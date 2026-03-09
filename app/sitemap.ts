import type { MetadataRoute } from 'next'

import { i18n } from '@/config/i18n'
import { SITE_URL } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const { locales } = i18n
  const now = new Date()

  const localeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...localeEntries,
  ]
}
