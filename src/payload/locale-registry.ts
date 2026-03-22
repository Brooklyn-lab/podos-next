export type LocaleEntry = {
  readonly code: string
  /** ISO 639-1 language code for HTML lang and hreflang attributes */
  readonly langCode: string
  readonly label: string
  readonly nativeLabel: string
}

/**
 * All locales the system knows about. To support a new language:
 *   1. Add an entry here
 *   2. Create translation JSON files in src/translations/<code>/
 *   3. Rebuild
 *
 * `code` — URL slug (used in routes like /pl, /ua)
 * `langCode` — ISO 639-1 code (used for <html lang>, hreflang, sitemap)
 */
export const localeRegistry = [
  { code: 'pl', langCode: 'pl', label: 'Polish', nativeLabel: 'Polski' },
  { code: 'ua', langCode: 'uk', label: 'Ukrainian', nativeLabel: 'Українська' },
] as const

export type LocaleCode = (typeof localeRegistry)[number]['code']

export const localeCodes: LocaleCode[] = [...localeRegistry.map((l) => l.code)]

export const defaultLocaleCode: LocaleCode = 'pl'

const codeLangMap = Object.fromEntries(localeRegistry.map((l) => [l.code, l.langCode])) as Record<LocaleCode, string>

export function getLangCode(code: LocaleCode): string {
  return codeLangMap[code]
}
