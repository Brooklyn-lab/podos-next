import { Header } from '@/components/TextContent/Header'
import { Container } from '@/components/Container'
import styles from './Certificates.module.scss'
import { Paragraph } from '@/components/TextContent/Paragraph'
import { Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/certificates.json'
import uaTranslations from '@/translations/ua/certificates.json'
import { CertificatesList } from './components/CertificatesList'

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
        <div className={styles.header}>
          <Header title={t.title} />
          <Paragraph className={styles.description} text={t.description} />
        </div>
        <CertificatesList certificates={t.certificates} />
      </Container>
    </section>
  )
}
