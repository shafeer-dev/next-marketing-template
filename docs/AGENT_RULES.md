# AI Agent Rules: Next.js Marketing Template

These rules are **mandatory** for all AI agents working on this codebase. They apply without exception.

---

## 🚨 Non-Negotiable Principles

### 1. No Hardcoded Copy
```
❌ <h1>Welcome to Our Site</h1>
✅ <h1>{t('home.hero.headline')}</h1>
```
- All user-facing text MUST use `next-intl` translation keys
- TypeScript defines structure and keys; JSON provides copy
- SEO content (titles, descriptions) also lives in message files

### 2. Opt-In Features Only
```typescript
// ❌ WRONG: Auto-enabled
export function Newsletter() { return <Form /> }

// ✅ CORRECT: Check flag first
export function Newsletter() {
  const { enabled } = getFeatures().newsletter
  if (!enabled) return null
  return <Form />
}
```
- Features MUST be disabled by default in `config/features.ts`
- Never auto-enable features on merge

### 3. Feature Isolation (Bulletproof React)
```
❌ import { something } from '@/features/other-feature'
✅ import { something } from '@/components/common'
✅ import { something } from '@/lib/utils'
```
- Features cannot import from other features
- Compose features at the app layer only
- Shared code lives in `components/`, `hooks/`, `lib/`, `utils/`

---

## 📐 SOLID Principles

| Principle | Application |
|-----------|-------------|
| **S**ingle Responsibility | One component = one purpose. Split if doing multiple things. |
| **O**pen/Closed | Extend via props/variants, don't modify working code. |
| **L**iskov Substitution | Component variants must be interchangeable. |
| **I**nterface Segregation | Props interfaces should be minimal and focused. |
| **D**ependency Inversion | Depend on abstractions (types, interfaces), not concretions. |

### Examples

```typescript
// ✅ Single Responsibility
function SubmitButton({ label }: { label: string }) { /* just a button */ }
function ContactForm() { /* just form logic */ }

// ✅ Open/Closed - extend via variants
<Button variant="primary" />
<Button variant="outline" />

// ❌ Don't modify Button.tsx for each new style
```

---

## 🎯 KISS (Keep It Simple, Stupid)

- Prefer native APIs over libraries
- Avoid premature abstraction
- If it works simply, don't over-engineer

```typescript
// ❌ Over-engineered
const useComplexAnimationStateMachine = () => { /* 200 lines */ }

// ✅ Simple
const fadeIn = "animate-fade-in" // CSS class
```

---

## 🚀 YAGNI (You Aren't Gonna Need It)

- Don't implement features until explicitly requested
- Create stubs with extension points, not full implementations
- Remove unused code immediately

```typescript
// ✅ Stub with extension point
export function useAnalytics() {
  return {
    track: (event: string) => {
      // Stub: implement when provider is chosen
    },
  }
}

// ❌ Full GA + Meta + Segment implementation "just in case"
```

---

## 🔄 DRY (Don't Repeat Yourself)

- Extract repeated patterns into shared utilities
- Use content schemas instead of duplicating structure
- Create reusable hooks for common logic

```typescript
// ✅ Single source of truth
// src/features/marketing/content/schemas.ts
export interface CTAContent {
  headline: string
  buttonLabel: string
  href: string
}

// ❌ Defining CTA shape in 5 different files
```

---

## 📁 File Structure Rules

### Naming Conventions
```
components/     → PascalCase.tsx (Button.tsx, HeroSection.tsx)
hooks/          → use-kebab-case.ts (use-scroll.ts)
lib/            → kebab-case.ts (utils.ts, intl.ts)
config/         → kebab-case.ts (site.ts, features.ts)
content/        → kebab-case.ts (home.ts, services.ts)
```

### Feature Structure
```
src/features/[feature-name]/
├── components/     # Feature-specific components
├── content/        # Content schemas and keys
├── hooks/          # Feature-specific hooks
├── types/          # Feature-specific types
├── api.ts          # API routes/handlers
├── schemas.ts      # Zod validation
└── index.ts        # Public exports ONLY
```

