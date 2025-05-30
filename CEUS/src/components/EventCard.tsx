// src/components/EventCard.tsx
import React from 'react';
import { Event } from '../types'; // Ensure this path is correct
import { format, isValid } from 'date-fns'; // Import isValid

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  let formattedDate = 'Invalid Date';
  const eventDate = new Date(event.date);
  if (isValid(eventDate)) { // Check if the date is valid before formatting
    formattedDate = format(eventDate, 'MMMM d, yyyy');
  }

  return (
    <a
      href={event.facebookEventLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="relative w-full h-52 sm:h-56"> {/* Adjusted height slightly */}
        <img
          src={event.imageUrl || '/images/events/default-event-placeholder.png'} // Fallback image
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Optional: Handle broken image links by setting a default
            (e.target as HTMLImageElement).src = '/images/events/default-event-placeholder.png';
          }}
        />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors truncate"> {/* Added truncate for long titles */}
          {event.title}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-blue-600 mb-2 sm:mb-3">
          {formattedDate}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3"> 
          {event.description}
        </p>
      </div>
    </a>
  );
};

export default EventCard;