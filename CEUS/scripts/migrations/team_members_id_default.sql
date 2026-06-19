-- team_members uses a composite primary key (id, category).
-- The id column is a text slug with no default, so inserts without id return HTTP 400.
-- Run in Supabase Dashboard → SQL Editor.

alter table team_members
  alter column id set default gen_random_uuid()::text;
