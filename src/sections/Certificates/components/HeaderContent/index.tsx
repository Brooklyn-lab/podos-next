import { HeaderContent as SharedHeaderContent } from '@/components/TextContent/HeaderContent'
import { Paragraph } from '@/components/TextContent/Paragraph'
import styles from './HeaderContent.module.scss'
import type { CertificatesData } from '@/lib/payload'

type HeaderContentProps = {
  data: CertificatesData
}

export const HeaderContent = ({ data }: HeaderContentProps) => {
  return (
    <SharedHeaderContent title={data.title} className={styles.header}>
      <Paragraph className={styles.description} text={data.description} />
    </SharedHeaderContent>
  )
}
