import type { BlogCategory, BlogPost, BlogPostStatus } from '@/types';

export type BlogPostRow = {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  excerpt: string;
  author_name: string;
  body: string;
  cover_image_url: string | null;
  cover_image_alt?: string | null;
  status: BlogPostStatus;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export function toBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt,
    authorName: row.author_name,
    body: row.body,
    coverImageUrl: row.cover_image_url || undefined,
    coverImageAlt: row.cover_image_alt || undefined,
    status: row.status,
    isFeatured: row.is_featured,
    publishedAt: row.published_at || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function calculateReadingTime(body: string): number {
  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function slugify(title: string): string {
  return title
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function splitFeaturedPost(posts: BlogPost[]): {
  featuredPost: BlogPost | undefined;
  feedPosts: BlogPost[];
} {
  const featuredIndex = posts.findIndex((post) => post.isFeatured);

  if (featuredIndex === -1) {
    return { featuredPost: undefined, feedPosts: posts };
  }

  return {
    featuredPost: posts[featuredIndex],
    feedPosts: posts.filter((_, index) => index !== featuredIndex),
  };
}
