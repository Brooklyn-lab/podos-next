import type { Viewport } from 'next'

import '@/styles/globals.scss'
import { poppins } from '@/styles/fonts'
import { ProductionAnalytics } from '@/components/ProductionAnalytics'
import { type Locale } from '@/config/i18n'
import { getLangCode } from '@/config/locales'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale

  return (
    <html lang={getLangCode(locale)} suppressHydrationWarning>
      <body className={poppins.variable}>
        <ProductionAnalytics />
        {children}
      </body>
    </html>
  )
}
