import { Certificate } from '../CertificatesList'
import { Image } from '@/components/Image'

type CertificateItemProps = {
  certificate: Certificate
  loading?: 'lazy' | 'eager'
}

export const CertificateItem = ({ certificate, loading = 'lazy' }: CertificateItemProps) => {
  const { image, imageAlt } = certificate

  return <Image src={image} alt={imageAlt} width={294} height={220} loading={loading} />
}
