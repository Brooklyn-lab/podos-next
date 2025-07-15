import Link from 'next/link'
import cx from 'classnames'
import styles from './ContactsItem.module.scss'

type ContactsItemProps = {
  href: string
  icon: string
}

export const ContactsItem = ({ href, icon, children }: ContactsItemProps & React.PropsWithChildren) => {
  return (
    <li className={styles.item}>
      <Link className={cx(styles.link)} href={href}>
        <svg className={styles.icon} width='16' height='16'>
          <use xlinkHref={`images/icons.svg#${icon}`}></use>
        </svg>
        <span className={styles.text}>{children}</span>
      </Link>
    </li>
  )
}
