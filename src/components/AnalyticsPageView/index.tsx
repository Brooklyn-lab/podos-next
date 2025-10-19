'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { isAnalyticsEnabled } from '@/constants/analytics'

export function AnalyticsPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!isAnalyticsEnabled()) return
    if (typeof window === 'undefined') return

    const query = searchParams?.toString()
    const url = pathname + (query ? `?${query}` : '')

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'page_view',
      page_location: url,
      page_title: document.title,
    })
  }, [pathname, searchParams])

  return null
}
