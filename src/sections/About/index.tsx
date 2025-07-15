import { Container } from '@/components/Container'
import { Paragraph } from '@/components/TextContent/Paragraph'
import { type Locale } from '@/config/i18n'
import styles from './About.module.scss'
import plTranslations from '@/translations/pl/about.json'
import uaTranslations from '@/translations/ua/about.json'
import { Image } from '@/components/Image'
import { HeaderContent } from '@/components/TextContent/HeaderContent'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type AboutSectionProps = {
  locale: Locale
}

export const AboutSection = ({ locale }: AboutSectionProps) => {
  const t = translations[locale]

  return (
    <section className={styles.about} id='about'>
      <Container>
        <div className={styles.content}>
          <HeaderContent title={t.title} description={t.description} className={styles.contentText}>
            <div>
              <Paragraph text={t.bio} />
              <Paragraph text={t.approach} />
            </div>
          </HeaderContent>

          <Image
            src='/images/sections/about/about-desc'
            alt={t.alt}
            width={590}
            height={700}
            className={styles.contentImage}
          />
        </div>
      </Container>
    </section>
  )
}
