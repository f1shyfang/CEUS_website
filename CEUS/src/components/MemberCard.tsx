// src/components/MemberCard.tsx
import React from 'react';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <div className="bg-slate-800 p-5 md:p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 member-card-gsap">
      <img
        src={member.imageUrl}
        alt={member.name}
        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-4 border-2 border-slate-700"
      />
      <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
      {member.role && <p className="text-sm text-slate-400">{member.role}</p>}
      {/* You can add email/LinkedIn icons here later */}
    </div>
  );
};

export default MemberCard;