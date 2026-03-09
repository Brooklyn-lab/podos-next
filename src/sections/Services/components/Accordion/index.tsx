'use client'

import styles from './Accordion.module.scss'
import { AccordionItem } from './components/AccordionItem'
import { useState } from 'react'
import type { ServicesData } from '@/lib/payload'

export type AccordionItemContent = {
  price: string
  treatment?: string
  duration?: string
}

export type AccordionItemData = {
  title: string
  content: AccordionItemContent
}

type AccordionProps = {
  servicesData: ServicesData
}

export const Accordion = ({ servicesData }: AccordionProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const handleToggle = (key: string) => {
    setActiveKey(activeKey === key ? null : key)
  }

  if (!servicesData.items?.length) return null

  const items: AccordionItemData[] = servicesData.items.map((item) => ({
    title: item.title,
    content: {
      price: item.price,
      duration: item.duration,
      treatment: item.treatment,
    },
  }))

  const midPoint = Math.ceil(items.length / 2)
  const firstColumn = items.slice(0, midPoint)
  const secondColumn = items.slice(midPoint)

  return (
    <div className={styles.accordion}>
      <ul className={styles.column} role='list'>
        {firstColumn.map((item, index) => (
          <AccordionItem
            key={index}
            itemKey={`service-${index}`}
            value={item}
            isExpanded={activeKey === `service-${index}`}
            onToggle={handleToggle}
          />
        ))}
      </ul>
      <ul className={styles.column} role='list'>
        {secondColumn.map((item, index) => {
          const key = `service-${midPoint + index}`
          return (
            <AccordionItem
              key={key}
              itemKey={key}
              value={item}
              isExpanded={activeKey === key}
              onToggle={handleToggle}
            />
          )
        })}
      </ul>
    </div>
  )
}
