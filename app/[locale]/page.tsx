import { type Metadata } from 'next'
import { prefetchDNS } from 'react-dom'

import { i18n, type Locale } from '@/config/i18n'
import { Home as HomePage } from '@/components/Home'
import { generateSEOMetadata, generateSchemaJSON } from '@/utils/generateMetadata'
import { LangSetter } from '@/components/LangSetter'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMetadata(locale)
}

type HomePageProps = {
  params: Promise<{
    locale: Locale
  }>
}

export default async function Page({ params }: HomePageProps) {
  const { locale } = await params
  const schemaData = generateSchemaJSON(locale)

  prefetchDNS('//www.googletagmanager.com')
  prefetchDNS('//fonts.googleapis.com')
  prefetchDNS('//api.web3forms.com')

  return (
    <>
      <link
        rel='preload'
        as='image'
        imageSrcSet='/images/sections/hero/bg-mob.webp 1x, /images/sections/hero/bg-mob@2x.webp 2x'
        media='(max-width: 479px)'
      />
      <link
        rel='preload'
        as='image'
        imageSrcSet='/images/sections/hero/bg-tabl.webp 1x, /images/sections/hero/bg-tabl@2x.webp 2x'
        media='(min-width: 480px) and (max-width: 991px)'
      />
      <link
        rel='preload'
        as='image'
        imageSrcSet='/images/sections/hero/bg-desc.webp 1x, /images/sections/hero/bg-desc@2x.webp 2x'
        media='(min-width: 992px)'
      />
      <LangSetter locale={locale} />
      <main>
        <HomePage locale={locale} />
      </main>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
    </>
  )
}
