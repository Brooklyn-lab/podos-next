import type { Metadata } from 'next'

import { poppins } from '@/styles/fonts'
import '@/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Podos',
  description: 'Podos Next.js App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='pl' suppressHydrationWarning>
      <body className={poppins.variable}>{children}</body>
    </html>
  )
}
