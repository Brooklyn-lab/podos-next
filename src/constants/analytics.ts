export const GOOGLE_TAG_MANAGER_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NP3MCTKM'

export const isAnalyticsEnabled = () => {
  return process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'
}
