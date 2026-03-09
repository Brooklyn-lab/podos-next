import '@/styles/globals.scss'
import { poppins } from '@/styles/fonts'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { AnalyticsPageView } from '@/components/AnalyticsPageView'
import { GOOGLE_TAG_MANAGER_ID, isAnalyticsEnabled } from '@/constants/analytics'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Suspense } from 'react'

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
      </body>
    </html>
  )
}
