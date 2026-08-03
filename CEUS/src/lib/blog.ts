import type { BlogPost } from '@/types';

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
