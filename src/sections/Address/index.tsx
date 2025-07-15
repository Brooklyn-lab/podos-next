import { Container } from '@/components/Container'
import styles from './Address.module.scss'
import { Map } from './components/Map'

import plTranslations from '@/translations/pl/address.json'
import uaTranslations from '@/translations/ua/address.json'
import { type Locale } from '@/config/i18n'
import { HeaderContent } from './components/HeaderContent'
import { SocialMedia } from './components/SocialMedia'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type AddressSectionProps = {
  locale: Locale
}

export const AddressSection = ({ locale }: AddressSectionProps) => {
  const t = translations[locale]

  return (
    <section className={styles.address} id='address'>
      <Container className={styles.container}>
        <HeaderContent locale={locale} />
        <Map mapUrl={t.mapUrl} />
        <SocialMedia locale={locale} />
      </Container>
    </section>
  )
}
