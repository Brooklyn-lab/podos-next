import { type Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/hero.json'
import uaTranslations from '@/translations/ua/hero.json'
import styles from './Hero.module.scss'
import { Container } from '@/components/Container'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type HeroSectionProps = {
  locale: Locale
}

export const HeroSection = ({ locale }: HeroSectionProps) => {
  const t = translations[locale]

  return (
    <section className={styles.hero}>
      <Container className={styles.container}>
        <div className={styles.contentBackground}>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>
              {t.accentTitle} {''}
            </span>
            {t.title}
          </h1>
        </div>
      </Container>
    </section>
  )
}
