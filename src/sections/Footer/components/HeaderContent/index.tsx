import { HeaderContent as SharedHeaderContent } from '@/components/TextContent/HeaderContent'
import { Paragraph } from '@/components/TextContent/Paragraph'
import styles from './HeaderContent.module.scss'
import { type Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/footer.json'
import uaTranslations from '@/translations/ua/footer.json'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type HeaderContentProps = {
  locale: Locale
}

export const HeaderContent = ({ locale }: HeaderContentProps) => {
  const t = translations[locale]

  return (
    <SharedHeaderContent description={t.title} className={styles.content} headerClassName={styles.header}>
      <Paragraph text={t.headerParagraph1} />
      <Paragraph text={t.headerParagraph2} />
    </SharedHeaderContent>
  )
}
