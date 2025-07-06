import { Locale } from '@/config/i18n'
import { Container } from '@/components/Container'
import { HeaderContent } from './components/HeaderContent'
import { Copyright } from './components/Copyright'
import styles from './Footer.module.scss'
import { ContactForm } from './components/ContactForm/ContactForm.server'

type FooterProps = {
  locale: Locale
}

export const Footer = ({ locale }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <Container>
        <HeaderContent locale={locale} />
        <ContactForm locale={locale} />
      </Container>
      <Copyright locale={locale} />
    </footer>
  )
}
