import { Locale } from '@/config/i18n'
import { NavList } from '../Nav'
import { LangSwitcher } from '../LangSwitcher'
import { Contacts } from '../Contacts'
import styles from './DesktopNav.module.scss'
import { Logo } from '@/components/Logo'

type ContactItem = {
  href: string
  text: string
  icon: string
}

type DesktopNavProps = {
  locale: Locale
  contacts: Record<string, ContactItem> | null
}

export const DesktopNav = ({ locale, contacts }: DesktopNavProps) => {
  return (
    <div className={styles.desktopNav}>
      <Logo />
      <NavList locale={locale} className={styles.nav} />

      <div className={styles.contacts}>
        <LangSwitcher locale={locale} />
        {contacts && <Contacts contacts={contacts} />}
      </div>
    </div>
  )
}
