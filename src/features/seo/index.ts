/**
 * SEO Feature - Public Exports
 */

// Configuration and utilities
export { generatePageMetadata, generateRootMetadata } from './config'
export type { PageSeoProps } from './config'

// JSON-LD Components
export {
    OrganizationJsonLd,
    WebsiteJsonLd,
    LocalBusinessJsonLd,
    FAQJsonLd,
    BreadcrumbJsonLd,
} from './components/JsonLd'
export type {
    LocalBusinessJsonLdProps,
    FAQItem,
    BreadcrumbItem,
} from './components/JsonLd'
