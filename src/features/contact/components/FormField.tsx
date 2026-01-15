'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Field label (translation key) */
    label: string
    /** Translated label text */
    labelText: string
    /** Error message (translated) */
    error?: string
    /** Helper text (translated) */
    helperText?: string
    /** Use textarea instead of input */
    multiline?: boolean
    /** Textarea rows */
    rows?: number
}

/**
 * Form field component with label and error handling
 * Accessible and i18n-ready
 */
export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
    function FormField(
        { label, labelText, error, helperText, multiline, rows = 4, className, id, ...props },
        ref
    ) {
        const fieldId = id || label
        const errorId = `${fieldId}-error`
        const helperId = `${fieldId}-helper`

        const baseInputClasses = clsx(
            'w-full rounded-md border bg-background px-3 py-2',
            'text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-destructive' : 'border-input',
            className
        )

        return (
            <div className="space-y-1.5">
                <label
                    htmlFor={fieldId}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {labelText}
                    {props.required && <span className="text-destructive ml-1">*</span>}
                </label>

                {multiline ? (
                    <textarea
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        id={fieldId}
                        rows={rows}
                        aria-invalid={!!error}
                        aria-describedby={error ? errorId : helperText ? helperId : undefined}
                        className={baseInputClasses}
                        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    />
                ) : (
                    <input
                        ref={ref as React.Ref<HTMLInputElement>}
                        id={fieldId}
                        aria-invalid={!!error}
                        aria-describedby={error ? errorId : helperText ? helperId : undefined}
                        className={baseInputClasses}
                        {...props}
                    />
                )}

                {error && (
                    <p id={errorId} className="text-sm text-destructive" role="alert">
                        {error}
                    </p>
                )}

                {helperText && !error && (
                    <p id={helperId} className="text-sm text-muted-foreground">
                        {helperText}
                    </p>
                )}
            </div>
        )
    }
)
