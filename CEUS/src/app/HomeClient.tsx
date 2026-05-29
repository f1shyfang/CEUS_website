'use client'
// src/app/HomeClient.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Slider from 'react-slick';
import type { CustomArrowProps, Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LazyYouTube from '../components/LazyYouTube';
import { STATIC_ASSET_URLS } from '../lib/storagePublicUrls';
import { CALENDAR_SUBSCRIBE_URL } from '../lib/links';
import { Event, Sponsor } from '../types';
import EventCard from '../components/EventCard';
import OptimizedImage from '../components/OptimizedImage';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const PrevArrow = (props: CustomArrowProps) => (
  <div
    className={props.className}
    style={{ ...props.style, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
    onClick={props.onClick}
    aria-label="Previous"
  >
    <FaChevronLeft className="text-2xl text-[#1B397E]" />
  </div>
);

const NextArrow = (props: CustomArrowProps) => (
  <div
    className={props.className}
    style={{ ...props.style, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
    onClick={props.onClick}
    aria-label="Next"
  >
    <FaChevronRight className="text-2xl text-[#1B397E]" />
  </div>
);

interface HomeClientProps {
  events: Event[];
  sponsors: Sponsor[];
}

const HomeClient: React.FC<HomeClientProps> = ({ events, sponsors }) => {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync of an external (matchMedia) value into state on mount; subsequent updates come from the 'change' listener below
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!heroTitleRef.current || !heroSubtitleRef.current || !heroCtaRef.current) return;
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });
    tl.fromTo(
      heroTitleRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, delay: 0.2 }
    );
    tl.fromTo(
      heroSubtitleRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0 },
      '-=0.55'
    );
    tl.fromTo(
      heroCtaRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0 },
      '-=0.5'
    );
    return () => {
      tl.kill();
    };
  }, []);

  const now = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(now.getDate() + 14);

  const upcomingEventsNextTwoWeeks = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= now && eventDate <= twoWeeksFromNow;
  });

  const sponsorSettings: Settings = {
    dots: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    infinite: sponsors.length > 3,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: !prefersReducedMotion,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    centerMode: sponsors.length < 3,
    centerPadding: '40px',
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, centerMode: false, arrows: true } },
      { breakpoint: 600, settings: { slidesToShow: 3, centerMode: false, arrows: true } },
      { breakpoint: 480, settings: { slidesToShow: 2, centerMode: false, arrows: true } },
    ],
  };

  const eventSettings: Settings = {
    dots: true,
    infinite: upcomingEventsNextTwoWeeks.length > 3,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: !prefersReducedMotion,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: upcomingEventsNextTwoWeeks.length > 2, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 0, infinite: upcomingEventsNextTwoWeeks.length > 1 } },
    ],
  };

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[80vh] max-h-[640px] overflow-hidden">
        <OptimizedImage
          src={STATIC_ASSET_URLS.heroBackground}
          alt="CEUS members at the annual Engineering Ball"
          fill
          priority
          className="object-cover object-center"
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/45 z-10" />

        <div className="relative z-20 h-full flex items-center container mx-auto px-4 md:px-6">
          <div className="text-white text-left max-w-3xl">
            <h1
              ref={heroTitleRef}
              className="text-[36px] md:text-[60px] lg:text-[76px] font-bold leading-[1.05] tracking-[0.14em]"
            >
              UNSW CEUS
            </h1>
            <p
              ref={heroSubtitleRef}
              className="mt-4 md:mt-5 max-w-2xl text-lg md:text-2xl font-normal leading-snug text-white"
            >
              Events, industry connections, and the people you&apos;ll meet along the way.
            </p>
            <div ref={heroCtaRef} className="mt-8 md:mt-10 flex flex-wrap gap-3">
              <Link
                href="#happening"
                className="inline-flex items-center justify-center rounded-lg bg-[#1B397E] px-7 py-3 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
              >
                See what&apos;s on
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Happening Soon — the lede */}
      <section id="happening" className="container mx-auto px-4 py-16 md:py-24 scroll-mt-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-3" style={{ textWrap: 'balance' } as React.CSSProperties}>
          Happening Soon
        </h2>
        <p className="text-center text-base md:text-lg text-gray-600 mb-12 max-w-xl mx-auto">
          What&apos;s coming up in the next two weeks.
        </p>

        {upcomingEventsNextTwoWeeks.length > 0 ? (
          <Slider {...eventSettings}>
            {upcomingEventsNextTwoWeeks.map(event => (
              <EventCard key={event.id} event={event} variant="home" />
            ))}
          </Slider>
        ) : (
          <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-gray-50 px-8 py-10 md:px-12 md:py-14 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Nothing in the next two weeks. The term calendar has what&apos;s coming up next.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-lg bg-[#1B397E] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              See the full calendar
            </Link>
          </div>
        )}

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/events"
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#1B397E] px-7 py-3 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            View all events
          </Link>
          <a
            href={CALENDAR_SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1B397E] bg-transparent px-7 py-3 text-base font-semibold text-[#1B397E] transition-colors duration-200 ease-out hover:bg-[#1B397E]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            Subscribe to calendar
          </a>
        </div>
      </section>

      {/* Our Sponsors */}
      <section id="sponsors" className="container mx-auto px-4 py-16 md:py-20 scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          Our Sponsors
        </h2>
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
          <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-gray-50 px-8 py-10 md:px-12 md:py-14 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Looking for industry partners for 2026.
            </p>
            <p className="text-base text-gray-700 mb-6">
              If your team recruits chemical engineering students, let&apos;s talk.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#1B397E] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Get in touch
            </Link>
          </div>
        )}
      </section>

      {/* Video */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          {/* TODO: Confirm with team — heading is a placeholder until the video subject is verified. */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            A look at CEUS
          </h2>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
            <LazyYouTube videoId="x3DD5gMo3fA" title="CEUS UNSW Video" />
          </div>
        </div>
      </section>

      {/* About — moved to bottom for visitors who want the longer story */}
      <section id="about" className="container mx-auto px-4 py-16 md:py-24 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About CEUS
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We&apos;re the student-run society for chemical engineering at UNSW. Industry nights with engineers working in process design, social lawn days, mid-semester study sessions, and the annual Engineering Ball. If you&apos;re in the school, you&apos;re already part of us.
          </p>
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
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease !important;
        }
        .slick-prev:hover, .slick-next:hover {
          background: #f3f4f6 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
        }
        @media (prefers-reduced-motion: no-preference) {
          .slick-prev:hover, .slick-next:hover {
            transform: scale(1.08);
          }
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
