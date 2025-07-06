import { HeaderContent as SharedHeaderContent } from '@/components/TextContent/HeaderContent'
import { Paragraph } from '@/components/TextContent/Paragraph'
import styles from './HeaderContent.module.scss'
import { type Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/services.json'
import uaTranslations from '@/translations/ua/services.json'

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
    <SharedHeaderContent title={t.title} description={t.description} className={styles.content}>
      <div className={styles.headerContent}>
        <Paragraph text={t.headerParagraph1} />
        <Paragraph text={t.headerParagraph2} />
      </div>
    </SharedHeaderContent>
  )
}
