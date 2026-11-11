-- Remap existing gallery rows from JPEG/JPG paths to matching .webp objects.
-- 1) Upload the new .webp files from Downloads/supabase-files (1) into homepage-gallery
-- 2) Run this in the Supabase SQL editor
-- 3) Optionally delete the old .jpg/.JPG objects from the bucket afterward

update public.homepage_gallery_images
set storage_path = regexp_replace(storage_path, '\.(jpe?g|JPE?G|png|PNG)$', '.webp')
where storage_path ~* '\.(jpe?g|png)$';

update public.homepage_gallery_images_mobile
set storage_path = regexp_replace(storage_path, '\.(jpe?g|JPE?G|png|PNG)$', '.webp')
where storage_path ~* '\.(jpe?g|png)$';
