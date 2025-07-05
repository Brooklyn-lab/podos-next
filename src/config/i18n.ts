export const i18n = {
  locales: ['pl', 'ua'],
  defaultLocale: 'pl',
} as const

export type Locale = (typeof i18n)['locales'][number]
