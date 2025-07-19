import { Locale } from '@/config/i18n'
import { generateSchemaJSON } from '@/utils/generateMetadata'
import plSeo from '@/translations/pl/seo.json'
import uaSeo from '@/translations/ua/seo.json'

const seoTranslations = {
  pl: plSeo,
  ua: uaSeo,
} as const

type SEOHeadProps = {
  locale: Locale
}

export const SEOHead = ({ locale }: SEOHeadProps) => {
  const schemaData = generateSchemaJSON(locale)
  const seo = seoTranslations[locale]
  const SITE_URL = 'https://podoswroclaw.pl'
  const currentUrl = `${SITE_URL}/${locale}`

  return (
    <>
      <title>{seo.title}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
      <meta name='description' content={seo.description} />
      <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
      <link rel='dns-prefetch' href='//www.googletagmanager.com' />
      <link rel='dns-prefetch' href='//fonts.googleapis.com' />
      <link rel='dns-prefetch' href='//api.web3forms.com' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={currentUrl} />
      <meta property='og:title' content={seo.og.title} />
      <meta property='og:description' content={seo.og.description} />
      <meta property='og:image' content={`${SITE_URL}/images/og-image.jpg`} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={seo.twitter.title} />
      <meta name='twitter:description' content={seo.twitter.description} />
      <meta name='twitter:image' content={`${SITE_URL}/images/og-image.jpg`} />
      <link rel='preload' as='image' href='/images/sections/hero/bg-desc.webp' type='image/webp' fetchPriority='high' />
      <link
        rel='preload'
        as='image'
        href='/images/sections/hero/bg-desc@2x.webp'
        type='image/webp'
        media='(min-resolution: 2dppx)'
        fetchPriority='high'
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData, null, 2),
        }}
      />
    </>
  )
}
