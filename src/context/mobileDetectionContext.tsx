'use client'

import type { ReactNode } from 'react'
import { createContext, memo, useContext, useEffect, useState } from 'react'
import { detectMobile } from '../utils/helpers'

export const DetectMobileContext = createContext<boolean>(false)

interface DetectMobileProps {
  children: ReactNode
  isMobile: boolean
}

function DetectMobileProvider(props: DetectMobileProps) {
  const { children, isMobile } = props
  const [mobile, setMobile] = useState(isMobile)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMobile(detectMobile())
    }
  }, [])

  return <DetectMobileContext.Provider value={mobile}>{children}</DetectMobileContext.Provider>
}

function useIsMobile() {
  const mobile = useContext(DetectMobileContext)

  if (mobile === undefined) {
    throw new Error('useIsMobile must be used within a DetectMobileProvider')
  }

  return mobile
}

const DetectMobileProviderMemo = memo(DetectMobileProvider)

export { DetectMobileProviderMemo as DetectMobileProvider, useIsMobile }
