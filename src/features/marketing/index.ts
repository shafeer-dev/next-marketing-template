/**
 * Marketing Feature - Public Exports
 */

// Components
export { Hero } from './components/Hero'
export { Features } from './components/Features'
export { Testimonials } from './components/Testimonials'
export { CTA } from './components/CTA'

// Content Schemas
export type {
    HeroContent,
    FeaturesContent,
    FeatureItem,
    TestimonialsContent,
    TestimonialItem,
    CTAContent,
    StatsContent,
    StatItem,
    PricingContent,
    PricingTier,
} from './content/schemas'

// Pre-configured Content
export {
    heroContent,
    featuresContent,
    testimonialsContent,
    ctaContent,
    statsContent,
} from './content/home'
