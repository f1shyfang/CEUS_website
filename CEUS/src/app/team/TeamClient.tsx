'use client'
// src/app/team/TeamClient.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import MemberCard from '../../components/MemberCard';
import FilterButton from '../../components/FilterButton';
import { TeamCategory } from '../../types';

import { TEAM_CATEGORIES, normalizeTeamCategory } from '../../lib/schemas';

const CATEGORY_ORDER = [...TEAM_CATEGORIES];

interface TeamClientProps {
  categories: TeamCategory[];
}

const TeamClient: React.FC<TeamClientProps> = ({ categories }) => {
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      const aName = normalizeTeamCategory(a.name);
      const bName = normalizeTeamCategory(b.name);
      const aIndex = CATEGORY_ORDER.indexOf(aName as (typeof CATEGORY_ORDER)[number]);
      const bIndex = CATEGORY_ORDER.indexOf(bName as (typeof CATEGORY_ORDER)[number]);
      if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  }, [categories]);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    sortedCategories[0]?.name || ''
  );

  const displayedMembers = useMemo(() => {
    const foundTeam = sortedCategories.find(team => team.name === selectedCategory);
    return foundTeam ? foundTeam.members : [];
  }, [selectedCategory, sortedCategories]);

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

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {sortedCategories.map((cat) => (
            <FilterButton
              key={cat.name}
              label={cat.name}
              isActive={selectedCategory === cat.name}
              onClick={() => setSelectedCategory(cat.name)}
            />
          ))}
        </div>

        {displayedMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {displayedMembers.map((member) => (
              <div key={member.id} className="member-card-gsap">
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl">
            No members found for &quot;{selectedCategory}&quot;.
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamClient;
