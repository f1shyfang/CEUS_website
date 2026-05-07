'use client'
// src/components/SponsorLogo.tsx
import React from 'react';
import OptimizedImage from './OptimizedImage';
import { Sponsor } from '../types';

interface SponsorLogoProps {
  sponsor: Sponsor;
  onClick: (sponsor: Sponsor) => void;
}

const SponsorLogo: React.FC<SponsorLogoProps> = ({ sponsor, onClick }) => {
  return (
    <button
      onClick={() => onClick(sponsor)}
      className="relative group flex items-center justify-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 aspect-video sm:aspect-[16/7] w-full"
      aria-label={`View details for ${sponsor.name}`}
    >
      {sponsor.logoUrl ? (
        <OptimizedImage
          src={sponsor.logoUrl}
          alt={`${sponsor.name} logo`}
          width={120}
          height={60}
          objectFit="contain"
          className="max-h-16 sm:max-h-20 w-auto transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <span className="text-gray-600 font-semibold text-sm sm:text-base text-center px-2 line-clamp-2">{sponsor.name}</span>
      )}
    </button>
  );
};

export default SponsorLogo;