### Index Exports
```typescript
// ✅ Export only public API
export { ContactForm } from './components/ContactForm'
export { useContact } from './hooks/useContact'
export type { ContactFormData } from './types'

// ❌ Export internal utilities
```

---

## 🌐 i18n Rules

### Message Structure
```
messages/
├── en/
│   ├── common.json      # Shared UI text
│   ├── home.json        # Home page
│   ├── [feature].json   # Per-feature
│   └── seo.json         # SEO metadata
└── ar/
    └── (mirrors en/)
```

### Key Naming
```json
{
  "hero": {
    "headline": "...",
    "subheadline": "...",
    "cta": "..."
  },
  "features": {
    "title": "...",
    "items": {
      "0": { "title": "...", "description": "..." }
    }
  }
}
```

### Translation Key Usage
```typescript
// ✅ Direct key reference
const t = useTranslations('home')
<h1>{t('hero.headline')}</h1>

// ❌ String interpolation
<h1>{`home.hero.headline`}</h1>
```

---

## 🎨 Styling Rules

### Tailwind Usage
```tsx
// ✅ Use design tokens
<div className="bg-background text-foreground" />
<div className="border-border rounded-lg" />

// ❌ Raw color values
<div className="bg-gray-100 text-gray-900" />
<div className="bg-[#f5f5f5]" />
```

### Component Variants (CVA)
```typescript
// ✅ Define variants
const buttonVariants = cva("...", {
  variants: { size: { sm: "", md: "", lg: "" } },
  defaultVariants: { size: "md" },
})

// ❌ Inline conditionals
className={size === 'sm' ? '...' : size === 'md' ? '...' : '...'}
```

---

## 🔒 Security Rules

- Never commit secrets or API keys
- Use environment variables for all external values
- Validate all external input with Zod
- Sanitize user-generated content

```typescript
// ✅ Validate environment
import { z } from 'zod'
const envSchema = z.object({ NEXT_PUBLIC_APP_URL: z.string().url() })
export const env = envSchema.parse(process.env)

// ✅ Validate form input
const formSchema = z.object({ email: z.string().email() })
```

---

## 📦 Dependency Rules

| Category | Action |
|----------|--------|
| Adding new dependency | Requires justification |
| Library > 50KB | Prefer alternative or native API |
| Multiple libs for same purpose | Choose one, remove others |
| Unused dependencies | Remove immediately |

### Approved Libraries
- `zod` - Validation
- `lucide-react` - Icons
- `class-variance-authority` - Variants
- `clsx` / `tailwind-merge` - Class composition

### Require Approval
- Animation libraries (use CSS/tw-animate-css first)
- Carousel/slider libraries
- State management beyond React state
- Form libraries (use native + Zod)

---

## ✅ Pre-Commit Checklist

Before completing any task, verify:

- [ ] No hardcoded user-facing text
- [ ] All text uses translation keys
- [ ] New features are opt-in (disabled by default)
- [ ] No cross-feature imports
- [ ] Types are properly defined
- [ ] Content follows schema pattern
- [ ] No unused code left behind
- [ ] No new dependencies without justification
- [ ] ESLint and TypeScript pass
- [ ] Both locales (en/ar) have translations

---

## 🚫 Forbidden Actions

1. **Never** hardcode text in components
2. **Never** auto-enable new features
3. **Never** import between features
4. **Never** add heavy dependencies without approval
5. **Never** mix content with presentation
6. **Never** skip type definitions
7. **Never** commit console.log statements
8. **Never** modify global styles without necessity

---

## 📋 When In Doubt

1. Check `docs/prompt.md` for template philosophy
2. Check `docs/template-optimization-guide.md` for patterns
3. Check existing features for conventions
4. Ask before adding new dependencies
5. Prefer minimal, reversible changes
