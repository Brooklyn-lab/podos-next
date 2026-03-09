import { Container } from '@/components/Container'
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
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonLeft}>
          <div className={styles.skeletonLabel} />
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonTitle} />
        </div>
        <div className={styles.skeletonRight}>
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLineShort} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLineShort} />
        </div>
      </div>
      <div className={styles.skeletonAccordion}>
        <div className={styles.skeletonColumn}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={styles.skeletonRow} />
          ))}
        </div>
        <div className={styles.skeletonColumn}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={styles.skeletonRow} />
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
