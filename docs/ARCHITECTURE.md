# CEUS Website Architecture

Technical overview of the CEUS website: structure, patterns, data flow, and security.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Architecture Patterns](#architecture-patterns)
- [Routes and Pages](#routes-and-pages)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Admin Architecture](#admin-architecture)
- [tRPC API](#trpc-api)
- [Performance Considerations](#performance-considerations)
- [Security](#security)
- [Deployment Architecture](#deployment-architecture)

## Overview

The CEUS website is a Next.js 16 application using the App Router with Supabase as the backend. Design goals:

- **Performance** — Server-rendered pages with ISR where appropriate; client hydration for interactive UI
- **Maintainability** — TypeScript throughout; shared types in `src/types.ts`
- **Operability** — Admin dashboard so executives can update content without code changes
- **Reliability** — Static fallback data in `src/data/` when Supabase is unavailable

## Technology Stack

### Frontend

| Package | Role |
|---------|------|
| Next.js 16 | App Router, SSR/ISR, metadata |
| React 19 | UI |
| TypeScript 5.7 | Type safety |
| Tailwind CSS 3.4 | Styling |
| GSAP 3.12 | Animations |

### Backend (Supabase)

| Service | Role |
|---------|------|
| PostgreSQL | Events, sponsors, team, jobs, contact submissions |
| Supabase Auth | Admin login |
| Supabase Storage | Site images (`public-images` bucket) |

### Data layer

| Package | Role |
|---------|------|
| `@supabase/supabase-js` | Database, auth, storage client |
| `@supabase/ssr` | Cookie-based auth in browser + middleware |
| tRPC + React Query | Paginated events API (`/api/trpc`) |

### Forms and validation

- React Hook Form + Zod (`src/lib/schemas.ts`)

## Project Structure

```
CEUS/
├── scripts/
│   └── migrations/         # SQL migrations for Supabase
├── public/                 # Static files (PDFs, legacy images)
└── src/
    ├── app/                # Next.js App Router
    │   ├── admin/          # Protected admin routes
    │   │   ├── events/
    │   │   ├── sponsors/
    │   │   ├── team/
    │   │   ├── jobs/
    │   │   └── contacts/
    │   ├── api/trpc/       # tRPC HTTP handler
    │   ├── events/
    │   ├── jobs/
    │   ├── team/
    │   ├── sponsors/
    │   ├── contact/
    │   ├── publications/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── robots.ts
    ├── components/
    │   ├── admin/          # Admin UI (DataTable, FormModal, ImageUpload)
    │   └── ...             # Public components
    ├── layouts/            # Header, Footer, Navbar
    ├── lib/
    │   ├── supabase.ts     # Supabase client and CRUD helpers
    │   ├── storagePublicUrls.ts  # Image URL resolution
    │   └── schemas.ts      # Zod schemas
    ├── server/api/         # tRPC routers
    ├── trpc/               # tRPC client setup
    ├── data/               # Static fallback data
    ├── proxy.ts            # Auth middleware for /admin
    └── types.ts
```

## Architecture Patterns

### Hybrid rendering

- **Server components** fetch data for pages like `/jobs` (with `revalidate` for ISR)
- **Client components** (`*Client.tsx`) handle filtering, modals, and admin interactions
- **Fallback data** in `src/data/` supports offline or misconfigured Supabase during development

### Supabase as source of truth

Content tables replace hand-edited TypeScript files for production. Migration scripts in `scripts/migrations/` define the schema; admin UI and `src/lib/supabase.ts` handle reads and writes.

### Progressive enhancement

Core pages work without JavaScript for initial content. Interactive features (filters, modals, admin forms) enhance the experience client-side.

## Routes and Pages

| Route | Type | Data source |
|-------|------|-------------|
| `/` | Public | Mixed (hero, featured content) |
| `/events` | Public | Supabase `events` |
| `/team` | Public | Supabase `team_members` |
| `/sponsors` | Public | Supabase `sponsors` |
| `/jobs` | Public | Supabase `jobs` |
| `/contact` | Public | Writes to `contact_submissions` |
| `/publications` | Public | Static |
| `/admin/*` | Protected | Supabase (auth required) |

## Data Flow

### Public reads

```
Supabase DB → lib/supabase.ts (fetch*) → Page/Client component → UI
```

Images resolve through `lib/storagePublicUrls.ts` and `getImageUrl()` in `lib/supabase.ts`, mapping paths to the `public-images` bucket.

### Admin writes

```
Admin form → lib/supabase.ts (create*/update*/delete*) → Supabase DB
                ↓
         uploadFile() → Supabase Storage (images)
```

### Contact form

```
ContactClient → submitContactForm() → contact_submissions table
Admin → getContactSubmissions() / updateSubmissionStatus()
```

## State Management

- **Local state** — `useState`, `useEffect` in client components
- **Forms** — React Hook Form in admin modals
- **Server state** — Direct Supabase fetches; React Query via tRPC for paginated events
- **Auth** — Supabase session in cookies (`@supabase/ssr`); `proxy.ts` guards `/admin`

## Admin Architecture

- **Auth** — `/admin/login` via Supabase email/password; `proxy.ts` redirects unauthenticated users
- **Layout** — Shared admin layout with sidebar navigation
- **CRUD** — Consistent pattern: `DataTable` + `FormModal` + `DeleteConfirmModal` per entity
- **Images** — `ImageUpload` component uploads to `public-images` via `uploadFile()`

Admin sections: Events, Sponsors, Team, Jobs, Contacts.

## tRPC API

A lightweight tRPC layer exists for paginated event fetching:

```
Client → /api/trpc → server/api/routers/events → Supabase
```

Routers live in `src/server/api/`. The events router exposes `getInfinite` for cursor-based pagination. This is additive — most pages still use direct Supabase helpers.

## Performance Considerations

- **Images** — `OptimizedImage` component + Next.js Image with Supabase remote patterns in `next.config.js`
- **Bundle size** — Three.js removed (~950KB); 3D section shows a placeholder
- **ISR** — `/jobs` uses `revalidate = 600` (10 minutes)
- **Code splitting** — Admin and heavy client components loaded per route

## Security

### Row Level Security (RLS)

Supabase policies should:

- Allow **public read** on content tables (events, sponsors, team, jobs)
- Restrict **writes** to authenticated admin users
- Allow **contact form inserts** from anonymous users
- Restrict **contact submission reads** to authenticated users

### Authentication

- Password-based login via Supabase Auth
- Session stored in HTTP-only cookies via `@supabase/ssr`
- `SUPABASE_SERVICE_ROLE_KEY` used only in server-side scripts — never exposed to the browser

### Environment secrets

| Variable | Exposure |
|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser-safe |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser-safe (RLS enforces access) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server/scripts only |

## Deployment Architecture

- **Hosting** — Vercel (recommended); set **Root Directory** to `CEUS`
- **CDN** — Vercel edge network for static assets and pages
- **Database** — Supabase hosted PostgreSQL
- **Storage** — Supabase Storage with public bucket for images

See [DEPLOYMENT.md](DEPLOYMENT.md) for configuration details.
