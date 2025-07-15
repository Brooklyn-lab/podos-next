import { type Metadata } from 'next'

import { i18n, type Locale } from '@/config/i18n'
import { Home as HomePage } from '@/components/Home'
import { generateSEOMetadata } from '@/utils/generateMetadata'
import { SEOHead } from '@/components/SEOHead'
import { LangSetter } from '@/components/LangSetter'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMetadata(locale)
}

type HomePageProps = {
  params: {
    locale: Locale
  }
}

export default async function Page({ params }: HomePageProps) {
  const { locale } = await params

  return (
    <>
      <SEOHead locale={locale} />
      <LangSetter locale={locale} />
      <main>
        <HomePage locale={locale} />
      </main>
    </>
  )
}
