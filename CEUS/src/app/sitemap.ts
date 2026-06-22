import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

const PUBLIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, changeFrequency: 'daily', priority: 1 },
  { url: `${SITE_URL}/events`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${SITE_URL}/jobs`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${SITE_URL}/team`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE_URL}/sponsors`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/publications`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_ROUTES.map((route) => ({ ...route, lastModified }));
}
