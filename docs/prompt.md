# Cursor Master Prompt: Extend Existing Next.js Marketing Template

## Role
You are working inside an **existing production-grade Next.js App Router marketing template**.  
Your task is to **extend the template with optional, lightweight capabilities** without breaking its architecture, philosophy, or delivery speed.

This is not a one-off website. It is a **reusable client-delivery system**.

---

## Core Rules (Non-Negotiable)

- No hardcoded user-facing copy in JSX
- TypeScript defines structure, variants, flags, and translation keys
- Actual text lives in `next-intl` message JSON files
- Features must be **opt-in**, never auto-enabled
- Prefer composition and configuration over conditionals
- Avoid heavy dependencies unless clearly justified
- Preserve Bulletproof React–style feature boundaries

---

## Current Project Structure (Context)

```txt
src/
├─ app/
│  └─ [locale]/
│     ├─ (marketing)/
│     ├─ (legal)/
│     ├─ layout.tsx
│     └─ not-found.tsx
│
├─ features/
│  ├─ marketing/
│  │  ├─ components/
│  │  ├─ content/
│  │  ├─ hooks/
│  │  └─ index.ts
│  │
│  ├─ contact/
│  │  ├─ components/
│  │  ├─ schemas.ts
│  │  ├─ api.ts
│  │  └─ index.ts
│  │
│  └─ seo/
│     ├─ components/
│     ├─ config.ts
│     └─ index.ts
│
├─ components/
│  ├─ ui/              # shadcn
│  ├─ layout/
│  └─ common/
│
├─ hooks/
├─ lib/
├─ messages/           # next-intl (en / ar)
├─ config/
├─ stories/
└─ styles/
Internationalization Rules
next-intl is used

Messages are split per feature, not a single file

txt
Copy code
messages/
├─ en/
│  ├─ common.json
│  ├─ home.json
│  ├─ forms.json
│  └─ seo.json
└─ ar/
TypeScript files reference translation keys only

SEO copy also lives in message files

Task Goal
Extend the template with optional, lightweight features (e.g. micro-animations, stubbed pages, conversion helpers, UI polish, SEO enhancers).

Do not fully implement everything.
Provide stubs, hooks, config flags, and extension points only.

Always consider:

Feature ownership

Content structure

Future reuse across clients

Execution Steps (Follow in Order)
Step 1: Feature Identification
Propose lightweight, opt-in features suitable for marketing sites

Each feature must:

Improve perceived quality or conversion

Be safe to ship unused

Not force design decisions

Step 2: Feature Placement
For each feature:

Decide correct ownership:

features/*

components/common

hooks

lib

config

Justify placement using Bulletproof React principles

Step 3: Content and Config Design
For each feature, define:

TypeScript content schema (keys, variants, flags)

Required translation namespaces (if any)

Feature toggle or config shape

Example:

ts
Copy code
config/features.ts
features.animations.enabled = false
Step 4: Library Suggestions (Optional)
Suggest at most one lightweight library per feature

Prefer native APIs where possible

Explain why the library is optional

Step 5: Stub Strategy
For each feature:

List files to create

Describe minimal placeholder logic

Explain how future implementations would extend it

Do not write full production code unless asked

Step 6: Safety Check
Ensure:

No hardcoded copy was introduced

No feature is auto-enabled

No tight cross-feature coupling

No architectural changes were made

Output Format
Feature overview table

Per-feature breakdown:

Purpose

Folder placement

Content and config shape

Optional library

Stub strategy

Final sanity checklist

What NOT to Do
Do not redesign the architecture

Do not flatten feature boundaries

Do not assume CMS usage

Do not add heavy animation or carousel libraries by default

Do not mix content and presentation

Success Criteria
The result should:

Make the template feel more premium

Enable future upsells

Preserve fast delivery

Be safe to ignore per client

Be understandable without extra explanation