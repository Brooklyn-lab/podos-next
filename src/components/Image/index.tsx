import cx from 'classnames'
import styles from './Image.module.scss'

export type ImageSourceSet = {
  webp1x?: string
  webp2x?: string
  png1x?: string
  png2x?: string
  fallback?: string
}

export type ImageProps = {
  src: string | ImageSourceSet
  alt: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  className?: string
}

export const Image = ({ src, alt, width, height, loading = 'lazy', className }: ImageProps) => {
  const isString = typeof src === 'string'
  const hasExtension = isString ? /\.(png|jpg|jpeg|webp)$/i.test(src) : false
  const normalize = (value?: string) => (value && value.length > 0 ? value : undefined)

  const webpSrcSet = isString
    ? hasExtension
      ? undefined
      : `${src}@2x.webp 2x, ${src}.webp 1x`
    : src.webp1x
      ? `${normalize(src.webp2x) ?? src.webp1x} 2x, ${src.webp1x} 1x`
      : undefined

  const pngSrcSet = isString
    ? hasExtension
      ? undefined
      : `${src}@2x.png 2x, ${src}.png 1x`
    : src.png1x
      ? `${normalize(src.png2x) ?? src.png1x} 2x, ${src.png1x} 1x`
      : undefined

  const imgSrc = isString
    ? hasExtension
      ? src
      : `${src}.png`
    : (normalize(src.png1x) ?? normalize(src.webp1x) ?? normalize(src.fallback))

  if (!imgSrc) return null

  return (
    <div className={cx(styles.image, className)}>
      <picture>
        {webpSrcSet && <source srcSet={webpSrcSet} type='image/webp' />}
        <img src={imgSrc} srcSet={pngSrcSet} alt={alt} loading={loading} width={width} height={height} />
      </picture>
    </div>
  )
}
