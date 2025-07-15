import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { Locale } from '@/config/i18n'
import { NavList } from './components/Nav'
import { LangSwitcher } from './components/LangSwitcher'
import { Contacts } from './components/Contacts'
import styles from './Header.module.scss'

type HeaderProps = {
  locale: Locale
}

export const Header = ({ locale }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Logo />
        <NavList locale={locale} />
        <div className={styles.contacts}>
          <LangSwitcher locale={locale} />
          <Contacts locale={locale} />
        </div>
      </Container>
    </header>
  )
}
