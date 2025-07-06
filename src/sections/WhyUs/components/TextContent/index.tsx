import { Locale } from '@/config/i18n'
import { HeaderContent as SharedHeaderContent } from '@/components/TextContent/HeaderContent'
import { Paragraph } from '@/components/TextContent/Paragraph'
import plTranslations from '@/translations/pl/why-us.json'
import uaTranslations from '@/translations/ua/why-us.json'
import styles from './TextContent.module.scss'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type TextContentProps = {
  locale: Locale
}

export const TextContent = ({ locale }: TextContentProps) => {
  const t = translations[locale]

  return (
    <li className={styles.content}>
      <SharedHeaderContent title={t.title} description={t.subtitle} headerClassName={styles.header}>
        <Paragraph text={t.text1} />
        <Paragraph text={t.text2} />
        <Paragraph text={t.text3} />
      </SharedHeaderContent>
    </li>
  )
}
