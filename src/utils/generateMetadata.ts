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
  const currentUrl = `${SITE_URL}/${locale}`
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
        pl: `${SITE_URL}/pl`,
        uk: `${SITE_URL}/ua`,
        'x-default': `${SITE_URL}/pl`,
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
  const currentUrl = `${SITE_URL}/${locale}`

  return {
    '@context': 'https://schema.org/',
    '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness', 'LocalBusiness'],
    name: seo.schema.name,
    alternateName: 'podoswroclaw.pl',
    url: currentUrl,
    description: seo.schema.description,
    image: `${SITE_URL}/images/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Braniborska 61/13',
      addressLocality: 'Wrocław',
      postalCode: '53-680',
      addressCountry: 'PL',
    },
    telephone: '+48574154801',
    email: 'podoswroclaw@gmail.com',
    openingHours: ['Mo-Fr 09:00-18:00'],
    priceRange: '$$',
    serviceArea: {
      '@type': 'City',
      name: 'Wrocław',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Podiatric Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'pl' ? 'Usługi podologiczne' : 'Подологічні послуги',
          },
        },
      ],
    },
    sameAs: ['https://www.facebook.com/profile.php?id=61569433260872', 'https://www.instagram.com/podos.wroclaw/'],
  }
}
