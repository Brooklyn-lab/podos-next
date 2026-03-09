import { Image } from '@/components/Image'
import { type Work } from '../WorksList'

type WorkItemProps = {
  work: Work
  loading?: 'lazy' | 'eager'
}

export const WorkItem = ({ work, loading = 'lazy' }: WorkItemProps) => {
  const { image, imageAlt } = work

  return <Image src={image} alt={imageAlt} width={400} height={360} loading={loading} preload={loading === 'eager'} />
}
