



// src/pages/TeamPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import MemberCard from '../components/MemberCard';
import FilterButton from '../components/FilterButton';
// Corrected Line 6: Added 'from' and path to your data file
import { allTeams, mainFilterCategories, subFilterCategories } from '../data/teamData';
// Corrected Line 7: Removed '.ts' extension
import { TeamCategory, Member, FilterButtonData } from '../types';



const TeamPage: React.FC = () => {
  // Normalize category names for IDs (e.g., "Information Technology" -> "informationTechnology")
  const normalizeCategoryName = (name: string) => name.toLowerCase().replace(/\s+/g, '');

  const initialCategory = mainFilterCategories[0]?.label || 'Executives';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const displayedMembers = useMemo(() => {
    const foundTeam = allTeams.find(team => team.name === selectedCategory);
    return foundTeam ? foundTeam.members : [];
  }, [selectedCategory, allTeams]);


  // GSAP Animation for cards
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
  }, [displayedMembers]); // Rerun animation when displayedMembers change

  const handleFilterClick = (categoryLabel: string) => {
    setSelectedCategory(categoryLabel);
  };

  return (
    <div className="bg-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {mainFilterCategories.map((cat) => (
            <FilterButton
              key={cat.id}
              label={cat.label}
              isActive={selectedCategory === cat.label}
              onClick={() => handleFilterClick(cat.label)}
            />
          ))}
        </div>

        {/* Sub Filter Buttons (e.g., Information Technology) */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {subFilterCategories.map((cat) => (
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
          <p className="text-center text-slate-400 text-xl">
            No members found for "{selectedCategory}".
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamPage;