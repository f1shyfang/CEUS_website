// src/app/publications/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { pageMetadata } from '../../lib/seo';
import { PageBreadcrumbs } from '../../components/PageBreadcrumbs';

export const metadata: Metadata = pageMetadata(
  'Publications',
  'Download the CEUS Student and Careers Handbooks — essential guides for chemical engineering students at UNSW Sydney.',
  '/publications',
);

export default function PublicationsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <PageBreadcrumbs pathname="/publications" />
      </div>
      <section className="text-center py-16 px-6 bg-white border-b border-gray-100">
        <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight">
          Publications
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
          Dive into the CEUS Student and Career Handbooks—a must for all
          chemical engineering students! Packed with helpful tips, 
          practical insights, and tons of valuable info, these will 
          guide you throughout your academic and postgrad careers.
        </p>
      </section>

      <section className="container mx-auto px-6 py-16 flex flex-wrap justify-center gap-12">
        {/* Student Handbook */}
        <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 hover:scale-[1.02]">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Handbook</h2>
          <div className="mb-6">
            <a 
              href="https://drive.google.com/file/d/1Fum0CrKxDJwAZMTKhziD_ygrjunGh6cd/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              Alternate Link
            </a>
          </div>
          <div className="w-full max-w-[500px] aspect-[500/678] bg-gray-100 rounded-lg overflow-hidden shadow-inner">
            <object
              data='/Student Handbook 2026.pdf'
              type="application/pdf"
              width="100%"
              height="100%"
              aria-label="Student Handbook PDF Embed"
            >
              <iframe
                src='/Student Handbook 2026.pdf'
                width="100%"
                height="100%"
                title="Student Handbook PDF Viewer"
                className="border-none"
              >
                <div className="p-8 text-center bg-red-50 text-red-700 rounded-lg">
                  <p className="font-bold">PDF Support Missing</p>
                  <p className="text-sm mt-2">Your browser doesn't support embedded PDFs. Please use the alternate link above.</p>
                </div>
              </iframe>
            </object>
          </div>
        </div>

        {/* Careers Handbook */}
        <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 hover:scale-[1.02]">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Careers Handbook</h2>
          <div className="mb-6">
            <a 
              href="https://drive.google.com/file/d/1aD-fqH9IADhLh9yeuZzlnBpjwmNS0Scs/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              Alternate Link
            </a>
          </div>
          <div className="w-full max-w-[500px] aspect-[500/678] bg-gray-100 rounded-lg overflow-hidden shadow-inner">
            <object
              data='/Careers Handbook 2023.pdf'
              type="application/pdf"
              width="100%"
              height="100%"
              aria-label="Careers Handbook PDF Embed"
            >
              <iframe
                src='/Careers Handbook 2023.pdf'
                width="100%"
                height="100%"
                title="Careers Handbook PDF Viewer"
                className="border-none"
              >
                <div className="p-8 text-center bg-red-50 text-red-700 rounded-lg">
                  <p className="font-bold">PDF Support Missing</p>
                  <p className="text-sm mt-2">Your browser doesn't support embedded PDFs. Please use the alternate link above.</p>
                </div>
              </iframe>
            </object>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-500 bg-white/50 backdrop-blur-sm rounded-2xl mb-16 border border-gray-100">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Disclaimer</h3>
        <div className="text-xs leading-relaxed italic"> 
          <p>
            Please note, whilst all due care has been taken in collecting this information and
            ensuring that the material is correct at the time of publishing, it is still based primarily
            on collective experiences and may be biased. Information obtained from public
            websites may change without notice. Course structures for future terms may change
            due to COVID or curriculum edits.
            The Chemical Engineering Undergraduate Society of UNSW takes no responsibility for
            any errors and any such reliance upon them.
            We suggest students planning their degree double check term availabilities and
            prerequisites on the UNSW website.
          </p>
        </div>
      </div>
    </div>
  );
}
