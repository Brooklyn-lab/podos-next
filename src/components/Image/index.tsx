import cx from 'classnames'
import styles from './Image.module.scss'

export type ImageProps = {
  src: string
  alt: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  className?: string
}

export const Image = ({ src, alt, width, height, loading = 'lazy', className }: ImageProps) => {
  return (
    <div className={cx(styles.image, className)}>
      <picture>
        <source srcSet={`${src}@2x.webp 2x, ${src}.webp 1x`} type='image/webp' />
        <img src={`${src}.png`} alt={alt} loading={loading} width={width} height={height} />
      </picture>
    </div>
  )
}
