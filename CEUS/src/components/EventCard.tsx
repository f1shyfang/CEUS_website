'use client'
import React from 'react';
import type { Event as RubricEvent } from '@/lib/api/types';
import { FaCalendarAlt, FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FALLBACK_IMAGE_URLS } from '../lib/storagePublicUrls';
import { cn } from '../lib/utils';
import OptimizedImage from './OptimizedImage';
import posthog from 'posthog-js';

type EventCardProps = {
  event: RubricEvent;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Rubric provides an already-formatted date string, so render it as-is.
  const dateLabel = event.start_time?.trim() ? event.start_time : 'Date TBD';
  const blurb = event.description?.trim() || event.info?.trim() || '';

  return (
    <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
     
      <div className="relative w-full h-56 overflow-hidden">
        <OptimizedImage
          src={event.cover?.source || FALLBACK_IMAGE_URLS.event}
          alt={event.name}
          fill
          className="group-hover:scale-110"
          fallbackSrc={FALLBACK_IMAGE_URLS.event}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Upcoming / Past badge (Rubric events have no category) */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
            event.upcoming ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
          )}>
            {event.upcoming ? 'Upcoming' : 'Past'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-blue-600 mb-3">
          <FaCalendarAlt className="w-4 h-4 mr-2" />
          <span className="font-semibold">{dateLabel}</span>
        </div>

        {event.place?.name && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <FaMapMarkerAlt className="w-4 h-4 mr-2" />
            <span className="line-clamp-1">{event.place.name}</span>
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {event.name}
        </h3>

        {blurb && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
            {blurb}
          </p>
        )}

        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture('event_card_clicked', {
              event_name: event.name,
              event_upcoming: event.upcoming,
              event_url: event.url,
            })}
            className="mt-auto inline-flex items-center justify-center w-full px-5 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
          >
            <span>View Event</span>
            <FaExternalLinkAlt className="w-3 h-3 ml-2" />
          </a>
        )}
      </div>
    </div>
  );
};

export default React.memo(EventCard);
