-- Let the anon role list objects in the public `events` bucket.
-- Run this in the Supabase SQL editor.
--
-- The events hero collage lists the `event-photos` folder at request time
-- (src/lib/eventCollage.ts). Public buckets serve known URLs without a policy,
-- but listing goes through storage.objects and needs a SELECT policy; without
-- one the listing returns [] and the hero shows only its blue background.

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public read access for events'
  ) then
    create policy "Public read access for events"
      on storage.objects
      for select
      using (bucket_id = 'events');
  end if;
end
$$;

-- The collage now lists the root of the public `homepage-gallery` bucket
-- instead, which needs the same policy.
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public read access for homepage-gallery'
  ) then
    create policy "Public read access for homepage-gallery"
      on storage.objects
      for select
      using (bucket_id = 'homepage-gallery');
  end if;
end
$$;
