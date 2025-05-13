// src/pages/SponsorsPage.tsx
import React, { useState, useMemo } from 'react';
import { Sponsor as SponsorType } from '../types'; // Alias Sponsor type
import { allSponsors } from '../data/sponsorData';
import SponsorLogo from '../components/SponsorLogo';
import SponsorModal from '../components/SponsorModal';

// Optional: Import hero image if it's from src, otherwise use path string from public
// import heroImg from '/path/to/your/hero/image.jpg'; // If using from public, define path below

const SponsorsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<SponsorType | null>(null);

  // Replace with the correct path to your hero image in the public folder
  const heroImageUrl = '/images/sponsors/Arc_icon.png'; // << REPLACE

  // Filter sponsors by tier using useMemo for performance
  const majorSponsors = useMemo(() => allSponsors.filter(s => s.tier === 'Major'), []);
  const supportingSponsors = useMemo(() => allSponsors.filter(s => s.tier === 'Supporting'), []);
  // Add other tiers if needed

  const handleLogoClick = (sponsor: SponsorType) => {
    setSelectedSponsor(sponsor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optional: Delay clearing sponsor slightly for animation purposes if needed
    setTimeout(() => setSelectedSponsor(null), 300); // Match animation duration
  };

  // Helper function to render a sponsor tier section
  const renderSponsorTier = (title: string, sponsors: SponsorType[]) => {
    if (sponsors.length === 0) return null; // Don't render section if no sponsors in tier

    return (
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-700">{title}</h2>
          <hr className="border-t border-gray-300 w-24 mx-auto mt-3 mb-4" />
        </div>
        <div className={`grid grid-cols-2 ${sponsors.length > 1 ? 'md:grid-cols-3 lg:grid-cols-4' : ''} gap-6 sm:gap-8 items-center justify-items-center`}>
          {sponsors.map(sponsor => (
            <SponsorLogo
              key={sponsor.id}
              sponsor={sponsor}
              onClick={handleLogoClick}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-100">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 py-16 sm:py-24 lg:py-32 lg:px-0 lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Our Sponsors
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              CEUS would like to thank all of our sponsors for their continued support. Their contributions are vital to our success and ability to serve the student community.
            </p>
            {/* Optional Call to Action */}
            {/* <div className="mt-10 flex items-center gap-x-6">
              <a href="#contact" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline ...">Become a Sponsor</a>
            </div> */}
          </div>
          <div className="relative lg:col-span-5 xl:col-span-6 h-80 lg:h-auto">
             <div className="absolute inset-0 bg-gradient-to-l from-gray-100 via-transparent to-transparent lg:hidden"></div> {/* Gradient fade on mobile */}
            <img className="h-full w-full object-cover lg:rounded-bl-xl" src={heroImageUrl} alt="sponsors" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {renderSponsorTier("Major Sponsors", majorSponsors)}
        {renderSponsorTier("Supporting Sponsors", supportingSponsors)}
        {/* Render other tiers if needed */}

        {/* Section for Potential Sponsors */}
         <section className="mt-16 pt-10 border-t border-gray-200 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interested in Sponsoring CEUS?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Partner with CEUS to connect with talented Chemical Engineering students at UNSW and support the next generation of engineers.
            </p>
            <a
                href="/contact" // Link to your contact page or sponsorship info page
                className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Learn More About Partnership
            </a>
        </section>

      </div>

      {/* Sponsor Modal */}
      <SponsorModal
        isOpen={isModalOpen}
        sponsor={selectedSponsor}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SponsorsPage;