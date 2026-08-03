import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { BlogPost } from '@/types';
import BlogIndexClient from './BlogIndexClient';

const fixturePosts: BlogPost[] = [
  {
    id: 'student-guide',
    title: 'First-year survival guide',
    slug: 'first-year-survival-guide',
    category: 'student-guides',
    excerpt: 'Practical advice for your first year.',
    authorName: 'CEUS',
    body: 'Helpful guidance for new chemical engineering students.',
    status: 'published',
    isFeatured: false,
    publishedAt: '2026-08-02T00:00:00.000Z',
    createdAt: '2026-08-02T00:00:00.000Z',
    updatedAt: '2026-08-02T00:00:00.000Z',
  },
  {
    id: 'camp-recap',
    title: 'CAMP recap',
    slug: 'camp-recap',
    category: 'news',
    excerpt: 'A look back at CAMP.',
    authorName: 'CEUS',
    body: 'Our CAMP highlights and favourite moments.',
    status: 'published',
    isFeatured: false,
    publishedAt: '2026-08-01T00:00:00.000Z',
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-08-01T00:00:00.000Z',
  },
];

describe('BlogIndexClient', () => {
  it('filters the feed without removing the category controls', () => {
    render(<BlogIndexClient posts={fixturePosts} />);

    fireEvent.click(screen.getByRole('button', { name: 'Student Guides' }));

    expect(screen.getByText('First-year survival guide')).toBeVisible();
    expect(screen.queryByText('CAMP recap')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All posts' })).toBeVisible();
  });
});
