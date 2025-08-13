'use client'
// src/pages/HomePage.tsx
import React, { useEffect, useRef } from 'react'; // Import useEffect and useRef
import gsap from 'gsap'; // Import gsap
import Slider from 'react-slick'; // Import Slider from react-slick
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme CSS
import Link from 'next/link'; // Import Link for navigation
import Image from 'next/image'; // Import Next.js Image component
import ThreeDModels from '../components/ThreeDModels'; // Import 3D models component

// Import images used on the homepage
// Images are now served from public folder
//import introImage1 from '../assets/images/Ceus-Cruise.jpeg';       
//import introImage2 from '../assets/images/Exec ceus fsa.jpeg';       

// Import sponsor data
import { allSponsors } from '../data/sponsorData';
// Import event data
import { allEventsData } from '../data/eventData';

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
            <div ref={heroTitleRef} className="UNSWCEUS text-[63px] font-bold tracking-[3px] leading-normal"> 
              UNSW CEUS
            </div>
            <div ref={heroSubtitleRef} className="FULLNAME text-[22px] font-normal tracking-[2.5px] leading-normal">
               Chemical Engineering Undergraduate Society
            </div>
          </div>
        </div>
      </section>

      {/* --- 3D Models Section --- */}
      <section className="3d-models-section relative w-full h-[60vh] min-h-[400px] bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Chemical Engineering in 3D
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto px-6">
              Explore the tools and equipment that define chemical engineering
            </p>
          </div>
          <div className="w-full h-[400px] max-w-4xl mx-auto">
            <ThreeDModels />
          </div>
        </div>
      </section>

      {/* --- About Us Section --- */}
      <section className="about-us-section container mx-auto px-6 py-12 md:py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">About Us</h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
          The Chemical Engineering Undergraduate Society (CEUS) is the vibrant student-run society 
          for students within the School of Chemical Engineering at The University of New South Wales (UNSW).
          We are dedicated to enhancing the academic, social, and professional lives of our members.
          Through a diverse range of events and initiatives, we foster a strong sense of community 
          and provide valuable opportunities for growth and connection.
        </p>
        <Link href="/about">
          <button className="mt-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition duration-300">
            Find out more...
          </button>
        </Link>
      </section>
      
      {/* --- Events Section --- */}
      <section className="events-section container mx-auto px-6 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Happening Soon</h2>
        {/* Check if there are any events in the next two weeks */}
        {upcomingEventsNextTwoWeeks.length > 0 ? (
          <Slider {...eventSettings}>
            {/* Map over the filtered list of events */}
            {upcomingEventsNextTwoWeeks.map(event => (
              <div key={event.id} className="px-4">
                <Image 
                  src={event.imageUrl} 
                  alt={event.title} 
                  width={200}
                  height={200}
                  className="mx-auto max-h-[200px] object-contain"
                />
                <h3 className="text-xl font-semibold text-center mt-4">{event.title}</h3>
                {/* You might want to add more event details here */}
              </div>
            ))}
          </Slider>
        ) : (
          // Display this message if no events are scheduled in the next two weeks
          <p className="text-center text-gray-600 text-lg">
            No events scheduled for the next two weeks. Check out the full calendar on our events page!
          </p>
        )}
      </section>

      {/* --- Sponsors Section --- */}
      <section className="sponsors-section container mx-auto px-6 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Sponsors</h2>
        <Slider {...sponsorSettings}>
          {allSponsors.map(sponsor => (
            <div key={sponsor.name} className="px-4">
              <Image 
                src={sponsor.logoUrl} 
                alt={sponsor.name} 
                width={100}
                height={100}
                className="mx-auto max-h-[100px] object-contain"
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