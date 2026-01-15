/**
 * i18n Configuration for next-intl
 * Configures request-specific i18n settings
 */

import { getRequestConfig } from 'next-intl/server'
import { siteConfig } from '@/config/site'

export default getRequestConfig(async ({ requestLocale }) => {
    // Get the locale from the request or fall back to default
    let locale = await requestLocale

    // Validate the locale
    if (!locale || !siteConfig.locales.includes(locale as typeof siteConfig.locales[number])) {
        locale = siteConfig.defaultLocale
    }

    return {
        locale,
        messages: (await import(`@/messages/${locale}`)).default,
        timeZone: 'UTC',
        now: new Date(),
    }
})
