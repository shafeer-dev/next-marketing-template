# Next.js Marketing Template: Optimization & Improvement Guide

This document provides comprehensive recommendations for optimizing and enhancing the `next-marketing-template` while preserving its core functionality as a **reusable client-delivery system**.

---

## 📋 Template Overview

| Category | Current State |
|----------|---------------|
| **Framework** | Next.js 16.1.1, React 19.2.3 |
| **Styling** | Tailwind CSS 4, tw-animate-css |
| **i18n** | next-intl (ar, en) |
| **Testing** | Vitest + Storybook 10 + Playwright |
| **Features** | React Compiler enabled, OKLCH color tokens |

---

## ⚠️ Core Rules (Non-Negotiable)

> [!CAUTION]
> These rules MUST be followed for all additions to maintain template reusability.

| Rule | Description |
|------|-------------|
| **No hardcoded copy** | No user-facing text in JSX; use translation keys only |
| **TS defines structure** | TypeScript defines variants, flags, and translation keys |
| **Text in messages/** | All copy lives in `next-intl` JSON files |
| **Opt-in features** | Features must be disabled by default |
| **Composition over conditionals** | Prefer configuration-driven composition |
| **Minimal dependencies** | Avoid heavy libraries; prefer native APIs |
| **Bulletproof boundaries** | Preserve feature isolation; no cross-feature imports |

---

## 🎛️ Feature Toggle System

> [!IMPORTANT]
> All features must be opt-in via configuration—never auto-enabled.

### Create Central Feature Flags

```typescript
// src/config/features.ts
export const features = {
  animations: { enabled: false, preset: 'subtle' },
  newsletter: { enabled: false, provider: null },
  analytics: { enabled: false, ga: null, meta: null },
  contactForm: { enabled: false, endpoint: null },
  cookieConsent: { enabled: false },
  chatWidget: { enabled: false },
} as const

export type FeatureFlags = typeof features
```

### Environment-Based Overrides

```typescript
// src/lib/features.ts
import { features as defaults } from '@/config/features'

export function getFeatures(): FeatureFlags {
  return {
    ...defaults,
    newsletter: {
      ...defaults.newsletter,
      enabled: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER === 'true',
    },
    // ... other overrides
  }
}
```

---

## 📐 Content Schema Pattern

> [!NOTE]
> TypeScript defines the content shape; translations provide the copy.

### Define Content Schemas

```typescript
// src/features/marketing/content/schemas.ts
export interface HeroContent {
  headline: string        // Translation key
  subheadline: string     // Translation key
  cta: { label: string; href: string }
  variant: 'centered' | 'split' | 'video'
}

export interface FeatureItem {
  icon: string
  title: string           // Translation key
  description: string     // Translation key
}
```

### Map to Translation Keys

```typescript
// src/features/marketing/content/home.ts
import type { HeroContent } from './schemas'

export const heroContent: HeroContent = {
  headline: 'home.hero.headline',
  subheadline: 'home.hero.subheadline',
  cta: { label: 'home.hero.cta', href: '/contact' },
  variant: 'centered',
}
```

### Consume in Components

```tsx
// src/features/marketing/components/Hero.tsx
export function Hero({ content }: { content: HeroContent }) {
  const t = useTranslations()
  return (
    <section>
      <h1>{t(content.headline)}</h1>
      <p>{t(content.subheadline)}</p>
    </section>
  )
}
```

---

## 🏗️ Architecture Improvements

### 1. Complete Empty Placeholder Files

| File | Purpose |
|------|---------|
| `src/config/site.ts` | Centralized site metadata |
| `src/config/seo.ts` | Default SEO configuration |
| `src/config/features.ts` | Feature toggle flags |
| `src/lib/intl.ts` | i18n request configuration |
| `src/app/[locale]/layout.tsx` | Locale-specific layout |

### 2. Feature Structure (Bulletproof React)

```
src/features/
├── marketing/
│   ├── components/    # HeroSection, Features, CTA
│   ├── content/       # Content schemas and keys
│   ├── hooks/         # useScrollReveal, etc.
│   └── index.ts       # Public exports only
│
├── contact/
│   ├── components/    # ContactForm, FormField
│   ├── schemas.ts     # Zod validation
│   ├── api.ts         # Form submission
│   └── index.ts
│
├── seo/
│   ├── components/    # JsonLd, MetaTags
│   ├── config.ts      # Default SEO values
│   └── index.ts
│
└── analytics/
    ├── components/    # GA, MetaPixel (lazy)
    ├── lib/           # tracking utilities
    └── index.ts
```

### 3. Route Group Layouts

```
src/app/[locale]/
├── (marketing)/
│   ├── layout.tsx     # Header, Footer, Nav
│   └── page.tsx
├── (legal)/
│   └── layout.tsx     # Minimal legal layout
└── (blanks)/
    └── layout.tsx     # No chrome
```

---

## 🎯 Stub Strategy for Features

> [!TIP]
> Create minimal stubs that define extension points without implementation.

### Example: Newsletter Stub

```typescript
// src/features/newsletter/index.ts
export { NewsletterForm } from './components/NewsletterForm'
export { useNewsletterSubscribe } from './hooks/useNewsletterSubscribe'

// src/features/newsletter/components/NewsletterForm.tsx
export function NewsletterForm() {
  const { enabled } = getFeatures().newsletter
  if (!enabled) return null
  
  // Placeholder - extend with provider integration
  return <form>{/* ... */}</form>
}

// src/features/newsletter/hooks/useNewsletterSubscribe.ts
export function useNewsletterSubscribe() {
  return {
    subscribe: async (email: string) => {
      // Stub: Replace with Mailchimp/ConvertKit integration
      console.log('Newsletter subscription:', email)
    },
    isLoading: false,
    error: null,
  }
}
```

### Extension Points Pattern

```typescript
// src/features/newsletter/providers/index.ts
export interface NewsletterProvider {
  subscribe(email: string): Promise<{ success: boolean }>
}

