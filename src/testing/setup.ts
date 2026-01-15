/**
 * Test Setup
 * Configure testing environment for Vitest
 */

/// <reference types="vitest/globals" />

import '@testing-library/jest-dom/vitest'
import { vi, beforeEach } from 'vitest'
import React from 'react'

// Mock next-intl
vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
    useLocale: () => 'en',
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        back: vi.fn(),
    }),
    usePathname: () => '/en',
    useSearchParams: () => new URLSearchParams(),
}))

// Mock next/link
vi.mock('next/link', () => ({
    default: function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
        return React.createElement('a', { href }, children)
    },
}))

// Reset mocks between tests
beforeEach(() => {
    vi.clearAllMocks()
})
