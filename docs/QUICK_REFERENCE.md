# CEUS Website Quick Reference

A quick reference guide for common tasks and commands when working with the CEUS website.

## Table of Contents
- [Quick Commands](#quick-commands)
- [Supabase & Data](#supabase--data)
- [File Locations](#file-locations)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## Quick Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type checking
npm run tsc
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feat/your-feature-name

# Commit changes (Conventional Commits)
git commit -m "feat: add new feature"

# Pull latest changes
git pull origin main
```

## Supabase & Data

### Database Migrations
SQL migrations are located in `CEUS/scripts/migrations/`.
1. Open the Supabase SQL Editor for your project.
2. Copy and paste the contents of the `.sql` file.
3. Run the query.

### Initializing Storage
To set up the `public-images` bucket:
1. Run `CEUS/scripts/migrations/create_public_images_bucket.sql` in Supabase SQL editor.
2. Sync local images to the bucket:
   ```bash
   # From CEUS/ directory
   set -a && source .env.local && set +a && node scripts/upload-public-images-to-supabase.mjs
   ```
3. For detailed instructions on image management, see [CEUS/docs/public-images.md](../CEUS/docs/public-images.md).

### Seeding Data
Seed scripts are available in `CEUS/scripts/`:
```bash
# Seed sponsors for 2026
node scripts/seed-sponsors-2026.mjs
```

## File Locations

### Key Directories
```
CEUS/
├── scripts/                # Migrations and bulk data scripts
├── public/                 # Static assets (3D models, documents)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── admin/          # Admin dashboard
│   ├── components/         # Reusable UI components
│   ├── lib/                # Shared logic (Supabase client)
│   └── types.ts            # TypeScript types
```

### Important Files
- **Supabase Client**: `src/lib/supabase.ts`
- **Type Definitions**: `src/types.ts`
- **Tailwind Config**: `tailwind.config.js`

## Common Tasks

### Managing Site Content
Most content is now managed through the **Admin Dashboard** at `/admin`.
1. Log in with your society executive credentials.
2. Navigate to the relevant section (Events, Sponsors, Team).
3. Use the forms to add, edit, or delete items.
4. Images uploaded through the dashboard are automatically saved to Supabase Storage.

### Adding a New Admin User
Admin users are managed through the Supabase Dashboard under **Authentication** -> **Users**.
1. Click "Add user" -> "Create new user".
2. Enter email and password.
3. The user can now log in to the site's admin panel.

### Updating 3D Models
1. Add new `.glb` or `.gltf` file to `CEUS/public/`.
2. Update the configuration in `src/components/ThreeDModelsInner.tsx` (if hardcoded) or ensure it matches the expected model path.

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

#### Supabase Connection Issues
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
- Ensure your IP is not blocked by Supabase (if configured).
- Check if the Supabase project is active (not paused).

#### Images Not Displaying
- Check if the image exists in the Supabase `public-images` bucket.
- Verify that the bucket has "Public" access enabled.
- Check the console for "404 Not Found" or "403 Forbidden" errors from the Supabase storage URL.

### Debug Commands
```bash
# Check Node version (recommended 20+)
node -v

# Run linting with auto-fix
npm run lint -- --fix
```

## Useful Links
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
