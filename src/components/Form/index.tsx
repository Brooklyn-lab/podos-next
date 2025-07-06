'use client'

import { FieldValues, useForm } from 'react-hook-form'
import { Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/form.json'
import uaTranslations from '@/translations/ua/form.json'
import styles from './Form.module.scss'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type FormProps = {
  locale: Locale
  onSubmit: (data: FieldValues, reset: () => void) => Promise<void>
}

export const Form = ({ locale, onSubmit }: FormProps) => {
  const t = translations[locale]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  })

  return (
    <form className={styles.form} onSubmit={handleSubmit((data) => onSubmit(data, reset))}>
      <label className={styles.label} htmlFor='name'>
        <span className={styles.required}>{t.name}</span>
        <p className={styles.error}>{errors.name?.message as string}</p>
      </label>
      <input className={styles.input} type='text' {...register('name', { required: 'Name is required' })} />

      <label className={styles.label} htmlFor='phone'>
        <span className={styles.required}>{t.phone}</span>
        <p className={styles.error}>{errors.phone?.message as string}</p>
      </label>
      <input className={styles.input} type='number' {...register('phone', { required: 'Phone is required' })} />

      <label className={styles.label} htmlFor='email'>
        <span className={styles.required}>{t.email}</span>
        <p className={styles.error}>{errors.email?.message as string}</p>
      </label>
      <input className={styles.input} type='email' {...register('email', { required: 'Email is required' })} />

      <label className={styles.label} htmlFor='message'>
        {t.message}
      </label>
      <textarea className={styles.textarea} {...register('message', { required: false })} />

      <button className={styles.submitButton} type='submit'>
        {t.submitButton}
      </button>
    </form>
  )
}
