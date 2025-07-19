import styles from './CloseButton.module.scss'

type CloseButtonProps = {
  onClick: () => void
  className?: string
}

export const CloseButton = ({ onClick, className }: CloseButtonProps) => {
  return (
    <button className={`${styles.closeButton} ${className || ''}`} onClick={onClick} aria-label='Close menu'>
      <span></span>
      <span></span>
    </button>
  )
}
