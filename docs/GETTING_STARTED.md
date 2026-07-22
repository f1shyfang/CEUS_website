# Getting Started

This guide walks through setting up the CEUS website for local development.

## Prerequisites

- **Node.js** 20.x or later
- **npm** or **pnpm**
- A **Supabase** project with the required tables and storage bucket (see [Database setup](#database-setup))

## 1. Clone and install

```bash
git clone https://github.com/f1shyfang/CEUS_website.git
cd CEUS_website/CEUS
npm install
```

From the repo root you can also run `npm install` and use root scripts (`npm run dev`, etc.) which delegate to `CEUS/`.

## 2. Environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Required variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

Optional (only for admin scripts in `scripts/`):

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
```

Get values from the Supabase dashboard under **Settings → API**. Never commit `.env.local`.

## 3. Database setup

Run the SQL migrations in the Supabase SQL editor. At minimum:

| Migration | Purpose |
|-----------|---------|
| `scripts/migrations/create_public_images_bucket.sql` | Storage bucket for site images |
| `scripts/migrations/create_jobs_table.sql` | Job board (`/jobs`) |

Other migrations in `scripts/migrations/` apply schema updates (sponsor tiers, team categories, etc.). Run them if your database was created from an older schema.

### Storage sync (optional)

To upload local images from `public/images/` to Supabase Storage:

```bash
set -a && source .env.local && set +a && node scripts/upload-public-images-to-supabase.mjs
```

Requires `SUPABASE_SERVICE_ROLE_KEY`. See [CEUS/docs/public-images.md](../CEUS/docs/public-images.md) for details.

### Admin access

Create admin users in the Supabase dashboard under **Authentication → Users**. They can log in at `/admin/login`.

## 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 5. Verify the setup

| Check | How |
|-------|-----|
| Public pages load | Visit `/`, `/events`, `/team`, `/sponsors` |
| Supabase connection | Events/team/sponsors render (not empty due to errors) |
| Admin login | Visit `/admin/login` and sign in |
| Job board | Visit `/jobs` (requires `create_jobs_table.sql`) |
| Type safety | `npm run tsc` passes |
| Linting | `npm run lint` passes |

## Common issues

**Blank data or console errors from Supabase**

- Confirm `.env.local` has the correct URL and anon key.
- Check the Supabase project is not paused.
- Verify RLS policies allow public read on content tables.

**Images not loading**

- Run the `public-images` bucket migration.
- Confirm images exist in the `public-images` Supabase bucket.
- See [public-images.md](../CEUS/docs/public-images.md).

**Build failures**

```bash
rm -rf .next node_modules
npm install
npm run build
```

## Next steps

- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) — day-to-day commands and file locations
- [CONTRIBUTING.md](CONTRIBUTING.md) — how to submit changes
- [ARCHITECTURE.md](ARCHITECTURE.md) — how the app is structured
