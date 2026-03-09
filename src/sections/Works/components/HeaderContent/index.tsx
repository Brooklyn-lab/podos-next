import { HeaderContent as SharedHeaderContent } from '@/components/TextContent/HeaderContent'
import { Paragraph } from '@/components/TextContent/Paragraph'
import type { WorksData } from '@/lib/payload'
import styles from './HeaderContent.module.scss'

type HeaderContentProps = {
  data: WorksData
}

export const HeaderContent = ({ data }: HeaderContentProps) => {
  return (
    <SharedHeaderContent title={data.title} description={data.description} className={styles.content}>
      {data.headerParagraph1 && (
        <div className={styles.headerContent}>
          <Paragraph text={data.headerParagraph1} />
        </div>
      )}
    </SharedHeaderContent>
  )
}
