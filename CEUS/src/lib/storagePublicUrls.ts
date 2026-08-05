const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const normalizedSupabaseUrl = rawSupabaseUrl.replace(/\/+$/, '');

export function getPublicStorageUrl(bucket: string, objectPath: string): string {
  return `${normalizedSupabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`;
}

// NOTE: Images are now stored in separate buckets (events, sponsors, team, assets)
export const STATIC_ASSET_URLS = {
  logo: getPublicStorageUrl('assets', 'ceuslogo_noback_noname.png'),
  heroBackground: getPublicStorageUrl('assets', 'ceus_photo.jpg'),
  facebookIcon: getPublicStorageUrl('assets', 'facebook-white-icon.webp'),
  instagramIcon: getPublicStorageUrl('assets', 'instagram-white-icon.webp'),
  linkedinIcon: getPublicStorageUrl('assets', 'linkedin-white-icon.png'),
  arcIcon: getPublicStorageUrl('assets', 'Arc_icon.png'),
};

export const FALLBACK_IMAGE_URLS = {
  event: getPublicStorageUrl('events', 'default-event-placeholder.png'),
  team: getPublicStorageUrl('team', 'no_profile_img.jpg'),
};

export const STORAGE_IMAGE_URLS = {
  defaultEvent: FALLBACK_IMAGE_URLS.event,
  defaultTeam: FALLBACK_IMAGE_URLS.team,
};
