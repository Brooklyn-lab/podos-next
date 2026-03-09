import type { MetadataRoute } from 'next'

const SITE_URL = 'https://podoswroclaw.pl'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['pl', 'ua'] as const
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
