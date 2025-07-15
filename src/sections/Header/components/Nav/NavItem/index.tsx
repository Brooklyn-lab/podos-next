import Link from 'next/link'
import styles from './NavItem.module.scss'

type NavItemProps = {
  href: string
  onClick?: () => void
}

export const NavItem = ({ href, onClick, children }: NavItemProps & React.PropsWithChildren) => {
  return (
    <li className={styles.item}>
      <Link className={styles.link} href={href} onClick={onClick}>
        {children}
      </Link>
    </li>
  )
}
