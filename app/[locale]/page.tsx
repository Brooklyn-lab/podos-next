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

export default function Page({ params: { locale } }: HomePageProps) {
  return (
    <main>
      <HomePage locale={locale} />
    </main>
  )
}
