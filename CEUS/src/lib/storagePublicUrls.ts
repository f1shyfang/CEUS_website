const supabaseBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '') || '';

const encodeStoragePath = (storagePath: string) =>
  storagePath
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');

export const getPublicStorageUrl = (bucket: string, storagePath: string): string => {
  if (!supabaseBaseUrl) {
    return `/${['images', bucket, storagePath].join('/')}`;
  }

  return `${supabaseBaseUrl}/storage/v1/object/public/public-images/${encodeStoragePath(
    [bucket, storagePath].filter(Boolean).join('/')
  )}`;
};

export const toSupabaseImageUrl = (imagePath: string): string => {
  if (!imagePath) return imagePath;

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  const normalizedPath = imagePath.replace(/^\/+/, '');
  if (!normalizedPath.startsWith('images/')) {
    return imagePath;
  }

  const [, bucket, ...pathParts] = normalizedPath.split('/');
  if (!bucket || pathParts.length === 0) {
    return imagePath;
  }

  return getPublicStorageUrl(bucket, pathParts.join('/'));
};

export const STORAGE_IMAGE_URLS = {
  logo: getPublicStorageUrl('assets', 'ceuslogo_noback_noname.png'),
  hero: getPublicStorageUrl('assets', 'Ceus_ball_group_edited.jpg'),
  iconFacebook: getPublicStorageUrl('assets', 'facebook_icon.svg'),
  iconInstagram: getPublicStorageUrl('assets', 'instagram_icon.svg'),
  iconLinkedIn: getPublicStorageUrl('assets', 'linkedin_icon.svg'),
  iconArc: getPublicStorageUrl('assets', 'Arc_icon.png'),
  defaultEvent: getPublicStorageUrl('events', 'default-event-placeholder.png'),
  defaultTeam: getPublicStorageUrl('team', 'no_profile_img.jpg'),
} as const;
