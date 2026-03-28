'use client'

import { useState, type FormEvent } from 'react'
import { Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/form.json'
import uaTranslations from '@/translations/ua/form.json'
import styles from './Form.module.scss'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type FormFields = {
  name: string
  phone: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

type FormProps = {
  locale: Locale
  onSubmit: (data: FormFields, reset: () => void) => Promise<void>
}

const initialValues: FormFields = { name: '', phone: '', email: '', message: '' }

export const Form = ({ locale, onSubmit }: FormProps) => {
  const t = translations[locale]
  const [values, setValues] = useState<FormFields>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!values.name.trim()) next.name = 'Name is required'
    if (!values.phone.trim()) next.phone = 'Phone is required'
    if (!values.email.trim()) next.email = 'Email is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
  }

  const handleChange = (field: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) onSubmit(values, reset)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor='name'>
        <span className={styles.required}>{t.name}</span>
        <p className={styles.error}>{errors.name}</p>
      </label>
      <input className={styles.input} id='name' type='text' value={values.name} onChange={handleChange('name')} />

      <label className={styles.label} htmlFor='phone'>
        <span className={styles.required}>{t.phone}</span>
        <p className={styles.error}>{errors.phone}</p>
      </label>
      <input className={styles.input} id='phone' type='tel' value={values.phone} onChange={handleChange('phone')} />

      <label className={styles.label} htmlFor='email'>
        <span className={styles.required}>{t.email}</span>
        <p className={styles.error}>{errors.email}</p>
      </label>
      <input className={styles.input} id='email' type='email' value={values.email} onChange={handleChange('email')} />

      <label className={styles.label} htmlFor='message'>
        {t.message}
      </label>
      <textarea className={styles.textarea} id='message' value={values.message} onChange={handleChange('message')} />

      <button className={styles.submitButton} type='submit'>
        {t.submitButton}
      </button>
    </form>
  )
}
