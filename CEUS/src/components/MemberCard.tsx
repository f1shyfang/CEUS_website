'use client'
// src/components/MemberCard.tsx
import React from 'react';
import Image from 'next/image';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const cardContent = (
    <>
      <Image
        src={member.imageUrl || '/images/team/no_profile_img.jpg'} // Added a fallback avatar
        alt={member.name}
        width={112}
        height={112}
        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-4 border-2 border-gray-200"
        onError={(e) => { (e.target as HTMLImageElement).src = '/images/team/no_profile_img.jpg'; }} // Fallback for broken image links
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-200">
        {member.name}
      </h3>
      {member.role && (
        <p className="text-sm text-gray-600 px-2">{member.role}</p> // Added px-2 for roles that might wrap
      )}
    </>
  );

  // Common classes for the card container
  const cardClasses = "bg-white p-5 md:p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-125 hover:shadow-xl member-card-gsap group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  if (member.linkedInUrl) {
    return (
      <a
        href={member.linkedInUrl}
        target="_blank" // Open in a new tab
        rel="noopener noreferrer" // Security best practice for target="_blank"
        className={cardClasses}
        aria-label={`View ${member.name}'s LinkedIn profile`}
      >
        {cardContent}
      </a>
    );
  } else {
    // If no LinkedIn URL, render as a div (not clickable to LinkedIn)
    return (
      <div className={cardClasses}>
        {cardContent}
      </div>
    );
  }
};

export default MemberCard;