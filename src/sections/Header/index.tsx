import { Container } from '@/components/Container'
import { Locale } from '@/config/i18n'
import { MobileMenu } from './components/MobileMenu'
import { DesktopNav } from './components/DesktopNav'
import styles from './Header.module.scss'

type HeaderProps = {
  locale: Locale
}

export const Header = ({ locale }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <DesktopNav locale={locale} />

        <MobileMenu locale={locale} />
      </Container>
    </header>
  )
}
