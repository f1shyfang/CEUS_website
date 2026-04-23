-- 2026 Sponsor list for CEUS
-- Run this in Supabase Dashboard: SQL Editor → New query → paste and Run

-- Replace all sponsors with 2026 list
DELETE FROM sponsors;

INSERT INTO sponsors (id, name, logo_url, website_url, description, tier, featured) VALUES
  (gen_random_uuid(), 'ANSTO', '/images/sponsors/ansto_logo.png', 'https://www.ansto.gov.au/', 'Australian Nuclear Science and Technology Organisation – Australia''s national nuclear research and development organisation.', 'Diamond', true),
  (gen_random_uuid(), 'Minco Tech', '', '', '', 'Gold', false),
  (gen_random_uuid(), 'Engineers Australia', '/images/sponsors/engineersaustralia!.png', 'https://www.engineersaustralia.org.au/', 'National forum for engineering excellence, professional development, and advocacy.', 'Gold', false),
  (gen_random_uuid(), 'Open Wisdom Education', '', 'https://openwisdomeducation.com/', '', 'Gold', false),
  (gen_random_uuid(), 'Riskcon Engineering', '', '', '', 'Gold', false),
  (gen_random_uuid(), 'IChemE', '/images/sponsors/IChemE-logo-2023-website.png', 'https://www.icheme.org/', 'Institution of Chemical Engineers – global professional body advancing chemical engineering.', 'Gold', false),
  (gen_random_uuid(), 'Australian Institute of Food Science and Technology (AIFST)', '', '', '', 'Gold', false);
