import { Locale } from '@/config/i18n'
import { generateSchemaJSON } from '@/utils/generateMetadata'

type SEOHeadProps = {
  locale: Locale
}

export const SEOHead = ({ locale }: SEOHeadProps) => {
  const schemaData = generateSchemaJSON(locale)

  return (
    <>
      {/* Viewport */}
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no'
      />

      {/* Schema.org JSON-LD */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData, null, 2),
        }}
      />
    </>
  )
}
