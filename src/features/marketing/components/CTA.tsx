import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { clsx } from 'clsx'
import type { CTAContent } from '../content/schemas'

interface CTAProps {
    content: CTAContent
    className?: string
}

/**
 * CTA Section Component
 * Supports simple, split, banner, and floating variants
 */
export function CTA({ content, className }: CTAProps) {
    const t = useTranslations('marketing')

    const backgroundStyles = {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        gradient: 'bg-gradient-to-r from-primary to-primary/70 text-primary-foreground',
        image: '',
    }

    if (content.variant === 'simple') {
        return (
            <section
                className={clsx(
                    'py-20',
                    backgroundStyles[content.background || 'primary'],
                    className
                )}
            >
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            {t(content.headline)}
                        </h2>
                        {content.description && (
                            <p className="mt-4 text-lg opacity-90">
                                {t(content.description)}
                            </p>
                        )}
                        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href={content.primaryButton.href}
                                className="inline-flex h-12 items-center justify-center rounded-md bg-background px-8 font-medium text-foreground transition-colors hover:bg-background/90"
                            >
                                {t(content.primaryButton.label)}
                            </Link>
                            {content.secondaryButton && (
                                <Link
                                    href={content.secondaryButton.href}
                                    className="inline-flex h-12 items-center justify-center rounded-md border border-current px-8 font-medium transition-colors hover:bg-white/10"
                                >
                                    {t(content.secondaryButton.label)}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (content.variant === 'split') {
        return (
            <section
                className={clsx(
                    'py-20',
                    backgroundStyles[content.background || 'primary'],
                    className
                )}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                {t(content.headline)}
                            </h2>
                            {content.description && (
                                <p className="mt-4 text-lg opacity-90">
                                    {t(content.description)}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                href={content.primaryButton.href}
                                className="inline-flex h-12 items-center justify-center rounded-md bg-background px-8 font-medium text-foreground transition-colors hover:bg-background/90"
                            >
                                {t(content.primaryButton.label)}
                            </Link>
                            {content.secondaryButton && (
                                <Link
                                    href={content.secondaryButton.href}
                                    className="inline-flex h-12 items-center justify-center rounded-md border border-current px-8 font-medium transition-colors hover:bg-white/10"
                                >
                                    {t(content.secondaryButton.label)}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (content.variant === 'banner') {
        return (
            <section
                className={clsx(
                    'py-6',
                    backgroundStyles[content.background || 'primary'],
                    className
                )}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="font-medium">{t(content.headline)}</p>
                        <Link
                            href={content.primaryButton.href}
                            className="inline-flex h-10 items-center justify-center rounded-md bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
                        >
                            {t(content.primaryButton.label)}
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    // Floating variant
    return (
        <div
            className={clsx(
                'fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform',
                'rounded-full px-6 py-3 shadow-lg',
                backgroundStyles[content.background || 'primary'],
                className
            )}
        >
            <div className="flex items-center gap-4">
                <span className="font-medium">{t(content.headline)}</span>
                <Link
                    href={content.primaryButton.href}
                    className="inline-flex h-8 items-center justify-center rounded-full bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
                >
                    {t(content.primaryButton.label)}
                </Link>
            </div>
        </div>
    )
}
