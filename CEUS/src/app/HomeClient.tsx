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
import { STATIC_ASSET_URLS } from '../lib/storagePublicUrls';
import { Event, Sponsor } from '../types';
import EventCard from '../components/EventCard';
import OptimizedImage from '../components/OptimizedImage';
import posthog from 'posthog-js';

interface HomeClientProps {
  events: Event[];
  sponsors: Sponsor[];
}

const HomeClient: React.FC<HomeClientProps> = ({ events, sponsors }) => {
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroSubtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroTitleRef.current && heroSubtitleRef.current) {
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });
      tl.fromTo(heroTitleRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, delay: 0.3 }
      ); 
      tl.fromTo(heroSubtitleRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.6"
      ); 
      return () => { tl.kill(); };
    }
  }, []);

  const now = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(now.getDate() + 14);

  const upcomingEventsNextTwoWeeks = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= now && eventDate <= twoWeeksFromNow;
  });

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
        <OptimizedImage 
          src={STATIC_ASSET_URLS.heroBackground}
          alt="CEUS Ball Group Photo" 
          fill
          priority
          className="object-cover object-center" 
          containerClassName="absolute inset-0"
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
        {upcomingEventsNextTwoWeeks.length > 0 ? (
          <Slider {...eventSettings}>
            {upcomingEventsNextTwoWeeks.map(event => (
              <EventCard key={event.id} event={event} variant="home" />
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
