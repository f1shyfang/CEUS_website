/**
 * Upload converted WebP gallery files to the homepage-gallery bucket.
 *
 * Usage (from CEUS/):
 *   SUPABASE_SERVICE_ROLE_KEY=... node scripts/upload-homepage-gallery-webp.mjs
 *
 * Defaults to ~/Downloads/supabase-files (1) — override with GALLERY_SOURCE_DIR.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { homedir } from 'node:os';

const bucket = 'homepage-gallery';
const sourceDir =
  process.env.GALLERY_SOURCE_DIR ||
  path.join(homedir(), 'Downloads', 'supabase-files (1)');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseKey = serviceRoleKey || anonKey;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (preferred).'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log(`Uploading .webp from: ${sourceDir}`);
  console.log(`Bucket: ${bucket}`);
  console.log(`Auth: ${serviceRoleKey ? 'service-role' : 'anon-key'}`);

  const names = await readdir(sourceDir);
  const webps = names.filter((n) => n.toLowerCase().endsWith('.webp') && !n.startsWith('.'));

  let uploaded = 0;
  let failed = 0;

  for (const name of webps) {
    const fullPath = path.join(sourceDir, name);
    const bytes = await readFile(fullPath);
    const { error } = await supabase.storage.from(bucket).upload(name, bytes, {
      contentType: 'image/webp',
      upsert: true,
      cacheControl: '3600',
    });
    if (error) {
      failed += 1;
      console.error(`FAIL ${name}:`, error.message);
    } else {
      uploaded += 1;
      console.log(`OK   ${name}`);
    }
  }

  console.log(`\nDone. uploaded=${uploaded} failed=${failed}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
