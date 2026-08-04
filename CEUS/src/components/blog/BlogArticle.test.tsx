import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { BlogPost } from '@/types';
import BlogArticle from './BlogArticle';

const fixturePost: BlogPost = {
  id: 'first-year-guide',
  title: 'A First-Year Guide to Chemical Engineering',
  slug: 'first-year-guide',
  category: 'student-guides',
  excerpt: 'How to make a confident start in chemical engineering.',
  authorName: 'CEUS',
  body: 'A short body.',
  coverImageUrl: 'https://example.com/first-year-guide.jpg',
  coverImageAlt: 'Students studying together',
  status: 'published',
  isFeatured: false,
  publishedAt: '2026-08-03T00:00:00.000Z',
  createdAt: '2026-08-01T00:00:00.000Z',
  updatedAt: '2026-08-03T00:00:00.000Z',
};

describe('BlogArticle', () => {
  it('renders Markdown without rendering embedded raw HTML', () => {
    render(<BlogArticle post={{ ...fixturePost, body: '# Heading\n\nA paragraph.\n\n<script>window.bad = true</script>' }} />);

    expect(screen.getByRole('heading', { name: 'Heading' })).toBeVisible();
    expect(document.querySelector('script')).toBeNull();
  });
});
