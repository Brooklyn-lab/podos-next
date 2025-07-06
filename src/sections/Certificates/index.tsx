import { Container } from '@/components/Container'
import styles from './Certificates.module.scss'
import { Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/certificates.json'
import uaTranslations from '@/translations/ua/certificates.json'
import { CertificatesList } from './components/CertificatesList'
import { HeaderContent } from './components/HeaderContent'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type CertificatesSectionProps = {
  locale: Locale
}

export const CertificatesSection = ({ locale }: CertificatesSectionProps) => {
  const t = translations[locale]

  return (
    <section className={styles.certificates}>
      <Container>
        <HeaderContent locale={locale} />
        <CertificatesList certificates={t.certificates} />
      </Container>
    </section>
  )
}
