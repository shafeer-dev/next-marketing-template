'use client'

import { useEffect, useRef, useState } from 'react'
import { getFeature } from '@/config/features'

/**
 * Hook to detect when an element enters the viewport
 * Used for scroll-triggered animations
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
    options?: IntersectionObserverInit
): [React.RefObject<T | null>, boolean] {
    const ref = useRef<T>(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    // Once visible, stop observing
                    observer.unobserve(element)
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
                ...options,
            }
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [options])

    return [ref, isInView]
}

/**
 * Hook to check if animations are enabled
 */
export function useAnimationsEnabled(): boolean {
    const { enabled } = getFeature('animations')
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handler = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    return enabled && !prefersReducedMotion
}

/**
 * Get animation class based on feature flag
 */
export function useAnimationClass(animationClass: string): string {
    const enabled = useAnimationsEnabled()
    return enabled ? animationClass : ''
}

/**
 * Stagger animation delays for list items
 */
export function getStaggerDelay(index: number, baseDelay = 100): string {
    return `${index * baseDelay}ms`
}
