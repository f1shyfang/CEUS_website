import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { PageBreadcrumbs } from '@/components/PageBreadcrumbs';
import BlogArticle from '@/components/blog/BlogArticle';
import { SITE_URL, buildBlogPostingSchema } from '@/lib/seo';
import { fetchBlogPostBySlug } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) return {};

  const canonical = `/blog/${post.slug}`;
  const url = `${SITE_URL}${canonical}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      ...(post.coverImageUrl ? { images: [{ url: post.coverImageUrl, alt: post.coverImageAlt || `Cover image for ${post.title}` }] } : {}),
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={buildBlogPostingSchema(post)} />
      <PageBreadcrumbs pathname={`/blog/${post.slug}`} />
      <BlogArticle post={post} />
    </div>
  );
}
