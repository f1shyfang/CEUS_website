// src/components/MemberCard.tsx
import React from 'react';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    // Changed background to white, adjusted text colors
    <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 member-card-gsap">
      <img
        src={member.imageUrl}
        alt={member.name}
        // Adjusted border color for light theme
        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-4 border-2 border-gray-200"
      />
      {/* Changed text colors for dark text on light background */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h3>
      {member.role && <p className="text-sm text-gray-600">{member.role}</p>}
    </div>
  );
};

export default MemberCard;