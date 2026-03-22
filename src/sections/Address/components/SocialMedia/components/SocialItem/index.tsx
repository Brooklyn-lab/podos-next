'use client'

import { analytics } from '@/utils/analytics'
import styles from './SocialItem.module.scss'

type SocialItemProps = {
  href: string
  iconUrl: string
  alt?: string
}

export const SocialItem = ({ href, iconUrl, alt }: SocialItemProps) => {
  const handleSocialClick = () => {
    let platform = 'unknown'

    if (href.includes('facebook.com')) platform = 'facebook'
    else if (href.includes('instagram.com')) platform = 'instagram'
    else if (href.includes('maps.google') || href.includes('google.com/maps')) platform = 'google_maps'

    analytics.trackSocialClick(platform, href)
  }

  return (
    <li className={styles.item}>
      <a href={href} target='_blank' rel='noopener noreferrer' onClick={handleSocialClick} aria-label={alt}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.icon} src={iconUrl} alt={alt ?? ''} width={32} height={32} />
      </a>
    </li>
  )
}
