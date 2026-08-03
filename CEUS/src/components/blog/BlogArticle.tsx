import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import type { BlogPost } from '@/types';
import BlogMetadata from './BlogMetadata';

export default function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article className="mx-auto max-w-4xl">
      <header className="max-w-3xl">
        <BlogMetadata post={post} />
        <h1 className="mt-4 font-editorial text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-slate-700">{post.excerpt}</p>
      </header>

      {post.coverImageUrl && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt || `Cover image for ${post.title}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-10 max-w-[68ch] font-editorial text-[18px] leading-[1.7] text-slate-800 [&_a]:text-blue-700 [&_a]:underline [&_a]:decoration-blue-300 [&_a]:underline-offset-4 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-5 [&_blockquote]:italic [&_h2]:mt-12 [&_h2]:font-editorial [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-slate-950 [&_h3]:mt-8 [&_h3]:font-editorial [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-slate-950 [&_li]:my-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-6 [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6]">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </article>
  );
}
