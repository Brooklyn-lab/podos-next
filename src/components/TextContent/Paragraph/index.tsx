import cx from 'classnames'
import styles from './Paragraph.module.scss'

type ParagraphProps = {
  text: string
  className?: string
  bold?: boolean
  mt?: '4' | '8'
}

export function Paragraph({ text, bold, className, mt }: ParagraphProps) {
  return (
    <p
      className={cx(styles.paragraph, className, {
        [styles.bold]: bold,
        [styles.mt4]: mt === '4',
        [styles.mt8]: mt === '8',
      })}
    >
      {text}
    </p>
  )
}
