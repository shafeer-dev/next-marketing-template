/**
 * Site Configuration
 * Central source of truth for site metadata
 * Update these values for each client
 */

export const siteConfig = {
  /** Site name - appears in title, footer, etc. */
  name: 'Site Name',

  /** Site description - used for SEO fallback */
  description: 'A modern marketing website built with Next.js',

  /** Production URL - used for sitemap, OG images, etc. */
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://example.com',

  /** Author information */
  author: {
    name: '',
    email: '',
    url: '',
  },

  /** Social media links */
  social: {
    twitter: '',
    github: '',
    linkedin: '',
    instagram: '',
    facebook: '',
  },

  /** Supported locales */
  locales: ['en', 'ar'] as const,

  /** Default locale */
  defaultLocale: 'en' as const,

  /** Contact information */
  contact: {
    email: '',
    phone: '',
    address: '',
  },
} as const

export type SiteConfig = typeof siteConfig
export type Locale = (typeof siteConfig.locales)[number]
