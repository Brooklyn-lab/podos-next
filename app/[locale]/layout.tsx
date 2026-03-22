import type { Viewport } from 'next'

import '@/styles/globals.scss'
import { poppins } from '@/styles/fonts'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { AnalyticsPageView } from '@/components/AnalyticsPageView'
import { GOOGLE_TAG_MANAGER_ID, isAnalyticsEnabled } from '@/constants/analytics'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { CookieConsent } from '@/components/CookieConsent'
import { Suspense } from 'react'
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
        {isAnalyticsEnabled() && GOOGLE_TAG_MANAGER_ID && (
          <>
            <GoogleAnalytics gtmId={GOOGLE_TAG_MANAGER_ID} />
            <Suspense fallback={null}>
              <AnalyticsPageView />
            </Suspense>
          </>
        )}
        <SpeedInsights />
        <Analytics />
        {children}
        {isAnalyticsEnabled() && GOOGLE_TAG_MANAGER_ID && <CookieConsent />}
      </body>
    </html>
  )
}
