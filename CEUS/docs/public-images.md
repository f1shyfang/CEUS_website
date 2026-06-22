# Supabase Public Images

CEUS serves site images from a single public Supabase Storage bucket.

See also: [Getting Started](../../docs/GETTING_STARTED.md) · [Quick Reference](../../docs/QUICK_REFERENCE.md)

- Bucket: `public-images`
- Folders:
  - `assets/`
  - `events/`
  - `sponsors/`
  - `team/`

## Setup

1. Set these environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` for bulk uploads and bucket setup
2. Run [scripts/migrations/create_public_images_bucket.sql](../scripts/migrations/create_public_images_bucket.sql) in the Supabase SQL editor.
3. Upload the local files from `public/images/` into `public-images/` with [scripts/upload-public-images-to-supabase.mjs](../scripts/upload-public-images-to-supabase.mjs).

## Re-upload

Use the service role key when syncing local images so the script can write to the bucket without relying on browser auth:

```bash
set -a && source .env.local && set +a && node scripts/upload-public-images-to-supabase.mjs
```

## Notes

- The app renders images through shared helpers in [src/lib/storagePublicUrls.ts](../src/lib/storagePublicUrls.ts).
- Existing data files should use Supabase URLs, not `/images/...` paths.
