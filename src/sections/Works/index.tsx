import { Container } from '@/components/Container'
import { SkeletonTitle, SkeletonText, SkeletonBlock } from '@/components/Skeleton'
import { Locale } from '@/config/i18n'
import { getWorks, type WorkItem } from '@/lib/payload'
import { HeaderContent } from './components/HeaderContent'
import { WorksList } from './components/WorksList'
import styles from './Works.module.scss'

type WorksSectionProps = {
  locale: Locale
}

const WorksSkeleton = () => (
  <section className={styles.works} id='works'>
    <Container>
      <SkeletonTitle />
      <SkeletonText width='medium' />
      <SkeletonText width='short' />
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} style={{ flex: 1 }}>
            <SkeletonBlock />
          </div>
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
