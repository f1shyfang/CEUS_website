'use client'
// src/components/MemberCard.tsx
import React from 'react';
import OptimizedImage from './OptimizedImage';
import { Member } from '../types';
import { FALLBACK_IMAGE_URLS } from '../lib/storagePublicUrls';
import { cn } from '../lib/utils';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const hasLink = Boolean(member.linkedInUrl);

  const baseClasses =
    'bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-lg flex flex-col items-center text-center member-card-gsap';

  const interactiveClasses =
    'group cursor-pointer transition-[transform,box-shadow,colors] duration-300 ease-out ' +
    'motion-safe:hover:scale-125 motion-safe:hover:shadow-xl ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

  const cardContent = (
    <>
      <OptimizedImage
        src={member.imageUrl || FALLBACK_IMAGE_URLS.team}
        alt={`${member.name}, ${member.role || 'CEUS member'}`}
        width={112}
        height={112}
        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-4 border-2 border-gray-200"
        fallbackSrc={FALLBACK_IMAGE_URLS.team}
      />
      <h3
        className={cn(
          'text-lg font-semibold text-gray-900 mb-1',
          hasLink && 'transition-colors duration-200 group-hover:text-blue-600'
        )}
      >
        {member.name}
      </h3>
      {member.role && (
        <p className="text-sm text-gray-600 px-2">{member.role}</p>
      )}
    </>
  );

  if (hasLink) {
    return (
      <a
        href={member.linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseClasses, interactiveClasses)}
        aria-label={`View ${member.name}'s LinkedIn profile`}
      >
        {cardContent}
      </a>
    );
  }

  return <div className={baseClasses}>{cardContent}</div>;
};

export default React.memo(MemberCard);
