import Link from 'next/link'
import styles from './Logo.module.scss'

export const Logo = () => {
  return (
    <Link href='/' className={styles.logo}>
      <picture className={styles.image}>
        <source srcSet='/images/podos-logo.webp' type='image/webp' />
        <img src='/images/podos-logo.png' alt='PODOS logo' />
      </picture>
      <span className={styles.text}>PODOS</span>
    </Link>
  )
}
