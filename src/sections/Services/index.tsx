import { type Locale } from '@/config/i18n'
import { Container } from '@/components/Container'
import { HeaderContent } from './components/HeaderContent'
import { Accordion } from './components/Accordion'
import styles from './Services.module.scss'

type ServicesSectionProps = {
  locale: Locale
}

export const ServicesSection = ({ locale }: ServicesSectionProps) => {
  return (
    <section className={styles.services} id='services'>
      <Container>
        <HeaderContent locale={locale} />
        <Accordion locale={locale} />
      </Container>
    </section>
  )
}
