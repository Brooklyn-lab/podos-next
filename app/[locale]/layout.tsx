import type { Viewport } from 'next'

import '@/styles/globals.scss'
import { poppins } from '@/styles/fonts'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { AnalyticsPageView } from '@/components/AnalyticsPageView'
import { GOOGLE_TAG_MANAGER_ID, isAnalyticsEnabled } from '@/constants/analytics'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CookieConsent } from '@/components/CookieConsent'
import { Suspense } from 'react'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
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
        {children}
        {isAnalyticsEnabled() && GOOGLE_TAG_MANAGER_ID && <CookieConsent />}
      </body>
    </html>
  )
}
