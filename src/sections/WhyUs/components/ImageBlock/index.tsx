import { Image, type ImageProps } from '@/components/Image'
import styles from './ImageBlock.module.scss'
import cx from 'classnames'

type ImageBlockProps = {
  images: {
    first: ImageProps
    second: ImageProps
  }
  className?: string
}

export const ImageBlock = ({ images, className }: ImageBlockProps) => {
  const { first, second } = images

  return (
    <li className={cx(styles.imageBlock, className)}>
      <Image
        src={first.src}
        alt={first.alt}
        width={first.width}
        height={first.height}
        loading={first.loading}
        className={first.className}
      />
      <Image
        src={second.src}
        alt={second.alt}
        width={second.width}
        height={second.height}
        loading={second.loading}
        className={second.className}
      />
    </li>
  )
}
