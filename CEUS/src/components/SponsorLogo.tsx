'use client'
// src/components/SponsorLogo.tsx
import React from 'react';
import OptimizedImage from './OptimizedImage';
import { Sponsor } from '../types';

export type SponsorLogoSize = 'sm' | 'md' | 'lg';

interface SponsorLogoProps {
  sponsor: Sponsor;
  onClick: (sponsor: Sponsor) => void;
  /**
   * Visual size of the logo. Defaults to `'md'` to preserve existing call sites.
   * Pass `'lg'` for higher tiers (Diamond/Major) so they read proportionally
   * larger when the grid gives them more room.
   */
  size?: SponsorLogoSize;
}

const SIZE_TO_MAX_H: Record<SponsorLogoSize, string> = {
  sm: 'max-h-12 sm:max-h-14',
  md: 'max-h-16 sm:max-h-20',
  lg: 'max-h-24 sm:max-h-32',
};

const SponsorLogo: React.FC<SponsorLogoProps> = ({ sponsor, onClick, size = 'md' }) => {
  const maxH = SIZE_TO_MAX_H[size];

  return (
    <button
      type="button"
      onClick={() => onClick(sponsor)}
      className="relative group flex items-center justify-center p-6 sm:p-8 bg-white rounded-xl border border-gray-200 shadow-lg motion-safe:hover:shadow-xl transition-[transform,box-shadow] duration-300 motion-safe:hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 aspect-video sm:aspect-[16/7] w-full"
      aria-label={`View details for ${sponsor.name}, ${sponsor.tier} sponsor`}
    >
      {sponsor.logoUrl ? (
        <OptimizedImage
          src={sponsor.logoUrl}
          alt={`${sponsor.name}, ${sponsor.tier} sponsor`}
          width={120}
          height={60}
          objectFit="contain"
          className={`${maxH} w-auto transition-transform duration-300 motion-safe:group-hover:scale-[1.05]`}
        />
      ) : (
        <span className="text-gray-900 font-semibold text-sm sm:text-base text-center px-2 line-clamp-2">
          {sponsor.name}
        </span>
      )}
    </button>
  );
};

export default SponsorLogo;
