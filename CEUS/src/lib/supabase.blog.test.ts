import { afterEach, describe, expect, it, vi } from 'vitest';
import type { BlogPostInput } from '@/types';

const client = vi.hoisted(() => ({ from: vi.fn(), rpc: vi.fn() }));
vi.mock('@supabase/supabase-js', () => ({ createClient: vi.fn(() => client) }));
vi.mock('@supabase/ssr', () => ({ createBrowserClient: vi.fn(() => client) }));

import { supabase, updateBlogPost } from './supabase';

const featuredPublishedPost: BlogPostInput = {
  title: 'Original title', slug: 'original-title', category: 'news', excerpt: 'A short summary.',
  authorName: 'CEUS', body: '# Article', status: 'draft', isFeatured: false,
};

describe('updateBlogPost', () => {
  afterEach(() => vi.restoreAllMocks());

  it('clears the persisted feature flag in the same update when unpublishing a featured post', async () => {
    const single = vi.fn().mockResolvedValue({
      data: {
        id: 'post-1', title: 'Original title', slug: 'original-title', category: 'news', excerpt: 'A short summary.',
        author_name: 'CEUS', body: '# Article', cover_image_url: null, cover_image_alt: null, status: 'draft', is_featured: false,
        published_at: null, created_at: '2026-08-03T00:00:00.000Z', updated_at: '2026-08-03T00:00:00.000Z',
      },
      error: null,
    });
    const select = vi.fn().mockReturnValue({ single });
    const eq = vi.fn().mockReturnValue({ select });
    const update = vi.fn().mockReturnValue({ eq });
    vi.spyOn(supabase, 'from').mockReturnValue({ update } as never);

    await updateBlogPost('post-1', featuredPublishedPost);

    expect(update).toHaveBeenCalledWith(expect.objectContaining({
      status: 'draft',
      is_featured: false,
    }));
    expect(supabase.rpc).not.toHaveBeenCalled();
  });
});
