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

const handbooks = [
  {
    title: 'Student Handbook',
    file: '/Student Handbook 2026.pdf',
    alternateLink: 'https://drive.google.com/file/d/1Fum0CrKxDJwAZMTKhziD_ygrjunGh6cd/view?usp=sharing',
  },
  {
    title: 'Careers Handbook',
    file: '/Careers Handbook 2023.pdf',
    alternateLink: 'https://drive.google.com/file/d/1aD-fqH9IADhLh9yeuZzlnBpjwmNS0Scs/view?usp=sharing',
  },
];

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

      {/* Publication sections */}
      <section aria-labelledby="publications-heading" className="mt-16 border-t border-slate-200 pt-14">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">CEUS handbooks</p>
          <h2
            id="publications-heading"
            className="mt-3 font-editorial text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
          >
            Publications
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-700">
            Dive into the CEUS Student and Career Handbooks—a must for all chemical engineering students! Packed with
            helpful tips, practical insights, and tons of valuable info, these will guide you throughout your academic
            and postgrad careers.
          </p>
        </header>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {handbooks.map((handbook) => (
            <article key={handbook.title} className="border border-slate-200 bg-slate-50 p-7 sm:p-8">
              <h3 className="font-editorial text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
                {handbook.title}
              </h3>
              <a
                href={handbook.alternateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-medium text-white transition motion-reduce:transition-none hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Alternate Link
              </a>
              <div className="mt-6 aspect-[500/678] w-full max-w-[500px] overflow-hidden border border-slate-200 bg-white">
                <object
                  data={handbook.file}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                  aria-label={`${handbook.title} PDF Embed`}
                >
                  <iframe
                    src={handbook.file}
                    width="100%"
                    height="100%"
                    title={`${handbook.title} PDF Viewer`}
                    className="border-none"
                  >
                    <div className="p-8 text-center">
                      <p className="font-editorial text-xl font-semibold text-slate-950">PDF Support Missing</p>
                      <p className="mt-2 leading-relaxed text-slate-700">
                        Your browser doesn&apos;t support embedded PDFs. Please use the alternate link above.
                      </p>
                    </div>
                  </iframe>
                </object>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 max-w-3xl border-t border-slate-200 pt-8">
          <h3 className="font-editorial text-xl font-semibold text-slate-950">Disclaimer</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Please note, whilst all due care has been taken in collecting this information and ensuring that the
            material is correct at the time of publishing, it is still based primarily on collective experiences and
            may be biased. Information obtained from public websites may change without notice. Course structures for
            future terms may change due to COVID or curriculum edits. The Chemical Engineering Undergraduate Society of
            UNSW takes no responsibility for any errors and any such reliance upon them. We suggest students planning
            their degree double check term availabilities and prerequisites on the UNSW website.
          </p>
        </div>
      </section>
    </div>
  );
}
