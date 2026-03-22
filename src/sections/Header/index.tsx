import { Container } from '@/components/Container'
import { Locale } from '@/config/i18n'
import { MobileMenu } from './components/MobileMenu'
import { DesktopNav } from './components/DesktopNav'
import { getSettings } from '@/lib/payload'
import styles from './Header.module.scss'

type HeaderProps = {
  locale: Locale
}

export const Header = async ({ locale }: HeaderProps) => {
  const settings = await getSettings(locale)

  const contacts = settings
    ? {
        phone: { href: `tel:${settings.phone}`, text: settings.phone, icon: 'phone' },
        email: { href: `mailto:${settings.email}`, text: settings.email, icon: 'mail' },
      }
    : null

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <DesktopNav locale={locale} contacts={contacts} />

        <MobileMenu locale={locale} contacts={contacts} />
      </Container>
    </header>
  )
}
