# CEUS Website Quick Reference

Day-to-day commands, file locations, and common tasks.

## Commands

Run from `CEUS/` (or use root `package.json` scripts from the repo root).

```bash
npm run dev       # Development server → http://localhost:3000
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint
npm run tsc       # TypeScript check
```

### Git workflow

```bash
git checkout -b feat/your-feature-name
git commit -m "feat: describe your change"
git pull origin main
```

## Environment variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` | Public API key |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` | Bulk upload scripts only |

Template: `CEUS/.env.example`

## Key file locations

```
CEUS/
├── .env.example / .env.local
├── scripts/
│   ├── migrations/              # SQL for Supabase SQL editor
│   ├── upload-public-images-to-supabase.mjs
│   └── seed-sponsors-2026.mjs
├── src/
│   ├── app/
│   │   ├── admin/               # Admin dashboard
│   │   ├── events/              # Events page
│   │   ├── jobs/                # Job board
│   │   ├── team/                # Team page
│   │   ├── sponsors/            # Sponsors page
│   │   └── contact/             # Contact form
│   ├── components/
│   │   ├── admin/               # Admin UI components
│   │   └── ThreeDModelsInner.tsx
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client + CRUD
│   │   ├── storagePublicUrls.ts # Image URL helpers
│   │   └── schemas.ts           # Zod validation
│   ├── layouts/                 # Header, Footer, Navbar
│   ├── types.ts                 # Shared types
│   └── proxy.ts                 # Admin auth middleware
└── docs/public-images.md        # Storage bucket guide
```

## Supabase migrations

Run `.sql` files from `scripts/migrations/` in the Supabase SQL editor:

| File | Purpose |
|------|---------|
| `create_public_images_bucket.sql` | Image storage bucket |
| `create_jobs_table.sql` | Job board table |
| `add_bronze_sponsor_tier.sql` | Bronze sponsor tier |
| `rename_team_careers_to_industry.sql` | Team category rename |
| `team_members_id_default.sql` | Team member ID default |

## Common tasks

### Update site content (recommended)

Use the admin dashboard at `/admin`:

1. Log in at `/admin/login`
2. Navigate to Events, Sponsors, Team, Jobs, or Contacts
3. Add, edit, or delete records
4. Upload images through the form — they go to `public-images` in Supabase Storage

### Add an admin user

Supabase dashboard → **Authentication → Users → Add user**

### Sync local images to Supabase

```bash
cd CEUS
set -a && source .env.local && set +a && node scripts/upload-public-images-to-supabase.mjs
```

Requires `SUPABASE_SERVICE_ROLE_KEY`.

### Seed sponsor data

```bash
node scripts/seed-sponsors-2026.mjs
```

### Add a new public page

1. Create `src/app/your-page/page.tsx`
2. Add a link in `src/layouts/Header.tsx` or `Navbar.tsx`
3. Add metadata export for SEO

### Re-enabling 3D models

Three.js is currently disabled. To restore:

```bash
npm install three @react-three/fiber @react-three/drei @types/three
```

Then restore `src/components/ThreeDModelsInner.tsx` from git history.

## Admin routes

| Section | Route |
|---------|-------|
| Dashboard | `/admin` |
| Events | `/admin/events` |
| Sponsors | `/admin/sponsors` |
| Team | `/admin/team` |
| Jobs | `/admin/jobs` |
| Contacts | `/admin/contacts` |
| Login | `/admin/login` |

## Troubleshooting

### Build errors

```bash
rm -rf .next node_modules
npm install
npm run build
```

### Supabase connection issues

- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- Confirm the Supabase project is active (not paused)
- Check browser console for 401/403 from Supabase

### Images not displaying

- Confirm `create_public_images_bucket.sql` has been run
- Check the file exists in the `public-images` bucket
- Verify `getImageUrl()` resolves to a valid Supabase Storage URL

### Type errors

```bash
npm run tsc
npm run lint -- --fix
```

## Links

- [Getting Started](GETTING_STARTED.md)
- [Architecture](ARCHITECTURE.md)
- [API Documentation](API_DOCUMENTATION.md)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Next.js Docs](https://nextjs.org/docs)
