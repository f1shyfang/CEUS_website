import { describe, expect, it } from 'vitest';
import { calculateReadingTime, slugify, splitFeaturedPost } from './blog';

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
});
