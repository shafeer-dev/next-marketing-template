import { setRequestLocale } from 'next-intl/server'

interface LegalLayoutProps {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}

/**
 * Legal pages layout
 * Minimal layout for privacy policy, terms of service, etc.
 */
export default async function LegalLayout({ children, params }: LegalLayoutProps) {
    const { locale } = await params
    setRequestLocale(locale)

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <article className="prose prose-neutral dark:prose-invert max-w-none">
                {children}
            </article>
        </div>
    )
}
