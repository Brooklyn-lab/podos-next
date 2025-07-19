'use client'

import { analytics } from '@/utils/analytics'
import styles from './SocialItem.module.scss'

type SocialItemProps = {
  href: string
  icon: string
  alt?: string
}

export const SocialItem = ({ href, icon, alt }: SocialItemProps) => {
  const handleSocialClick = () => {
    let platform = 'unknown'

    if (icon.includes('facebook')) platform = 'facebook'
    else if (icon.includes('instagram')) platform = 'instagram'
    else if (icon.includes('pin') || href.includes('maps.google')) platform = 'google_maps'
    else if (href.includes('facebook.com')) platform = 'facebook'
    else if (href.includes('instagram.com')) platform = 'instagram'

    analytics.trackSocialClick(platform, href)
  }

  return (
    <li className={styles.item}>
      <a href={href} target='_blank' rel='noopener noreferrer' onClick={handleSocialClick} aria-label={alt}>
        <svg className={styles.icon} width='32' height='32' aria-hidden='true'>
          <use xlinkHref={icon}></use>
        </svg>
      </a>
    </li>
  )
}
