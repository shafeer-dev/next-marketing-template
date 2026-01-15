/**
 * Marketing Content Schemas
 * TypeScript defines structure; translations provide copy
 */

/**
 * Hero Section Content
 */
export interface HeroContent {
    /** Hero variant style */
    variant: 'centered' | 'split' | 'video' | 'image-bg'
    /** Headline translation key */
    headline: string
    /** Subheadline translation key */
    subheadline: string
    /** Primary CTA */
    primaryCta: {
        label: string
        href: string
    }
    /** Secondary CTA (optional) */
    secondaryCta?: {
        label: string
        href: string
    }
    /** Background image (for image-bg variant) */
    backgroundImage?: string
    /** Hero image (for split variant) */
    heroImage?: string
    /** Video URL (for video variant) */
    videoUrl?: string
}

/**
 * Feature Item
 */
export interface FeatureItem {
    /** Icon name (lucide-react) */
    icon: string
    /** Title translation key */
    title: string
    /** Description translation key */
    description: string
}

/**
 * Features Section Content
 */
export interface FeaturesContent {
    /** Section variant */
    variant: 'grid' | 'alternating' | 'icons'
    /** Section title translation key */
    title: string
    /** Section subtitle translation key */
    subtitle?: string
    /** Feature items */
    items: FeatureItem[]
    /** Number of columns (for grid variant) */
    columns?: 2 | 3 | 4
}

/**
 * Testimonial Item
 */
export interface TestimonialItem {
    /** Quote translation key */
    quote: string
    /** Author name */
    author: string
    /** Author role/title */
    role: string
    /** Company name */
    company?: string
    /** Avatar image URL */
    avatar?: string
    /** Rating (1-5) */
    rating?: number
}

/**
 * Testimonials Section Content
 */
export interface TestimonialsContent {
    /** Section variant */
    variant: 'carousel' | 'grid' | 'featured'
    /** Section title translation key */
    title: string
    /** Section subtitle translation key */
    subtitle?: string
    /** Testimonial items (content keys reference messages) */
    items: TestimonialItem[]
}

/**
 * CTA Section Content
 */
export interface CTAContent {
    /** CTA variant style */
    variant: 'simple' | 'split' | 'banner' | 'floating'
    /** Headline translation key */
    headline: string
    /** Description translation key */
    description?: string
    /** Primary button */
    primaryButton: {
        label: string
        href: string
    }
    /** Secondary button (optional) */
    secondaryButton?: {
        label: string
        href: string
    }
    /** Background color/style */
    background?: 'primary' | 'secondary' | 'gradient' | 'image'
    /** Background image (if background = 'image') */
    backgroundImage?: string
}

/**
 * Stats Item
 */
export interface StatItem {
    /** Value (e.g., "99%", "500+") */
    value: string
    /** Label translation key */
    label: string
}

/**
 * Stats Section Content
 */
export interface StatsContent {
    /** Section title translation key (optional) */
    title?: string
    /** Stats items */
    items: StatItem[]
}

/**
 * Pricing Tier
 */
export interface PricingTier {
    /** Tier name translation key */
    name: string
    /** Price display */
    price: string
    /** Billing period translation key */
    period: string
    /** Description translation key */
    description: string
    /** Features list (translation keys) */
    features: string[]
    /** CTA button */
    cta: {
        label: string
        href: string
    }
    /** Highlight this tier */
    highlighted?: boolean
    /** Badge text translation key */
    badge?: string
}

/**
 * Pricing Section Content
 */
export interface PricingContent {
    /** Section title translation key */
    title: string
    /** Section subtitle translation key */
    subtitle?: string
    /** Pricing tiers */
    tiers: PricingTier[]
}
