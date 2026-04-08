import { Image } from '@/components/Image'
import { type Work } from '../WorksList'

type WorkItemProps = {
  work: Work
  loading?: 'lazy' | 'eager'
}

export const WorkItem = ({ work, loading = 'lazy' }: WorkItemProps) => {
  const { image, imageAlt } = work

  return <Image src={image} alt={imageAlt} width={358} height={268} loading={loading} />
}
