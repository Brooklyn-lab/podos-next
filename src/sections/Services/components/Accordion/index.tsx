'use client'

import styles from './Accordion.module.scss'
import { AccordionItem } from './components/AccordionItem'
import { type Locale } from '@/config/i18n'
import plTranslations from '@/translations/pl/services.json'
import uaTranslations from '@/translations/ua/services.json'
import { useState } from 'react'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type AccordionProps = {
  locale: Locale
}

export type AccordionItemContent = {
  price: string
  treatment: string
  duration: string
}

export type AccordionItemData = {
  title: string
  content: AccordionItemContent
}

export const Accordion = ({ locale }: AccordionProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const t = translations[locale]
  const items = t.items as Record<string, AccordionItemData>

  const handleToggle = (key: string) => {
    setActiveKey(activeKey === key ? null : key)
  }

  const itemsArray = Object.entries(items)
  const midPoint = Math.ceil(itemsArray.length / 2)
  const firstColumn = itemsArray.slice(0, midPoint)
  const secondColumn = itemsArray.slice(midPoint)

  return (
    <ul className={styles.accordion}>
      <div className={styles.column}>
        {firstColumn.map(([key, value]) => (
          <AccordionItem key={key} itemKey={key} value={value} isExpanded={activeKey === key} onToggle={handleToggle} />
        ))}
      </div>
      <div className={styles.column}>
        {secondColumn.map(([key, value]) => (
          <AccordionItem key={key} itemKey={key} value={value} isExpanded={activeKey === key} onToggle={handleToggle} />
        ))}
      </div>
    </ul>
  )
}
