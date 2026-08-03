'use client';

import { useMemo, useState, useTransition } from 'react';
import BlogPostCard from '@/components/blog/BlogPostCard';
import FeaturedBlogPost from '@/components/blog/FeaturedBlogPost';
import { splitFeaturedPost } from '@/lib/blog';
import type { BlogCategory, BlogPost } from '@/types';

const filters: Array<{ value: BlogCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All posts' },
  { value: 'news', label: 'News' },
  { value: 'student-guides', label: 'Student Guides' },
  { value: 'careers-industry', label: 'Careers & Industry' },
];

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  const [, startTransition] = useTransition();
  const { featuredPost, feedPosts } = useMemo(() => splitFeaturedPost(posts), [posts]);
  const visiblePosts = useMemo(
    () => feedPosts.filter((post) => selectedCategory === 'all' || post.category === selectedCategory),
    [feedPosts, selectedCategory],
  );

  if (posts.length === 0) {
    return <p className="py-16 text-lg text-slate-700">There are no blog posts yet. Please check back soon.</p>;
  }

  return (
    <>
      {featuredPost && <FeaturedBlogPost post={featuredPost} />}
      <nav aria-label="Blog categories" className="mt-10 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={selectedCategory === filter.value}
            onClick={() => startTransition(() => setSelectedCategory(filter.value))}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition motion-reduce:transition-none hover:border-blue-700 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-[pressed=true]:border-blue-700 aria-[pressed=true]:bg-blue-700 aria-[pressed=true]:text-white"
          >
            {filter.label}
          </button>
        ))}
      </nav>
      <section aria-live="polite" aria-label="Blog posts" className="mt-4">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => <BlogPostCard key={post.id} post={post} />)
        ) : (
          <p className="py-12 text-lg text-slate-700">No articles in this category yet.</p>
        )}
      </section>
    </>
  );
}
