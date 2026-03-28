import { Metadata } from 'next'
import { Locale } from '@/config/i18n'
import { localeCodes, defaultLocaleCode, getLangCode } from '@/config/locales'
import { SITE_URL } from '@/config/site'
import { getSEO, type SEOData } from '@/lib/payload'

function buildAlternateLanguages(): Record<string, string> {
  const langs: Record<string, string> = {}
  for (const code of localeCodes) {
    langs[getLangCode(code)] = `${SITE_URL}/${code}`
  }
  langs['x-default'] = `${SITE_URL}/${defaultLocaleCode}`
  return langs
}

const FALLBACK_SEO: Record<string, SEOData> = {
  pl: {
    title: 'PodOS Gabinet Podologiczny Wrocław – zdrowe stopy - łatwe chodzenie.',
    description:
      'PodOS - to miejsce, w którym dbałość o zdrowie i estetykę stóp łączy się z profesjonalizmem i nowoczesnymi metodami leczenia.',
    schemaName: 'PodOS',
    schemaServiceName: 'Usługi podologiczne',
  },
  ua: {
    title: 'PodOS Кабінет Подологічний (Вроцлав) – здорові стопи - легка хода.',
    description:
      "PodOS - це місце, де турбота про здоров'я та естетику ніг поєднується з професіоналізмом та сучасними методами лікування.",
    schemaName: 'PodOS',
    schemaServiceName: 'Подологічні послуги',
  },
}

export async function generateSEOMetadata(locale: Locale): Promise<Metadata> {
  const seo = (await getSEO(locale)) ?? FALLBACK_SEO[locale] ?? FALLBACK_SEO.pl
  const currentUrl = `${SITE_URL}/${locale}`

  const ogImageUrl =
    typeof seo.ogImage === 'object' && seo.ogImage?.url ? seo.ogImage.url : `${SITE_URL}/images/og-image.jpg`

  return {
    title: seo.title,
    description: seo.description,
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
      'max-video-preview': -1,
    },

    alternates: {
      canonical: currentUrl,
      languages: buildAlternateLanguages(),
    },

    openGraph: {
      type: 'website',
      url: currentUrl,
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: [
        {
          url: ogImageUrl,
          width: 1024,
          height: 537,
          type: 'image/jpeg',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: seo.twitterTitle || seo.title,
      description: seo.twitterDescription || seo.description,
      images: [ogImageUrl],
    },

    icons: {
      icon: '/favicon.ico',
    },

    other: {},
  }
}

export async function generateSchemaJSON(locale: Locale) {
  const seo = (await getSEO(locale)) ?? FALLBACK_SEO[locale] ?? FALLBACK_SEO.pl
  const currentUrl = `${SITE_URL}/${locale}`

  return {
    '@context': 'https://schema.org/',
    '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness', 'LocalBusiness'],
    name: seo.schemaName || 'PodOS',
    alternateName: 'podoswroclaw.pl',
    url: currentUrl,
    description: seo.schemaDescription || seo.description,
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
            name: seo.schemaServiceName || 'Podiatric Services',
          },
        },
      ],
    },
    sameAs: ['https://www.facebook.com/profile.php?id=61569433260872', 'https://www.instagram.com/podos.wroclaw/'],
  }
}
