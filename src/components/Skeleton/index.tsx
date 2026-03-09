import cx from 'classnames'
import styles from './Skeleton.module.scss'

type BoneProps = {
  className?: string
}

export const SkeletonTitle = ({ className }: BoneProps) => <div className={cx(styles.bone, styles.title, className)} />

export const SkeletonText = ({ className, width = 'full' }: BoneProps & { width?: 'short' | 'medium' | 'full' }) => (
  <div
    className={cx(styles.bone, styles.text, className, {
      [styles.textShort]: width === 'short',
      [styles.textMedium]: width === 'medium',
      [styles.textFull]: width === 'full',
    })}
  />
)

export const SkeletonBlock = ({ className }: BoneProps) => <div className={cx(styles.bone, styles.block, className)} />
