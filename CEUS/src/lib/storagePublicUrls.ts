const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const normalizedSupabaseUrl = rawSupabaseUrl.replace(/\/+$/, '');

export function getPublicStorageUrl(bucket: string, objectPath: string): string {
  return `${normalizedSupabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`;
}

// NOTE: Images are now stored in separate buckets (events, sponsors, team, assets)
export const STATIC_ASSET_URLS = {
  logo: getPublicStorageUrl('assets', 'ceuslogo_noback_noname.png'),
  heroBackground: getPublicStorageUrl('assets', 'Ceus_ball_group_edited.jpg'),
  facebookIcon: getPublicStorageUrl('assets', 'facebook_icon.svg'),
  instagramIcon: getPublicStorageUrl('assets', 'instagram_icon.svg'),
  linkedinIcon: getPublicStorageUrl('assets', 'linkedin_icon.svg'),
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
