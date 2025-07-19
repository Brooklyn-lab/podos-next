import { Locale } from '@/config/i18n'
import { NavList } from '../Nav'
import { LangSwitcher } from '../LangSwitcher'
import { Contacts } from '../Contacts'
import styles from './DesktopNav.module.scss'
import { Logo } from '@/components/Logo'

type DesktopNavProps = {
  locale: Locale
}

export const DesktopNav = ({ locale }: DesktopNavProps) => {
  return (
    <div className={styles.desktopNav}>
      <Logo />
      <NavList locale={locale} className={styles.nav} />

      <div className={styles.contacts}>
        <LangSwitcher locale={locale} />
        <Contacts locale={locale} />
      </div>
    </div>
  )
}
