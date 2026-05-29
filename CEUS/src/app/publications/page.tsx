// src/app/publications/page.tsx
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Read the CEUS Student Handbook and Careers Handbook: student-written guides to studying Chemical Engineering at UNSW.',
};

type Publication = {
  title: string;
  year: string;
  description: string;
  localPath: string;
  driveUrl: string;
  fileSizeLabel: string;
};

const PUBLICATIONS: Publication[] = [
  {
    title: 'Student Handbook',
    year: '2026',
    description:
      'Written by CEUS students for CEUS students. Course sequencing notes, elective tips, study advice, and the things we wish someone had told us in first year.',
    localPath: '/Student Handbook 2026.pdf',
    driveUrl:
      'https://drive.google.com/file/d/1hL5kVOKKlCutbcbejMFE8ao5ylMuqWqj/view?usp=sharing',
    fileSizeLabel: 'PDF, 24 MB',
  },
  {
    title: 'Careers Handbook',
    year: '2023',
    description:
      'A walk-through of life after the degree: industries our alumni have moved into, internship timelines, resume and interview notes, and questions worth asking at networking nights.',
    localPath: '/Careers Handbook 2023.pdf',
    driveUrl:
      'https://drive.google.com/file/d/1aD-fqH9IADhLh9yeuZzlnBpjwmNS0Scs/view?usp=sharing',
    fileSizeLabel: 'PDF, 32 MB',
  },
];

function PdfIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

function ExternalLinkIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function PublicationCard({ publication }: { publication: Publication }) {
  const { title, year, description, localPath, driveUrl, fileSizeLabel } =
    publication;
  const fullTitle = `${title} ${year}`;

  return (
    <article className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg motion-safe:transition-shadow motion-safe:duration-300 hover:shadow-xl">
      <div className="flex flex-col gap-3 border-b border-gray-200 p-6 sm:p-7">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
          <PdfIcon className="h-3.5 w-3.5" />
          <span>{fileSizeLabel}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-balance">
          {fullTitle}
        </h2>
        <p className="text-base leading-relaxed text-gray-700">{description}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={localPath}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${fullTitle} PDF in a new tab`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1B397E] px-5 py-2.5 text-sm font-semibold text-white motion-safe:transition-colors motion-safe:duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <PdfIcon />
            Open PDF
          </a>
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${fullTitle} on Google Drive in a new tab`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#1B397E] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#1B397E] motion-safe:transition-colors motion-safe:duration-200 hover:bg-[#1B397E]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <ExternalLinkIcon />
            View on Google Drive
          </a>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="aspect-[500/678] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <object
            data={localPath}
            type="application/pdf"
            width="100%"
            height="100%"
            aria-label={`${fullTitle} embedded preview`}
          >
            <iframe
              src={localPath}
              width="100%"
              height="100%"
              title={`${fullTitle} preview`}
              className="border-none"
            >
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                <p className="text-base font-semibold text-gray-900">
                  Your browser can&apos;t preview PDFs inline.
                </p>
                <p className="text-sm text-gray-700">
                  Use the buttons above to open the {fullTitle} in a new tab.
                </p>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    </article>
  );
}

export default function PublicationsPage() {
  const publications = PUBLICATIONS;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white px-6 py-16 text-center">
        <h1 className="mb-5 text-4xl font-black tracking-tight text-gray-900 text-balance md:text-6xl">
          Publications
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700">
          Two student-written handbooks that cover what coursework alone
          doesn&apos;t: how to plan your degree, where Chemical Engineering
          graduates end up, and how CEUS members have made the jump from
          lectures to industry.
        </p>
      </section>

      <section className="container mx-auto px-6 py-16">
        {publications.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-10 text-center shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Handbooks are being updated
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              The CEUS publications team is refreshing this year&apos;s
              handbooks. New editions land here as soon as they&apos;re signed
              off. In the meantime, reach out and we&apos;ll send you the
              previous edition.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#1B397E] px-5 py-2.5 text-sm font-semibold text-white motion-safe:transition-colors motion-safe:duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Contact CEUS
            </a>
          </div>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
            {publications.map((pub) => (
              <PublicationCard key={pub.title} publication={pub} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">A note from the editors</h2>
          <div className="space-y-3 text-sm leading-relaxed text-gray-700">
            <p>
              These handbooks are written by CEUS members from their own
              experience. We check the material before publishing, but parts of
              it are opinion, and information sourced from public websites can
              change without notice. Term offerings and prerequisites in
              particular shift between years.
            </p>
            <p>
              The Chemical Engineering Undergraduate Society of UNSW
              isn&apos;t responsible for decisions made on the basis of the
              handbooks. Before locking in a degree plan, please confirm course
              availability and prerequisites on the official UNSW Handbook.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
