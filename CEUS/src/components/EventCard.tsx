'use client'
import React from 'react';
import { Event } from '../types';
import { FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { FALLBACK_IMAGE_URLS } from '../lib/storagePublicUrls';
import { cn, formatRelativeEventDate } from '../lib/utils';
import OptimizedImage from './OptimizedImage';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'home';
}

const CATEGORY_COLORS: Record<Event['category'], string> = {
  Flagship: 'bg-purple-100 text-purple-800',
  Careers: 'bg-blue-100 text-blue-800',
  Social: 'bg-green-100 text-green-800',
  Academic: 'bg-orange-100 text-orange-800',
  Welfare: 'bg-pink-100 text-pink-800',
  Recruitment: 'bg-indigo-100 text-indigo-800',
  Collaboration: 'bg-teal-100 text-teal-800',
  Other: 'bg-gray-100 text-gray-800',
};

const EventCard: React.FC<EventCardProps> = ({ event, variant = 'default' }) => {
  const relativeDate = formatRelativeEventDate(event.date);
  const hasLink = Boolean(event.facebookEventLink);
  const hasDescription = Boolean(event.description?.trim());

  if (variant === 'home') {
    const Wrapper: React.ElementType = hasLink ? 'a' : 'div';
    const wrapperProps = hasLink
      ? {
          href: event.facebookEventLink,
          target: '_blank',
          rel: 'noopener noreferrer',
          'aria-label': `${event.title}, ${relativeDate}. Opens on Facebook.`,
        }
      : {};

    return (
      <div className="group px-4">
        <Wrapper
          {...wrapperProps}
          className={cn(
            'block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            hasLink && 'cursor-pointer'
          )}
        >
          <div className="relative mx-auto h-[260px] w-full overflow-hidden rounded-lg shadow-md transition-shadow duration-300 group-hover:shadow-xl">
            <OptimizedImage
              src={event.imageUrl || FALLBACK_IMAGE_URLS.event}
              alt={event.title}
              fill
              className="transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
              fallbackSrc={FALLBACK_IMAGE_URLS.event}
            />
            {hasDescription && (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="line-clamp-4 text-center text-sm leading-relaxed opacity-95">
                  {event.description}
                </p>
              </div>
            )}
          </div>
          <h3 className="mt-5 line-clamp-2 min-h-[3.25rem] text-center text-xl font-semibold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
            {event.title}
          </h3>
          <time
            dateTime={event.date}
            className="mt-1 block text-center text-sm font-medium text-gray-600"
          >
            {relativeDate}
          </time>
        </Wrapper>
      </div>
    );
  }

  const cardClasses =
    'group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-[transform,box-shadow] duration-300 ease-out hover:shadow-2xl motion-safe:hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

  const cardBody = (
    <>
      <div className="relative h-56 w-full overflow-hidden">
        <OptimizedImage
          src={event.imageUrl || FALLBACK_IMAGE_URLS.event}
          alt={event.title}
          fill
          className="transition-transform duration-500 ease-out motion-safe:group-hover:scale-110"
          fallbackSrc={FALLBACK_IMAGE_URLS.event}
        />

        <div className="absolute left-4 top-4">
          <span
            aria-label={`${event.category} event`}
            className={cn(
              'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm',
              CATEGORY_COLORS[event.category] || CATEGORY_COLORS.Other
            )}
          >
            {event.category}
          </span>
        </div>

        {hasLink && (
          <span
            aria-hidden="true"
            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-gray-700 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
          >
            <FaExternalLinkAlt className="h-3 w-3" />
          </span>
        )}
      </div>

      <div className="flex flex-grow flex-col p-6">
        <time
          dateTime={event.date}
          className="mb-3 flex items-center text-sm text-gray-700"
        >
          <FaCalendarAlt aria-hidden="true" className="mr-2 h-4 w-4 text-blue-600" />
          <span className="font-medium">{relativeDate}</span>
        </time>

        <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
          {event.title}
        </h3>

        {hasDescription && (
          <p className="mb-6 line-clamp-3 flex-grow text-sm leading-relaxed text-gray-700">
            {event.description}
          </p>
        )}

        {hasLink ? (
          <span
            aria-hidden="true"
            className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-[#1B397E] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-out group-hover:bg-blue-700"
          >
            View on Facebook
            <FaExternalLinkAlt className="ml-2 h-3 w-3" aria-hidden="true" />
          </span>
        ) : (
          <span className="mt-auto inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-500">
            Details coming soon
          </span>
        )}
      </div>
    </>
  );

  if (hasLink) {
    return (
      <a
        href={event.facebookEventLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${event.title}, ${relativeDate}. Opens on Facebook.`}
        className={cn(cardClasses, 'cursor-pointer')}
      >
        {cardBody}
      </a>
    );
  }

  return <article className={cardClasses}>{cardBody}</article>;
};

export default React.memo(EventCard);
