import styles from './AccordionItem.module.scss'
import { type AccordionItemData } from '../../index'

type AccordionItemProps = {
  value: AccordionItemData
  itemKey: string
  isExpanded: boolean
  onToggle: (key: string) => void
}

export const AccordionItem = ({ value, itemKey, isExpanded, onToggle }: AccordionItemProps) => {
  const {
    title,
    content: { price, treatment, duration },
  } = value

  return (
    <li className={styles.item}>
      <button className={styles.button} aria-expanded={isExpanded} onClick={() => onToggle(itemKey)}>
        <span className={styles.title}>{title}</span>
        <span className={styles.icon} aria-hidden='true'>
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
            <use href='/images/icons.svg#accordion-arrow'></use>
          </svg>
        </span>
      </button>
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          <p className={styles.text}>
            <span className={styles.accent}>Cena:</span> {price}
          </p>
          {treatment && (
            <p className={styles.text}>
              <span className={styles.accent}>Zabieg:</span> {treatment}
            </p>
          )}
          {duration && (
            <p className={styles.text}>
              <span className={styles.accent}>Czas trwania:</span> {duration}
            </p>
          )}
        </div>
      </div>
    </li>
  )
}
