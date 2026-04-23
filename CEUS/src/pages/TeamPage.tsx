// src/pages/TeamPage.tsx
'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import MemberCard from '../components/MemberCard';
import FilterButton from '../components/FilterButton';
import { fetchTeamCategories } from '../lib/supabase';
import { TeamCategory } from '../types';

const CATEGORY_ORDER = [
  'Executives',
  'Year Representatives',
  'Admin',
  'Careers',
  'Socials',
  'Marketing',
  'Information Technology',
];

const TeamPage: React.FC = () => {

  const [teamCategories, setTeamCategories] = useState<TeamCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadTeam = async () => {
      try {
        setIsLoading(true);
        const fetched = await fetchTeamCategories();
        if (!isMounted) return;

        const sortedCategories = fetched.sort((a, b) => {
          const aIndex = CATEGORY_ORDER.indexOf(a.name);
          const bIndex = CATEGORY_ORDER.indexOf(b.name);
          if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });

        setTeamCategories(sortedCategories);
        setSelectedCategory(sortedCategories[0]?.name || '');
        setLoadError(null);
      } catch (err) {
        console.error('Failed to fetch team', err);
        if (isMounted) {
          setLoadError('Unable to load team information right now.');
          setTeamCategories([]);
          setSelectedCategory('');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadTeam();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayedMembers = useMemo(() => {
    const foundTeam = teamCategories.find(team => team.name === selectedCategory);
    return foundTeam ? foundTeam.members : [];
  }, [selectedCategory, teamCategories]);

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
          {teamCategories.map((cat) => (
            <FilterButton
              key={cat.name}
              label={cat.name}
              isActive={selectedCategory === cat.name}
              onClick={() => handleFilterClick(cat.name)}
            />
          ))}
        </div>

        {/* Member Cards Grid */}
        {loadError && (
          <p className="text-center text-red-600 text-lg">{loadError}</p>
        )}
        {!loadError && isLoading && (
          <p className="text-center text-gray-600 text-lg">Loading team...</p>
        )}
        {!loadError && !isLoading && displayedMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {displayedMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : !loadError && !isLoading ? (
          <p className="text-center text-gray-600 text-xl">
            No members found for &quot;{selectedCategory}&quot;.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default TeamPage;