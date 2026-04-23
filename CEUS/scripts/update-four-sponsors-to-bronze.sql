-- 1) Allow 'Bronze' tier in the database
ALTER TABLE sponsors DROP CONSTRAINT IF EXISTS sponsors_tier_check;
ALTER TABLE sponsors ADD CONSTRAINT sponsors_tier_check CHECK (tier IN (
  'Diamond', 'Gold', 'Silver', 'Bronze', 'Community', 'Major', 'Supporting', 'Other'
));

-- 2) Set Engineers Australia, Open Wisdom Education, IChemE, AIFST to Bronze
UPDATE sponsors SET tier = 'Bronze' WHERE name = 'Engineers Australia';
UPDATE sponsors SET tier = 'Bronze' WHERE name = 'Open Wisdom Education';
UPDATE sponsors SET tier = 'Bronze' WHERE name = 'IChemE';
UPDATE sponsors SET tier = 'Bronze' WHERE name = 'Australian Institute of Food Science and Technology (AIFST)';
