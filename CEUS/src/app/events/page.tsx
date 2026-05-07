// src/app/events/page.tsx
import React from 'react';
import { fetchEvents } from '../../lib/supabase';
import EventsClient from './EventsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Join us for exciting events, workshops, and social gatherings organized by CEUS.',
};

// Revalidate every hour
export const revalidate = 3600;

export default async function EventsPage() {
  const events = await fetchEvents();

  return <EventsClient events={events} />;
}
