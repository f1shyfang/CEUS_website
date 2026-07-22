// src/app/sponsors/page.tsx
import React from 'react';
import { fetchSponsors } from '../../lib/supabase';
import SponsorsClient from './SponsorsClient';
import { Metadata } from 'next';
import { pageMetadata } from '../../lib/seo';
import { PageBreadcrumbs } from '../../components/PageBreadcrumbs';

export const metadata: Metadata = pageMetadata(
  'Our Sponsors',
  'Industry partners supporting CEUS at UNSW — companies hiring chemical engineering students through internships and graduate programs.',
  '/sponsors',
);

export const revalidate = 3600;

export default async function SponsorsPage() {
  const sponsors = await fetchSponsors();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <PageBreadcrumbs pathname="/sponsors" />
      </div>
      <SponsorsClient sponsors={sponsors} />
    </>
  );
}
