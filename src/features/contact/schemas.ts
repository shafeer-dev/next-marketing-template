/**
 * Contact Form Schemas
 * Zod validation schemas for contact forms
 */

import { z } from 'zod'

/**
 * Base contact form schema
 */
export const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'forms.validation.nameMin' })
        .max(100, { message: 'forms.validation.nameMax' }),
    email: z
        .string()
        .email({ message: 'forms.validation.emailInvalid' }),
    phone: z
        .string()
        .optional(),
    subject: z
        .string()
        .min(5, { message: 'forms.validation.subjectMin' })
        .max(200, { message: 'forms.validation.subjectMax' }),
    message: z
        .string()
        .min(10, { message: 'forms.validation.messageMin' })
        .max(5000, { message: 'forms.validation.messageMax' }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
    email: z
        .string()
        .email({ message: 'forms.validation.emailInvalid' }),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

/**
 * Quote request form schema (extended contact)
 */
export const quoteRequestSchema = contactFormSchema.extend({
    company: z.string().optional(),
    budget: z.enum(['under-5k', '5k-10k', '10k-25k', '25k-50k', 'over-50k']).optional(),
    timeline: z.enum(['asap', '1-month', '2-3-months', '3-6-months', 'flexible']).optional(),
    services: z.array(z.string()).optional(),
})

export type QuoteRequestData = z.infer<typeof quoteRequestSchema>
