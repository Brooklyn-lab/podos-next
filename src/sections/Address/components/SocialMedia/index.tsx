import { type Locale } from '@/config/i18n'
import styles from './SocialMedia.module.scss'
import { SocialItem } from './components/SocialItem'
import plTranslations from '@/translations/pl/address.json'
import uaTranslations from '@/translations/ua/address.json'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type SocialMediaProps = {
  locale: Locale
}

export const SocialMedia = ({ locale }: SocialMediaProps) => {
  const t = translations[locale]

  return (
    <ul className={styles.items}>
      {Object.values(t.socialMedia).map((item) => (
        <SocialItem key={item.href} href={item.href} icon={item.icon} alt={item.alt} />
      ))}
    </ul>
  )
}
