-- Homepage hero gallery: ordered image rows + homepage-gallery storage bucket.
-- Run this in the Supabase SQL editor before using /admin/gallery.

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------

create table if not exists public.homepage_gallery_images (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  sort_order int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists homepage_gallery_images_sort_order_idx
  on public.homepage_gallery_images (sort_order);

create or replace function public.homepage_gallery_images_set_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists homepage_gallery_images_set_updated_at
  on public.homepage_gallery_images;
create trigger homepage_gallery_images_set_updated_at
  before update on public.homepage_gallery_images
  for each row
  execute function public.homepage_gallery_images_set_updated_at();

alter table public.homepage_gallery_images enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'homepage_gallery_images'
      and policyname = 'Public read access for homepage gallery images'
  ) then
    create policy "Public read access for homepage gallery images"
      on public.homepage_gallery_images
      for select
      using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'homepage_gallery_images'
      and policyname = 'Authenticated insert access for homepage gallery images'
  ) then
    create policy "Authenticated insert access for homepage gallery images"
      on public.homepage_gallery_images
      for insert
      to authenticated
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'homepage_gallery_images'
      and policyname = 'Authenticated update access for homepage gallery images'
  ) then
    create policy "Authenticated update access for homepage gallery images"
      on public.homepage_gallery_images
      for update
      to authenticated
      using (true)
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'homepage_gallery_images'
      and policyname = 'Authenticated delete access for homepage gallery images'
  ) then
    create policy "Authenticated delete access for homepage gallery images"
      on public.homepage_gallery_images
      for delete
      to authenticated
      using (true);
  end if;
end
$$;

-- ---------------------------------------------------------------------------
-- Storage bucket (public read; authenticated write)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('homepage-gallery', 'homepage-gallery', true)
on conflict (id) do update set public = excluded.public;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Public read access for homepage-gallery'
  ) then
    create policy "Public read access for homepage-gallery"
      on storage.objects
      for select
      using (bucket_id = 'homepage-gallery');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Authenticated upload access for homepage-gallery'
  ) then
    create policy "Authenticated upload access for homepage-gallery"
      on storage.objects
      for insert
      to authenticated
      with check (bucket_id = 'homepage-gallery');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Authenticated update access for homepage-gallery'
  ) then
    create policy "Authenticated update access for homepage-gallery"
      on storage.objects
      for update
      to authenticated
      using (bucket_id = 'homepage-gallery')
      with check (bucket_id = 'homepage-gallery');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Authenticated delete access for homepage-gallery'
  ) then
    create policy "Authenticated delete access for homepage-gallery"
      on storage.objects
      for delete
      to authenticated
      using (bucket_id = 'homepage-gallery');
  end if;
end
$$;

-- ---------------------------------------------------------------------------
-- Seed from previous hardcoded desktop order (skip if already seeded)
-- ---------------------------------------------------------------------------

insert into public.homepage_gallery_images (storage_path, sort_order)
select seed.storage_path, seed.sort_order
from (
  values
    ('IMG_2308.webp', 0),
    ('IMG_7061.webp', 1),
    ('IMG_7077.webp', 2),
    ('20260329-152717727.webp', 3),
    ('637677429_1282181713774673_476945023484784787_n.webp', 4),
    ('638688381_25842091705454688_8990033636710253558_n.webp', 5),
    ('IMG_2169.webp', 6),
    ('IMG_7081.webp', 7),
    ('IMG_1675.webp', 8),
    ('641215482_1232900665698451_4761857241085747444_n.webp', 9),
    ('IMG_1134.webp', 10),
    ('IMG_3221.webp', 11),
    ('637892281_1276759127715338_7947301602258884620_n.webp', 12),
    ('DSC_0491.webp', 13),
    ('IMG_2757 (1).webp', 14),
    ('20260619-001816904.webp', 15),
    ('IMG_5931.webp', 16),
    ('20260619-001819555.webp', 17),
    ('IMG_1135.webp', 18),
    ('640256411_1241603291412944_2942838422290309085_n.webp', 19),
    ('IMG_1845.webp', 20),
    ('IMG_2427.webp', 21),
    ('20260329-152804415.webp', 22),
    ('IMG_7071.webp', 23),
    ('20260619-001822222.webp', 24),
    ('IMG_1687.webp', 25),
    ('IMG_2867.webp', 26),
    ('20260619-002116091.webp', 27),
    ('IMG_2764.webp', 28),
    ('IMG_3239.webp', 29),
    ('IMG_3413.webp', 30),
    ('20260329-153048867.webp', 31)
) as seed(storage_path, sort_order)
where not exists (select 1 from public.homepage_gallery_images limit 1);
