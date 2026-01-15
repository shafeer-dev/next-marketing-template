/**
 * Robots.txt Generation
 * Controls search engine crawling
 */

import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = siteConfig.url

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/_next/',
                    '/admin/',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
