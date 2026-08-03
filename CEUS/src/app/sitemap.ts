import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';
import { fetchPublishedBlogPosts } from '../lib/supabase';

const PUBLIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, changeFrequency: 'daily', priority: 1 },
  { url: `${SITE_URL}/events`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${SITE_URL}/jobs`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${SITE_URL}/team`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE_URL}/sponsors`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/publications`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes = PUBLIC_ROUTES.map((route) => ({ ...route, lastModified }));
  const blogRoute = { url: `${SITE_URL}/blog`, changeFrequency: 'weekly' as const, priority: 0.8, lastModified };

  try {
    const posts = await fetchPublishedBlogPosts();
    return [
      ...staticRoutes,
      blogRoute,
      ...posts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return [...staticRoutes, blogRoute];
  }
}
