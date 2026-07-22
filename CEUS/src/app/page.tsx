// src/app/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { fetchEvents, fetchSponsors } from '../lib/supabase';
import { pageMetadata } from '../lib/seo';
import HomeClient from './HomeClient';

export const metadata: Metadata = pageMetadata(
  'CEUS - Chemical Engineering Undergraduate Society | UNSW',
  'CEUS is the Chemical Engineering Undergraduate Society at UNSW Sydney. Discover events, internships, graduate roles, and a community for chemical engineering students.',
  '/',
);

// Enable revalidation every hour (3600 seconds)
export const revalidate = 3600;

export default async function Home() {
  const [events, sponsors] = await Promise.all([
    fetchEvents(),
    fetchSponsors(),
  ]);

  return <HomeClient events={events} sponsors={sponsors} />;
}
