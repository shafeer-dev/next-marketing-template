import { useTranslations } from 'next-intl'
import { clsx } from 'clsx'
import { Star } from 'lucide-react'
import type { TestimonialsContent, TestimonialItem } from '../content/schemas'

interface TestimonialsProps {
    content: TestimonialsContent
    className?: string
}

/**
 * Star Rating Component
 */
function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={clsx(
                        'h-4 w-4',
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
                    )}
                />
            ))}
        </div>
    )
}

/**
 * Testimonial Card Component
 */
function TestimonialCard({
    item,
    t,
}: {
    item: TestimonialItem
    t: (key: string) => string
}) {
    return (
        <div className="flex flex-col rounded-lg border bg-card p-6">
            {item.rating && (
                <div className="mb-4">
                    <StarRating rating={item.rating} />
                </div>
            )}
            <blockquote className="flex-1 text-muted-foreground">
                &ldquo;{t(item.quote)}&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
                {item.avatar ? (
                    <img
                        src={item.avatar}
                        alt={item.author}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                        {item.author.charAt(0)}
                    </div>
                )}
                <div>
                    <div className="font-semibold">{item.author}</div>
                    <div className="text-sm text-muted-foreground">
                        {item.role}
                        {item.company && `, ${item.company}`}
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Testimonials Section Component
 * Supports grid and featured variants
 */
export function Testimonials({ content, className }: TestimonialsProps) {
    const t = useTranslations('marketing')

    if (content.variant === 'featured' && content.items.length > 0) {
        const featured = content.items[0]
        const others = content.items.slice(1)

        return (
            <section className={clsx('py-20 bg-muted/30', className)}>
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

                    {/* Featured */}
                    <div className="mx-auto max-w-3xl mb-8">
                        <div className="rounded-xl border bg-card p-8 text-center">
                            {featured.rating && (
                                <div className="mb-4 flex justify-center">
                                    <StarRating rating={featured.rating} />
                                </div>
                            )}
                            <blockquote className="text-xl italic text-muted-foreground">
                                &ldquo;{t(featured.quote)}&rdquo;
                            </blockquote>
                            <div className="mt-6">
                                <div className="font-semibold">{featured.author}</div>
                                <div className="text-sm text-muted-foreground">
                                    {featured.role}
                                    {featured.company && `, ${featured.company}`}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Others */}
                    {others.length > 0 && (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {others.map((item, index) => (
                                <TestimonialCard key={index} item={item} t={t} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        )
    }

    // Default: Grid variant
    return (
        <section className={clsx('py-20 bg-muted/30', className)}>
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
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {content.items.map((item, index) => (
                        <TestimonialCard key={index} item={item} t={t} />
                    ))}
                </div>
            </div>
        </section>
    )
}
