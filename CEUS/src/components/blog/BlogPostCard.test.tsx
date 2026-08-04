import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { BlogPost } from '@/types';
import BlogPostCard from './BlogPostCard';

const post: BlogPost = {
  id: 'cover-fallback',
  title: 'A story with a cover',
  slug: 'a-story-with-a-cover',
  category: 'news',
  excerpt: 'A brief summary.',
  authorName: 'CEUS',
  body: 'A short body.',
  coverImageUrl: 'https://ddbdosutmmbyavtxqlks.supabase.co/storage/v1/object/public/assets/cover.jpg',
  status: 'published',
  isFeatured: false,
  publishedAt: '2026-08-03T00:00:00.000Z',
  createdAt: '2026-08-03T00:00:00.000Z',
  updatedAt: '2026-08-03T00:00:00.000Z',
};

describe('BlogPostCard', () => {
  it('supplies meaningful alternative text when a cover image has no stored alt text', () => {
    render(<BlogPostCard post={post} />);

    expect(screen.getByRole('img', { name: 'Cover image for A story with a cover' })).toBeVisible();
  });
});
