import { describe, expect, it } from 'vitest';
import { blogPostSchema } from './schemas';

const validPost = {
  title: 'A useful guide', slug: 'a-useful-guide', category: 'student-guides',
  excerpt: 'A concise summary for the blog index.', authorName: 'CEUS',
  body: '# Start here', coverImageUrl: '', status: 'draft', isFeatured: false,
};

describe('blogPostSchema', () => {
  it('rejects an invalid category and a featured draft', () => {
    expect(blogPostSchema.safeParse({ ...validPost, category: 'events' }).success).toBe(false);
    expect(blogPostSchema.safeParse({ ...validPost, isFeatured: true }).success).toBe(false);
  });
});
