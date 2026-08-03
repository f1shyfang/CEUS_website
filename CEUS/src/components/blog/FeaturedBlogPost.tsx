import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types';
import BlogMetadata from './BlogMetadata';

export default function FeaturedBlogPost({ post }: { post: BlogPost }) {
  return (
    <article className="grid overflow-hidden border-y border-slate-200 bg-slate-50 md:grid-cols-2">
      {post.coverImageUrl && (
        <div className="relative min-h-64 md:min-h-full">
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt || ''}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Featured story</p>
        <BlogMetadata post={post} />
        <h2 className="mt-4 font-editorial text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          <Link href={`/blog/${post.slug}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">{post.excerpt}</p>
      </div>
    </article>
  );
}
