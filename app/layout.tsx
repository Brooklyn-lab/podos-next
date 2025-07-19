import { poppins } from '@/styles/fonts'
import '@/styles/globals.scss'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { GOOGLE_TAG_MANAGER_ID, isAnalyticsEnabled } from '@/constants/analytics'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={poppins.variable}>
        {isAnalyticsEnabled() && <GoogleAnalytics gtmId={GOOGLE_TAG_MANAGER_ID} />}
        {children}
      </body>
    </html>
  )
}
