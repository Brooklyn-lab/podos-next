import { type Locale } from '@/config/i18n'

import type {
  CertificatesData,
  CertificatesGlobal,
  ServicesData,
  SettingsData,
  SettingsGlobal,
  WorksData,
  WorksGlobal,
} from './types'

const API_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
const FETCH_TIMEOUT_MS = 5000
const BYPASS_SECRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {}
  if (BYPASS_SECRET) {
    headers['x-vercel-protection-bypass'] = BYPASS_SECRET
  }
  return headers
}

function fetchWithTimeout(url: string, options?: RequestInit): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: { ...buildHeaders(), ...options?.headers },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  })
}

async function fetchCollection<T>(endpoint: string, locale: Locale, depth = 1): Promise<T | null> {
  try {
    const res = await fetchWithTimeout(
      `${API_URL}/api/${endpoint}?where[locale][equals]=${locale}&limit=1&depth=${depth}`,
      { next: { revalidate: 60 } }
    )

    if (!res.ok) return null

    const data = await res.json()
    if (!data.docs || data.docs.length === 0) return null

    return data.docs[0]
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    return null
  }
}

export async function getServices(locale: Locale): Promise<ServicesData | null> {
  return fetchCollection<ServicesData>('services', locale)
}

export async function getCertificates(locale: Locale): Promise<CertificatesData | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/globals/certificates?depth=2`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return null

    const data: CertificatesGlobal = await res.json()
    const localeText = data[locale]

    if (!localeText?.title || !data.certificates?.length) return null

    return {
      ...localeText,
      certificates: data.certificates,
    }
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return null
  }
}

export async function getSettings(locale: Locale): Promise<SettingsData | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/globals/settings?depth=1`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return null

    const data: SettingsGlobal = await res.json()
    const addressText = data[locale]

    if (!addressText?.address || !data.phone) return null

    return {
      phone: data.phone,
      email: data.email,
      socialMedia: data.socialMedia ?? [],
      mapEmbedUrl: data.mapEmbedUrl ?? '',
      mapLinkUrl: data.mapLinkUrl ?? '',
      mapIcon: data.mapIcon ?? null,
      ...addressText,
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

export async function getWorks(locale: Locale): Promise<WorksData | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/globals/works?depth=2`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return null

    const data: WorksGlobal = await res.json()
    const localeText = data[locale]

    if (!localeText?.title || !data.works?.length) return null

    return {
      ...localeText,
      works: data.works,
    }
  } catch (error) {
    console.error('Error fetching works:', error)
    return null
  }
}
