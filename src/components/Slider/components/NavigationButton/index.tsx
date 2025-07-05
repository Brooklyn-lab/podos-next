import React, { type ButtonHTMLAttributes } from 'react'
import cx from 'classnames'
import styles from './NavigationButton.module.scss'

interface NavigationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'prev' | 'next'
  iconName: string
}

export const NavigationButton = React.forwardRef<HTMLButtonElement, NavigationButtonProps>(
  ({ direction, iconName, ...props }, ref) => (
    <button
      ref={ref}
      type='button'
      className={cx(
        styles.button,
        direction === 'prev' ? 'swiper-button-prev' : 'swiper-button-next',
        styles[direction]
      )}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      {...props}
    >
      <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' className={styles.icon}>
        <use href={`/images/icons.svg#${iconName}`} />
      </svg>
    </button>
  )
)

NavigationButton.displayName = 'NavigationButton'
