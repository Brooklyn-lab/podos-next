import { type Locale } from '@/config/i18n'

import type { CertificatesData, ServicesData, SettingsData, WorksData } from './types'

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

function appendHlParam(url: string, locale: Locale): string {
  if (!url) return url
  try {
    const parsed = new URL(url)
    parsed.searchParams.set('hl', locale)
    return parsed.toString()
  } catch {
    return url
  }
}

export async function getServices(locale: Locale): Promise<ServicesData | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/services?locale=${locale}&limit=1&depth=1`, {
      next: { revalidate: 60 },
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
    const res = await fetchWithTimeout(`${API_URL}/api/globals/certificates?locale=${locale}&depth=2`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return null

    const data: CertificatesData = await res.json()
    if (!data.title || !data.certificates?.length) return null

    return data
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return null
  }
}

export async function getSettings(locale: Locale): Promise<SettingsData | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/globals/settings?locale=${locale}&depth=1`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return null

    const data: SettingsData = await res.json()
    if (!data.address || !data.phone) return null

    return {
      ...data,
      mapEmbedUrl: appendHlParam(data.mapEmbedUrl ?? '', locale),
      mapLinkUrl: appendHlParam(data.mapLinkUrl ?? '', locale),
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

export async function getWorks(locale: Locale): Promise<WorksData | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/globals/works?locale=${locale}&depth=2`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return null

    const data: WorksData = await res.json()
    if (!data.title || !data.works?.length) return null

    return data
  } catch (error) {
    console.error('Error fetching works:', error)
    return null
  }
}
