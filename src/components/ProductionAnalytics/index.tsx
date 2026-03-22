import { Suspense } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { AnalyticsPageView } from '@/components/AnalyticsPageView'
import { CookieConsent } from '@/components/CookieConsent'
import { GOOGLE_TAG_MANAGER_ID, isProductionDeployment } from '@/constants/analytics'

export function ProductionAnalytics() {
  if (!isProductionDeployment) return null

  return (
    <>
      {GOOGLE_TAG_MANAGER_ID && (
        <>
          <GoogleAnalytics gtmId={GOOGLE_TAG_MANAGER_ID} />
          <Suspense fallback={null}>
            <AnalyticsPageView />
          </Suspense>
          <CookieConsent />
        </>
      )}
      <SpeedInsights />
      <Analytics />
    </>
  )
}
