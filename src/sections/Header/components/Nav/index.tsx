import { type Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/header.json'
import uaTranslations from '@/translations/ua/header.json'
import styles from './NavList.module.scss'
import { NavItem } from './NavItem'
import { getLocalizedHref } from '@/utils/getLocalizedHref'
import cx from 'classnames'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type NavListProps = {
  locale: Locale
  className?: string
  onItemClick?: () => void
}

export const NavList = ({ locale, className, onItemClick }: NavListProps) => {
  const t = translations[locale]
  const navigation = t.navigation

  return (
    <ul className={cx(styles.list, className)}>
      {Object.entries(navigation).map(([key, value]) => (
        <NavItem key={key} href={getLocalizedHref(key, locale)} onClick={onItemClick}>
          {value}
        </NavItem>
      ))}
    </ul>
  )
}
