# Customization Guide

How to customize the template for your brand and requirements.

## Branding

### Colors

Edit `src/app/globals.css` to set your brand colors:

```css
:root {
  /* Core brand colors */
  --brand-primary: oklch(0.65 0.25 265);
  --brand-secondary: oklch(0.55 0.20 180);
  
  /* Override semantic colors */
  --primary: var(--brand-primary);
  --accent: var(--brand-secondary);
}
```

### Typography

Fonts are configured in `src/lib/fonts.ts`:

```typescript
import { Inter, Outfit } from 'next/font/google'

export const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })
export const fontHeading = Outfit({ subsets: ['latin'], variable: '--font-heading' })
```

### Logo

Place your logo in `public/`:
- `public/logo.svg` - Main logo
- `public/logo-dark.svg` - Dark mode variant
- `public/favicon.ico` - Favicon

## Adding New Locales

### 1. Add locale to config

```typescript
// src/config/site.ts
export const siteConfig = {
  locales: ['en', 'ar', 'fr'] as const,  // Add 'fr'
  defaultLocale: 'en',
}
```

### 2. Create message files

```
src/messages/
└── fr/
    ├── common.json
    ├── marketing.json
    ├── forms.json
    └── seo.json
```

### 3. Update RTL languages (if needed)

```typescript
// src/hooks/use-direction.ts
export function useDirection() {
  const locale = useLocale()
  const rtlLocales = ['ar', 'he', 'fa']  // Add RTL locales
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr'
}
```

## Creating Custom Sections

### 1. Define content schema

```typescript
// src/features/marketing/content/schemas.ts
export interface CustomSectionContent {
  variant: 'default' | 'alternate'
  title: string
  items: { icon: string; text: string }[]
}
```

### 2. Create component

```tsx
// src/features/marketing/components/CustomSection.tsx
import { useTranslations } from 'next-intl'
import type { CustomSectionContent } from '../content/schemas'

export function CustomSection({ content }: { content: CustomSectionContent }) {
  const t = useTranslations('marketing')
  return (
    <section>
      <h2>{t(content.title)}</h2>
      {/* ... */}
    </section>
  )
}
```

### 3. Export from index

```typescript
// src/features/marketing/index.ts
export { CustomSection } from './components/CustomSection'
```

### 4. Add translations

```json
// src/messages/en/marketing.json
{
  "customSection": {
    "title": "Your Title"
  }
}
```

## Enabling Features

### Contact Form

1. Enable in `.env.local`:
```env
NEXT_PUBLIC_ENABLE_CONTACT_FORM=true
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=/api/contact
```

2. Create API route:
```typescript
// src/app/api/contact/route.ts
import { contactFormSchema } from '@/features/contact'

export async function POST(req: Request) {
  const data = await req.json()
  const validated = contactFormSchema.parse(data)
  // Send email, save to CRM, etc.
  return Response.json({ success: true })
}
```

### Analytics

```env
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
```

Add to layout:
```tsx
import { GoogleAnalytics, MetaPixel } from '@/features/analytics'

<GoogleAnalytics />
<MetaPixel />
```

### Animations

Enable animations in `src/config/features.ts`:

```typescript
animations: {
  enabled: true,
  preset: 'subtle',  // 'none' | 'subtle' | 'full'
}
```

Import animation CSS in `globals.css`:
```css
@import "../styles/animations.css";
```

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

### Environment Variables

Required for production:
```env
NEXT_PUBLIC_APP_URL=https://yoursite.com
```

Optional:
```env
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```
