'use client'
// src/app/events/EventsClient.tsx
import React, { useRef, useState } from 'react';
import EventCard from '../../components/EventCard';
import { FaCalendarAlt, FaClock, FaHistory } from 'react-icons/fa';
import { cn } from '../../lib/utils';
import type { Event } from '@/lib/api/types';
import useEvents from '@/lib/api/hooks/useEvents';
import posthog from 'posthog-js';

const EventsClient: React.FC = () => {
  const { allEvents, isFetching, isError } = useEvents();

  const [activeSection, setActiveSection] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingSectionRef = useRef<HTMLDivElement>(null);
  const pastSectionRef = useRef<HTMLDivElement>(null);

  const now = useMemo(() => new Date(), []);
  const yearAgo = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return d;
  }, []);

  const upcomingEvents = useMemo(() => {
    return events
      .filter(event => new Date(event.date) >= now)
      .filter(event => matchesFilter(event.category, upcomingFilter))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, now, upcomingFilter]);

  const pastEvents = useMemo(() => {
    return events
      .filter(event => new Date(event.date) < now && new Date(event.date) >= yearAgo)
      .filter(event => matchesFilter(event.category, pastFilter))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [events, now, pastFilter]);

  const scrollToSection = (section: 'upcoming' | 'past') => {
    setActiveSection(section);
    posthog.capture('event_section_switched', { section });
    const targetRef = section === 'upcoming' ? upcomingSectionRef : pastSectionRef;
    targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderEmptyState = (sectionType: 'upcoming' | 'past') => (
    <div className="text-center py-16 px-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <FaCalendarAlt className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {isError
          ? 'Unable to Load Events'
          : `No ${sectionType === 'upcoming' ? 'Upcoming' : 'Past'} Events`}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        {isError
          ? 'Something went wrong while fetching events. Please try again later.'
          : sectionType === 'upcoming'
            ? "Check back soon for new events, or follow us on social media for updates!"
            : "No past events to display currently."}
      </p>
    </div>
  );

  const renderEventGrid = (events: Event[], sectionType: 'upcoming' | 'past') => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`${sectionType}-skeleton-${index}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-pulse"
            >
              <div className="w-full h-56 bg-gray-200" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (events.length === 0) {
      return renderEmptyState(sectionType);
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {events.map((event, index) => (
          <div
            key={`${sectionType}-${event.id}`}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="relative h-[60vh] bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <div className="mb-6">
              <FaCalendarAlt className="w-16 h-16 mx-auto mb-4 text-blue-200" />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">Events</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-2xl mx-auto">Join us for exciting events, workshops, and social gatherings</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => scrollToSection('upcoming')}
              className={cn(
                "flex items-center space-x-2 py-4 px-1 border-b-2 font-bold text-sm transition-colors",
                activeSection === 'upcoming' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <FaClock className="w-4 h-4" />
              <span>Upcoming Events ({upcomingEvents.length})</span>
            </button>
            <button
              onClick={() => scrollToSection('past')}
              className={cn(
                "flex items-center space-x-2 py-4 px-1 border-b-2 font-bold text-sm transition-colors",
                activeSection === 'past' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <FaHistory className="w-4 h-4" />
              <span>Past Events ({pastEvents.length})</span>
            </button>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        { activeSection == 'upcoming' ?  
        <section ref={upcomingSectionRef} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>
          {renderEventGrid(upcomingEvents, 'upcoming')}
        </section>:
        
        <section ref={pastSectionRef}>
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">Past Events</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-gray-600 mx-auto rounded-full"></div>
          </div>
          {renderEventGrid(pastEvents, 'past')}
        </section>
        }
        
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EventsClient;
