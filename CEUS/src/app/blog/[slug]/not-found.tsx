import Link from 'next/link';

export default function BlogArticleNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">CEUS journal</p>
      <h1 className="mt-3 font-editorial text-4xl font-semibold tracking-tight text-slate-950">Article not found</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-700">This article is unavailable or has not been published yet.</p>
      <Link href="/blog" className="mt-8 inline-flex font-semibold text-blue-700 underline underline-offset-4">Return to the journal</Link>
    </div>
  );
}
