// src/pages/HomePage.tsx
import React, { useEffect, useRef } from 'react'; // Import useEffect and useRef
import gsap from 'gsap'; // Import gsap

// Import images used on the homepage
import groupPhoto from '../assets/images/Ceus_ball_group_edited.jpg'; 
import introImage1 from '../assets/images/Ceus-Cruise.jpeg';       
import introImage2 from '../assets/images/Exec ceus fsa.jpeg';       

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


  // --- Component Return (JSX) ---
  return (
    <> 
      {/* --- Group Photo / Hero Section --- */}
      <section className="GroupPhoto relative w-full h-[75vh] max-h-[600px] overflow-hidden"> 
        <div className="GroupImg absolute inset-0"> 
          <img 
            draggable={false} 
            src={groupPhoto} 
            alt="CEUS Ball Group Photo" 
            className="w-full h-full object-cover object-center" 
          />
          <div className="ImgOverlay absolute inset-0 bg-black/40 z-10"></div>
        </div>
        <div className="relative z-20 h-full flex items-center container mx-auto px-6"> 
          <div className="title-overlay text-white text-left"> 
            {/* Attach refs to the elements to be animated */}
            {/* REMOVED opacity-0 here, letting GSAP handle the start state */}
            <div ref={heroTitleRef} className="UNSWCEUS text-[63px] font-bold tracking-[3px] leading-normal"> 
              UNSW CEUS
            </div>
            <div ref={heroSubtitleRef} className="FULLNAME text-[22px] font-normal tracking-[2.5px] leading-normal">
               Chemical Engineering Undergraduate Society
            </div>
          </div>
        </div>
      </section>

      {/* --- Intro Section 1 (Welcome) --- */}
      {/* Add refs here later if you want to animate these sections on scroll */}
      <section className="intro container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch"> 
        <div className="introdiv bg-[#3697c1] p-8 md:p-10 rounded-lg text-left flex-1 max-w-2xl"> 
          <h3 className="h3intro text-gray-100 text-2xl md:text-3xl mb-5 font-semibold">
            Welcome to CEUS,
          </h3>
          <p className="pintro text-gray-200 text-base leading-relaxed mb-4">
            The vibrant student-run society nestled within 
            the School of Chemical Engineering at The University of New South Wales 
            (UNSW). Our commitment extends beyond the academic realm, as we 
            strive to mold well-rounded graduates by providing valuable 
            insights into industry. Through collaborations, CEUS has established 
            robust relationships with industry leaders.
          </p>
        </div>
        <div className="introimg relative flex-1 rounded-lg overflow-hidden aspect-video md:aspect-auto min-h-[300px]"> 
          <img 
            id="introimg1" 
            src={introImage1} 
            alt="CEUS Cruise Event" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>
      </section>

      {/* --- Intro Section 2 (Events) --- */}
       {/* Add refs here later if you want to animate these sections on scroll */}
      <section className="intro2 container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row-reverse gap-8 lg:gap-12 items-stretch">
        <div className="introimg2 relative flex-1 rounded-lg overflow-hidden aspect-video md:aspect-auto min-h-[300px]"> 
          <img 
            id="introimg2" 
            src={introImage2} 
            alt="CEUS and FSA executives"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="introdiv2 bg-[#3697c1] p-8 md:p-10 rounded-lg text-left flex-1 max-w-2xl">
          <p className="pintro text-gray-200 text-base leading-relaxed mb-4">
            Throughout the year, CEUS hosts an array of engaging 
            social events, including the iconic first-year camp, exciting 
            cruises, glamorous balls, and spirited pub crawls. These events 
            serve as platforms for fostering connections, creating lasting 
            memories, and building a supportive community within the School 
            of Chemical Engineering.
          </p>
          <p className="pintro text-gray-200 text-base leading-relaxed">
            Join us at CEUS, where tradition meets innovation, and where our 
            commitment to your university experience knows no bounds. Together, 
            let's make your time at UNSW truly exceptional!
          </p>
        </div>
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