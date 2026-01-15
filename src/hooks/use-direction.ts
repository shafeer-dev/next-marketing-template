'use client'

import { useLocale } from 'next-intl'

/**
 * Hook to get the text direction based on current locale
 * Returns 'rtl' for Arabic, 'ltr' for other languages
 */
export function useDirection(): 'rtl' | 'ltr' {
    const locale = useLocale()
    return locale === 'ar' ? 'rtl' : 'ltr'
}

/**
 * Hook to check if current locale is RTL
 */
export function useIsRtl(): boolean {
    const locale = useLocale()
    return locale === 'ar'
}
