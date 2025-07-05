import styles from './List.module.scss'
import { Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/why-us.json'
import uaTranslations from '@/translations/ua/why-us.json'
import { TextContent } from '../TextContent'
import { ImageBlock } from '../ImageBlock'
import cx from 'classnames'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type ListProps = {
  locale: Locale
}

export const List = ({ locale }: ListProps) => {
  const t = translations[locale]

  return (
    <ul className={styles.list}>
      <ImageBlock
        images={{
          first: {
            src: '/images/sections/why-us/cabinet-1',
            alt: t.alt,
            width: 364,
            height: 480,
            className: `${cx(styles.leftTop, styles.image)}`,
          },
          second: {
            src: '/images/sections/why-us/cabinet-2',
            alt: t.alt,
            width: 275,
            height: 380,
            className: `${cx(styles.rightTop, styles.image)}`,
          },
        }}
        className={styles.topBlock}
      />
      <TextContent locale={locale} />
      <ImageBlock
        images={{
          first: {
            src: '/images/sections/why-us/cabinet-3',
            alt: t.alt,
            width: 560,
            height: 360,
            className: `${cx(styles.leftBottom, styles.image)}`,
          },
          second: {
            src: '/images/sections/why-us/cabinet-4',
            alt: t.alt,
            width: 557,
            height: 380,
            className: `${cx(styles.rightBottom, styles.image)}`,
          },
        }}
        className={styles.bottomBlock}
      />
    </ul>
  )
}
