import { type Locale } from '@/config/i18n'
import { DEFAULT_LOCALE } from '@/constants/constants'

export const getLocalizedHref = (anchor: string, locale: Locale) => {
  const basePath = locale === DEFAULT_LOCALE ? '' : `/${locale}`

  return `${basePath}#${anchor}`
}
