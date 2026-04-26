const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const normalizedSupabaseUrl = rawSupabaseUrl.replace(/\/+$/, '');

function storagePublicUrl(bucket: string, objectPath: string): string {
  return `${normalizedSupabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`;
}

// NOTE: During migration objects were uploaded under nested paths like assets/assets/* and team/team/*.
export const STATIC_ASSET_URLS = {
  logo: storagePublicUrl('assets', 'assets/ceuslogo_noback_noname.png'),
  heroBackground: storagePublicUrl('assets', 'assets/Ceus_ball_group_edited.jpg'),
  facebookIcon: storagePublicUrl('assets', 'assets/facebook_icon.svg'),
  instagramIcon: storagePublicUrl('assets', 'assets/instagram_icon.svg'),
  linkedinIcon: storagePublicUrl('assets', 'assets/linkedin_icon.svg'),
  arcIcon: storagePublicUrl('assets', 'assets/Arc_icon.png'),
};

export const FALLBACK_IMAGE_URLS = {
  event: storagePublicUrl('events', 'events/default-event-placeholder.png'),
  team: storagePublicUrl('team', 'team/no_profile_img.jpg'),
};
