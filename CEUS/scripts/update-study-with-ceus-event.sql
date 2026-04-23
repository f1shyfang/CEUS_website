-- Add the Study With CEUS events to the Supabase events table.
-- Run this in Supabase Dashboard: SQL Editor → New query → paste and Run.

DELETE FROM events
WHERE title = 'Study With CEUS';

INSERT INTO events (
  id,
  title,
  date,
  image_url,
  facebook_event_link,
  description,
  category
) VALUES
  (
    gen_random_uuid(),
    'Study With CEUS',
    '2026-04-28T09:00:00+10:00',
    '/images/events/Study_with_ceus_facebook.png',
    '#',
    'Study with CEUS on Tuesday 28/04/2026 from 9am to 4pm. Snacks and good company provided.',
    'Academic'
  ),
  (
    gen_random_uuid(),
    'Study With CEUS',
    '2026-04-30T11:00:00+10:00',
    '/images/events/Study_with_ceus_facebook.png',
    '#',
    'Study with CEUS on Thursday 30/04/2026 from 11am to 6pm. Snacks and good company provided.',
    'Academic'
  );