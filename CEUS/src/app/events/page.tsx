// src/app/events/page.tsx
import React from 'react';
import EventsClient from './EventsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Join us for exciting events, workshops, and social gatherings organized by CEUS.',
};

export default function EventsPage() {
  // EventsClient fetches its own data client-side via the tRPC `useEvents` hook,
  // so no events are passed in from the server here.
  return <EventsClient />;
}
