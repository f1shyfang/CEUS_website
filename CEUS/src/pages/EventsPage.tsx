// src/pages/EventsPage.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { gsap } from 'gsap';
import EventCard from '../components/EventCard';
import EventFilterButton from '../components/EventFilterButton';
import { allEventsData } from '../data/eventData'; // Your event data (ensure it's populated)
import { Event as EventType } from '../types'; // Rename imported Event to avoid conflict

// Hero background image (ensure this path is valid and image exists in public folder)
import heroBgImage from '../assets/images/2022Cruise.jpeg';

const EVENT_CATEGORIES: EventType['category'][] = ['Flagship', 'Careers', 'Social', 'Academic', 'Welfare', 'Recruitment', 'Collaboration', 'Other'];

const EventsPage: React.FC = () => {
  const [upcomingFilter, setUpcomingFilter] = useState<EventType['category'] | 'All'>('All');
  const [pastFilter, setPastFilter] = useState<EventType['category'] | 'All'>('All');

  // Memoize `now` to prevent re-calculating on every render unless necessary (though Date() is cheap)
  const now = useMemo(() => new Date(), []);

  const upcomingEvents = useMemo(() => {
    return allEventsData
      .filter(event => new Date(event.date) >= now) // Check if event date is in the future or today
      .filter(event => upcomingFilter === 'All' || event.category === upcomingFilter) // Apply category filter
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort upcoming events: oldest first
  }, [now, upcomingFilter, allEventsData]); // allEventsData added as dependency

  const pastEvents = useMemo(() => {
    return allEventsData
      .filter(event => new Date(event.date) < now) // Check if event date is in the past
      .filter(event => pastFilter === 'All' || event.category === pastFilter) // Apply category filter
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort past events: newest first
  }, [now, pastFilter, allEventsData]); // allEventsData added as dependency

  // GSAP for card animations
  useEffect(() => {
    // Target cards that are currently visible based on the filters
    // We give a slight delay to allow DOM to update after filter changes
    const timer = setTimeout(() => {
        gsap.fromTo(".event-card-animate:visible", // Attempt to target only visible ones (might need more specific targeting)
            { opacity: 0, y: 20, scale: 0.98 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                stagger: 0.07,
                ease: "power2.out",
                overwrite: "auto" // Important for re-triggering on filter change
            }
        );
    }, 50); // Small delay

    return () => clearTimeout(timer); // Cleanup timer
  }, [upcomingEvents, pastEvents]); // Re-run animation when filtered events change

  const renderFilterButtons = (
    currentFilter: EventType['category'] | 'All',
    setFilter: React.Dispatch<React.SetStateAction<EventType['category'] | 'All'>>
  ) => (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
      <EventFilterButton
        label="All"
        isActive={currentFilter === 'All'}
        onClick={() => setFilter('All')}
      />
      {EVENT_CATEGORIES.map(category => {
        // Only render filter buttons for categories that actually have events in the full dataset (optional optimization)
        const hasEventsInThisCategory = allEventsData.some(event => event.category === category);
        if (!hasEventsInThisCategory) return null;

        return (
            <EventFilterButton
            key={category}
            label={category}
            isActive={currentFilter === category}
            onClick={() => setFilter(category)}
            />
        );
    })}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[50vh] sm:h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}
        <div className="relative z-10 text-center px-4">
          {/* Optional: CEUS Logo here if desired */}
          {/* <img src="/images/logos/ceus-logo-white.png" alt="CEUS Logo" className="h-16 mx-auto mb-4" /> */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">Events</h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upcoming Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 text-center">
            Upcoming Events
          </h2>
          <hr className="border-t-2 border-blue-500 w-24 mx-auto mb-8" /> {/* Accent line */}
          {renderFilterButtons(upcomingFilter, setUpcomingFilter)}
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {upcomingEvents.map(event => (
                <div key={`upcoming-${event.id}`} className="event-card-animate"> {/* Ensure unique keys */}
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-6 bg-white rounded-lg shadow-md">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No Upcoming Events</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {upcomingFilter === 'All'
                    ? "Check back soon for new events, or follow us on social media!"
                    : `No upcoming events match the "${upcomingFilter}" filter.`
                  }
                </p>
            </div>
          )}
        </section>

        {/* Past Events Section */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 text-center">
            Past Events
          </h2>
          <hr className="border-t-2 border-blue-500 w-20 mx-auto mb-8" /> {/* Accent line */}
          {renderFilterButtons(pastFilter, setPastFilter)}
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {pastEvents.map(event => (
                <div key={`past-${event.id}`} className="event-card-animate"> {/* Ensure unique keys */}
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-8">
                {pastFilter === 'All'
                    ? "No past events to display currently."
                    : `No past events match the "${pastFilter}" filter.`
                }
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default EventsPage;