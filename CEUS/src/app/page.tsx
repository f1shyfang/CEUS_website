// src/app/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { fetchHomepageGalleryUrls, fetchSponsors } from '../lib/supabase';
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
  const [sponsors, heroGallery] = await Promise.all([
    fetchSponsors(),
    fetchHomepageGalleryUrls().catch((error) => {
      console.error('Error fetching homepage gallery:', error);
      return { desktop: [] as string[], mobile: [] as string[] };
    }),
  ]);

  return (
    <HomeClient
      sponsors={sponsors}
      heroGalleryImagesDesktop={heroGallery.desktop}
      heroGalleryImagesMobile={heroGallery.mobile}
    />
  );
}
