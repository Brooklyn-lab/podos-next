export type LocaleEntry = {
  readonly code: string
  readonly label: string
  readonly nativeLabel: string
}

/**
 * All locales the system knows about. To support a new language:
 *   1. Add an entry here
 *   2. Create translation JSON files in src/translations/<code>/
 *   3. Rebuild
 */
export const localeRegistry = [
  { code: 'pl', label: 'Polish', nativeLabel: 'Polski' },
  { code: 'ua', label: 'Ukrainian', nativeLabel: 'Українська' },
] as const

export type LocaleCode = (typeof localeRegistry)[number]['code']

export const localeCodes: LocaleCode[] = [...localeRegistry.map((l) => l.code)]

export const defaultLocaleCode: LocaleCode = 'pl'
