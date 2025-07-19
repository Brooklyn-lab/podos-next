'use client'

import { analytics } from '@/utils/analytics'
import styles from './SocialItem.module.scss'

type SocialItemProps = {
  href: string
  icon: string
}

export const SocialItem = ({ href, icon }: SocialItemProps) => {
  const handleSocialClick = () => {
    // Extract platform name from icon or URL
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
      <a href={href} target='_blank' rel='noopener noreferrer' onClick={handleSocialClick}>
        <svg className={styles.icon} width='32' height='32'>
          <use xlinkHref={icon}></use>
        </svg>
      </a>
    </li>
  )
}
