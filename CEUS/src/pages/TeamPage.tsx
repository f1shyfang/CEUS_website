// src/pages/TeamPage.tsx
'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import MemberCard from '../components/MemberCard';
import FilterButton from '../components/FilterButton';
// Ensure this import only brings what's defined (mainFilterCategories and allTeams)
import { allTeams, mainFilterCategories } from '../data/teamData';
//import { TeamCategory, Member } from '../types';      //declared but never read

const TeamPage: React.FC = () => {
  const initialCategory = mainFilterCategories[0]?.label || 'Executives';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const displayedMembers = useMemo(() => {
    const foundTeam = allTeams.find(team => team.name === selectedCategory);
    return foundTeam ? foundTeam.members : [];
  }, [selectedCategory]); // Removed allTeams as it's not needed

  useEffect(() => {
    if (displayedMembers.length > 0) {
      gsap.fromTo(".member-card-gsap",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [displayedMembers]);

  const handleFilterClick = (categoryLabel: string) => {
    setSelectedCategory(categoryLabel);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Combined Filter Buttons */}
        {/* Adjusted bottom margin to mb-8 since there's only one block of buttons now */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {mainFilterCategories.map((cat) => (
            <FilterButton
              key={cat.id}
              label={cat.label}
              isActive={selectedCategory === cat.label}
              onClick={() => handleFilterClick(cat.label)}
            />
          ))}
        </div>

        {/* Member Cards Grid */}
        {displayedMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {displayedMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl">
            No members found for "{selectedCategory}".
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamPage;