// src/app/team/page.tsx
import React from 'react';
import { fetchTeamCategories } from '../../lib/supabase';
import TeamClient from './TeamClient';
import { Metadata } from 'next';
import { buildPersonListSchema, pageMetadata } from '../../lib/seo';
import { JsonLd } from '../../components/JsonLd';
import { PageBreadcrumbs } from '../../components/PageBreadcrumbs';

export const metadata: Metadata = pageMetadata(
  'Our Team',
  'Meet the CEUS executive team — UNSW chemical engineering students who organise events, careers support, and community initiatives.',
  '/team',
);

export const revalidate = 3600;

export default async function TeamPage() {
  const categories = await fetchTeamCategories();
  const members = categories.flatMap((category) => category.members);

  return (
    <>
      <JsonLd data={buildPersonListSchema(members)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <PageBreadcrumbs pathname="/team" />
      </div>
      <TeamClient categories={categories} />
    </>
  );
}
