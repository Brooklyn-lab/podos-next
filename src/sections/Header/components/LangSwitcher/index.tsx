import { type Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/header.json'
import uaTranslations from '@/translations/ua/header.json'
import styles from './LangSwitcher.module.scss'
import { SwitcherItem } from './SwitcherItem'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type LangSwitcherProps = {
  locale: Locale
}

export const LangSwitcher = ({ locale }: LangSwitcherProps) => {
  const t = translations[locale]
  const languages = t.languages

  return (
    <ul className={styles.list}>
      {Object.entries(languages).map(([key, value]) => (
        <SwitcherItem key={key} href={`/${key}`}>
          {value}
        </SwitcherItem>
      ))}
    </ul>
  )
}
