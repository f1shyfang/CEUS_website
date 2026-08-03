import { describe, expect, it, vi } from 'vitest';
import type { BlogPost } from '@/types';

const mocks = vi.hoisted(() => ({
  fetchBlogPostBySlug: vi.fn(),
  notFound: vi.fn(() => { throw new Error('NOT_FOUND'); }),
}));

vi.mock('@/lib/supabase', () => ({ fetchBlogPostBySlug: mocks.fetchBlogPostBySlug }));
vi.mock('next/navigation', () => ({ notFound: mocks.notFound }));
vi.mock('@/components/JsonLd', () => ({ JsonLd: () => null }));
vi.mock('@/components/PageBreadcrumbs', () => ({ PageBreadcrumbs: () => null }));
vi.mock('@/components/blog/BlogArticle', () => ({ default: () => null }));

import BlogArticlePage, { generateMetadata } from './page';

const post: BlogPost = {
  id: 'first-year-guide', title: 'First-year guide', slug: 'first-year-guide', category: 'student-guides',
  excerpt: 'A practical guide.', authorName: 'CEUS', body: 'Body', status: 'published', isFeatured: false,
  publishedAt: '2026-08-03T00:00:00.000Z', createdAt: '2026-08-01T00:00:00.000Z', updatedAt: '2026-08-03T00:00:00.000Z',
};

describe('BlogArticlePage', () => {
  it('uses notFound for an absent or draft article', async () => {
    mocks.fetchBlogPostBySlug.mockResolvedValue(undefined);

    await expect(BlogArticlePage({ params: Promise.resolve({ slug: 'draft-post' }) })).rejects.toThrow('NOT_FOUND');
    expect(mocks.notFound).toHaveBeenCalledOnce();
  });

  it('omits Open Graph images when the article has no cover image', async () => {
    mocks.fetchBlogPostBySlug.mockResolvedValue(post);

    const metadata = await generateMetadata({ params: Promise.resolve({ slug: post.slug }) });

    expect(metadata.openGraph).not.toHaveProperty('images');
  });

  it('includes the cover image and meaningful fallback alt text in Open Graph metadata', async () => {
    mocks.fetchBlogPostBySlug.mockResolvedValue({ ...post, coverImageUrl: 'https://example.com/cover.jpg' });

    const metadata = await generateMetadata({ params: Promise.resolve({ slug: post.slug }) });

    expect(metadata.openGraph).toMatchObject({
      images: [{ url: 'https://example.com/cover.jpg', alt: 'Cover image for First-year guide' }],
    });
  });
});
