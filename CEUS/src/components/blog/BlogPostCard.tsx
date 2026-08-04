import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types';
import BlogMetadata from './BlogMetadata';

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="grid gap-5 border-b border-slate-200 py-8 md:grid-cols-[1fr_15rem] md:gap-8">
      {post.coverImageUrl && (
        <div className="relative order-first aspect-[16/9] overflow-hidden md:order-last md:aspect-[4/3]">
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt || `Cover image for ${post.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            className="object-cover"
          />
        </div>
      )}
      <div>
        <BlogMetadata post={post} />
        <h2 className="mt-3 font-editorial text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
          <Link href={`/blog/${post.slug}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">{post.excerpt}</p>
      </div>
    </article>
  );
}
