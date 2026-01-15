# Getting Started

This guide will help you set up and customize the marketing template for your project.

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

## Installation

```bash
# Clone the repository
git clone <repo-url> my-marketing-site
cd my-marketing-site

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.local

# Start development server
pnpm dev
```

## First Steps

### 1. Configure Site Settings

Edit `src/config/site.ts`:

```typescript
export const siteConfig = {
  name: "Your Company Name",
  description: "Your company tagline",
  url: "https://yoursite.com",
  author: { name: "Your Name", email: "contact@yoursite.com" },
  social: {
    twitter: "@yourhandle",
    linkedin: "yourcompany",
  },
}
```

### 2. Update Translations

Edit message files in `src/messages/`:

```
messages/
├── en/
│   ├── common.json      # Shared UI
│   ├── marketing.json   # Marketing sections
│   ├── forms.json       # Form labels
│   └── seo.json         # SEO metadata
└── ar/
    └── (same structure)
```

### 3. Customize Colors

Edit `src/app/globals.css`:

```css
:root {
  --brand-primary: oklch(0.65 0.25 265);  /* Your brand color */
  --brand-secondary: oklch(0.55 0.20 180);
}
```

### 4. Enable Features

Edit `.env.local`:

```env
# Enable analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_GA_ID=G-XXXXXXX

# Enable contact form
NEXT_PUBLIC_ENABLE_CONTACT_FORM=true
```

## Using Marketing Sections

Import and use pre-built sections:

```tsx
import { Hero, Features, CTA, heroContent, featuresContent, ctaContent } from '@/features/marketing'

export default function HomePage() {
  return (
    <>
      <Hero content={heroContent} />
      <Features content={featuresContent} />
      <CTA content={ctaContent} />
    </>
  )
}
```

### Custom Content

Override the default content:

```tsx
const myHeroContent = {
  variant: 'split',
  headline: 'custom.hero.headline',  // Your translation key
  subheadline: 'custom.hero.subheadline',
  primaryCta: { label: 'custom.hero.cta', href: '/contact' },
  heroImage: '/images/hero.jpg',
}

<Hero content={myHeroContent} />
```

## Adding Pages

### Marketing Page

```tsx
// src/app/[locale]/(marketing)/about/page.tsx
import { setRequestLocale } from 'next-intl/server'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  
  return (
    <div>
      {/* Your content */}
    </div>
  )
}
```

### Legal Page

```tsx
// src/app/[locale]/(legal)/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      {/* Content renders with prose styling */}
    </>
  )
}
```

## Running Tests

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# With coverage
pnpm test:coverage

# Storybook
pnpm storybook
```

## Building for Production

```bash
# Build
pnpm build

# Preview
pnpm start
```

## Next Steps

- [Customization Guide](./customization.md) - Theming, branding, components
- [Template Optimization Guide](./template-optimization-guide.md) - Advanced patterns
- [AI Agent Rules](./AGENT_RULES.md) - Guidelines for AI-assisted development
