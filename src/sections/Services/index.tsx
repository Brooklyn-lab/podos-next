import { Container } from '@/components/Container'
import { SkeletonTitle, SkeletonBlock } from '@/components/Skeleton'
import styles from './Services.module.scss'
import { type Locale } from '@/config/i18n'
import { HeaderContent } from './components/HeaderContent'
import { Accordion } from './components/Accordion'
import { getServices } from '@/lib/payload'

type ServicesSectionProps = {
  locale: Locale
}

const ServicesSkeleton = () => (
  <section className={styles.services} id='services'>
    <Container>
      <SkeletonTitle />
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <SkeletonBlock key={i} />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <SkeletonBlock key={i} />
          ))}
        </div>
      </div>
    </Container>
  </section>
)

export const ServicesSection = async ({ locale }: ServicesSectionProps) => {
  const servicesData = await getServices(locale)

  if (!servicesData) {
    return <ServicesSkeleton />
  }

  return (
    <section className={styles.services} id='services'>
      <Container>
        <HeaderContent data={servicesData} />
        <Accordion servicesData={servicesData} />
      </Container>
    </section>
  )
}
