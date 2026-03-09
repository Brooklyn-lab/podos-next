import { HeaderContent as SharedHeaderContent } from '@/components/TextContent/HeaderContent'
import { Paragraph } from '@/components/TextContent/Paragraph'
import styles from './HeaderContent.module.scss'
import type { ServicesData } from '@/lib/payload'

type HeaderContentProps = {
  data: ServicesData
}

export const HeaderContent = ({ data }: HeaderContentProps) => {
  return (
    <SharedHeaderContent title={data.title} description={data.description} className={styles.content}>
      <div className={styles.headerContent}>
        <Paragraph text={data.headerParagraph1} />
        <Paragraph text={data.headerParagraph2} />
      </div>
    </SharedHeaderContent>
  )
}
