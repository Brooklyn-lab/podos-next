export const GOOGLE_TAG_MANAGER_ID = process.env.NEXT_PUBLIC_GTM_ID

export const isAnalyticsEnabled = () => {
  return (
    GOOGLE_TAG_MANAGER_ID &&
    (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true')
  )
}
