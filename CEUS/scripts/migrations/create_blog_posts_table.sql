-- Create the CEUS blog posts table.
-- Run this in the Supabase SQL editor before using blog persistence.

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  excerpt text not null,
  author_name text not null,
  body text not null,
  cover_image_url text,
  cover_image_alt text,
  status text not null default 'draft',
  is_featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (category in ('news', 'student-guides', 'careers-industry')),
  check (status in ('draft', 'published')),
  check (not is_featured or status = 'published')
);

create unique index if not exists blog_posts_featured_published_idx
  on public.blog_posts (is_featured)
  where is_featured and status = 'published';
create index if not exists blog_posts_published_at_idx
  on public.blog_posts (published_at desc);
create index if not exists blog_posts_category_published_at_idx
  on public.blog_posts (category, published_at desc);

-- Keep updated_at fresh on every row update.
create or replace function public.blog_posts_set_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row
  execute function public.blog_posts_set_updated_at();

alter table public.blog_posts enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'blog_posts'
      and policyname = 'Public read access for published blog posts'
  ) then
    create policy "Public read access for published blog posts"
      on public.blog_posts
      for select
      using (status = 'published');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'blog_posts'
      and policyname = 'Authenticated read access for blog posts'
  ) then
    create policy "Authenticated read access for blog posts"
      on public.blog_posts
      for select
      to authenticated
      using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'blog_posts'
      and policyname = 'Authenticated insert access for blog posts'
  ) then
    create policy "Authenticated insert access for blog posts"
      on public.blog_posts
      for insert
      to authenticated
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'blog_posts'
      and policyname = 'Authenticated update access for blog posts'
  ) then
    create policy "Authenticated update access for blog posts"
      on public.blog_posts
      for update
      to authenticated
      using (true)
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'blog_posts'
      and policyname = 'Authenticated delete access for blog posts'
  ) then
    create policy "Authenticated delete access for blog posts"
      on public.blog_posts
      for delete
      to authenticated
      using (true);
  end if;
end
$$;

create or replace function public.set_featured_blog_post(target_post_id uuid)
returns public.blog_posts
language plpgsql
security invoker
as $$
declare selected_post public.blog_posts;
begin
  update public.blog_posts set is_featured = false where is_featured = true;
  update public.blog_posts
    set is_featured = true
    where id = target_post_id and status = 'published'
    returning * into selected_post;
  if selected_post.id is null then
    raise exception 'Featured post must exist and be published';
  end if;
  return selected_post;
end;
$$;
