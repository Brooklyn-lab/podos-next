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
