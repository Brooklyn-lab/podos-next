// Types for Google Analytics
type GTMConfig = Record<string, string | number | boolean>
type DataLayerEvent = Record<string, string | number | boolean>

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (command: 'config' | 'event' | 'js' | 'set', targetId: string | Date, config?: GTMConfig) => void
    dataLayer: DataLayerEvent[]
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = []
}

// Helper function to push events to dataLayer
export const trackEvent = (eventName: string, parameters?: DataLayerEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    })
  }
}

// Specific event tracking functions
export const analytics = {
  // Track form submissions
  trackFormSubmission: (formType: string, success: boolean) => {
    trackEvent('form_submit', {
      form_type: formType,
      success: success,
      timestamp: new Date().toISOString(),
    })
  },

  // Track contact clicks (phone, email)
  trackContactClick: (contactType: 'phone' | 'email', value: string) => {
    trackEvent('contact_click', {
      contact_type: contactType,
      contact_value: value,
    })
  },

  // Track social media clicks
  trackSocialClick: (platform: string, url: string) => {
    trackEvent('social_click', {
      social_platform: platform,
      social_url: url,
    })
  },

  // Track navigation clicks
  trackNavigation: (section: string, source: 'header' | 'mobile_menu' | 'footer') => {
    trackEvent('navigation_click', {
      section: section,
      source: source,
    })
  },

  // Track language change
  trackLanguageChange: (fromLang: string, toLang: string) => {
    trackEvent('language_change', {
      from_language: fromLang,
      to_language: toLang,
    })
  },

  // Track certificate view (for future modal implementation)
  trackCertificateView: (certificateId: string) => {
    trackEvent('certificate_view', {
      certificate_id: certificateId,
    })
  },
}
