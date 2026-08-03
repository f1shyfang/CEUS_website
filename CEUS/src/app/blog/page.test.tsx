import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  fetchPublishedBlogPosts: vi.fn(),
}));

vi.mock('@/lib/supabase', () => mocks);
vi.mock('@/components/PageBreadcrumbs', () => ({ PageBreadcrumbs: () => null }));
vi.mock('./BlogIndexClient', () => ({ default: () => null }));

import { metadata } from './page';

describe('BlogPage metadata', () => {
  it('uses a unique canonical blog title, description, and Open Graph URL', () => {
    expect(metadata).toMatchObject({
      title: 'CEUS Blog | Chemical Engineering Student Stories',
      description: 'CEUS News, student guides, and career insights for UNSW chemical engineering students.',
      alternates: { canonical: '/blog' },
      openGraph: {
        title: 'CEUS Blog | Chemical Engineering Student Stories',
        description: 'CEUS News, student guides, and career insights for UNSW chemical engineering students.',
        url: 'https://www.ceusunsw.com/blog',
      },
    });
  });
});
