import { type Metadata } from 'next'

import { i18n, type Locale } from '@/config/i18n'
import { Home as HomePage } from '@/components/Home'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Podos',
  description: 'Podos Next.js App',
}

type HomePageProps = {
  params: {
    locale: Locale
  }
}

export default async function Page({ params }: HomePageProps) {
  const { locale } = await params

  return (
    <main>
      <HomePage locale={locale} />
    </main>
  )
}
