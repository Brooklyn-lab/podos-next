'use client'

import { useEffect } from 'react'
import { Locale } from '@/config/i18n'

type LangSetterProps = {
  locale: Locale
}

export const LangSetter = ({ locale }: LangSetterProps) => {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
