// src/app/page.tsx
import React from 'react';
import { fetchEvents, fetchSponsors } from '../lib/supabase';
import HomeClient from './HomeClient';

// Enable revalidation every hour (3600 seconds)
export const revalidate = 3600;

export default async function Home() {
  // Fetch data on the server
  const [events, sponsors] = await Promise.all([
    fetchEvents(),
    fetchSponsors(),
  ]);

  return <HomeClient events={events} sponsors={sponsors} />;
}
