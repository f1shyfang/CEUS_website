'use client'
// src/pages/HomePage.tsx
import React, { useEffect, useRef, useState } from 'react'; // Import useEffect, useRef, and useState
import gsap from 'gsap'; // Import gsap
import Slider from 'react-slick'; // Import Slider from react-slick
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme CSS
import Link from 'next/link'; // Import Link for navigation
import Image from 'next/image'; // Import Next.js Image component
//import ThreeDModels from '../components/ThreeDModels'; // Import 3D models component

// Import images used on the homepage
// Images are now served from public folder
//import introImage1 from '../assets/images/Ceus-Cruise.jpeg';       
//import introImage2 from '../assets/images/Exec ceus fsa.jpeg';       

// Import sponsor data
import { allSponsors } from '../data/sponsorData';
// Import event data
import { allEventsData } from '../data/eventData';

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


  // --- Date Filtering for Upcoming Events ---
  const now = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(now.getDate() + 14); // Set the date to 14 days from now

  const upcomingEventsNextTwoWeeks = allEventsData.filter(event => {
    const eventDate = new Date(event.date);
    // Filter events that are between today and two weeks from now
    return eventDate >= now && eventDate <= twoWeeksFromNow;
  });


  // --- Carousel Settings ---
  const sponsorSettings = {
    dots: true,
    infinite: allSponsors.length > 3,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    centerMode: allSponsors.length < 3,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          centerMode: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          centerMode: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          centerMode: false,
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
        
        <div className="relative z-20 h-full flex items-center container mx-auto px-6"> 
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
      <section className="about-us-section container mx-auto px-6 py-12 md:py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-10">About Us</h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
          Welcome to the Chemical Engineering Undergraduate Society's (CEUS's) is the vibrant student-run society 
          for students within the School of Chemical Engineering at The University of New South Wales (UNSW).
          We are dedicated to enhancing the academic, social, and professional lives of our members.
          Through a diverse range of events and initiatives, we foster a strong sense of community 
          and provide valuable opportunities for growth and connection.
        </p>
      </section>
      
      {/* --- Events Section --- */}
      <section className="events-section container mx-auto px-6 py-12 md:py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">Happening Soon</h2>
        {/* Check if there are any events in the next two weeks */}
        {upcomingEventsNextTwoWeeks.length > 0 ? (
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
        <div className="text-center mt-10">
          <Link href="/events" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            View All Events
          </Link>
        </div>
      </section>

      {/* --- Sponsors Section --- */}
      <section className="sponsors-section container mx-auto px-6 py-12 md:py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">Our Sponsors</h2>
        <Slider {...sponsorSettings}>
          {allSponsors.map(sponsor => (
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
      </section>

      {/* --- Video Section --- */}
      <section className="videocontainer relative h-[600px] bg-black/10 p-12"> 
        <div className="ytvideo relative w-full h-full"> 
          <iframe 
            className="iframeyt absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%]" 
            src="https://www.youtube.com/embed/x3DD5gMo3fA" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
          </iframe>
        </div>
      </section>

    </>
  );
};

export default HomePage;