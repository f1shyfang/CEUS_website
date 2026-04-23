-- Add 'Bronze' to allowed sponsor tiers
-- Run in Supabase Dashboard: SQL Editor → New query → paste and Run
-- Then run: node scripts/update-sponsor-logos-urls.mjs

ALTER TABLE sponsors DROP CONSTRAINT IF EXISTS sponsors_tier_check;
ALTER TABLE sponsors ADD CONSTRAINT sponsors_tier_check CHECK (tier IN (
  'Diamond', 'Gold', 'Silver', 'Bronze', 'Community', 'Major', 'Supporting', 'Other'
));
