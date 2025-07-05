import { type PropsWithChildren } from 'react'
import styles from './Container.module.scss'
import cx from 'classnames'

type ContainerProps = PropsWithChildren & {
  className?: string
}

export const Container = ({ children, className }: ContainerProps) => {
  return <div className={cx(styles.container, className)}>{children}</div>
}
