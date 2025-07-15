import styles from './BurgerButton.module.scss'

type BurgerButtonProps = {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export const BurgerButton = ({ isOpen, onClick, className }: BurgerButtonProps) => {
  return (
    <button
      className={`${styles.burger} ${isOpen ? styles.burgerOpen : ''} ${className || ''}`}
      onClick={onClick}
      aria-label='Toggle menu'
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}
