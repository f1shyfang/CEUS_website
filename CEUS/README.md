# CEUS Next.js Application

This directory contains the Next.js application for the CEUS website.

## Quick start

```bash
npm install
cp .env.example .env.local   # add Supabase credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run tsc` | TypeScript check |

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL` — required
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — required
- `SUPABASE_SERVICE_ROLE_KEY` — only for scripts in `scripts/`

## Supabase setup

### Database migrations

Run SQL files in `scripts/migrations/` via the Supabase SQL editor. Key migrations:

- `create_public_images_bucket.sql` — image storage
- `create_jobs_table.sql` — job board

### Image storage

Site images are served from a single public bucket: `public-images`.

1. Run `scripts/migrations/create_public_images_bucket.sql`
2. Sync local images (optional):

```bash
set -a && source .env.local && set +a && node scripts/upload-public-images-to-supabase.mjs
```

See [docs/public-images.md](docs/public-images.md) for folder layout and helpers.

### Admin access

The admin panel is at `/admin`. Create users in Supabase under **Authentication → Users**.

## Documentation

| Document | Location |
|----------|----------|
| Project overview | [../README.md](../README.md) |
| Documentation index | [../docs/README.md](../docs/README.md) |
| Getting started | [../docs/GETTING_STARTED.md](../docs/GETTING_STARTED.md) |
| Quick reference | [../docs/QUICK_REFERENCE.md](../docs/QUICK_REFERENCE.md) |
