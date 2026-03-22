import styles from './Contacts.module.scss'
import { ContactsItem } from './ContactsItem'
import cx from 'classnames'

type ContactItem = {
  href: string
  text: string
  icon: string
}

type ContactsProps = {
  contacts: Record<string, ContactItem>
  className?: string
  isMobileStyle?: boolean
}

export const Contacts = ({ contacts, className, isMobileStyle = false }: ContactsProps) => {
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
