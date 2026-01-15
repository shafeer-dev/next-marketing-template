/**
 * Sitemap Generation
 * Generates sitemap.xml for search engines
 */

import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

/**
 * Define all static routes here
 * Add dynamic routes as needed
 */
const staticRoutes = [
    '',           // Home
    '/about',
    '/services',
    '/contact',
    '/privacy',
    '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url

    // Generate entries for each locale
    const entries: MetadataRoute.Sitemap = []

    for (const locale of siteConfig.locales) {
        for (const route of staticRoutes) {
            entries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: route === '' ? 'weekly' : 'monthly',
                priority: route === '' ? 1 : 0.8,
            })
        }
    }

    return entries
}
