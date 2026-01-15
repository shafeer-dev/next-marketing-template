import { setRequestLocale } from 'next-intl/server'

interface MarketingLayoutProps {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}

/**
 * Marketing pages layout
 * Common wrapper for all marketing pages (home, about, services, etc.)
 *
 * TODO: Add Header and Footer components when implementing Phase 3
 */
export default async function MarketingLayout({ children, params }: MarketingLayoutProps) {
    const { locale } = await params
    setRequestLocale(locale)

    return (
        <div className="flex min-h-screen flex-col">
            {/* TODO: <Header /> */}
            <main className="flex-1">{children}</main>
            {/* TODO: <Footer /> */}
        </div>
    )
}
