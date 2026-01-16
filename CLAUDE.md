# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev              # Start dev server at localhost:3000
pnpm build            # Production build
pnpm start            # Start production server

# Testing
pnpm test             # Run unit tests (vitest)
pnpm test:watch       # Watch mode for unit tests
pnpm test:coverage    # Run tests with coverage
pnpm storybook        # Component documentation at localhost:6006

# Code Quality
pnpm lint             # ESLint
pnpm lint:fix         # ESLint with auto-fix
pnpm type-check       # TypeScript type checking
```

### Running a Single Test
```bash
pnpm test -- src/path/to/file.test.ts
```

## Architecture

This is a Next.js 16 marketing template using **Bulletproof React** feature-based architecture.

### Data Flow
```
app/ → features/ → components/, hooks/, lib/ (shared)
```

Features are self-contained modules that cannot import from each other. Cross-feature composition happens only at the app layer.

### Feature Structure
Each feature in `src/features/` follows this pattern:
```
features/[name]/
├── components/     # Feature-specific components
├── content/        # Content schemas and translation keys
├── hooks/          # Feature-specific hooks
├── types/          # Feature-specific types
├── api.ts          # API routes/handlers
├── schemas.ts      # Zod validation
└── index.ts        # Public exports only
```

### i18n Pattern
All user-facing text uses `next-intl` translation keys. Never hardcode copy.

```tsx
// ✅ Correct
const t = useTranslations('home')
<h1>{t('hero.headline')}</h1>

// ❌ Wrong
<h1>Welcome to Our Site</h1>
```

Translation files are in `src/messages/{locale}/` (en, ar with RTL support).

### Feature Flags
All features are **opt-in and disabled by default**. Check `src/config/features.ts`.

```tsx
// Components must check feature flags before rendering
export function Newsletter() {
  const { enabled } = getFeature('newsletter')
  if (!enabled) return null
  return <Form />
}
```

Enable features via environment variables:
```env
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_CONTACT_FORM=true
NEXT_PUBLIC_ENABLE_NEWSLETTER=true
```

### Configuration Files
- `src/config/site.ts` - Site metadata, locales, contact info
- `src/config/features.ts` - Feature flags
- `src/config/theme.ts` - Theme configuration

### Key Patterns

**Styling**: Use Tailwind design tokens (`bg-background`, `text-foreground`), not raw colors (`bg-gray-100`).

**Validation**: Use Zod for all external input validation.

**Imports**: Use `@/` path alias (maps to `src/`).

## Mandatory Rules

1. **No hardcoded text** - All UI text must use translation keys
2. **Features are opt-in** - New features must be disabled by default
3. **No cross-feature imports** - Features cannot import from other features
4. **Both locales required** - All translations need en/ and ar/ versions
5. **Check feature flags** - Components must check if their feature is enabled before rendering
