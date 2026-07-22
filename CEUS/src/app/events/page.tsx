// src/app/events/page.tsx
import React from 'react';
import EventsClient from './EventsClient';
import { Metadata } from 'next';
import { fetchEvents } from '../../lib/supabase';
import { buildEventListSchema, pageMetadata } from '../../lib/seo';
import { JsonLd } from '../../components/JsonLd';
import { PageBreadcrumbs } from '../../components/PageBreadcrumbs';
import type { Event } from '../../types';

export const metadata: Metadata = pageMetadata(
  'Events',
  'CEUS events at UNSW — workshops, networking nights, socials, and career sessions for chemical engineering students in Sydney.',
  '/events',
);

export const revalidate = 3600;

export default async function EventsPage() {
  let events: Event[] = [];
  try {
    events = await fetchEvents();
  } catch (error) {
    console.error('Error loading events for structured data:', error);
  }

  return (
    <>
      <JsonLd data={buildEventListSchema(events)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <PageBreadcrumbs pathname="/events" />
      </div>
      <EventsClient />
    </>
  );
}
