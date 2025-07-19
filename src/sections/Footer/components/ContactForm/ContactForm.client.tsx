'use client'

import { Form } from '@/components/Form'
import { Locale } from '@/config/i18n'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
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

const API_KEY = 'b73c0779-3ca0-4f68-bdfc-f5592a047fb9'

export const ContactFormClient = ({ locale }: ContactFormClientProps) => {
  const t = translations[locale]
  const [showNotification, setShowNotification] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      formData.append('access_key', API_KEY)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setIsSuccess(true)
        setShowNotification(true)
        reset()

        // Track successful form submission
        analytics.trackFormSubmission('contact_form', true)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error(error)
      setIsSuccess(false)
      setShowNotification(true)

      // Track failed form submission
      analytics.trackFormSubmission('contact_form', false)
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
