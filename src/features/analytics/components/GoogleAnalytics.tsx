'use client'

import Script from 'next/script'
import { getFeature } from '@/config/features'

/**
 * Google Analytics 4 Component
 * Loads GA4 script when analytics feature is enabled
 *
 * Add to root layout:
 * <GoogleAnalytics />
 */
export function GoogleAnalytics() {
    const { enabled, gaId } = getFeature('analytics')

    if (!enabled || !gaId) {
        return null
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
            </Script>
        </>
    )
}
