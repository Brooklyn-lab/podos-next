import { CertificateItem } from '../CertificateItem'
import { Slider } from '@/components/Slider'
import styles from './CertificatesList.module.scss'

export type Certificate = {
  image: {
    webp1x?: string
    webp2x?: string
    png1x?: string
    png2x?: string
    fallback?: string
  }
  imageAlt: string
}

type CertificatesListProps = {
  certificates: Certificate[]
}

export const CertificatesList = ({ certificates }: CertificatesListProps) => {
  return (
    <Slider
      className={styles.slider}
      spaceBetween={16}
      slidesPerView={4.2}
      breakpoints={{
        0: { slidesPerView: 1.1 },
        320: { slidesPerView: 1.4 },
        420: { slidesPerView: 1.8 },
        568: { slidesPerView: 2.4 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 3.6 },
        1200: { slidesPerView: 4.2 },
      }}
    >
      {certificates.map((certificate, index) => (
        <CertificateItem
          key={certificate.image.fallback || index}
          certificate={certificate}
          loading={index < 5 ? 'eager' : 'lazy'} // First 5 images eager
        />
      ))}
    </Slider>
  )
}
