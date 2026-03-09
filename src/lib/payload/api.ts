import { type Locale } from '@/config/i18n'

import type { CertificatesData, CertificatesGlobal, ServicesData, WorksData, WorksGlobal } from './types'

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const FETCH_TIMEOUT_MS = 5000

function fetchWithTimeout(url: string, options?: RequestInit): Promise<Response> {
  return fetch(url, {
    ...options,
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
