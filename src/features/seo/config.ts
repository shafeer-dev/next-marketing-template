/**
 * SEO Feature Configuration
 * Types and utilities for SEO metadata
 */

import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { seoConfig } from '@/config/seo'

/**
 * Page SEO properties
 */
export interface PageSeoProps {
    /** Page title */
    title: string
    /** Page description */
    description?: string
    /** OG image URL */
    image?: string
    /** Prevent indexing */
    noIndex?: boolean
    /** Canonical URL */
    canonical?: string
    /** Additional keywords */
    keywords?: string[]
}

/**
 * Generate metadata for a page
 * Use in page.tsx generateMetadata export
 */
export function generatePageMetadata({
    title,
    description = seoConfig.defaultDescription,
    image,
    noIndex = false,
    canonical,
    keywords,
}: PageSeoProps): Metadata {
    const url = canonical || siteConfig.url

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            type: seoConfig.openGraph.type as 'website',
            locale: seoConfig.openGraph.locale,
            images: image
                ? [{ url: image, width: 1200, height: 630, alt: title }]
                : undefined,
        },
        twitter: {
            card: seoConfig.twitter.card,
            title,
            description,
            images: image ? [image] : undefined,
            creator: seoConfig.twitter.creator,
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
        alternates: canonical ? { canonical } : undefined,
    }
}

/**
 * Generate metadata for the root layout
 */
export function generateRootMetadata(): Metadata {
    return {
        metadataBase: new URL(siteConfig.url),
        title: {
            default: siteConfig.name,
            template: seoConfig.titleTemplate,
        },
        description: siteConfig.description,
        openGraph: {
            type: 'website',
            siteName: siteConfig.name,
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
        },
        robots: {
            index: true,
            follow: true,
        },
    }
}
