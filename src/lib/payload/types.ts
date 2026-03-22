export type MediaSize = {
  url?: string
  width?: number
  height?: number
  filename?: string
}

export type CMSImage = {
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

export type CertificateItem = {
  image?: CMSImage
  imageAlt?: string | null
}

export type CertificatesData = {
  title: string
  description: string
  certificates: CertificateItem[]
}

export type WorkItem = {
  image?: CMSImage
  imageAlt?: string | null
}

export type WorksData = {
  title: string
  description: string
  headerParagraph1?: string | null
  works: WorkItem[]
}

export type SocialMediaLink = {
  platform: string
  url: string
  icon: CMSImage
}

export type SettingsData = {
  phone: string
  email: string
  socialMedia: SocialMediaLink[]
  mapEmbedUrl: string
  mapLinkUrl: string
  mapIcon?: CMSImage | null
  addressTitle: string
  address: string
  building?: string | null
  additionalTitle?: string | null
  additionalItems?: { text: string }[]
}
