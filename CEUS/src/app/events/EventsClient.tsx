'use client'
// src/app/events/EventsClient.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import EventCard from '../../components/EventCard';
import EventFilterButton from '../../components/EventFilterButton';
import { Event as EventType } from '../../types';
import { FaCalendarAlt, FaFilter, FaClock, FaHistory } from 'react-icons/fa';
import { cn } from '../../lib/utils';
import { CALENDAR_SUBSCRIBE_URL } from '../../lib/links';

const EVENT_FILTERS = ['Industry', 'Social', 'Academic'] as const;
type FilterType = (typeof EVENT_FILTERS)[number] | null;

const CATEGORY_MAPPING: Record<Exclude<FilterType, null>, EventType['category'][]> = {
  Industry: ['Careers', 'Collaboration', 'Recruitment'],
  Social: ['Social', 'Welfare'],
  Academic: ['Academic'],
};

const matchesFilter = (eventCategory: EventType['category'], activeFilter: FilterType) => {
  if (!activeFilter) return true;
  const mapped = CATEGORY_MAPPING[activeFilter] ?? [];
  return mapped.includes(eventCategory);
};

interface EventsClientProps {
  events: EventType[];
}

const EventsClient: React.FC<EventsClientProps> = ({ events }) => {
  const [upcomingFilter, setUpcomingFilter] = useState<FilterType>(null);
  const [pastFilter, setPastFilter] = useState<FilterType>(null);
  const [activeSection, setActiveSection] = useState<'upcoming' | 'past'>('upcoming');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const upcomingSectionRef = useRef<HTMLElement>(null);
  const pastSectionRef = useRef<HTMLElement>(null);

  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync of an external (matchMedia) value into state on mount; subsequent updates come from the 'change' listener below
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const upcomingEvents = useMemo(() => {
    return events
      .filter(event => new Date(event.date) >= now)
      .filter(event => matchesFilter(event.category, upcomingFilter))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, now, upcomingFilter]);

  const pastEvents = useMemo(() => {
    return events
      .filter(event => new Date(event.date) < now)
      .filter(event => matchesFilter(event.category, pastFilter))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [events, now, pastFilter]);

  const totalUpcoming = useMemo(
    () => events.filter(event => new Date(event.date) >= now).length,
    [events, now]
  );
  const totalPast = useMemo(
    () => events.filter(event => new Date(event.date) < now).length,
    [events, now]
  );

  const scrollToSection = (section: 'upcoming' | 'past') => {
    setActiveSection(section);
    const targetRef = section === 'upcoming' ? upcomingSectionRef : pastSectionRef;
    targetRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const renderFilterRow = (
    currentFilter: FilterType,
    setFilter: React.Dispatch<React.SetStateAction<FilterType>>,
    sectionType: 'upcoming' | 'past'
  ) => {
    const availableFilters = EVENT_FILTERS.filter(category =>
      events.some(
        event =>
          matchesFilter(event.category, category) &&
          (sectionType === 'upcoming'
            ? new Date(event.date) >= now
            : new Date(event.date) < now)
      )
    );

    if (availableFilters.length === 0) return null;

    return (
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <FaFilter className="w-4 h-4 text-gray-600" aria-hidden="true" />
          <span className="text-sm font-medium text-gray-700">Filter by category</span>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {availableFilters.map(category => (
            <EventFilterButton
              key={category}
              label={category}
              isActive={currentFilter === category}
              onClick={() =>
                setFilter(prev => (prev === category ? null : category))
              }
            />
          ))}
          {currentFilter && (
            <button
              type="button"
              onClick={() => setFilter(null)}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 underline-offset-4 hover:underline hover:text-[#1B397E] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderEventGrid = (
    eventsToRender: EventType[],
    sectionType: 'upcoming' | 'past',
    currentFilter: FilterType
  ) => {
    if (eventsToRender.length === 0) {
      const filtered = currentFilter !== null;
      const isUpcoming = sectionType === 'upcoming';

      const heading = filtered
        ? `No ${currentFilter} events ${isUpcoming ? 'coming up' : 'in the archive'}`
        : isUpcoming
          ? 'Nothing scheduled right now'
          : 'No past events on record yet';

      const body = filtered
        ? isUpcoming
          ? 'Try another category, or subscribe to the calendar so you catch the next one.'
          : 'Try another category to see what the society has run before.'
        : isUpcoming
          ? 'The next term calendar is still being finalised. Subscribe to the calendar and you will see new events the moment they land.'
          : 'Once events wrap up, they will appear here with photos and the run-down.';

      return (
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white px-8 py-10 md:px-12 md:py-14 text-center shadow-lg">
          <div className="mx-auto w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-5">
            <FaCalendarAlt className="w-6 h-6 text-gray-500" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {heading}
          </h3>
          <p className="text-base text-gray-700 mb-6 max-w-md mx-auto">
            {body}
          </p>
          {filtered ? (
            <button
              type="button"
              onClick={() =>
                isUpcoming ? setUpcomingFilter(null) : setPastFilter(null)
              }
              className="inline-flex items-center justify-center rounded-lg bg-[#1B397E] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Show all {isUpcoming ? 'upcoming' : 'past'} events
            </button>
          ) : isUpcoming ? (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={CALENDAR_SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#1B397E] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Subscribe to calendar
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#1B397E] bg-transparent px-6 py-3 text-sm font-semibold text-[#1B397E] transition-colors duration-200 ease-out hover:bg-[#1B397E]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Get in touch
              </Link>
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {eventsToRender.map((event, index) => (
          <div
            key={`${sectionType}-${event.id}`}
            className="animate-fade-in-up motion-safe:opacity-0"
            style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero — brand navy cover */}
      <section className="relative bg-[#1B397E] text-white">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-sm md:text-base font-semibold tracking-[0.18em] uppercase text-blue-200 mb-4">
              CEUS Calendar
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-5"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Every event the society runs, in one place.
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl">
              Industry nights with engineers working in process design, social lawn days, mid-semester study sessions, and the annual Engineering Ball. Browse what is coming up and what we have run before.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={CALENDAR_SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3 text-base font-semibold text-[#1B397E] transition-colors duration-200 ease-out hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B397E]"
              >
                Subscribe to calendar
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('upcoming')}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/80 bg-transparent px-7 py-3 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B397E]"
              >
                Jump to upcoming
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section tabs */}
      <nav
        aria-label="Event sections"
        className="bg-white border-b border-gray-200 sticky top-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              type="button"
              onClick={() => scrollToSection('upcoming')}
              aria-current={activeSection === 'upcoming' ? 'true' : undefined}
              className={cn(
                'flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm',
                activeSection === 'upcoming'
                  ? 'border-[#1B397E] text-[#1B397E]'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              )}
            >
              <FaClock className="w-4 h-4" aria-hidden="true" />
              <span>Upcoming ({totalUpcoming})</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('past')}
              aria-current={activeSection === 'past' ? 'true' : undefined}
              className={cn(
                'flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm',
                activeSection === 'past'
                  ? 'border-[#1B397E] text-[#1B397E]'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              )}
            >
              <FaHistory className="w-4 h-4" aria-hidden="true" />
              <span>Past ({totalPast})</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <section
          ref={upcomingSectionRef}
          aria-labelledby="upcoming-heading"
          className="mb-20 scroll-mt-20"
        >
          <div className="mb-8">
            <h2
              id="upcoming-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Upcoming events
            </h2>
            <p className="text-base text-gray-700">
              {totalUpcoming === 0
                ? 'Nothing on the calendar right now.'
                : totalUpcoming === 1
                  ? 'One event coming up.'
                  : `${totalUpcoming} events coming up.`}
            </p>
          </div>
          {renderFilterRow(upcomingFilter, setUpcomingFilter, 'upcoming')}
          {renderEventGrid(upcomingEvents, 'upcoming', upcomingFilter)}
        </section>

        <section
          ref={pastSectionRef}
          aria-labelledby="past-heading"
          className="scroll-mt-20"
        >
          <div className="mb-8">
            <h2
              id="past-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Past events
            </h2>
            <p className="text-base text-gray-700">
              {totalPast === 0
                ? 'The archive will fill up as the year goes on.'
                : 'The archive of what we have run before.'}
            </p>
          </div>
          {renderFilterRow(pastFilter, setPastFilter, 'past')}
          {renderEventGrid(pastEvents, 'past', pastFilter)}
        </section>
      </div>

    </div>
  );
};

export default EventsClient;
