import { WorkItem } from '../WorkItem'
import { Slider } from '@/components/Slider'

export type Work = {
  imageUrl: string
  imageAlt: string
}

type WorksListProps = {
  works: Work[]
}

export const WorksList = ({ works }: WorksListProps) => {
  return (
    <Slider
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
      {works.map((work) => (
        <WorkItem key={work.imageUrl} work={work} />
      ))}
    </Slider>
  )
}
