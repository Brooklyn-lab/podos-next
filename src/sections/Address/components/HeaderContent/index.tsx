import { HeaderContent as SharedHeaderContent } from '@/components/TextContent/HeaderContent'
import { Paragraph } from '@/components/TextContent/Paragraph'
import styles from './HeaderContent.module.scss'

type AddressData = {
  title: string
  address: string
  building: string
  additional: {
    title: string
    items: string[]
  }
}

type HeaderContentProps = {
  data: AddressData
}

export const HeaderContent = ({ data }: HeaderContentProps) => {
  return (
    <SharedHeaderContent title={data.title} className={styles.content}>
      <Paragraph text={data.address} />
      {data.building && <Paragraph text={data.building} mt='4' />}
      {data.additional.title && <Paragraph text={data.additional.title} bold mt='8' />}
      <ul>
        {data.additional.items.map((item) => (
          <li key={item}>
            <Paragraph text={item} />
          </li>
        ))}
      </ul>
    </SharedHeaderContent>
  )
}
