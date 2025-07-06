import { Image } from '@/components/Image'
import { type Work } from '../WorksList'

type WorkItemProps = {
  work: Work
}

export const WorkItem = ({ work }: WorkItemProps) => {
  const { imageUrl, imageAlt } = work

  return <Image src={imageUrl} alt={imageAlt} width={400} height={360} />
}
