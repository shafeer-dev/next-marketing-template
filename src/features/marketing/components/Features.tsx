import { useTranslations } from 'next-intl'
import { clsx } from 'clsx'
import type { LucideIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { FeaturesContent, FeatureItem } from '../content/schemas'

interface FeaturesProps {
    content: FeaturesContent
    className?: string
}

/**
 * Get icon component by name
 */
function getIcon(name: string): LucideIcon | null {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>
    return icons[name] || null
}

/**
 * Feature Card Component
 */
function FeatureCard({
    item,
    t,
}: {
    item: FeatureItem
    t: (key: string) => string
}) {
    const Icon = getIcon(item.icon)

    return (
        <div className="group rounded-lg border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-accent/50">
            {Icon && (
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                </div>
            )}
            <h3 className="mb-2 text-lg font-semibold">{t(item.title)}</h3>
            <p className="text-muted-foreground">{t(item.description)}</p>
        </div>
    )
}

/**
 * Features Section Component
 * Supports grid and icons variants
 */
export function Features({ content, className }: FeaturesProps) {
    const t = useTranslations('marketing')

    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    }

    return (
        <section className={clsx('py-20', className)}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        {t(content.title)}
                    </h2>
                    {content.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t(content.subtitle)}
                        </p>
                    )}
                </div>

                {/* Grid */}
                <div
                    className={clsx(
                        'grid gap-6',
                        gridCols[content.columns || 3]
                    )}
                >
                    {content.items.map((item, index) => (
                        <FeatureCard key={index} item={item} t={t} />
                    ))}
                </div>
            </div>
        </section>
    )
}
