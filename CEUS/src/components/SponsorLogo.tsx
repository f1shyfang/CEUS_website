'use client'
// src/components/SponsorLogo.tsx
import React from 'react';
import Image from 'next/image';
import { Sponsor } from '../types';

interface SponsorLogoProps {
  sponsor: Sponsor;
  onClick: (sponsor: Sponsor) => void; // Function to call when clicked
}

const SponsorLogo: React.FC<SponsorLogoProps> = ({ sponsor, onClick }) => {
  return (
    <button
      onClick={() => onClick(sponsor)}
      className="relative group flex items-center justify-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 aspect-video sm:aspect-[16/7]" // Maintain aspect ratio
      aria-label={`View details for ${sponsor.name}`}
    >
      <Image
        src={sponsor.logoUrl}
        alt={`${sponsor.name} logo`}
        width={80}
        height={80}
        className="max-h-16 sm:max-h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110" // Logo scales slightly within button
      />
    </button>
  );
};

export default SponsorLogo;