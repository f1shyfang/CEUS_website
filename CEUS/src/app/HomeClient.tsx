'use client'
// src/app/HomeClient.tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Slider from 'react-slick';
import type { CustomArrowProps, Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LazyYouTube from '../components/LazyYouTube';
import { Sponsor } from '../types';
import EventCard from '../components/EventCard';
import HeroPhotoGallery from '../components/HeroPhotoGallery';
import OptimizedImage from '../components/OptimizedImage';
import useEvents from '@/lib/api/hooks/useEvents';
import posthog from 'posthog-js';

interface HomeClientProps {
  sponsors: Sponsor[];
  heroGalleryImagesDesktop: string[];
  heroGalleryImagesMobile: string[];
}

function parseRubricEventDate(startTime: string): Date | null {
  const dateMatch = startTime.match(/(\d{1,2}\s+\w{3}\s+\d{4})/);
  return dateMatch ? new Date(dateMatch[1]) : null;
}

const HomeClient: React.FC<HomeClientProps> = ({
  sponsors,
  heroGalleryImagesDesktop,
  heroGalleryImagesMobile,
}) => {
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroSubtitleRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLAnchorElement>(null);
  const { allEvents, isFetching, isError } = useEvents();

  useEffect(() => {
    const title = heroTitleRef.current;
    const subtitle = heroSubtitleRef.current;
    const cta = heroCtaRef.current;
    if (!title || !subtitle || !cta) return;

    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });
    tl.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.3 });
    tl.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.6');
    // Opacity only — avoid GSAP transform fighting Tailwind -translate-x-1/2
    tl.fromTo(cta, { opacity: 0 }, { opacity: 1 }, '-=0.5');

    return () => {
      tl.kill();
      // Strict Mode remount can kill mid-animation and leave opacity: 0
      gsap.set([title, subtitle], { opacity: 1, y: 0 });
      gsap.set(cta, { opacity: 1 });
    };
  }, []);

  const now = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(now.getDate() + 14);

  const upcomingEventsNextTwoWeeks = (allEvents?.upcomingEvents ?? []).filter((event) => {
    const eventDate = parseRubricEventDate(event.start_time);
    if (!eventDate) return false;
    return eventDate >= now && eventDate <= twoWeeksFromNow;
  });

  const isLoading = isFetching && !allEvents;

  const PrevArrow = (props: CustomArrowProps) => (
    <div className={props.className} style={{ ...props.style, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }} onClick={props.onClick} aria-label="Previous">
      <FaChevronLeft className="text-blue-600 text-2xl" />
    </div>
  );

  const NextArrow = (props: CustomArrowProps) => (
    <div className={props.className} style={{ ...props.style, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }} onClick={props.onClick} aria-label="Next">
      <FaChevronRight className="text-blue-600 text-2xl" />
    </div>
  );

  const sponsorSettings: Settings = {
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
      { breakpoint: 1024, settings: { slidesToShow: 4, centerMode: false, arrows: true } },
      { breakpoint: 600, settings: { slidesToShow: 3, centerMode: false, arrows: true } },
      { breakpoint: 480, settings: { slidesToShow: 2, centerMode: false, arrows: true } }
    ]
  };

  const eventSettings: Settings = {
    dots: true,
    infinite: upcomingEventsNextTwoWeeks.length > 3,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: upcomingEventsNextTwoWeeks.length > 2, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 0, infinite: upcomingEventsNextTwoWeeks.length > 1 } }
    ]
  };

  return (
    <> 
      <section className="relative w-full h-[75vh] max-h-[600px] overflow-hidden"> 
        <HeroPhotoGallery
          imagesDesktop={heroGalleryImagesDesktop}
          imagesMobile={heroGalleryImagesMobile}
        />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <div className="relative z-20 h-full flex items-center container mx-auto px-4"> 
          <div className="text-white text-left"> 
            <div ref={heroTitleRef} className="text-[30px] md:text-[50px] font-bold tracking-[3px] leading-tight"> 
              UNSW CEUS
            </div>
            <div ref={heroSubtitleRef} className="text-[28px] md:text-[32px] font-normal tracking-[2.5px] leading-snug">
               Chemical Engineering Undergraduate Society
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center sm:bottom-8 md:bottom-10">
          <a
            ref={heroCtaRef}
            href="https://campus.hellorubric.com/?s=613"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-rubric-cta pointer-events-auto rounded-full bg-[#1B397E] px-6 py-2.5 text-sm font-semibold tracking-wide text-white border border-white/25 shadow-md transition-all duration-300 hover:scale-105 hover:border-white/50 sm:px-8 sm:py-3 sm:text-base md:px-10 md:py-3.5 md:text-lg lg:px-12 lg:py-4 lg:text-xl"
          >
            Join us on Rubric →
          </a>
        </div>

        <style>{`
          .hero-rubric-cta:hover {
            box-shadow:
              0 0 12px rgba(27, 57, 126, 0.85),
              0 0 28px rgba(27, 57, 126, 0.65),
              0 0 48px rgba(27, 57, 126, 0.4);
          }
        `}</style>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24 text-left">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">About Us</h2>
        <div className="text-xl text-gray-600 leading-relaxed max-w-5xl mx-auto space-y-6">
          <p>Welcome to the Chemical Engineering Undergraduate Society (CEUS)! We are a vibrant, student-run organisation representing all students within the School of Chemical Engineering at the University of New South Wales (UNSW).</p>
          <p>Our mission is to enrich the university experience by supporting the academic, social, and professional growth of our members. Through a diverse range of events, industry networking opportunities, and community initiatives, CEUS fosters connection, collaboration, and a strong sense of belonging among chemical engineering students.</p>
          <p>Whether you’re looking to build your career, meet like-minded peers, or simply make the most of your time at UNSW, CEUS is here to help you get involved and thrive.</p>
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">Happening Soon</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`home-event-skeleton-${index}`}
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
        ) : isError ? (
          <p className="text-center text-gray-600 text-lg">Unable to load upcoming events. Please try again later.</p>
        ) : upcomingEventsNextTwoWeeks.length > 0 ? (
          <Slider {...eventSettings}>
            {upcomingEventsNextTwoWeeks.map(event => (
              <div key={event.id} className="px-3 h-full">
                <EventCard event={event} />
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-600 text-lg">No events scheduled for the next two weeks. Check out the full calendar on our events page!</p>
        )}

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/events" onClick={() => posthog.capture('home_events_link_clicked')} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            View All Events
          </Link>
          <a href="https://calendar.google.com/calendar/u/0?cid=ZWIwYjViOTgxYjJmMGE5NDM0NzczNjMzODU1MGRkZGFiMTYwMmQ1NDE2MTI5MjQ5ZmQzNzczZjQzNjQxYjlhN0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t" target="_blank" rel="noopener noreferrer" onClick={() => posthog.capture('calendar_subscribed')} className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
            Subscribe to Calendar
          </a>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">Our Sponsors</h2>
        {sponsors.length > 0 ? (
          <div className="relative">
            <Slider {...sponsorSettings}>
              {sponsors.map(sponsor => (
                <div key={sponsor.id} className="px-4">
                  <OptimizedImage 
                    src={sponsor.logoUrl} 
                    alt={sponsor.name} 
                    width={140}
                    height={140}
                    objectFit="contain"
                    className="mx-auto max-h-[140px]"
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No sponsors to display right now.</p>
        )}
      </section>

      <section className="bg-black/5 py-8 md:py-12 lg:py-16 px-4 md:px-6"> 
        <div className="container mx-auto max-w-6xl">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
            <LazyYouTube videoId="x3DD5gMo3fA" title="CEUS UNSW Video" />
          </div>
        </div>
      </section>

      <style jsx global>{`
        .slick-prev, .slick-next {
          width: 40px;
          height: 40px;
          background: white !important;
          border-radius: 50% !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease !important;
        }
        .slick-prev:hover, .slick-next:hover {
          background: #f3f4f6 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
          transform: scale(1.1);
        }
        .slick-prev { left: -50px !important; }
        .slick-next { right: -50px !important; }
        .slick-prev:before, .slick-next:before { display: none !important; }
        @media (max-width: 1024px) {
          .slick-prev { left: -30px !important; }
          .slick-next { right: -30px !important; }
        }
        @media (max-width: 768px) {
          .slick-prev { left: -20px !important; }
          .slick-next { right: -20px !important; }
          .slick-prev, .slick-next { width: 35px !important; height: 35px !important; }
        }
      `}</style>
    </>
  );
};

export default HomeClient;
