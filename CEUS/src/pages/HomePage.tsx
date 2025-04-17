// src/pages/HomePage.tsx (Partial - only intro sections updated)
import React from 'react';

import groupPhoto from '../assets/images/Ceus_ball_group_edited.jpg'; 
import introImage1 from '../assets/images/Ceus-Cruise.jpeg';       
import introImage2 from '../assets/images/Exec ceus fsa.jpeg';       

const HomePage: React.FC = () => {
  return (
    <> 
      {/* --- Group Photo / Hero Section (Keep as is) --- */}
       {/* --- Group Photo / Hero Section --- */}
      {/* Let's try a viewport height unit vh for responsiveness, constrained by max-h */}
      {/* Removed min-h, added overflow-hidden */}
      <section className="GroupPhoto relative w-full h-[75vh] max-h-[600px] overflow-hidden"> 

        {/* Image container takes full height of section */}
        <div className="GroupImg absolute inset-0"> 
          <img 
            draggable={false} 
            src={groupPhoto} 
            alt="CEUS Ball Group Photo" 
            className="w-full h-full object-cover object-center" 
          />
          {/* Overlay */}
          <div className="ImgOverlay absolute inset-0 bg-black/40 z-10"></div>
        </div>

        {/* Title Overlay - Adjusted font/tracking/leading */}
        {/* Added container mx-auto px-6 for consistent padding with other sections */}
        <div className="relative z-20 h-full flex items-center container mx-auto px-6"> 
          {/* Removed absolute positioning, let flexbox handle vertical centering */}
          <div className="title-overlay text-white text-left"> 
             {/* Arbitrary font size, tracking. Adjusted leading. */}
            <div className="UNSWCEUS text-[63px] font-bold tracking-[3px] leading-normal"> 
              UNSW CEUS
            </div>
             {/* Arbitrary font size, tracking. Adjusted leading. */}
            <div className="FULLNAME text-[22px] font-normal tracking-[2.5px] leading-normal">
               Chemical Engineering Undergraduate Society
            </div>
          </div>
        </div>
      </section>

      {/* --- Intro Section 1 (Welcome) --- */}
      {/* Using container for padding/max-width, flex layout, gap for spacing */}
      <section className="intro container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch"> 
        {/* Text div: flex-1 allows it to grow/shrink. Added max-w-2xl (~672px) which is less than 800px but a common Tailwind size */}
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
        {/* Image container: Allow it to take remaining space (flex-1), set aspect ratio for responsive height */}
        <div className="introimg relative flex-1 rounded-lg overflow-hidden aspect-video md:aspect-auto min-h-[300px]"> {/* Added aspect-ratio and min-height */}
          <img 
            id="introimg1" 
            src={introImage1} 
            alt="CEUS Cruise Event" 
            className="absolute inset-0 w-full h-full object-cover" // Simplified positioning
          />
        </div>
      </section>

      {/* --- Intro Section 2 (Events) --- */}
       {/* Same layout structure, but md:flex-row-reverse */}
      <section className="intro2 container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row-reverse gap-8 lg:gap-12 items-stretch">
         {/* Image container */}
        <div className="introimg2 relative flex-1 rounded-lg overflow-hidden aspect-video md:aspect-auto min-h-[300px]"> 
          <img 
            id="introimg2" 
            src={introImage2} 
            alt="CEUS and FSA executives"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Text div */}
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
      {/* Converted videocontainer class to Tailwind */}
      <section className="videocontainer relative h-[600px] bg-black/10 p-12"> 
        {/* Converted ytvideo class (basic centering) */}
        <div className="ytvideo relative w-full h-full"> 
          {/* Converted iframeyt class to Tailwind */}
          <iframe 
            className="iframeyt absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%]" 
            src="https://www.youtube.com/embed/x3DD5gMo3fA" // Removed trailing '?'
            title="YouTube video player" // Added title attribute for accessibility
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