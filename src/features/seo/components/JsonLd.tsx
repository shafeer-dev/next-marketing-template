/**
 * JSON-LD Structured Data Components
 * Add these to layouts/pages for rich search results
 */

import { siteConfig } from '@/config/site'

interface JsonLdProps {
    data: Record<string, unknown>
}

/**
 * Base JSON-LD component
 */
function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}

/**
 * Organization structured data
 * Add to the root layout
 */
export function OrganizationJsonLd() {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        contactPoint: siteConfig.contact.email
            ? {
                '@type': 'ContactPoint',
                email: siteConfig.contact.email,
                telephone: siteConfig.contact.phone || undefined,
                contactType: 'customer service',
            }
            : undefined,
        sameAs: [
            siteConfig.social.twitter,
            siteConfig.social.linkedin,
            siteConfig.social.facebook,
            siteConfig.social.instagram,
        ].filter(Boolean),
    }

    return <JsonLd data={data} />
}

/**
 * Website structured data
 * Add to the root layout
 */
export function WebsiteJsonLd() {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${siteConfig.url}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    }

    return <JsonLd data={data} />
}

/**
 * Local Business structured data
 * Use for businesses with physical locations
 */
export interface LocalBusinessJsonLdProps {
    name?: string
    description?: string
    address?: {
        street: string
        city: string
        region: string
        postalCode: string
        country: string
    }
    geo?: {
        latitude: number
        longitude: number
    }
    openingHours?: string[]
    priceRange?: string
}

export function LocalBusinessJsonLd(props: LocalBusinessJsonLdProps) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: props.name || siteConfig.name,
        description: props.description || siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.contact.phone || undefined,
        email: siteConfig.contact.email || undefined,
        address: props.address
            ? {
                '@type': 'PostalAddress',
                streetAddress: props.address.street,
                addressLocality: props.address.city,
                addressRegion: props.address.region,
                postalCode: props.address.postalCode,
                addressCountry: props.address.country,
            }
            : undefined,
        geo: props.geo
            ? {
                '@type': 'GeoCoordinates',
                latitude: props.geo.latitude,
                longitude: props.geo.longitude,
            }
            : undefined,
        openingHoursSpecification: props.openingHours,
        priceRange: props.priceRange,
    }

    return <JsonLd data={data} />
}

/**
 * FAQ structured data
 * Use on FAQ pages
 */
export interface FAQItem {
    question: string
    answer: string
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    }

    return <JsonLd data={data} />
}

/**
 * Breadcrumb structured data
 */
export interface BreadcrumbItem {
    name: string
    url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }

    return <JsonLd data={data} />
}
