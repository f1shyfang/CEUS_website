#!/usr/bin/env node
/**
 * Update sponsor logo paths and website URLs in Supabase.
 * Run from CEUS: node scripts/update-sponsor-logos-urls.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const envPath = resolve(root, '.env.local');

if (existsSync(envPath)) {
  readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  });
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing env. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to CEUS/.env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

// Logo paths, tiers, and descriptions.
const updates = {
  'ANSTO': { logo_url: '/images/sponsors/ansto_logo.png', website_url: 'https://www.ansto.gov.au/', tier: 'Gold', description: "Australia's national centre of nuclear science and technology research" },
  'Minco Tech': { logo_url: '/images/sponsors/minco-tech-logo.svg', website_url: 'https://minco-tech.com/', tier: 'Silver', description: 'Global leading specialists in mineral processing and dressing equipment' },
  'Engineers Australia': { logo_url: '/images/sponsors/engineersaustralia!.png', website_url: 'https://www.engineersaustralia.org.au/', tier: 'Bronze', description: 'Independent specialists providing process safety, risk management and assurance services' },
  'Open Windsor': { name: 'Open Wisdom Education', logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt0NYLVewB29HMp6Zo25Zh0R3cgLDPFvNObg&s', website_url: 'https://openwisdomeducation.com/', tier: 'Bronze', description: 'Personalised high school tutoring centre for English, Maths & Science' },
  'Open Wisdom Education': { logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt0NYLVewB29HMp6Zo25Zh0R3cgLDPFvNObg&s', website_url: 'https://openwisdomeducation.com/', tier: 'Bronze', description: 'Personalised high school tutoring centre for English, Maths & Science' },
  'Riskcon Engineering': { logo_url: '/images/sponsors/riskcon-logo.jpg', website_url: 'https://www.riskcon-eng.com/', tier: 'Silver', description: 'Leaders in the delivery of risk engineering solutions across hazardous and chemical industries' },
  'IChemE': { logo_url: '/images/sponsors/IChemE-logo-2023-website.png', website_url: 'https://www.icheme.org/', tier: 'Bronze', description: 'Global member-led society and qualifying body for chemical engineering advancement' },
  'Australian Institute of Food Science and Technology (AIFST)': { logo_url: '/images/sponsors/aifst-logo.png', website_url: 'https://www.aifst.asn.au/', tier: 'Bronze', description: 'National independent voice and network for food system professionals' },
};

async function main() {
  const { data: sponsors, error: fetchErr } = await supabase
    .from('sponsors')
    .select('id, name');
  if (fetchErr) {
    console.error('Fetch failed:', fetchErr);
    process.exit(1);
  }
  for (const s of sponsors) {
    const u = updates[s.name];
    if (!u) continue;
    const payload = { logo_url: u.logo_url, website_url: u.website_url, tier: u.tier, description: u.description ?? '' };
    if (u.name) payload.name = u.name;
    const { error } = await supabase.from('sponsors').update(payload).eq('id', s.id);
    if (error) {
      console.error(`Update failed for ${s.name}:`, error);
    } else {
      console.log('Updated:', u.name || s.name, '| logo:', u.logo_url || '(none)', '| url:', u.website_url || '(none)');
    }
  }
  console.log('Done.');
}

main();
