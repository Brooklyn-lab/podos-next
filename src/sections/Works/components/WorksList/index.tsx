import { Slider } from '@/components/Slider'
import { WorkItem } from '../WorkItem'
import styles from './WorksList.module.scss'

export type Work = {
  image: {
    webp1x?: string
    webp2x?: string
    png1x?: string
    png2x?: string
    fallback?: string
  }
  imageAlt: string
}

type WorksListProps = {
  works: Work[]
}

export const WorksList = ({ works }: WorksListProps) => {
  return (
    <Slider
      className={styles.slider}
      spaceBetween={12}
      slidesPerView={3.5}
      breakpoints={{
        0: { slidesPerView: 1.1 },
        320: { slidesPerView: 1.4 },
        420: { slidesPerView: 1.8 },
        568: { slidesPerView: 2.4 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 3.5 },
      }}
    >
      {works.map((work, index) => (
        <WorkItem key={work.image.fallback || index} work={work} loading={index < 5 ? 'eager' : 'lazy'} />
      ))}
    </Slider>
  )
}
