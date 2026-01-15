/**
 * SEO Configuration
 * Default SEO values and metadata generation utilities
 */

import { siteConfig } from './site'

export const seoConfig = {
    /** Default title template */
    titleTemplate: `%s | ${siteConfig.name}`,

    /** Default meta description */
    defaultDescription: siteConfig.description,

    /** Open Graph defaults */
    openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: siteConfig.name,
    },

    /** Twitter card defaults */
    twitter: {
        card: 'summary_large_image' as const,
        creator: siteConfig.social.twitter || undefined,
    },

    /** Robots defaults */
    robots: {
        index: true,
        follow: true,
    },
} as const

export type SeoConfig = typeof seoConfig

/**
 * SEO Props for page-level metadata
 */
export interface PageSeoProps {
    title: string
    description?: string
    image?: string
    noIndex?: boolean
    canonical?: string
}
