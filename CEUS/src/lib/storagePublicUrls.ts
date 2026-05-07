const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const normalizedSupabaseUrl = rawSupabaseUrl.replace(/\/+$/, '');

export function getPublicStorageUrl(bucket: string, objectPath: string): string {
  return `${normalizedSupabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`;
}

// NOTE: During migration objects were uploaded under nested paths like assets/assets/* and team/team/*.
export const STATIC_ASSET_URLS = {
  logo: getPublicStorageUrl('public-images', 'assets/ceuslogo_noback_noname.png'),
  heroBackground: getPublicStorageUrl('public-images', 'assets/Ceus_ball_group_edited.jpg'),
  facebookIcon: getPublicStorageUrl('public-images', 'assets/facebook_icon.svg'),
  instagramIcon: getPublicStorageUrl('public-images', 'assets/instagram_icon.svg'),
  linkedinIcon: getPublicStorageUrl('public-images', 'assets/linkedin_icon.svg'),
  arcIcon: getPublicStorageUrl('public-images', 'assets/Arc_icon.png'),
};

export const FALLBACK_IMAGE_URLS = {
  event: getPublicStorageUrl('public-images', 'events/default-event-placeholder.png'),
  team: getPublicStorageUrl('public-images', 'team/no_profile_img.jpg'),
};

export const STORAGE_IMAGE_URLS = {
  defaultEvent: FALLBACK_IMAGE_URLS.event,
  defaultTeam: FALLBACK_IMAGE_URLS.team,
};
