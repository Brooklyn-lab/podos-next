import { type Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/header.json'
import uaTranslations from '@/translations/ua/header.json'
import styles from './Contacts.module.scss'
import { ContactsItem } from './ContactsItem'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

export const Contacts = ({ locale }: { locale: Locale }) => {
  const t = translations[locale]

  const contacts = t.contacts

  return (
    <ul className={styles.list}>
      {Object.entries(contacts).map(([key, value]) => (
        <ContactsItem key={key} href={value.href} icon={value.icon}>
          {value.text}
        </ContactsItem>
      ))}
    </ul>
  )
}
