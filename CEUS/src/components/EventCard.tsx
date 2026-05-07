'use client'
import React from 'react';
import { Event } from '../types';
import { FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { FALLBACK_IMAGE_URLS } from '../lib/storagePublicUrls';
import { formatEventDate, cn } from '../lib/utils';
import OptimizedImage from './OptimizedImage';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'minimal' | 'home';
}

const CATEGORY_COLORS = {
  'Flagship': 'bg-purple-100 text-purple-800',
  'Careers': 'bg-blue-100 text-blue-800',
  'Social': 'bg-green-100 text-green-800',
  'Academic': 'bg-orange-100 text-orange-800',
  'Welfare': 'bg-pink-100 text-pink-800',
  'Recruitment': 'bg-indigo-100 text-indigo-800',
  'Collaboration': 'bg-teal-100 text-teal-800',
  'Other': 'bg-gray-100 text-gray-800'
};

const EventCard: React.FC<EventCardProps> = ({ event, variant = 'default' }) => {
  const formattedDate = formatEventDate(event.date);

  if (variant === 'home') {
    return (
      <div className="group px-4 block focus:outline-none rounded-md cursor-pointer">
        <a 
          href={event.facebookEventLink || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div className="relative mx-auto h-[260px] w-full overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
            <OptimizedImage
              src={event.imageUrl || FALLBACK_IMAGE_URLS.event}
              alt={event.title}
              fill
              className="group-hover:scale-110"
              fallbackSrc={FALLBACK_IMAGE_URLS.event}
            />
            <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold text-center mb-2">{event.title}</h3>
              <p className="text-sm text-center mb-2 opacity-90 line-clamp-3">{event.description}</p>
              <p className="text-xs text-center opacity-75 font-medium">
                {formattedDate}
              </p>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-center mt-5 group-hover:text-blue-600 transition-all duration-300 group-hover:opacity-100 truncate">
            {event.title}
          </h3>
        </a>
      </div>
    );
  }

  return (
    <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden">
        <OptimizedImage
          src={event.imageUrl || FALLBACK_IMAGE_URLS.event}
          alt={event.title}
          fill
          className="group-hover:scale-110"
          fallbackSrc={FALLBACK_IMAGE_URLS.event}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
            CATEGORY_COLORS[event.category] || CATEGORY_COLORS['Other']
          )}>
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-blue-600 mb-3">
          <FaCalendarAlt className="w-4 h-4 mr-2" />
          <span className="font-semibold">{formattedDate}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {event.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
          {event.description}
        </p>

        <a
          href={event.facebookEventLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-5 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
        >
          <span>View Event</span>
          <FaExternalLinkAlt className="w-3 h-3 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default React.memo(EventCard);
