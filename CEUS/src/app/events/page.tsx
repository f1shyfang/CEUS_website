import { Metadata } from 'next'
import EventsPage from '../../pages/EventsPage'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Discover upcoming and past events hosted by CEUS UNSW - networking nights, industry tours, social gatherings, and academic workshops.',
  openGraph: {
    title: 'Events | CEUS UNSW',
    description: 'Discover upcoming and past events hosted by CEUS UNSW.',
  },
}

export default function Events() {
  return <EventsPage />
}
