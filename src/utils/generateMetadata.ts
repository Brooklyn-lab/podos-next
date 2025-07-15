import { Metadata } from 'next'
import { Locale } from '@/config/i18n'
import plSeo from '@/translations/pl/seo.json'
import uaSeo from '@/translations/ua/seo.json'

const seoTranslations = {
  pl: plSeo,
  ua: uaSeo,
} as const

const SITE_URL = 'https://podoswroclaw.pl'

export function generateSEOMetadata(locale: Locale): Metadata {
  const seo = seoTranslations[locale]
  const currentUrl = locale === 'pl' ? SITE_URL : `${SITE_URL}/${locale}`
  const ogImageUrl = `${SITE_URL}/images/og-image.jpg`

  return {
    title: seo.title,
    description: seo.description,
    robots: 'index, follow',

    // Viewport (not in Metadata, but we'll add it to layout)

    // Canonical
    alternates: {
      canonical: currentUrl,
      languages: {
        pl: SITE_URL,
        uk: `${SITE_URL}/ua`,
        'x-default': SITE_URL,
      },
    },

    // Open Graph
    openGraph: {
      type: 'website',
      url: currentUrl,
      title: seo.og.title,
      description: seo.og.description,
      images: [
        {
          url: ogImageUrl,
          width: 300,
          height: 300,
          type: 'image/jpg',
        },
      ],
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: [ogImageUrl],
    },

    // Icons
    icons: {
      icon: '/favicon.ico',
    },

    // Additional meta
    other: {},
  }
}

export function generateSchemaJSON(locale: Locale) {
  const seo = seoTranslations[locale]
  const currentUrl = locale === 'pl' ? SITE_URL : `${SITE_URL}/${locale}`

  return {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: seo.schema.name,
    alternateName: 'podoswroclaw.pl',
    url: currentUrl,
    description: seo.schema.description,
    image: '',
    sameAs: ['https://www.facebook.com/profile.php?id=61569433260872', 'https://www.instagram.com/podos.wroclaw/'],
  }
}
