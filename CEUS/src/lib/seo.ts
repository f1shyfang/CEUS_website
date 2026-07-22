import type { Metadata } from 'next';
import type { Event, Job, Member } from '../types';

export const SITE_URL = 'https://www.ceusunsw.com';
export const SITE_NAME = 'CEUS - Chemical Engineering Undergraduate Society';

const UNSW_ADDRESS = {
  '@type': 'PostalAddress' as const,
  addressLocality: 'Sydney',
  addressRegion: 'NSW',
  addressCountry: 'AU',
  postalCode: '2052',
};

const CEUS_ORGANIZER = {
  '@type': 'Organization' as const,
  name: SITE_NAME,
  url: SITE_URL,
};

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
    },
  };
}

export function buildBreadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export function buildEventListSchema(events: Event[]) {
  const upcoming = events
    .filter((event) => new Date(event.date) >= new Date())
    .slice(0, 20);

  if (upcoming.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CEUS Upcoming Events',
    itemListElement: upcoming.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: event.title,
        startDate: event.date,
        description: event.description || undefined,
        image: event.imageUrl || undefined,
        url: event.facebookEventLink !== '#' ? event.facebookEventLink : `${SITE_URL}/events`,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'UNSW Sydney',
          address: UNSW_ADDRESS,
        },
        organizer: CEUS_ORGANIZER,
      },
    })),
  };
}

export function buildPersonListSchema(members: Member[]) {
  if (members.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CEUS Executive Team',
    itemListElement: members.map((member, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: member.name,
        jobTitle: member.role,
        worksFor: CEUS_ORGANIZER,
        ...(member.imageUrl ? { image: member.imageUrl } : {}),
        ...(member.email ? { email: member.email } : {}),
        ...(member.linkedInUrl ? { sameAs: [member.linkedInUrl] } : {}),
      },
    })),
  };
}

const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  Internship: 'INTERN',
  'Graduate Program': 'FULL_TIME',
  Cadetship: 'FULL_TIME',
  'Vacation Program': 'TEMPORARY',
  'Part-time': 'PART_TIME',
  'Full-time': 'FULL_TIME',
  Contract: 'CONTRACTOR',
  Casual: 'TEMPORARY',
  Volunteer: 'VOLUNTEER',
};

export function buildJobPostingListSchema(jobs: Job[]) {
  const active = jobs.filter((job) => !job.outdated).slice(0, 50);
  if (active.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CEUS Chemical Engineering Jobs',
    itemListElement: active.map((job, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'JobPosting',
        title: job.title,
        description: job.oneLiner || job.description,
        datePosted: job.createdAt,
        ...(job.closeDate ? { validThrough: job.closeDate } : {}),
        employmentType: EMPLOYMENT_TYPE_MAP[job.type] || 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: job.company.name,
          ...(job.company.website ? { sameAs: job.company.website } : {}),
        },
        jobLocation: job.locations.map((location) => ({
          '@type': 'Place',
          name: location,
          address: {
            ...UNSW_ADDRESS,
            addressLocality: location,
          },
        })),
        url: job.applicationUrl,
        industry: job.industryField,
      },
    })),
  };
}
