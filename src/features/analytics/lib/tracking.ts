/**
 * Analytics Tracking Utilities
 * Unified interface for tracking events across providers
 */

import { getFeature } from '@/config/features'

/**
 * Track a custom event
 * Sends to all enabled providers (GA4, Meta Pixel)
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
    const { enabled } = getFeature('analytics')

    if (!enabled) {
        // Log in development for debugging
        if (process.env.NODE_ENV === 'development') {
            console.log('[Analytics] Event (disabled):', eventName, params)
        }
        return
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
        ; (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag(
            'event',
            eventName,
            params
        )
    }

    // Meta Pixel
    if (typeof window !== 'undefined' && 'fbq' in window) {
        ; (window as typeof window & { fbq: (...args: unknown[]) => void }).fbq(
            'trackCustom',
            eventName,
            params
        )
    }
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string) {
    trackEvent('page_view', { page_path: path, page_title: title })
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean) {
    trackEvent('form_submit', { form_name: formName, success })
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, location?: string) {
    trackEvent('button_click', { button_name: buttonName, location })
}

/**
 * Track CTA click
 */
export function trackCtaClick(ctaName: string, destination?: string) {
    trackEvent('cta_click', { cta_name: ctaName, destination })
}

/**
 * E-commerce: Track purchase (stub)
 */
export function trackPurchase(params: {
    transactionId: string
    value: number
    currency: string
    items?: unknown[]
}) {
    trackEvent('purchase', params)
}
