'use client'

import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

export const useIsomorphicEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function matchMediaFallback(query: string) {
  const mediaQueryList = window.matchMedia(query)

  return {
    matches: mediaQueryList.matches,
    media: mediaQueryList.media,
    addEventListener: (listener: (e: MediaQueryListEvent) => void) => {
      if (typeof mediaQueryList.addEventListener === 'function') {
        mediaQueryList.addEventListener('change', listener)
      } else {
        mediaQueryList.addListener(listener)
      }
    },
    removeEventListener: (listener: (e: MediaQueryListEvent) => void) => {
      if (typeof mediaQueryList.removeEventListener === 'function') {
        mediaQueryList.removeEventListener('change', listener)
      } else {
        mediaQueryList.removeListener(listener)
      }
    },
  }
}

const breakpoints = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1440,
}

export function useMediaQuery(query: keyof typeof breakpoints | number) {
  const [match, setMatch] = useState(false)
  const breakpoint = typeof query === 'number' ? query : breakpoints[query]

  const listener = useCallback((e: MediaQueryListEvent) => {
    setMatch(e.matches)
  }, [])

  useIsomorphicEffect(() => {
    if (typeof window !== 'undefined') {
      const mql = matchMediaFallback(`(max-width: ${breakpoint}px)`)

      setMatch(mql.matches)

      mql.addEventListener(listener)

      return () => mql.removeEventListener(listener)
    }
  }, [breakpoint, listener, query])

  return match
}

export const useIsMobile = () => useMediaQuery('sm') // < 768px
export const useIsTablet = () => useMediaQuery('md') // < 992px
