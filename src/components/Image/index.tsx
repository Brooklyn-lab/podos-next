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
  sizes?: string
  className?: string
}

export const Image = ({ src, alt, width, height, loading = 'lazy', sizes, className }: ImageProps) => {
  const isString = typeof src === 'string'
  const hasExtension = isString ? /\.(png|jpg|jpeg|webp)$/i.test(src) : false
  const normalize = (value?: string) => (value && value.length > 0 ? value : undefined)
  const useWidthDescriptors = !!sizes

  const webpSrcSet = isString
    ? hasExtension
      ? undefined
      : useWidthDescriptors
        ? `${src}.webp ${width}w, ${src}@2x.webp ${width * 2}w`
        : `${src}@2x.webp 2x, ${src}.webp 1x`
    : src.webp1x
      ? useWidthDescriptors
        ? `${src.webp1x} ${width}w${normalize(src.webp2x) ? `, ${src.webp2x} ${width * 2}w` : ''}`
        : `${normalize(src.webp2x) ?? src.webp1x} 2x, ${src.webp1x} 1x`
      : undefined

  const pngSrcSet = isString
    ? hasExtension
      ? undefined
      : useWidthDescriptors
        ? `${src}.png ${width}w, ${src}@2x.png ${width * 2}w`
        : `${src}@2x.png 2x, ${src}.png 1x`
    : src.png1x
      ? useWidthDescriptors
        ? `${src.png1x} ${width}w${normalize(src.png2x) ? `, ${src.png2x} ${width * 2}w` : ''}`
        : `${normalize(src.png2x) ?? src.png1x} 2x, ${src.png1x} 1x`
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
        {webpSrcSet && <source srcSet={webpSrcSet} type='image/webp' sizes={sizes} />}
        <img src={imgSrc} srcSet={pngSrcSet} sizes={sizes} alt={alt} loading={loading} width={width} height={height} />
      </picture>
    </div>
  )
}
