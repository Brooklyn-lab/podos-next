import cx from 'classnames'
import styles from './Header.module.scss'

type HeaderProps = {
  title?: string
  description?: string
  className?: string
}

export function Header({ title, description, className }: HeaderProps) {
  if (!title && !description) {
    return null
  }

  return (
    <div className={cx(styles.header, className)}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
