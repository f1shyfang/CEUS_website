'use client'
// src/pages/HomePage.tsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LazyYouTube from '../components/LazyYouTube';
import { fetchEvents, fetchSponsors } from '../lib/supabase';
import { Event, Sponsor } from '../types';

// Helper function to format date
const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
};

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // --- GSAP Animation Refs ---
  const heroTitleRef = useRef<HTMLDivElement>(null); // Ref for the main title div
  const heroSubtitleRef = useRef<HTMLDivElement>(null); // Ref for the subtitle div
  // Add more refs here for other elements you want to animate later

  // --- GSAP Animation Effect ---
  useEffect(() => {
    // Ensure both refs are connected before animating
    if (heroTitleRef.current && heroSubtitleRef.current) {
      
      // Create a GSAP timeline for sequenced animations
      // Defaults apply to all tweens in the timeline unless overridden
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });

      // Animate title: fade in and slide up slightly from its initial position
      tl.fromTo(heroTitleRef.current, 
        { opacity: 0, y: 20 }, // Start state (opacity 0, slightly lower)
        { opacity: 1, y: 0, delay: 0.3 } // End state (opacity 1, original y, delayed)
      ); 
      
      // Animate subtitle: fade in and slide up, starting slightly after the title animation begins
      tl.fromTo(heroSubtitleRef.current, 
        { opacity: 0, y: 20 }, // Start state
        { opacity: 1, y: 0 }, // End state
        "-=0.6" // Start 0.6s before the previous tween *ends* (overlaps slightly)
      ); 

      // Cleanup function to kill timeline if component unmounts
      // Good practice, especially for more complex animations or components
      return () => {
        tl.kill(); 
      };
    }
  }, []); // Empty dependency array runs this effect only once on mount

  useEffect(() => {
    let isMounted = true;
    const loadHomepageData = async () => {
      try {
        setIsLoading(true);
        const [fetchedEvents, fetchedSponsors] = await Promise.all([
          fetchEvents(),
          fetchSponsors(),
        ]);
        if (!isMounted) return;
        setEvents(fetchedEvents);
        setSponsors(fetchedSponsors);
        setLoadError(null);
      } catch (err) {
        console.error('Failed to load homepage data', err);
        if (isMounted) {
          setLoadError('Unable to load latest events and sponsors right now.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadHomepageData();
    return () => {
      isMounted = false;
    };
  }, []);


  // --- Date Filtering for Upcoming Events ---
  const now = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(now.getDate() + 14); // Set the date to 14 days from now

  const upcomingEventsNextTwoWeeks = events.filter(event => {
    const eventDate = new Date(event.date);
    // Filter events that are between today and two weeks from now
    return eventDate >= now && eventDate <= twoWeeksFromNow;
  });


  // --- Custom Arrow Components ---
  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
        onClick={onClick}
        aria-label="Previous sponsors"
      >
        <FaChevronLeft className="text-blue-600 text-2xl" />
      </div>
    );
  };

  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
        onClick={onClick}
        aria-label="Next sponsors"
      >
        <FaChevronRight className="text-blue-600 text-2xl" />
      </div>
    );
  };

  // --- Carousel Settings ---
  const sponsorSettings = {
    dots: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    infinite: sponsors.length > 3,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    centerMode: sponsors.length < 3,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          centerMode: false,
          arrows: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          centerMode: false,
          arrows: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          arrows: true,
        }
      }
    ]
  };

  const eventSettings = {
    dots: true,
    // Set infinite to false if there are fewer events than slides to show to prevent cloning issues
    infinite: upcomingEventsNextTwoWeeks.length > 3,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: upcomingEventsNextTwoWeeks.length > 2,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0, // Start from the first slide
          infinite: upcomingEventsNextTwoWeeks.length > 1,
        }
      }
    ]
  };


  // --- EventCard Component ---
  const EventCard: React.FC<{ event: any }> = ({ event }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <a
        href={event.facebookEventLink || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative mx-auto max-h-[260px] overflow-hidden rounded-lg">
          <Image
            src={event.imageUrl}
            alt={event.title}
            width={280}
            height={280}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div
            className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white p-4 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h3 className="text-xl font-bold text-center mb-2">{event.title}</h3>
            <p className="text-sm text-center mb-2 opacity-90">{event.description}</p>
            <p className="text-xs text-center opacity-75 font-medium">
              {formatEventDate(event.date)}
            </p>
          </div>
        </div>
        <h3 className={`text-2xl font-semibold text-center mt-5 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          {event.title}
        </h3>
      </a>
    );
  };

  // --- Component Return (JSX) ---
  return (
    <> 
      {loadError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-center">
          {loadError}
        </div>
      )}
      {/* --- Group Photo / Hero Section --- */}
      <section className="GroupPhoto relative w-full h-[75vh] max-h-[600px] overflow-hidden"> 
        <div className="GroupImg absolute inset-0"> 
          <Image 
            draggable={false} 
            src="/images/assets/Ceus_ball_group_edited.jpg" 
            alt="CEUS Ball Group Photo" 
            fill
            className="object-cover object-center" 
          />
          <div className="ImgOverlay absolute inset-0 bg-black/40 z-10"></div>
        </div>
        
        <div className="relative z-20 h-full flex items-center container mx-auto px-4"> 
          <div className="title-overlay text-white text-left"> 
            <div ref={heroTitleRef} className="UNSWCEUS text-[30px] md:text-[50px] font-bold tracking-[3px] leading-tight"> 
              UNSW CEUS
            </div>
            <div ref={heroSubtitleRef} className="FULLNAME text-[28px] md:text-[32px] font-normal tracking-[2.5px] leading-snug">
               Chemical Engineering Undergraduate Society
            </div>
          </div>
        </div>
      </section>

      {/* --- About Us Section --- */}
      <section className="about-us-section container mx-auto px-4 py-16 md:py-24 text-left">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">About Us</h2>
        <div className="text-xl md:text-1xl text-gray-600 leading-relaxed max-w-5xl mx-auto space-y-6">
          <p>
            Welcome to the Chemical Engineering Undergraduate Society (CEUS)! We are a vibrant, student-run organisation representing all students within the School of Chemical Engineering at the University of New South Wales (UNSW).
          </p>
          <p>
            Our mission is to enrich the university experience by supporting the academic, social, and professional growth of our members. Through a diverse range of events, industry networking opportunities, and community initiatives, CEUS fosters connection, collaboration, and a strong sense of belonging among chemical engineering students.
          </p>
          <p>
            Whether you’re looking to build your career, meet like-minded peers, or simply make the most of your time at UNSW, CEUS is here to help you get involved and thrive.
          </p>
        </div>
      </section>
      
      {/* --- Events Section --- */}
      <section className="events-section container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">Happening Soon</h2>
        {/* Check if there are any events in the next two weeks */}
        {isLoading ? (
          <p className="text-center text-gray-600 text-lg">Loading events...</p>
        ) : upcomingEventsNextTwoWeeks.length > 0 ? (
          <Slider {...eventSettings}>
            {/* Map over the filtered list of events */}
            {upcomingEventsNextTwoWeeks.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </Slider>
        ) : (
          // Display this message if no events are scheduled in the next two weeks
          <p className="text-center text-gray-600 text-lg">
            No events scheduled for the next two weeks. Check out the full calendar on our events page!
          </p>
        )}

        {/* --- View All Events Button --- */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/events"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View All Events
          </Link>
          <a
            href="https://calendar.google.com/calendar/u/0?cid=ZWIwYjViOTgxYjJmMGE5NDM0NzczNjMzODU1MGRkZGFiMTYwMmQ1NDE2MTI5MjQ5ZmQzNzczZjQzNjQxYjlhN0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Subscribe to Calendar
          </a>
        </div>
      </section>

      {/* --- Sponsors Section --- */}
      <section className="sponsors-section container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">Our Sponsors</h2>
        {isLoading ? (
          <p className="text-center text-gray-600 text-lg">Loading sponsors...</p>
        ) : sponsors.length > 0 ? (
          <div className="relative">
            <Slider {...sponsorSettings}>
              {sponsors.map(sponsor => (
                <div key={sponsor.name} className="px-4">
                  <Image 
                    src={sponsor.logoUrl} 
                    alt={sponsor.name} 
                    width={140}
                    height={140}
                    className="mx-auto max-h-[140px] object-contain"
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No sponsors to display right now.
          </p>
        )}
      </section>

      {/* --- Custom Arrow Styles --- */}
      <style jsx>{`
        .sponsors-section :global(.slick-prev),
        .sponsors-section :global(.slick-next) {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .sponsors-section :global(.slick-prev:hover),
        .sponsors-section :global(.slick-next:hover) {
          background: #f3f4f6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transform: scale(1.1);
        }

        .sponsors-section :global(.slick-prev) {
          left: -50px;
        }

        .sponsors-section :global(.slick-next) {
          right: -50px;
        }

        .sponsors-section :global(.slick-prev:before),
        .sponsors-section :global(.slick-next:before) {
          display: none;
        }

        @media (max-width: 1024px) {
          .sponsors-section :global(.slick-prev) {
            left: -30px;
          }

          .sponsors-section :global(.slick-next) {
            right: -30px;
          }
        }

        @media (max-width: 768px) {
          .sponsors-section :global(.slick-prev) {
            left: -20px;
          }

          .sponsors-section :global(.slick-next) {
            right: -20px;
          }

          .sponsors-section :global(.slick-prev),
          .sponsors-section :global(.slick-next) {
            width: 35px;
            height: 35px;
          }
        }

        @media (max-width: 480px) {
          .sponsors-section :global(.slick-prev) {
            left: -15px;
          }

          .sponsors-section :global(.slick-next) {
            right: -15px;
          }

          .sponsors-section :global(.slick-prev),
          .sponsors-section :global(.slick-next) {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>

      {/* --- Video Section --- */}
      <section className="videocontainer relative bg-black/10 py-8 md:py-12 lg:py-16 px-4 md:px-6"> 
        <div className="container mx-auto max-w-6xl">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
            <LazyYouTube 
              videoId="x3DD5gMo3fA" 
              title="CEUS UNSW Video"
            />
          </div>
        </div>
      </section>

    </>
  );
};

export default HomePage;