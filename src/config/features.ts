/**
 * Feature Flags Configuration
 * All features are opt-in and disabled by default
 *
 * Enable features via environment variables or by modifying defaults
 */

export interface FeatureConfig {
    enabled: boolean
}

export interface AnimationFeature extends FeatureConfig {
    /** Animation intensity preset */
    preset: 'none' | 'subtle' | 'full'
}

export interface NewsletterFeature extends FeatureConfig {
    /** Newsletter provider (null = stub mode) */
    provider: 'mailchimp' | 'convertkit' | 'resend' | null
}

export interface AnalyticsFeature extends FeatureConfig {
    /** Google Analytics 4 Measurement ID */
    gaId: string | null
    /** Meta Pixel ID */
    metaPixelId: string | null
}

export interface ContactFormFeature extends FeatureConfig {
    /** Form submission endpoint */
    endpoint: string | null
}

export interface ChatWidgetFeature extends FeatureConfig {
    /** Chat provider */
    provider: 'tawk' | 'crisp' | 'intercom' | null
}

export interface CookieConsentFeature extends FeatureConfig {
    /** Cookie consent mode */
    mode: 'banner' | 'modal'
}

/**
 * Feature flags - all disabled by default
 * Enable via environment variables
 */
export const features = {
    /** Micro-animations and transitions */
    animations: {
        enabled: false,
        preset: 'subtle',
    } satisfies AnimationFeature,

    /** Newsletter signup integration */
    newsletter: {
        enabled: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER === 'true',
        provider: null,
    } satisfies NewsletterFeature,

    /** Analytics tracking */
    analytics: {
        enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
        gaId: process.env.NEXT_PUBLIC_GA_ID || null,
        metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || null,
    } satisfies AnalyticsFeature,

    /** Contact form */
    contactForm: {
        enabled: process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM === 'true',
        endpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || null,
    } satisfies ContactFormFeature,

    /** Chat widget */
    chatWidget: {
        enabled: false,
        provider: null,
    } satisfies ChatWidgetFeature,

    /** Cookie consent banner */
    cookieConsent: {
        enabled: false,
        mode: 'banner',
    } satisfies CookieConsentFeature,
} as const

export type Features = typeof features

/**
 * Get feature configuration
 * Use this function to access features in components
 */
export function getFeature<K extends keyof Features>(key: K): Features[K] {
    return features[key]
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(key: keyof Features): boolean {
    return features[key].enabled
}
