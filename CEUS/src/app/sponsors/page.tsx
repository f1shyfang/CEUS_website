// src/app/sponsors/page.tsx
import React from 'react';
import { fetchSponsors } from '../../lib/supabase';
import SponsorsClient from './SponsorsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industry Partners',
  description: 'The companies partnering with CEUS at UNSW — careers nights, technical events, and the annual Engineering Ball.',
};

export const revalidate = 3600;

export default async function SponsorsPage() {
  const sponsors = await fetchSponsors();

  return <SponsorsClient sponsors={sponsors} />;
}
