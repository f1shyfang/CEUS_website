-- Rename the team category from Careers to Industry.
-- Run in Supabase Dashboard → SQL Editor.

update team_members
set category = 'Industry'
where category = 'Careers';
