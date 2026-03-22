import styles from './SocialMedia.module.scss'
import { SocialItem } from './components/SocialItem'

type SocialMediaItem = {
  href: string
  iconUrl: string
  alt: string
}

type SocialMediaProps = {
  items: SocialMediaItem[]
  mapLinkUrl: string
  mapIconUrl: string
}

export const SocialMedia = ({ items, mapLinkUrl, mapIconUrl }: SocialMediaProps) => {
  return (
    <ul className={styles.items}>
      {items.map((item) => (
        <SocialItem key={item.href} href={item.href} iconUrl={item.iconUrl} alt={item.alt} />
      ))}
      {mapLinkUrl && mapIconUrl && <SocialItem href={mapLinkUrl} iconUrl={mapIconUrl} alt='Map' />}
    </ul>
  )
}
