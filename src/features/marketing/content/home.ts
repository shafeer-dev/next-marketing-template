/**
 * Home Page Content Configuration
 * Maps translation keys to content schemas
 */

import type {
    HeroContent,
    FeaturesContent,
    TestimonialsContent,
    CTAContent,
    StatsContent,
} from './schemas'

/**
 * Hero section content
 */
export const heroContent: HeroContent = {
    variant: 'centered',
    headline: 'hero.headline',
    subheadline: 'hero.subheadline',
    primaryCta: {
        label: 'hero.primaryCta',
        href: '/contact',
    },
    secondaryCta: {
        label: 'hero.secondaryCta',
        href: '/services',
    },
}

/**
 * Features section content
 */
export const featuresContent: FeaturesContent = {
    variant: 'grid',
    title: 'features.title',
    subtitle: 'features.subtitle',
    columns: 3,
    items: [
        {
            icon: 'Zap',
            title: 'features.items.0.title',
            description: 'features.items.0.description',
        },
        {
            icon: 'Shield',
            title: 'features.items.1.title',
            description: 'features.items.1.description',
        },
        {
            icon: 'Sparkles',
            title: 'features.items.2.title',
            description: 'features.items.2.description',
        },
        {
            icon: 'Globe',
            title: 'features.items.3.title',
            description: 'features.items.3.description',
        },
        {
            icon: 'Rocket',
            title: 'features.items.4.title',
            description: 'features.items.4.description',
        },
        {
            icon: 'HeartHandshake',
            title: 'features.items.5.title',
            description: 'features.items.5.description',
        },
    ],
}

/**
 * Stats section content
 */
export const statsContent: StatsContent = {
    items: [
        { value: '500+', label: 'stats.projects' },
        { value: '99%', label: 'stats.satisfaction' },
        { value: '24/7', label: 'stats.support' },
        { value: '50+', label: 'stats.countries' },
    ],
}

/**
 * Testimonials section content
 */
export const testimonialsContent: TestimonialsContent = {
    variant: 'grid',
    title: 'testimonials.title',
    subtitle: 'testimonials.subtitle',
    items: [
        {
            quote: 'testimonials.items.0.quote',
            author: 'Sarah Johnson',
            role: 'CEO',
            company: 'TechCorp',
            rating: 5,
        },
        {
            quote: 'testimonials.items.1.quote',
            author: 'Michael Chen',
            role: 'Founder',
            company: 'StartupXYZ',
            rating: 5,
        },
        {
            quote: 'testimonials.items.2.quote',
            author: 'Emily Davis',
            role: 'Marketing Director',
            company: 'GrowthCo',
            rating: 5,
        },
    ],
}

/**
 * CTA section content
 */
export const ctaContent: CTAContent = {
    variant: 'simple',
    headline: 'cta.headline',
    description: 'cta.description',
    primaryButton: {
        label: 'cta.primaryButton',
        href: '/contact',
    },
    secondaryButton: {
        label: 'cta.secondaryButton',
        href: '/pricing',
    },
}
