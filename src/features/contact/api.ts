/**
 * Contact API utilities
 * Stub for form submission handling
 */

import type { ContactFormData, QuoteRequestData } from './schemas'

/**
 * Submit contact form data
 * Stub implementation - extend with actual email/CRM integration
 */
export async function submitContact(data: ContactFormData): Promise<{ success: boolean }> {
    // TODO: Implement actual submission
    // Options:
    // - Send email via Resend/SendGrid/Nodemailer
    // - Submit to CRM (HubSpot, Salesforce)
    // - Store in database
    // - Forward to webhook

    console.log('[Contact API] Received submission:', data)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { success: true }
}

/**
 * Submit quote request
 */
export async function submitQuoteRequest(data: QuoteRequestData): Promise<{ success: boolean }> {
    console.log('[Contact API] Quote request:', data)
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true }
}

/**
 * API response type
 */
export interface ContactApiResponse {
    success: boolean
    message?: string
    error?: string
}
