# Admin Supabase Setup

Use this as a reference migration for Supabase. It defines the admin-managed tables,
RLS policies, and Storage policies needed by the CEUS admin UI.

## Schema + RLS Policies

```sql
-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Non-exposed schema for helpers
create schema if not exists private;

-- Admin role helper using app_metadata (not user_metadata)
create or replace function private.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'super_admin');
$$;

-- Events
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date timestamptz not null,
  image_url text,
  facebook_event_link text,
  description text,
  category text not null,
  created_at timestamptz default now()
);
alter table public.events enable row level security;

create policy "events are public read"
on public.events for select
to anon, authenticated
using (true);

create policy "events admin write"
on public.events for insert
to authenticated
with check ((select private.is_admin()));

create policy "events admin update"
on public.events for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "events admin delete"
on public.events for delete
to authenticated
using ((select private.is_admin()));

-- Sponsors
create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  description text,
  tier text not null,
  featured boolean default false,
  created_at timestamptz default now()
);
alter table public.sponsors enable row level security;

create policy "sponsors are public read"
on public.sponsors for select
to anon, authenticated
using (true);

create policy "sponsors admin write"
on public.sponsors for insert
to authenticated
with check ((select private.is_admin()));

create policy "sponsors admin update"
on public.sponsors for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "sponsors admin delete"
on public.sponsors for delete
to authenticated
using ((select private.is_admin()));

-- Team members
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  image_url text,
  email text,
  linkedin_url text,
  category text not null,
  sort_order integer not null default 0,
  created_at timestamptz default now()
);
alter table public.team_members enable row level security;

create policy "team members are public read"
on public.team_members for select
to anon, authenticated
using (true);

create policy "team admin write"
on public.team_members for insert
to authenticated
with check ((select private.is_admin()));

create policy "team admin update"
on public.team_members for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "team admin delete"
on public.team_members for delete
to authenticated
using ((select private.is_admin()));

-- Contact submissions
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz default now()
);
alter table public.contact_submissions enable row level security;

create policy "contacts allow public insert"
on public.contact_submissions for insert
to anon, authenticated
with check (true);

create policy "contacts admin read"
on public.contact_submissions for select
to authenticated
using ((select private.is_admin()));

create policy "contacts admin update"
on public.contact_submissions for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "contacts admin delete"
on public.contact_submissions for delete
to authenticated
using ((select private.is_admin()));

-- Admin audit logs
create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  entity text not null,
  entity_id text,
  actor_id uuid,
  actor_email text,
  metadata jsonb,
  created_at timestamptz default now()
);
alter table public.admin_audit_logs enable row level security;

create policy "audit logs admin read"
on public.admin_audit_logs for select
to authenticated
using ((select private.is_admin()));

create policy "audit logs admin insert"
on public.admin_audit_logs for insert
to authenticated
with check ((select private.is_admin()));
```

## Storage Buckets + Policies

```sql
-- Buckets (create in Storage UI or via SQL)
insert into storage.buckets (id, name, public)
values
  ('events', 'events', true),
  ('sponsors', 'sponsors', true),
  ('team', 'team', true),
  ('assets', 'assets', true)
on conflict (id) do nothing;

-- Allow public reads on public buckets (optional for public buckets)
create policy "public assets readable"
on storage.objects for select
to anon, authenticated
using (bucket_id in ('events', 'sponsors', 'team', 'assets'));

-- Admin-only uploads/updates/deletes
create policy "admin upload assets"
on storage.objects for insert
to authenticated
with check (
  bucket_id in ('events', 'sponsors', 'team', 'assets')
  and (select private.is_admin())
);

create policy "admin update assets"
on storage.objects for update
to authenticated
using (
  bucket_id in ('events', 'sponsors', 'team', 'assets')
  and (select private.is_admin())
)
with check (
  bucket_id in ('events', 'sponsors', 'team', 'assets')
  and (select private.is_admin())
);

create policy "admin delete assets"
on storage.objects for delete
to authenticated
using (
  bucket_id in ('events', 'sponsors', 'team', 'assets')
  and (select private.is_admin())
);
```

## Role assignment

Assign admin roles in `app_metadata` for Supabase Auth users. Do not use
`user_metadata` for authorization checks.

Example (run in SQL editor with service role privileges):

```sql
update auth.users
set raw_app_meta_data =
  jsonb_set(coalesce(raw_app_meta_data, '{}'::jsonb), '{role}', '"admin"', true)
where email = 'admin@example.com';
```

## Test checklist

- Admin user can access `/admin` and see dashboard stats populate.
- Non-admin user is redirected to `/admin/unauthorized`.
- Events CRUD works end-to-end (create, edit, delete) and audit logs are written.
- Sponsors CRUD works end-to-end (logo upload, edit, delete) and audit logs are written.
- Team CRUD works end-to-end (photo upload, sort order) and audit logs are written.
- Contact submissions: public insert works, admin can mark read/replied and delete.
- Admin uploads to `events`, `sponsors`, `team`, `assets` buckets succeed; non-admin uploads fail.
- `/admin/audit` shows latest actions and metadata renders correctly.
