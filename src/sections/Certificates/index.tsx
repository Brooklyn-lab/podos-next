import { Container } from '@/components/Container'
import { SkeletonTitle, SkeletonText, SkeletonBlock } from '@/components/Skeleton'
import styles from './Certificates.module.scss'
import { Locale } from '@/config/i18n'
import { getCertificates, type CertificateItem } from '@/lib/payload'
import { CertificatesList } from './components/CertificatesList'
import { HeaderContent } from './components/HeaderContent'

type CertificatesSectionProps = {
  locale: Locale
}

const CertificatesSkeleton = () => (
  <section className={styles.certificates}>
    <Container>
      <SkeletonTitle />
      <SkeletonText width='medium' />
      <SkeletonText width='short' />
      <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} style={{ flex: 1 }}>
            <SkeletonBlock />
          </div>
        ))}
      </div>
    </Container>
  </section>
)

export const CertificatesSection = async ({ locale }: CertificatesSectionProps) => {
  const cmsData = await getCertificates(locale)

  if (!cmsData || !cmsData.certificates || cmsData.certificates.length === 0) {
    return <CertificatesSkeleton />
  }

  const formattedCertificates = cmsData.certificates
    .map((cert: CertificateItem) => {
      const sizes = cert.image?.sizes || {}

      return {
        image: {
          webp1x: sizes.thumbnail?.url,
          webp2x: sizes.thumbnailRetina?.url,
          png1x: sizes.thumbnailPng?.url,
          png2x: sizes.thumbnailRetinaPng?.url,
          fallback: cert.image?.url,
        },
        imageAlt: cert.imageAlt || cert.image?.alt || '',
      }
    })
    .filter((cert) => Boolean(cert.image.fallback || cert.image.webp1x || cert.image.png1x))
    .reverse()

  return (
    <section className={styles.certificates}>
      <Container>
        <HeaderContent data={cmsData} />
        <CertificatesList certificates={formattedCertificates} />
      </Container>
    </section>
  )
}
