import { localeCodes, defaultLocaleCode, type LocaleCode } from './locales'

export const i18n = {
  locales: localeCodes,
  defaultLocale: defaultLocaleCode,
}

export type Locale = LocaleCode
