/**
 * Contact Feature - Public Exports
 */

// Components
export { ContactForm } from './components/ContactForm'
export { FormField } from './components/FormField'
export type { FormFieldProps } from './components/FormField'

// Schemas
export {
    contactFormSchema,
    newsletterSchema,
    quoteRequestSchema,
} from './schemas'
export type {
    ContactFormData,
    NewsletterData,
    QuoteRequestData,
} from './schemas'

// API
export { submitContact, submitQuoteRequest } from './api'
export type { ContactApiResponse } from './api'
