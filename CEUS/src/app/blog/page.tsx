import { JsonLd } from '@/components/JsonLd';
import { PageBreadcrumbs } from '@/components/PageBreadcrumbs';
import { buildBlogListSchema, pageMetadata } from '@/lib/seo';
import { fetchPublishedBlogPosts } from '@/lib/supabase';
import BlogIndexClient from './BlogIndexClient';

export const dynamic = 'force-dynamic';
export const metadata = pageMetadata(
  'CEUS Blog | Chemical Engineering Student Stories',
  'CEUS News, student guides, and career insights for UNSW chemical engineering students.',
  '/blog',
);

export default async function BlogPage() {
  const posts = await fetchPublishedBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={buildBlogListSchema(posts)} />
      <PageBreadcrumbs pathname="/blog" />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">CEUS journal</p>
        <h1 className="mt-3 font-editorial text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Stories for chemical engineering students</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-700">CEUS News, student guides, and career insights from the CEUS community.</p>
      </header>
      <div className="mt-10">
        <BlogIndexClient posts={posts} />
      </div>
    </div>
  );
}
