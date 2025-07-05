import styles from './SocialItem.module.scss'

type SocialItemProps = {
  href: string
  icon: string
}

export const SocialItem = ({ href, icon }: SocialItemProps) => {
  return (
    <li className={styles.item}>
      <a href={href} target='_blank' rel='noopener noreferrer'>
        <svg className={styles.icon} width='32' height='32'>
          <use xlinkHref={icon}></use>
        </svg>
      </a>
    </li>
  )
}
