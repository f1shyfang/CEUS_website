#!/usr/bin/env node
/**
 * Seed 2026 sponsors into Supabase.
 * Run from CEUS folder: node scripts/seed-sponsors-2026.mjs
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 *
 * If this fails (e.g. RLS), run scripts/update-sponsors-2026.sql in Supabase Dashboard → SQL Editor.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const envPath = resolve(root, '.env.local');

if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) {
      const val = m[2].replace(/^["']|["']$/g, '').trim();
      process.env[m[1]] = val;
    }
  });
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to CEUS/.env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

const sponsors2026 = [
  { id: randomUUID(), name: 'ANSTO', logo_url: '/images/sponsors/ansto_logo.png', website_url: 'https://www.ansto.gov.au/', description: "Australian Nuclear Science and Technology Organisation – Australia's national nuclear research and development organisation.", tier: 'Diamond', featured: true },
  { id: randomUUID(), name: 'Minco Tech', logo_url: '', website_url: '', description: '', tier: 'Gold', featured: false },
  { id: randomUUID(), name: 'Engineers Australia', logo_url: '/images/sponsors/engineersaustralia!.png', website_url: 'https://www.engineersaustralia.org.au/', description: 'National forum for engineering excellence, professional development, and advocacy.', tier: 'Gold', featured: false },
  { id: randomUUID(), name: 'Open Wisdom Education', logo_url: '', website_url: 'https://openwisdomeducation.com/', description: '', tier: 'Gold', featured: false },
  { id: randomUUID(), name: 'Riskcon Engineering', logo_url: '', website_url: '', description: '', tier: 'Gold', featured: false },
  { id: randomUUID(), name: 'IChemE', logo_url: '/images/sponsors/IChemE-logo-2023-website.png', website_url: 'https://www.icheme.org/', description: 'Institution of Chemical Engineers – global professional body advancing chemical engineering.', tier: 'Gold', featured: false },
  { id: randomUUID(), name: 'Australian Institute of Food Science and Technology (AIFST)', logo_url: '', website_url: '', description: '', tier: 'Gold', featured: false },
];

async function main() {
  const { error: deleteError } = await supabase.from('sponsors').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteError) {
    console.warn('Delete (may be empty or RLS):', deleteError.message);
  }
  const { data, error } = await supabase.from('sponsors').insert(sponsors2026).select('id, name');
  if (error) {
    console.error('Insert failed (RLS may block anon writes). Run scripts/update-sponsors-2026.sql in Supabase SQL Editor instead.');
    console.error(error);
    process.exit(1);
  }
  console.log('Inserted 2026 sponsors:', data?.length ?? 0);
  data?.forEach((r) => console.log('  -', r.name));
}

main();
