import Link from 'next/link'
import cx from 'classnames'
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
  return (
    <li className={styles.item}>
      <Link className={cx(styles.link)} href={href}>
        <svg className={cx(styles.icon, { [styles.iconMobile]: isMobileStyle })} width='16' height='16'>
          <use xlinkHref={`images/icons.svg#${icon}`}></use>
        </svg>
        <span className={cx(styles.text, { [styles.textMobile]: isMobileStyle })}>{children}</span>
      </Link>
    </li>
  )
}
