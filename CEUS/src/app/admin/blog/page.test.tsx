import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { BlogPost } from '@/types';

const mocks = vi.hoisted(() => ({
  fetchAdminBlogPosts: vi.fn(),
  createBlogPost: vi.fn(),
  updateBlogPost: vi.fn(),
  deleteBlogPost: vi.fn(),
  setFeaturedBlogPost: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  ...mocks,
  STORAGE_BUCKETS: { PUBLIC_IMAGES: 'public-images' },
}));

import AdminBlogPage from './page';

const publishedPost: BlogPost = {
  id: 'post-1',
  title: 'Original title',
  slug: 'original-title',
  category: 'news',
  excerpt: 'A short summary.',
  authorName: 'CEUS',
  body: '# Article',
  status: 'published',
  isFeatured: false,
  publishedAt: '2026-08-03T00:00:00.000Z',
  createdAt: '2026-08-03T00:00:00.000Z',
  updatedAt: '2026-08-03T00:00:00.000Z',
};

describe('AdminBlogPage', () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.fetchAdminBlogPosts.mockResolvedValue([]);
  });

  it('clears and disables the feature checkbox for drafts', async () => {
    render(<AdminBlogPage />);

    fireEvent.click(await screen.findByRole('button', { name: 'Add post' }));
    const status = screen.getAllByRole('combobox')[1];
    const feature = screen.getByLabelText('Feature this post') as HTMLInputElement;

    expect(feature).toBeDisabled();
    expect(feature).not.toBeChecked();
    expect(screen.getByText('Featured posts must be published.')).toBeVisible();

    fireEvent.change(status, { target: { value: 'published' } });
    fireEvent.click(feature);
    expect(feature).toBeChecked();

    fireEvent.change(status, { target: { value: 'draft' } });
    expect(feature).toBeDisabled();
    expect(feature).not.toBeChecked();
  });

  it('updates an auto-derived slug while editing a post', async () => {
    mocks.fetchAdminBlogPosts.mockResolvedValue([publishedPost]);
    render(<AdminBlogPage />);

    await screen.findByText('Original title');
    fireEvent.click(screen.getByTitle('Edit'));
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Updated title' } });

    expect(screen.getAllByRole('textbox')[1]).toHaveValue('updated-title');
  });

  it('retains the save modal and shows an inline error when the refresh fails', async () => {
    mocks.fetchAdminBlogPosts
      .mockResolvedValueOnce([publishedPost])
      .mockRejectedValueOnce(new Error('Refresh failed'));
    mocks.updateBlogPost.mockResolvedValue(publishedPost);
    render(<AdminBlogPage />);

    await screen.findByText('Original title');
    fireEvent.click(screen.getByTitle('Edit'));
    fireEvent.click(screen.getByRole('button', { name: 'Update post' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Refresh failed');
    expect(screen.getByRole('heading', { name: 'Edit post' })).toBeVisible();
  });

  it('retains delete confirmation and shows the refresh error', async () => {
    mocks.fetchAdminBlogPosts
      .mockResolvedValueOnce([publishedPost])
      .mockRejectedValueOnce(new Error('Refresh failed'));
    mocks.deleteBlogPost.mockResolvedValue(true);
    render(<AdminBlogPage />);

    await screen.findByText('Original title');
    fireEvent.click(screen.getByTitle('Delete'));
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[1]);

    await waitFor(() => expect(screen.getByText('Refresh failed')).toBeVisible());
    expect(screen.getByRole('heading', { name: 'Delete blog post' })).toBeVisible();
  });
});
