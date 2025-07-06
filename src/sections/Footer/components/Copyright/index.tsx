import { Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/footer.json'
import uaTranslations from '@/translations/ua/footer.json'
import styles from './Copyright.module.scss'
import { replaceVariables } from '@/utils/replaceTranslationVariables'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type CopyrightProps = {
  locale: Locale
}

export const Copyright = ({ locale }: CopyrightProps) => {
  const t = translations[locale]

  const year = new Date().getFullYear()

  return (
    <div className={styles.copyright}>
      <p className={styles.text}>{replaceVariables(t.copyright, { year })}</p>
    </div>
  )
}
