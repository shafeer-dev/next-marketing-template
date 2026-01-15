import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { clsx } from 'clsx'
import type { HeroContent } from '../content/schemas'

interface HeroProps {
    content: HeroContent
    className?: string
}

/**
 * Hero Section Component
 * Supports multiple variants: centered, split, video, image-bg
 */
export function Hero({ content, className }: HeroProps) {
    const t = useTranslations('marketing')

    const baseClasses = clsx(
        'relative overflow-hidden',
        className
    )

    if (content.variant === 'centered') {
        return (
            <section className={clsx(baseClasses, 'py-20 md:py-32')}>
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                            {t(content.headline)}
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                            {t(content.subheadline)}
                        </p>
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href={content.primaryCta.href}
                                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                {t(content.primaryCta.label)}
                            </Link>
                            {content.secondaryCta && (
                                <Link
                                    href={content.secondaryCta.href}
                                    className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    {t(content.secondaryCta.label)}
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
            <section className={clsx(baseClasses, 'py-20 md:py-32')}>
                <div className="container mx-auto px-4">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                {t(content.headline)}
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground">
                                {t(content.subheadline)}
                            </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href={content.primaryCta.href}
                                    className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    {t(content.primaryCta.label)}
                                </Link>
                                {content.secondaryCta && (
                                    <Link
                                        href={content.secondaryCta.href}
                                        className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        {t(content.secondaryCta.label)}
                                    </Link>
                                )}
                            </div>
                        </div>
                        {content.heroImage && (
                            <div className="relative aspect-square lg:aspect-[4/3]">
                                <img
                                    src={content.heroImage}
                                    alt=""
                                    className="h-full w-full rounded-lg object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        )
    }

    if (content.variant === 'image-bg') {
        return (
            <section
                className={clsx(
                    baseClasses,
                    'relative flex min-h-[600px] items-center justify-center py-20'
                )}
                style={{
                    backgroundImage: content.backgroundImage
                        ? `url(${content.backgroundImage})`
                        : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        {t(content.headline)}
                    </h1>
                    <p className="mt-6 text-lg md:text-xl opacity-90">
                        {t(content.subheadline)}
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href={content.primaryCta.href}
                            className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 font-medium text-black transition-colors hover:bg-white/90"
                        >
                            {t(content.primaryCta.label)}
                        </Link>
                        {content.secondaryCta && (
                            <Link
                                href={content.secondaryCta.href}
                                className="inline-flex h-12 items-center justify-center rounded-md border border-white px-8 font-medium text-white transition-colors hover:bg-white/10"
                            >
                                {t(content.secondaryCta.label)}
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        )
    }

    // Default: video variant (stub)
    return (
        <section className={clsx(baseClasses, 'py-20 md:py-32')}>
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    {t(content.headline)}
                </h1>
                <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                    {t(content.subheadline)}
                </p>
                {/* Video player stub */}
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href={content.primaryCta.href}
                        className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        {t(content.primaryCta.label)}
                    </Link>
                </div>
            </div>
        </section>
    )
}
