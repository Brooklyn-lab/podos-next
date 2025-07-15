import { poppins } from '@/styles/fonts'
import '@/styles/globals.scss'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={poppins.variable}>{children}</body>
    </html>
  )
}
