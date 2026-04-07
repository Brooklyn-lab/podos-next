import dynamic from 'next/dynamic'
import { Container } from '@/components/Container'
import { Locale } from '@/config/i18n'
import { getWorks, type WorkItem } from '@/lib/payload'
import { HeaderContent } from './components/HeaderContent'
import styles from './Works.module.scss'

const WorksSliderSkeleton = () => (
  <div className={styles.skeletonGrid}>
    {Array.from({ length: 4 }, (_, i) => (
      <div key={i} className={styles.skeletonCard} />
    ))}
  </div>
)

const WorksList = dynamic(() => import('./components/WorksList').then((m) => m.WorksList), {
  loading: () => <WorksSliderSkeleton />,
})

type WorksSectionProps = {
  locale: Locale
}

const WorksSkeleton = () => (
  <section className={styles.works} id='works'>
    <Container>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonLeft}>
          <div className={styles.skeletonLabel} />
          <div className={styles.skeletonDescription} />
          <div className={styles.skeletonDescription} />
        </div>
        <div className={styles.skeletonRight}>
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLineShort} />
        </div>
      </div>
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={styles.skeletonCard} />
        ))}
      </div>
    </Container>
  </section>
)

export const WorksSection = async ({ locale }: WorksSectionProps) => {
  const cmsData = await getWorks(locale)

  if (!cmsData || !cmsData.works || cmsData.works.length === 0) {
    return <WorksSkeleton />
  }

  const formattedWorks = cmsData.works
    .map((work: WorkItem) => {
      const sizes = work.image?.sizes || {}

      return {
        image: {
          webp1x: sizes.thumbnail?.url,
          webp2x: sizes.thumbnailRetina?.url,
          png1x: sizes.thumbnailPng?.url,
          png2x: sizes.thumbnailRetinaPng?.url,
          fallback: work.image?.url,
        },
        imageAlt: work.imageAlt || work.image?.alt || '',
      }
    })
    .filter((work) => Boolean(work.image.fallback || work.image.webp1x || work.image.png1x))

  return (
    <section className={styles.works} id='works'>
      <Container>
        <HeaderContent data={cmsData} />
        <WorksList works={formattedWorks} />
      </Container>
    </section>
  )
}
