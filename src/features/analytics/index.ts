/**
 * Analytics Feature - Public Exports
 */

// Components
export { GoogleAnalytics } from './components/GoogleAnalytics'
export { MetaPixel } from './components/MetaPixel'

// Tracking utilities
export {
    trackEvent,
    trackPageView,
    trackFormSubmission,
    trackButtonClick,
    trackCtaClick,
    trackPurchase,
} from './lib/tracking'
