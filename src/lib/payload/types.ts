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

export type CertificatesLocaleText = {
  title: string
  description: string
}

export type CertificatesGlobal = {
  pl: CertificatesLocaleText
  ua: CertificatesLocaleText
  certificates: CertificateItem[]
}

export type CertificatesData = CertificatesLocaleText & {
  certificates: CertificateItem[]
}

export type WorkItem = {
  image?: CMSImage
  imageAlt?: string | null
}

export type WorksLocaleText = {
  title: string
  description: string
  headerParagraph1?: string | null
}

export type WorksGlobal = {
  pl: WorksLocaleText
  ua: WorksLocaleText
  works: WorkItem[]
}

export type WorksData = WorksLocaleText & {
  works: WorkItem[]
}

export type SocialMediaLink = {
  platform: string
  url: string
  icon: CMSImage
}

export type SettingsAddressText = {
  addressTitle: string
  address: string
  building?: string | null
  additionalTitle?: string | null
  additionalItems?: { text: string }[]
}

export type SettingsGlobal = {
  phone: string
  email: string
  socialMedia: SocialMediaLink[]
  mapEmbedUrl: string
  mapLinkUrl: string
  mapIcon?: CMSImage | null
  pl: SettingsAddressText
  ua: SettingsAddressText
}

export type SettingsData = {
  phone: string
  email: string
  socialMedia: SocialMediaLink[]
  mapEmbedUrl: string
  mapLinkUrl: string
  mapIcon?: CMSImage | null
} & SettingsAddressText
