'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { type Locale, i18n } from '@/config/i18n'
import plTranslations from '@/translations/pl/cookies.json'
import uaTranslations from '@/translations/ua/cookies.json'
import styles from './CookieConsent.module.scss'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

const COOKIE_NAME = 'cookie_consent'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function getConsentCookie(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setConsentCookie(value: 'granted' | 'denied') {
  document.cookie = `${COOKIE_NAME}=${value};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`
}

function updateGtagConsent(granted: boolean) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'consent_update',
    consent_command: 'update',
    analytics_storage: granted ? 'granted' : 'denied',
  })
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    })
  }
}

function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split('/')[1]
  if (i18n.locales.includes(segment as Locale)) return segment as Locale
  return i18n.defaultLocale
}

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = translations[locale]

  useEffect(() => {
    const consent = getConsentCookie()
    if (consent === 'granted') {
      updateGtagConsent(true)
    } else if (consent === null) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    setConsentCookie('granted')
    updateGtagConsent(true)
    setVisible(false)
  }

  const handleReject = () => {
    setConsentCookie('denied')
    updateGtagConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role='dialog' aria-label='Cookie consent'>
      <p className={styles.message}>{t.message}</p>
      <div className={styles.actions}>
        <button className={styles.accept} onClick={handleAccept} type='button'>
          {t.accept}
        </button>
        <button className={styles.reject} onClick={handleReject} type='button'>
          {t.reject}
        </button>
      </div>
    </div>
  )
}
