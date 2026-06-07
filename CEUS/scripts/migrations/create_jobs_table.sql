-- Create the jobs table for the CEUS job board.
-- Run this in the Supabase SQL editor before using the /jobs page or admin section.
--
-- If a previous version of this table exists, drop it first:
--   drop table if exists public.jobs;

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  -- { name: string, website?: string, logo?: string }
  company jsonb not null default '{}'::jsonb,
  description text not null,
  one_liner text,
  application_url text not null,
  source_urls text[] not null default '{}',
  type text not null,
  locations text[] not null default '{}',
  industry_field text not null,
  working_rights text[] not null default '{}',
  close_date timestamptz,
  is_sponsored boolean not null default false,
  outdated boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_created_at_idx on public.jobs (created_at desc);
create index if not exists jobs_type_idx on public.jobs (type);
create index if not exists jobs_industry_field_idx on public.jobs (industry_field);
create index if not exists jobs_outdated_idx on public.jobs (outdated);
create index if not exists jobs_locations_gin_idx on public.jobs using gin (locations);
create index if not exists jobs_working_rights_gin_idx on public.jobs using gin (working_rights);

-- Keep updated_at fresh on every row update.
create or replace function public.jobs_set_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at
  before update on public.jobs
  for each row
  execute function public.jobs_set_updated_at();

alter table public.jobs enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'jobs'
      and policyname = 'Public read access for jobs'
  ) then
    create policy "Public read access for jobs"
      on public.jobs
      for select
      using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'jobs'
      and policyname = 'Authenticated insert access for jobs'
  ) then
    create policy "Authenticated insert access for jobs"
      on public.jobs
      for insert
      to authenticated
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'jobs'
      and policyname = 'Authenticated update access for jobs'
  ) then
    create policy "Authenticated update access for jobs"
      on public.jobs
      for update
      to authenticated
      using (true)
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'jobs'
      and policyname = 'Authenticated delete access for jobs'
  ) then
    create policy "Authenticated delete access for jobs"
      on public.jobs
      for delete
      to authenticated
      using (true);
  end if;
end
$$;
