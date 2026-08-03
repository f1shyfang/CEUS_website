import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ fetchPublishedBlogPosts: vi.fn() }));
vi.mock('../lib/supabase', () => ({ fetchPublishedBlogPosts: mocks.fetchPublishedBlogPosts }));

import sitemap from './sitemap';

describe('sitemap', () => {
  beforeEach(() => vi.clearAllMocks());

  it('adds published blog articles to the sitemap', async () => {
    mocks.fetchPublishedBlogPosts.mockResolvedValue([{
      slug: 'first-year-guide', updatedAt: '2026-08-03T00:00:00.000Z',
    }]);

    const entries = await sitemap();

    expect(entries).toEqual(expect.arrayContaining([
      expect.objectContaining({ url: 'https://www.ceusunsw.com/blog' }),
      expect.objectContaining({ url: 'https://www.ceusunsw.com/blog/first-year-guide' }),
    ]));
  });

  it('retains the static blog index when fetching posts fails', async () => {
    mocks.fetchPublishedBlogPosts.mockRejectedValue(new Error('Supabase unavailable'));

    const entries = await sitemap();

    expect(entries).toEqual(expect.arrayContaining([expect.objectContaining({ url: 'https://www.ceusunsw.com/blog' })]));
    expect(entries).not.toEqual(expect.arrayContaining([expect.objectContaining({ url: expect.stringContaining('/blog/first-year-guide') })]));
  });
});
