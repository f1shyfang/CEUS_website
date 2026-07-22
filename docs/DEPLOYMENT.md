# CEUS Website Deployment Guide

Deployment options, configuration, and production checklist.

## Table of Contents

- [Recommended: Vercel](#recommended-vercel)
- [Environment Variables](#environment-variables)
- [Pre-deploy Checklist](#pre-deploy-checklist)
- [Alternative Platforms](#alternative-platforms)
- [Troubleshooting](#troubleshooting)

## Recommended: Vercel

Vercel is the recommended host for this Next.js application.

### Prerequisites

- GitHub repository connected to Vercel
- Supabase project with migrations applied
- Supabase environment variables ready

### Step 1: Verify local build

```bash
cd CEUS
npm install
npm run build
npm start   # optional smoke test
```

### Step 2: Import project

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **New Project** and import the repository
3. Set **Root Directory** to `CEUS` (important — the Next.js app is not at the repo root)

### Step 3: Build settings

Vercel auto-detects Next.js. Confirm:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Root Directory | `CEUS` |
| Build Command | `npm run build` |
| Install Command | `npm install` |
| Node.js Version | 20.x |

### Step 4: Environment variables

Add these in **Settings → Environment Variables**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

`SUPABASE_SERVICE_ROLE_KEY` is **not** needed for the deployed app — only for local admin scripts.

### Step 5: Deploy

Click **Deploy**. Vercel provides a preview URL on each push and deploys `main` to production.

### Custom domain

1. **Settings → Domains** → add your domain
2. Update DNS records as instructed by Vercel
3. HTTPS is provisioned automatically

### Automatic deployments

- **Production** — pushes to `main`
- **Preview** — pull request deployments with unique URLs

## Environment Variables

### Required (all environments)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### Scripts only (never add to Vercel)

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
```

### Variable reference

| Variable | Client-safe | Purpose |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public API key (RLS protects data) |
| `SUPABASE_SERVICE_ROLE_KEY` | **No** | Bypasses RLS — scripts only |

Variables prefixed with `NEXT_PUBLIC_` are embedded in the client bundle. Never prefix secrets with `NEXT_PUBLIC_`.

## Pre-deploy Checklist

- [ ] SQL migrations applied in Supabase (`scripts/migrations/`)
- [ ] `public-images` storage bucket created and populated
- [ ] Admin users created in Supabase Auth
- [ ] RLS policies allow public read on content tables
- [ ] `npm run build` succeeds locally
- [ ] `npm run tsc` and `npm run lint` pass
- [ ] Environment variables set in Vercel for Production and Preview

## Alternative Platforms

### Netlify

Netlify requires the Next.js runtime plugin. Set base directory to `CEUS` and build command to `npm run build`. Supabase env vars are the same as Vercel.

A generic static-site `netlify.toml` with `publish = ".next"` is **not** sufficient for this App Router project without the Next.js adapter.

### Self-hosted (Docker / PM2)

For full control, build and run the Next.js standalone server:

```bash
cd CEUS
npm ci
npm run build
npm start   # listens on port 3000
```

Use a reverse proxy (nginx, Caddy) for HTTPS and place the app behind PM2 or systemd for process management.

Example nginx proxy:

```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Troubleshooting

### Build failures on Vercel

```bash
# Reproduce locally
cd CEUS
rm -rf .next node_modules
npm install
npm run build
```

### Environment variables not applied

- Restart the deployment after adding variables
- Confirm variable names match exactly (no trailing spaces)
- `NEXT_PUBLIC_*` vars require a rebuild to take effect

### Supabase errors in production

- Verify the Supabase project is not paused (free tier inactivity)
- Check RLS policies allow the operations your pages need
- Confirm the anon key matches the project URL

### Images not loading in production

- Run `create_public_images_bucket.sql`
- Confirm `next.config.js` includes your Supabase hostname in `images.remotePatterns`
- Test a direct Supabase Storage URL in the browser

### Admin login fails

- Confirm the user exists in Supabase Auth
- Check `proxy.ts` middleware is not blocking the auth callback
- Verify cookies are not blocked by browser privacy settings

## Security

- HTTPS is automatic on Vercel
- Keep `SUPABASE_SERVICE_ROLE_KEY` out of Vercel env vars
- Run `npm audit` periodically and update dependencies
- Review Supabase RLS policies when adding new tables

## Support

- [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
