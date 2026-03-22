import Link from 'next/link'

import '@/styles/globals.scss'
import { poppins } from '@/styles/fonts'
import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <html lang='pl'>
      <body className={poppins.variable}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.description}>Strona nie została znaleziona</p>
          <Link href='/pl' className={styles.link}>
            Strona główna
          </Link>
        </div>
      </body>
    </html>
  )
}
