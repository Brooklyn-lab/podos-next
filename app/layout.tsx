import { poppins } from '@/styles/fonts'
import '@/styles/globals.scss'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { GOOGLE_TAG_MANAGER_ID, isAnalyticsEnabled } from '@/constants/analytics'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </head>
      <body className={poppins.variable}>
        {isAnalyticsEnabled() && GOOGLE_TAG_MANAGER_ID && <GoogleAnalytics gtmId={GOOGLE_TAG_MANAGER_ID} />}
        {children}
      </body>
    </html>
  )
}
