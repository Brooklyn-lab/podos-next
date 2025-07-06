import { CertificateItem } from '../CertificateItem'
import { Slider } from '@/components/Slider'

export type Certificate = {
  imageUrl: string
  imageAlt: string
}

type CertificatesListProps = {
  certificates: Certificate[]
}

export const CertificatesList = ({ certificates }: CertificatesListProps) => {
  return (
    <Slider
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
      {certificates.map((certificate) => (
        <CertificateItem key={certificate.imageUrl} certificate={certificate} />
      ))}
    </Slider>
  )
}
