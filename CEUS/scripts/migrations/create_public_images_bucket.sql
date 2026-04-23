-- Create and configure a public bucket for site/admin image uploads.
-- Run this in the Supabase SQL editor before using admin image upload forms.

insert into storage.buckets (id, name, public)
values ('public-images', 'public-images', true)
on conflict (id) do update set public = excluded.public;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public read access for public-images'
  ) then
    create policy "Public read access for public-images"
      on storage.objects
      for select
      using (bucket_id = 'public-images');
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated upload access for public-images'
  ) then
    create policy "Authenticated upload access for public-images"
      on storage.objects
      for insert
      to authenticated
      with check (bucket_id = 'public-images');
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated update access for public-images'
  ) then
    create policy "Authenticated update access for public-images"
      on storage.objects
      for update
      to authenticated
      using (bucket_id = 'public-images')
      with check (bucket_id = 'public-images');
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated delete access for public-images'
  ) then
    create policy "Authenticated delete access for public-images"
      on storage.objects
      for delete
      to authenticated
      using (bucket_id = 'public-images');
  end if;
end
$$;