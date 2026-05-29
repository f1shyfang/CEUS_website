'use client'
// src/app/team/TeamClient.tsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import MemberCard from '../../components/MemberCard';
import FilterButton from '../../components/FilterButton';
import { TeamCategory } from '../../types';

const CATEGORY_ORDER = [
  'Executives',
  'Year Representatives',
  'Admin',
  'Careers',
  'Socials',
  'Marketing',
  'Information Technology',
];

// Short, student-voice blurb for each portfolio. Keeps the page from being a flat
// grid and signals the organisational hierarchy (Executives lead, year reps
// represent cohorts, the rest are subcommittees).
const CATEGORY_BLURBS: Record<string, string> = {
  Executives:
    'The leadership team. They set the direction for the year and keep the society running.',
  'Year Representatives':
    'Your point of contact in each year group. They surface what students need and bring it back to the committee.',
  Admin:
    'Logistics, finance, and the paperwork that keeps every event possible.',
  Careers:
    'The team behind industry nights, recruiter drop-ins, and the careers fair.',
  Socials:
    'Lawn days, trivia, and the cohort traditions that make a degree feel like a degree.',
  Marketing:
    'Posters, social posts, and the visual identity you see across campus.',
  'Information Technology':
    'The crew behind this website and the tools the committee runs on.',
};

interface TeamClientProps {
  categories: TeamCategory[];
}

const TeamClient: React.FC<TeamClientProps> = ({ categories }) => {
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      const aIndex = CATEGORY_ORDER.indexOf(a.name);
      const bIndex = CATEGORY_ORDER.indexOf(b.name);
      if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  }, [categories]);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    sortedCategories[0]?.name || ''
  );

  const activeCategory = useMemo(
    () => sortedCategories.find((team) => team.name === selectedCategory),
    [selectedCategory, sortedCategories]
  );

  const displayedMembers = useMemo(
    () => activeCategory?.members ?? [],
    [activeCategory]
  );

  useEffect(() => {
    if (displayedMembers.length === 0) return;
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.member-card-gsap',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    });
    return () => ctx.revert();
  }, [displayedMembers]);

  const hasAnyMembers = sortedCategories.some((cat) => cat.members.length > 0);
  const activeBlurb = activeCategory ? CATEGORY_BLURBS[activeCategory.name] : undefined;
  const memberCount = displayedMembers.length;

  // WAI-ARIA tablist arrow-key + Home/End navigation (automatic activation).
  // Roving tabindex is on FilterButton; this handler moves focus + click to the next tab.
  const tablistRef = useRef<HTMLDivElement>(null);
  const handleTablistKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const navKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!navKeys.includes(event.key)) return;
    if (!tablistRef.current) return;
    event.preventDefault();
    const tabs = Array.from(
      tablistRef.current.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    );
    if (tabs.length === 0) return;
    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
    let nextIndex = currentIndex;
    if (event.key === 'ArrowLeft') {
      nextIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
    } else if (event.key === 'ArrowRight') {
      nextIndex = currentIndex === -1 || currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    }
    const nextTab = tabs[nextIndex];
    if (nextTab) {
      nextTab.focus();
      nextTab.click();
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 md:pt-20 md:pb-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1B397E] mb-3">
            The 2026 Committee
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            The students running CEUS this year
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Every event, post, and partnership on this site is the work of one of
            the portfolios below. Pick a team to see who&apos;s behind it.
          </p>
        </div>
      </section>

      <section
        aria-label="Filter by portfolio"
        className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8"
      >
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Team portfolios"
          className="flex flex-wrap gap-2"
          onKeyDown={handleTablistKeyDown}
        >
          {sortedCategories.map((cat) => (
            <FilterButton
              key={cat.name}
              label={cat.name}
              isActive={selectedCategory === cat.name}
              onClick={() => setSelectedCategory(cat.name)}
            />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="active-portfolio-heading"
        className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28"
      >
        {!hasAnyMembers ? (
          <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-gray-50 px-8 py-10 md:px-12 md:py-14 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              The 2026 committee is still being finalised.
            </p>
            <p className="text-base text-gray-700 mb-6">
              Names and photos go up here once handover is complete. Reach out
              if you want to get involved in the meantime.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#1B397E] px-6 py-3 text-sm font-semibold text-white motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Get in touch
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-10 md:mb-12 max-w-2xl">
              <h2
                id="active-portfolio-heading"
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                {activeCategory?.name ?? 'Team'}
              </h2>
              {activeBlurb && (
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {activeBlurb}
                </p>
              )}
              {memberCount > 0 && (
                <p className="mt-3 text-sm text-gray-600">
                  {memberCount} {memberCount === 1 ? 'member' : 'members'}
                </p>
              )}
            </div>

            {displayedMembers.length > 0 ? (
              <div
                key={selectedCategory}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
              >
                {displayedMembers.map((member) => (
                  <div key={member.id} className="member-card-gsap">
                    <MemberCard member={member} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-gray-50 px-8 py-10 md:px-12 md:py-14 text-center shadow-sm">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  This portfolio is recruiting.
                </p>
                <p className="text-base text-gray-700 mb-6">
                  No one&apos;s listed under {activeCategory?.name ?? 'this team'} yet.
                  If you want to help run it, the committee is open to a chat.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-[#1B397E] px-6 py-3 text-sm font-semibold text-white motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Get in touch
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default TeamClient;
