import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const bucket = 'public-images';
const projectRoot = process.cwd();
const imagesRoot = path.join(projectRoot, 'public', 'images');
const allowedExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);

const categoryDirs = ['assets', 'events', 'sponsors', 'team'];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseKey = serviceRoleKey || anonKey;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and either SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function walkFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath)));
      continue;
    }
    files.push(fullPath);
  }

  return files;
}

function toStoragePath(localFilePath, category) {
  const categoryRoot = path.join(imagesRoot, category);
  const relativeInCategory = path.relative(categoryRoot, localFilePath).split(path.sep).join('/');
  return `${category}/${relativeInCategory}`;
}

function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return allowedExtensions.has(ext);
}

async function run() {
  const usingServiceRole = Boolean(serviceRoleKey);
  console.log(`Starting upload test to bucket "${bucket}" with category folders`);
  console.log(`Auth mode: ${usingServiceRole ? 'service-role' : 'anon-key'}`);

  const results = {
    uploaded: 0,
    skipped: 0,
    failed: 0,
  };

  for (const category of categoryDirs) {
    const categoryPath = path.join(imagesRoot, category);
    let files;

    try {
      files = await walkFiles(categoryPath);
    } catch {
      console.warn(`Skipping missing directory: ${categoryPath}`);
      continue;
    }

    for (const filePath of files) {
      const baseName = path.basename(filePath);

      if (baseName === '.DS_Store' || !isImageFile(filePath)) {
        results.skipped += 1;
        continue;
      }

      const storagePath = toStoragePath(filePath, category);

      try {
        const fileBuffer = await readFile(filePath);
        const { error } = await supabase.storage
          .from(bucket)
          .upload(storagePath, fileBuffer, {
            cacheControl: '3600',
            upsert: true,
          });

        if (error) {
          results.failed += 1;
          console.error(`FAILED: ${bucket}/${storagePath} -> ${error.message}`);
          continue;
        }

        results.uploaded += 1;
        console.log(`UPLOADED: ${bucket}/${storagePath}`);
      } catch {
        results.failed += 1;
        console.error(`FAILED: ${bucket}/${storagePath} -> Unknown error`);
      }
    }
  }

  console.log('\nUpload test complete');
  console.log(`Uploaded: ${results.uploaded}`);
  console.log(`Skipped: ${results.skipped}`);
  console.log(`Failed: ${results.failed}`);

  if (results.failed > 0) {
    process.exit(2);
  }
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Fatal error: ${message}`);
  process.exit(1);
});
