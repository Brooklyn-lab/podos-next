import { type Locale } from '@/config/i18n'

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export type ServiceItem = {
  title: string
  price: string
  duration?: string
  treatment?: string
}

export type ServicesData = {
  title: string
  description: string
  headerParagraph1: string
  headerParagraph2: string
  items: ServiceItem[]
}

export type MediaSize = {
  url?: string
  width?: number
  height?: number
  filename?: string
}

export type CertificateImage = {
  url?: string
  alt?: string
  sizes?: {
    thumbnail?: MediaSize
    thumbnailRetina?: MediaSize
    thumbnailPng?: MediaSize
    thumbnailRetinaPng?: MediaSize
    card?: MediaSize
    cardRetina?: MediaSize
    cardPng?: MediaSize
    cardRetinaPng?: MediaSize
  }
}

export type CertificateItem = {
  image?: CertificateImage
  imageAlt?: string
}

export type CertificatesData = {
  title: string
  description: string
  certificates: CertificateItem[]
}

export type WorkItem = {
  image?: CertificateImage
  imageAlt?: string
}

export type WorksData = {
  title: string
  description: string
  headerParagraph1: string
  works: WorkItem[]
}

export async function getServices(locale: Locale): Promise<ServicesData | null> {
  try {
    const url = `${API_URL}/api/services?where[locale][equals]=${locale}&limit=1`

    const res = await fetch(url, {
      next: { revalidate: 60 }, // Revalidate every minute
    })

    if (!res.ok) return null

    const data = await res.json()

    if (!data.docs || data.docs.length === 0) return null

    return data.docs[0]
  } catch (error) {
    console.error('Error fetching services:', error)
    return null
  }
}

export async function getCertificates(locale: Locale): Promise<CertificatesData | null> {
  try {
    const res = await fetch(`${API_URL}/api/certificates?where[locale][equals]=${locale}&limit=1&depth=2`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return null

    const data = await res.json()
    if (!data.docs || data.docs.length === 0) return null

    return data.docs[0]
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return null
  }
}

export async function getWorks(locale: Locale): Promise<WorksData | null> {
  try {
    const res = await fetch(`${API_URL}/api/works?where[locale][equals]=${locale}&limit=1&depth=2`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return null

    const data = await res.json()
    if (!data.docs || data.docs.length === 0) return null

    return data.docs[0]
  } catch (error) {
    console.error('Error fetching works:', error)
    return null
  }
}
