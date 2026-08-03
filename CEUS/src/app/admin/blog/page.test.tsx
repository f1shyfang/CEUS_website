import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/supabase', () => ({
  fetchAdminBlogPosts: vi.fn().mockResolvedValue([]),
  createBlogPost: vi.fn(),
  updateBlogPost: vi.fn(),
  deleteBlogPost: vi.fn(),
  setFeaturedBlogPost: vi.fn(),
  STORAGE_BUCKETS: { PUBLIC_IMAGES: 'public-images' },
}));

import AdminBlogPage from './page';

describe('AdminBlogPage', () => {
  it('prevents a draft from being saved as featured', async () => {
    render(<AdminBlogPage />);

    fireEvent.click(await screen.findByRole('button', { name: 'Add post' }));
    fireEvent.click(screen.getByLabelText('Feature this post'));

    expect(screen.getByText('Featured posts must be published.')).toBeVisible();
  });
});
