import { Certificate } from '../CertificatesList'
import { Image } from '@/components/Image'

type CertificateItemProps = {
  certificate: Certificate
}

export const CertificateItem = ({ certificate }: CertificateItemProps) => {
  const { imageUrl, imageAlt } = certificate

  return <Image src={imageUrl} alt={imageAlt} width={294} height={220} />
}
