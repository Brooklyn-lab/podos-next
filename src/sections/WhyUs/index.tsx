import { Container } from '@/components/Container'
import styles from './WhyUs.module.scss'
import { Locale } from '@/config/i18n'
import { List } from './components/List'

type WhyUsSectionProps = {
  locale: Locale
}

export const WhyUsSection = ({ locale }: WhyUsSectionProps) => {
  return (
    <section className={styles.whyUs} id='whyUs'>
      <Container>
        <List locale={locale} />
      </Container>
    </section>
  )
}
