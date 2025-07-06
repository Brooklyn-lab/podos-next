import { type Locale } from '@/config/i18n'
import { Container } from '@/components/Container'
import { HeaderContent } from './components/HeaderContent'
import styles from './Works.module.scss'
import { WorksList } from './components/WorksList'
import plTranslations from '@/translations/pl/works.json'
import uaTranslations from '@/translations/ua/works.json'

type WorksSectionProps = {
  locale: Locale
}

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

export const WorksSection = ({ locale }: WorksSectionProps) => {
  const { works } = translations[locale]

  return (
    <section className={styles.works}>
      <Container>
        <HeaderContent locale={locale} />
        <WorksList works={works} />
      </Container>
    </section>
  )
}
