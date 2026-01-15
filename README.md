# Next.js Marketing Template

A production-ready, reusable marketing website template built with Next.js 16, React 19, and Tailwind CSS 4.

## Features

- ⚡ **Next.js 16** with React 19 and React Compiler
- 🌐 **Internationalization** - Built-in i18n with next-intl (EN/AR, RTL support)
- 🎨 **Tailwind CSS 4** with OKLCH color tokens
- 📦 **Feature-based architecture** - Bulletproof React patterns
- 🔒 **Type-safe** - Full TypeScript with Zod validation
- 🧪 **Testing ready** - Vitest + Storybook + Playwright
- 📊 **Analytics** - GA4 & Meta Pixel (opt-in)
- 🔍 **SEO optimized** - Metadata, JSON-LD, sitemap, robots.txt

## Quick Start

```bash
# Clone the template
git clone <your-repo-url> my-site
cd my-site

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   └── [locale]/           # i18n routes
│       ├── (marketing)/    # Marketing pages
│       └── (legal)/        # Legal pages
├── features/               # Feature modules
│   ├── analytics/          # GA4, Meta Pixel
│   ├── contact/            # Contact form
│   ├── marketing/          # Sections (Hero, Features, CTA)
│   └── seo/                # Metadata, JSON-LD
├── components/             # Shared components
├── config/                 # Site, SEO, feature flags
├── hooks/                  # Shared hooks
├── lib/                    # Utilities
├── messages/               # i18n translations (en, ar)
└── styles/                 # CSS
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | TypeScript type checking |
| `pnpm test` | Run unit tests |
| `pnpm storybook` | Start Storybook |

## Configuration

### Site Settings (`src/config/site.ts`)
```typescript
export const siteConfig = {
  name: "Your Site Name",
  description: "Your site description",
  url: "https://yoursite.com",
  // ...
}
```

### Feature Flags (`src/config/features.ts`)
All features are opt-in and disabled by default:
- `analytics` - GA4 & Meta Pixel
- `contactForm` - Contact form
- `newsletter` - Newsletter signup
- `animations` - Micro-animations

Enable via environment variables:
```env
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

## Documentation

- [Getting Started](docs/getting-started.md)
- [Customization Guide](docs/customization.md)
- [Template Optimization Guide](docs/template-optimization-guide.md)
- [AI Agent Rules](docs/AGENT_RULES.md)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.1.1 |
| React | React 19.2.3 |
| Styling | Tailwind CSS 4 |
| i18n | next-intl 4.7 |
| Validation | Zod 4.3 |
| Testing | Vitest, Storybook 10, Playwright |

## License

MIT
