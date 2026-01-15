/**
 * Test Render Utilities
 * Provides wrapped render for testing with providers
 */

import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'

/**
 * All providers wrapper for testing
 * Add providers here as needed (e.g., theme, i18n)
 */
function AllProviders({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

/**
 * Custom render with providers
 * Use this instead of render from @testing-library/react
 */
export function renderWithProviders(
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) {
    return render(ui, { wrapper: AllProviders, ...options })
}

/**
 * Re-export everything from testing library
 */
export * from '@testing-library/react'
export { renderWithProviders as render }
