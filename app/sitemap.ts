import type { MetadataRoute } from 'next'

import { i18n } from '@/config/i18n'
import { getLangCode } from '@/config/locales'
import { SITE_URL } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const { locales } = i18n
  const now = new Date()

  const alternateLanguages = locales.reduce(
    (acc, locale) => {
      acc[getLangCode(locale)] = `${SITE_URL}/${locale}`
      return acc
    },
    { 'x-default': `${SITE_URL}/${i18n.defaultLocale}` } as Record<string, string>
  )

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: locale === i18n.defaultLocale ? 1.0 : 0.8,
    alternates: {
      languages: alternateLanguages,
    },
  }))
}
