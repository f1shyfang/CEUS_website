// src/lib/eventCollage.ts
import { supabase } from './supabase';
import { getPublicStorageUrl } from './storagePublicUrls';

// Hero collage photos live at the root of the public `homepage-gallery` bucket.
// The bucket is listed rather than hard-coded so photos added in the Supabase
// dashboard appear on the page without a code change.
const BUCKET = 'homepage-gallery';
// const FOLDER = 'event-photos';

// Supabase leaves a .emptyFolderPlaceholder in every folder, and the dashboard
// allows non-image uploads, so the listing is filtered down to real images.
const IMAGE_EXTENSION = /\.(jpe?g|png|webp|avif|gif)$/i;

// Object names can contain spaces, so the filename is encoded.
const photoUrl = (filename: string) => getPublicStorageUrl(BUCKET, encodeURIComponent(filename));

/**
 * Lists the collage photos. Called from the events server component so the URLs
 * are present in the first paint — resolving these in the browser instead makes
 * the hero visibly swap images after hydration.
 *
 * Returns an empty array if the listing fails, which renders the hero's plain
 * blue background. Note that listing (unlike reading a known URL) needs a SELECT
 * policy on storage.objects for the anon role; without one this returns [].
 */
export async function fetchEventCollagePhotos(): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list('', { limit: 100, sortBy: { column: 'name', order: 'asc' } });

  if (error || !data) {
    console.error('Error loading events hero collage photos:', error);
    return [];
  }

  return data.filter((file) => IMAGE_EXTENSION.test(file.name)).map((file) => photoUrl(file.name));
}
