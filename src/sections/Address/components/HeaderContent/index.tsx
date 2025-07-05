import { Header } from '@/components/TextContent/Header'
import { Paragraph } from '@/components/TextContent/Paragraph'
import styles from './HeaderContent.module.scss'
import { type Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/address.json'
import uaTranslations from '@/translations/ua/address.json'

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
    <div className={styles.content}>
      <Header title={t.title} />
      <Paragraph text={t.address} />
      <Paragraph text={t.building} mt='4' />
      <Paragraph text={t.additional.title} bold mt='8' />
      <ul>
        {t.additional.items.map((item) => (
          <li key={item}>
            <Paragraph text={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
