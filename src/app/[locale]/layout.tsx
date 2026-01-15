import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/config/site'

interface LocaleLayoutProps {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}

/**
 * Generate static params for all supported locales
 */
export function generateStaticParams() {
    return siteConfig.locales.map((locale) => ({ locale }))
}

/**
 * Locale-specific layout
 * Provides i18n context and locale-specific HTML attributes
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params

    // Validate locale
    if (!hasLocale(siteConfig.locales, locale)) {
        notFound()
    }

    // Enable static rendering
    setRequestLocale(locale)

    // Get messages for this locale
    const messages = await getMessages()

    // Determine text direction
    const dir = locale === 'ar' ? 'rtl' : 'ltr'

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
