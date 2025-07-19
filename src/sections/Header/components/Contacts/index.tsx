import { type Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/header.json'
import uaTranslations from '@/translations/ua/header.json'
import styles from './Contacts.module.scss'
import { ContactsItem } from './ContactsItem'
import cx from 'classnames'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type ContactsProps = {
  locale: Locale
  className?: string
  isMobileStyle?: boolean
}

export const Contacts = ({ locale, className, isMobileStyle = false }: ContactsProps) => {
  const t = translations[locale]

  const contacts = t.contacts

  return (
    <ul className={cx(styles.list, className)}>
      {Object.entries(contacts).map(([key, value]) => (
        <ContactsItem key={key} href={value.href} icon={value.icon} isMobileStyle={isMobileStyle}>
          {value.text}
        </ContactsItem>
      ))}
    </ul>
  )
}