// Future implementations:
// export { mailchimpProvider } from './mailchimp'
// export { convertKitProvider } from './convertkit'
```

---

## ⚡ Performance Optimizations

### 1. Image Optimization

```typescript
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
}
```

### 2. Enable Partial Prerendering (Optional)

```typescript
experimental: { ppr: 'incremental' }
```

### 3. Font Configuration

```typescript
// src/lib/fonts.ts
import { Geist, Geist_Mono } from 'next/font/google'

export const fontSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
export const fontMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
```

---

## 🎨 Design System Enhancements

### 1. Extended Color Tokens

```css
:root {
  /* Semantic tokens - customize per client */
  --success: oklch(0.72 0.15 142);
  --warning: oklch(0.80 0.16 85);
  --info: oklch(0.70 0.15 245);
  --brand-primary: oklch(0.65 0.25 265);
  --brand-secondary: oklch(0.55 0.20 180);
}
```

### 2. Animation Utilities (Opt-in)

```css
/* src/styles/animations.css - imported only when features.animations.enabled */
@layer utilities {
  .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  .animate-slide-up { animation: slideUp 0.4s ease-out; }
}
```

### 3. CVA Component Variants

```typescript
// src/components/ui/button.tsx
const buttonVariants = cva("...", {
  variants: {
    variant: { default: "", destructive: "", outline: "", ghost: "" },
    size: { sm: "", default: "", lg: "", icon: "" },
  },
  defaultVariants: { variant: "default", size: "default" },
})
```

---

## 🌐 Internationalization (i18n)

### 1. Request Configuration

```typescript
// src/lib/intl.ts
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@/messages/${locale}`)).default,
  timeZone: 'UTC',
}))
```

### 2. RTL Support

```css
[dir="rtl"] { --font-sans: var(--font-arabic-sans); }
html[lang="ar"] { direction: rtl; }
```

### 3. Direction Hook

```typescript
// src/hooks/use-direction.ts
export function useDirection() {
  const locale = useLocale()
  return locale === 'ar' ? 'rtl' : 'ltr'
}
```

---

## 🔒 SEO Feature

### 1. SEO Config Schema

```typescript
// src/features/seo/config.ts
export interface SeoConfig {
  title: string
  description: string
  openGraph: { image?: string; type?: string }
  twitter: { card?: string }
  noIndex?: boolean
}
```

### 2. JSON-LD Components

```typescript
// src/features/seo/components/JsonLd.tsx
export function OrganizationJsonLd() { /* ... */ }
export function ProductJsonLd() { /* ... */ }
export function FAQJsonLd() { /* ... */ }
```

### 3. Sitemap & Robots

```typescript
// src/app/sitemap.ts
export default async function sitemap() { /* ... */ }

// src/app/robots.ts
export default function robots() { /* ... */ }
```

---

## 📚 Library Philosophy

> [!WARNING]
> Avoid heavy dependencies. Prefer native APIs.

| Feature | Recommended | Alternative (Native) |
|---------|-------------|---------------------|
| Animations | `tw-animate-css` | CSS `@keyframes` |
| Form validation | `zod` | Native validation |
| Icons | `lucide-react` | SVG sprites |
| Carousel | None by default | CSS scroll-snap |
| Modal | None by default | `<dialog>` element |

---

## 🧪 Testing Infrastructure

### 1. Unit Test Configuration

```typescript
// vitest.config.ts
{ test: { name: 'unit', include: ['src/**/*.test.ts'], environment: 'jsdom' } }
```

### 2. Testing Utilities

```typescript
// src/testing/render.tsx
export function renderWithProviders(ui: ReactElement) {
  return render(ui, { wrapper: AllProviders })
}
```

---

## 🔧 Developer Experience

### 1. Additional Scripts

```json
"scripts": {
  "type-check": "tsc --noEmit",
  "analyze": "cross-env ANALYZE=true next build"
}
```

### 2. ESLint Import Restrictions

```javascript
// eslint.config.mjs
'import/no-restricted-paths': ['error', {
  zones: [
    { target: './src/features', from: './src/app' },
    { target: './src/components', from: ['./src/features', './src/app'] },
  ],
}]
```

### 3. Husky + lint-staged

```json
"lint-staged": { "*.{ts,tsx}": ["eslint --fix", "prettier --write"] }
```

---

## 🚀 Deployment

### 1. Environment Validation

```typescript
// src/lib/env.ts
import { z } from 'zod'
const envSchema = z.object({ NEXT_PUBLIC_APP_URL: z.string().url() })
export const env = envSchema.parse(process.env)
```

### 2. Docker Support

```dockerfile
FROM node:20-alpine AS base
# Multi-stage build...
```

### 3. CI/CD Workflow

```yaml
# .github/workflows/ci.yml
jobs: { lint, type-check, test, build }
```

---

## ✅ Safety Checklist

Before shipping any feature, verify:

- [ ] No hardcoded user-facing copy in JSX
- [ ] All text uses translation keys
- [ ] Feature is disabled by default
- [ ] No cross-feature imports
- [ ] No tight coupling to other features
- [ ] Minimal/zero new dependencies
- [ ] Extension points are documented

---

## 📌 Success Criteria

The template should:

| Criterion | Validation |
|-----------|------------|
| **Premium feel** | Modern UI, micro-interactions, polished |
| **Fast delivery** | Clone → customize → deploy in hours |
| **Upsell-ready** | Features stubbed for future activation |
| **Safe to ignore** | Unused features add zero overhead |
| **Self-documenting** | Understandable without explanation |
