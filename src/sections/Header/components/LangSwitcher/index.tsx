import { localeRegistry } from '@/payload/locale-registry'
import styles from './LangSwitcher.module.scss'
import { SwitcherItem } from './SwitcherItem'

export const LangSwitcher = () => {
  return (
    <ul className={styles.list}>
      {localeRegistry.map((l) => (
        <SwitcherItem key={l.code} href={`/${l.code}`}>
          {l.code.toUpperCase()}
        </SwitcherItem>
      ))}
    </ul>
  )
}
