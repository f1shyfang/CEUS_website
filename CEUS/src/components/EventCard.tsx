'use client'
// src/components/EventCard.tsx
import React from 'react';
import Image from 'next/image';
import { Event } from '../types';
import { format, isValid } from 'date-fns';
import { FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { STORAGE_IMAGE_URLS } from '@/lib/storagePublicUrls';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  let formattedDate = 'Invalid Date';
  const eventDate = new Date(event.date);
  if (isValid(eventDate)) {
    formattedDate = format(eventDate, 'MMMM d, yyyy');
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      'Flagship': 'bg-purple-100 text-purple-800',
      'Careers': 'bg-blue-100 text-blue-800',
      'Social': 'bg-green-100 text-green-800',
      'Academic': 'bg-orange-100 text-orange-800',
      'Welfare': 'bg-pink-100 text-pink-800',
      'Recruitment': 'bg-indigo-100 text-indigo-800',
      'Collaboration': 'bg-teal-100 text-teal-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors['Other'];
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100">
      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={event.imageUrl || STORAGE_IMAGE_URLS.defaultEvent}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = STORAGE_IMAGE_URLS.defaultEvent;
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
        </div>
        
        {/* External link indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
            <FaExternalLinkAlt className="w-3 h-3 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center text-sm text-blue-600 mb-3">
          <FaCalendarAlt className="w-4 h-4 mr-2" />
          <span className="font-medium">{formattedDate}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {event.description}
        </p>

        {/* Action button */}
        <a
          href={event.facebookEventLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 group-hover:bg-blue-700"
        >
          <span>View Event</span>
          <FaExternalLinkAlt className="w-3 h-3 ml-2" />
        </a>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default React.memo(EventCard);