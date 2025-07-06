import { useEffect, useCallback, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import styles from './Notification.module.scss'

type NotificationProps = PropsWithChildren & {
  onClose: () => void
  autoCloseTime?: number
  disableAutoClose?: boolean
}

export const Notification = ({
  onClose,
  autoCloseTime = 5000,
  disableAutoClose = false,
  children,
}: NotificationProps) => {
  const handleOverlayClick = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    const scrollPosition = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)

    document.documentElement.classList.add('no-scroll')
    document.body.classList.add('no-scroll')
    document.body.style.top = `-${scrollPosition}px`

    return () => {
      document.documentElement.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
      document.documentElement.style.removeProperty('--scrollbar-width')

      document.body.style.removeProperty('top')
      window.scrollTo(0, scrollPosition)
    }
  }, [])

  useEffect(() => {
    if (disableAutoClose) return

    const timer = setTimeout(() => {
      onClose()
    }, autoCloseTime)

    return () => clearTimeout(timer)
  }, [autoCloseTime, onClose, disableAutoClose])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick} role='presentation'>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  )
}
