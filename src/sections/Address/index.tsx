import { Container } from '@/components/Container'
import styles from './Address.module.scss'
import { Map } from './components/Map'
import { type Locale } from '@/config/i18n'
import { HeaderContent } from './components/HeaderContent'
import { SocialMedia } from './components/SocialMedia'
import { getSettings } from '@/lib/payload'

type AddressSectionProps = {
  locale: Locale
}

export const AddressSection = async ({ locale }: AddressSectionProps) => {
  const settings = await getSettings(locale)

  if (!settings) return null

  const addressData = {
    title: settings.addressTitle,
    address: settings.address,
    building: settings.building ?? '',
    additional: {
      title: settings.additionalTitle ?? '',
      items: settings.additionalItems?.map((i) => i.text) ?? [],
    },
  }

  const socialMediaItems =
    settings.socialMedia?.map((s) => ({
      href: s.url,
      iconUrl: s.icon?.url ?? '',
      alt: s.platform,
    })) ?? []

  const mapIconUrl = settings.mapIcon?.url ?? ''

  return (
    <section className={styles.address} id='address'>
      <Container className={styles.container}>
        <HeaderContent data={addressData} />
        <Map mapUrl={settings.mapEmbedUrl} />
        <SocialMedia items={socialMediaItems} mapLinkUrl={settings.mapLinkUrl} mapIconUrl={mapIconUrl} />
      </Container>
    </section>
  )
}
