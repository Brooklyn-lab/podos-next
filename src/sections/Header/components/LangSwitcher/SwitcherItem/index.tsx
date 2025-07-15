'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cx from 'classnames'
import styles from './SwitcherItem.module.scss'

type SwitcherItemProps = {
  href: string
}

export const SwitcherItem = ({ href, children }: SwitcherItemProps & React.PropsWithChildren) => {
  const pathname = usePathname()

  const isActive = pathname.includes(href)

  return (
    <li className={styles.item}>
      <Link className={cx(styles.link, { [`${styles.active}`]: isActive })} href={href}>
        {children}
      </Link>
    </li>
  )
}
