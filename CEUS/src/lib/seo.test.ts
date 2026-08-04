import { describe, expect, it } from 'vitest';
import type { BlogPost } from '@/types';
import { buildBlogListSchema, buildBlogPostingSchema } from './seo';

const fixturePost: BlogPost = {
  id: 'first-year-guide',
  title: 'A First-Year Guide to Chemical Engineering',
  slug: 'first-year-guide',
  category: 'student-guides',
  excerpt: 'How to make a confident start in chemical engineering.',
  authorName: 'CEUS',
  body: 'A short body.',
  status: 'published',
  isFeatured: false,
  publishedAt: '2026-08-03T00:00:00.000Z',
  createdAt: '2026-08-01T00:00:00.000Z',
  updatedAt: '2026-08-03T00:00:00.000Z',
};

describe('buildBlogPostingSchema', () => {
  it('builds BlogPosting data with the canonical article URL', () => {
    expect(buildBlogPostingSchema(fixturePost)).toMatchObject({
      '@type': 'BlogPosting',
      mainEntityOfPage: 'https://www.ceusunsw.com/blog/first-year-guide',
    });
  });
});

describe('buildBlogListSchema', () => {
  it('builds an ItemList that points to canonical blog article URLs', () => {
    expect(buildBlogListSchema([fixturePost])).toMatchObject({
      '@type': 'ItemList',
      name: 'CEUS Blog',
      itemListElement: [{
        position: 1,
        item: {
          '@type': 'BlogPosting',
          url: 'https://www.ceusunsw.com/blog/first-year-guide',
        },
      }],
    });
  });
});
