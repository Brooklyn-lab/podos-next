'use client'

import { Form } from '@/components/Form'
import { Locale } from '@/config/i18n'
import { useState } from 'react'
import { Notification } from '@/components/Notification'
import { analytics } from '@/utils/analytics'
import plTranslations from '@/translations/pl/form.json'
import uaTranslations from '@/translations/ua/form.json'
import styles from './ContactForm.module.scss'

type ContactFormClientProps = {
  locale: Locale
}

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

export const ContactFormClient = ({ locale }: ContactFormClientProps) => {
  const t = translations[locale]
  const [showNotification, setShowNotification] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = async (data: Record<string, string>, reset: () => void) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        setShowNotification(true)
        reset()

        analytics.trackFormSubmission('contact_form', true)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error(error)
      setIsSuccess(false)
      setShowNotification(true)
    }
  }

  return (
    <>
      <Form locale={locale} onSubmit={onSubmit} />
      {showNotification && (
        <Notification onClose={() => setShowNotification(false)} autoCloseTime={1000}>
          {isSuccess ? (
            <p className={styles.success}>{t.successMessage}</p>
          ) : (
            <p className={styles.error}>{t.errorMessage}</p>
          )}
        </Notification>
      )}
    </>
  )
}
