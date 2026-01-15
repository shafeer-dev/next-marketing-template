'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { FormField } from './FormField'
import { contactFormSchema, type ContactFormData } from '../schemas'
import { isFeatureEnabled } from '@/config/features'

interface ContactFormProps {
    /** Called on successful submission */
    onSuccess?: () => void
    /** Called on submission error */
    onError?: (error: Error) => void
}

/**
 * Contact form component
 * Opt-in via features.contactForm.enabled
 */
export function ContactForm({ onSuccess, onError }: ContactFormProps) {
    const t = useTranslations('forms')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    // Check if feature is enabled
    if (!isFeatureEnabled('contactForm')) {
        return null
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setErrors({})
        setSubmitStatus('idle')

        const formData = new FormData(event.currentTarget)
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        }

        // Validate
        const result = contactFormSchema.safeParse(data)

        if (!result.success) {
            const fieldErrors: Record<string, string> = {}
            for (const issue of result.error.issues) {
                const field = issue.path[0] as string
                // Error messages are translation keys
                fieldErrors[field] = t(issue.message)
            }
            setErrors(fieldErrors)
            setIsSubmitting(false)
            return
        }

        try {
            // Submit form - stub implementation
            // TODO: Implement actual submission in /api/contact route
            await submitContactForm(result.data)
            setSubmitStatus('success')
            onSuccess?.()
        } catch (error) {
            setSubmitStatus('error')
            onError?.(error as Error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitStatus === 'success') {
        return (
            <div className="rounded-lg border border-success bg-success/10 p-6 text-center">
                <p className="font-medium text-success">{t('contact.successTitle')}</p>
                <p className="mt-2 text-muted-foreground">{t('contact.successMessage')}</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
                label="name"
                labelText={t('contact.name')}
                name="name"
                type="text"
                required
                error={errors.name}
                placeholder={t('contact.namePlaceholder')}
            />

            <FormField
                label="email"
                labelText={t('contact.email')}
                name="email"
                type="email"
                required
                error={errors.email}
                placeholder={t('contact.emailPlaceholder')}
            />

            <FormField
                label="phone"
                labelText={t('contact.phone')}
                name="phone"
                type="tel"
                error={errors.phone}
                placeholder={t('contact.phonePlaceholder')}
            />

            <FormField
                label="subject"
                labelText={t('contact.subject')}
                name="subject"
                type="text"
                required
                error={errors.subject}
                placeholder={t('contact.subjectPlaceholder')}
            />

            <FormField
                label="message"
                labelText={t('contact.message')}
                name="message"
                multiline
                rows={5}
                required
                error={errors.message}
                placeholder={t('contact.messagePlaceholder')}
            />

            {submitStatus === 'error' && (
                <p className="text-sm text-destructive" role="alert">
                    {t('contact.errorMessage')}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
                {isSubmitting ? t('contact.submitting') : t('contact.submit')}
            </button>
        </form>
    )
}

/**
 * Stub submission function
 * Replace with actual API call
 */
async function submitContactForm(data: ContactFormData): Promise<void> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log for development
    console.log('Contact form submitted:', data)

    // TODO: Implement actual submission
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // })
    // if (!response.ok) throw new Error('Submission failed')
}
