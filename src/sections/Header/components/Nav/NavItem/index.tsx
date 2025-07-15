import Link from 'next/link'
import styles from './NavItem.module.scss'

type NavItemProps = {
  href: string
}

export const NavItem = ({ href, children }: NavItemProps & React.PropsWithChildren) => {
  return (
    <li className={styles.item}>
      <Link className={styles.link} href={href}>
        {children}
      </Link>
    </li>
  )
}
