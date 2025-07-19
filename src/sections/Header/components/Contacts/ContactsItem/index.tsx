'use client'

import Link from 'next/link'
import cx from 'classnames'
import { analytics } from '@/utils/analytics'
import styles from './ContactsItem.module.scss'

type ContactsItemProps = {
  href: string
  icon: string
  isMobileStyle?: boolean
}

export const ContactsItem = ({
  href,
  icon,
  isMobileStyle = false,
  children,
}: ContactsItemProps & React.PropsWithChildren) => {
  const handleContactClick = () => {
    const contactType = href.startsWith('tel:') ? 'phone' : href.startsWith('mailto:') ? 'email' : null

    if (contactType) {
      analytics.trackContactClick(contactType, children?.toString() || href)
    }
  }

  return (
    <li className={styles.item}>
      <Link className={cx(styles.link)} href={href} onClick={handleContactClick}>
        <svg className={cx(styles.icon, { [styles.iconMobile]: isMobileStyle })} width='16' height='16'>
          <use xlinkHref={`images/icons.svg#${icon}`}></use>
        </svg>
        <span className={cx(styles.text, { [styles.textMobile]: isMobileStyle })}>{children}</span>
      </Link>
    </li>
  )
}
