import { describe, expect, it } from 'vitest';
import { calculateReadingTime, slugify, splitFeaturedPost, toBlogPost } from './blog';

describe('blog helpers', () => {
  it('returns at least one minute and rounds longer reading time up', () => {
    expect(calculateReadingTime('one two')).toBe(1);
    expect(calculateReadingTime(Array.from({ length: 401 }, () => 'word').join(' '))).toBe(3);
  });

  it('creates stable lowercase URL slugs', () => {
    expect(slugify('  CAMP 2026: What We Learned!  ')).toBe('camp-2026-what-we-learned');
  });

  it('separates a single featured post from the newest-first feed', () => {
    const result = splitFeaturedPost([
      { id: 'featured', isFeatured: true },
      { id: 'regular', isFeatured: false },
    ] as never[]);
    expect(result.featuredPost?.id).toBe('featured');
    expect(result.feedPosts.map((post) => post.id)).toEqual(['regular']);
  });

  it('maps nullable database fields and retains published metadata', () => {
    const post = toBlogPost({
      id: 'post-1', title: 'News', slug: 'news', category: 'news', excerpt: 'Summary',
      author_name: 'CEUS', body: 'Body', cover_image_url: null, status: 'published',
      is_featured: true, published_at: '2026-08-03T00:00:00.000Z',
      created_at: '2026-08-01T00:00:00.000Z', updated_at: '2026-08-03T00:00:00.000Z',
    });
    expect(post.coverImageUrl).toBeUndefined();
    expect(post.publishedAt).toBe('2026-08-03T00:00:00.000Z');
  });
});
