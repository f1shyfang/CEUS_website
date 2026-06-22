# Contributing to CEUS Website

Guidelines for contributing to the CEUS website.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Working with Data](#working-with-data)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Common Tasks](#common-tasks)

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or pnpm)
- Git
- Familiarity with React, TypeScript, and Next.js

### First-time setup

See [GETTING_STARTED.md](GETTING_STARTED.md) for the full walkthrough:

1. Fork and clone the repository
2. `cd CEUS && npm install`
3. Copy `.env.example` to `.env.local` with Supabase credentials
4. Run SQL migrations in Supabase
5. `npm run dev`

## Development Setup

### Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint
npm run tsc       # TypeScript check
```

### Workflow

1. Create a branch: `git checkout -b feat/your-feature-name`
2. Make changes following the guidelines below
3. Run `npm run tsc` and `npm run lint`
4. Test on desktop and mobile
5. Commit with [Conventional Commits](https://www.conventionalcommits.org/)
6. Open a pull request

## Code Style

### TypeScript

- Define interfaces for data structures (prefer `src/types.ts` for shared types)
- Avoid `any` — use proper types or `unknown` with type guards
- Match existing patterns in the file you're editing

```typescript
// Good
interface EventData {
  id: string;
  title: string;
  date: string;
  category: Event['category'];
}

// Avoid
const event: any = { id: '1', title: 'Event' };
```

### React components

- Use functional components
- Type props with interfaces
- Keep components focused — extract hooks for reusable logic
- Use `'use client'` only when the component needs browser APIs or state

### Tailwind CSS

- Use utility classes; follow mobile-first responsive patterns
- Match existing spacing, colors, and component patterns
- Avoid inline styles unless necessary

```tsx
// Good
<div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-md">

// Avoid
<div style={{ display: 'flex', padding: '24px' }}>
```

### File naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `EventCard.tsx` |
| Pages | kebab-case dirs | `app/events/page.tsx` |
| Client wrappers | `*Client.tsx` | `EventsClient.tsx` |
| Utilities | camelCase | `storagePublicUrls.ts` |

## Working with Data

### Primary: Supabase + Admin dashboard

Production content lives in Supabase. Society executives update it via `/admin`. When developing features:

- Add CRUD helpers in `src/lib/supabase.ts`
- Add Zod schemas in `src/lib/schemas.ts` for validation
- Use the admin UI pattern: `DataTable` + `FormModal` + `ImageUpload`

### Fallback: Static data files

`src/data/` contains fallback data used when Supabase is unavailable. Update these only if you need local development without a database connection.

### Database changes

1. Write a migration SQL file in `scripts/migrations/`
2. Document it in [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
3. Update types in `src/types.ts` and helpers in `src/lib/supabase.ts`

### Images

All site images go to the `public-images` Supabase bucket. Use `uploadFile()` and `getImageUrl()` from `src/lib/supabase.ts`. See [public-images.md](../CEUS/docs/public-images.md).

## Testing

### Manual checklist

Before submitting a PR:

- [ ] Renders correctly on desktop and mobile
- [ ] Interactive elements work (filters, modals, forms)
- [ ] No console errors
- [ ] `npm run tsc` passes
- [ ] `npm run lint` passes
- [ ] Admin changes persist after page reload (if applicable)

### Browsers

Test in Chrome, Firefox, and Safari when changing UI.

## Pull Request Process

### PR description

```markdown
## Description
What changed and why.

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactor

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] `npm run tsc` passes
- [ ] `npm run lint` passes

## Screenshots
(For UI changes)
```

### Review

1. Automated checks pass
2. Maintainer code review
3. Merge to `main` → auto-deploys to Vercel

## Common Tasks

### Add a new admin section

1. Create page in `src/app/admin/your-section/page.tsx`
2. Add CRUD helpers in `src/lib/supabase.ts`
3. Add navigation link in `src/app/admin/layout.tsx`
4. Write a SQL migration if a new table is needed

### Add a new public page

1. Create `src/app/your-page/page.tsx` with metadata export
2. Add navigation in `src/layouts/Header.tsx`
3. Fetch data server-side or via client component as appropriate

### Update content (non-developers)

Direct executives to `/admin` — no code changes needed for routine content updates.

## Getting Help

- [Architecture](ARCHITECTURE.md) — how the app is structured
- [API Documentation](API_DOCUMENTATION.md) — types and Supabase helpers
- [Quick Reference](QUICK_REFERENCE.md) — commands and file locations
- Open a GitHub issue for bugs or feature requests

Thank you for contributing!
