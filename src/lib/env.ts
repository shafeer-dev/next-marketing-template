/**
 * Environment Variables Validation
 * Validates required environment variables at build/runtime
 *
 * Uses Zod for type-safe validation
 */

import { z } from 'zod'

/**
 * Server-side environment variables schema
 * These are only available on the server
 */
const serverEnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

/**
 * Client-side environment variables schema
 * These are exposed to the browser (NEXT_PUBLIC_ prefix)
 */
const clientEnvSchema = z.object({
    NEXT_PUBLIC_APP_URL: z.string().url().optional().default('http://localhost:3000'),
    NEXT_PUBLIC_ENABLE_NEWSLETTER: z.string().optional().default('false'),
    NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().optional().default('false'),
    NEXT_PUBLIC_ENABLE_CONTACT_FORM: z.string().optional().default('false'),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
    NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
    NEXT_PUBLIC_CONTACT_FORM_ENDPOINT: z.string().optional(),
})

/**
 * Combined environment schema
 */
const envSchema = serverEnvSchema.merge(clientEnvSchema)

/**
 * Validate environment variables
 * Throws an error if validation fails
 */
function validateEnv() {
    const parsed = envSchema.safeParse(process.env)

    if (!parsed.success) {
        console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
        throw new Error('Invalid environment variables')
    }

    return parsed.data
}

/**
 * Validated environment variables
 * Use this instead of process.env directly
 */
export const env = validateEnv()

/**
 * Type for environment variables
 */
export type Env = z.infer<typeof envSchema>
