// src/app/sponsors/page.tsx
import React from 'react';
import { fetchSponsors } from '../../lib/supabase';
import SponsorsClient from './SponsorsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Sponsors',
  description: 'Meet the industry partners who support the Chemical Engineering Undergraduate Society at UNSW.',
};

export const revalidate = 3600;

export default async function SponsorsPage() {
  const sponsors = await fetchSponsors();

  return <SponsorsClient sponsors={sponsors} />;
}
