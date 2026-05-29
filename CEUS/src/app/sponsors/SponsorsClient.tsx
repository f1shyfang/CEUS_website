'use client'
// src/app/sponsors/SponsorsClient.tsx
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Sponsor as SponsorType, SponsorTier } from '../../types';
import SponsorLogo from '../../components/SponsorLogo';
import SponsorModal from '../../components/SponsorModal';
import OptimizedImage from '../../components/OptimizedImage';
import { cn } from '../../lib/utils';

interface SponsorsClientProps {
  sponsors: SponsorType[];
}

const TIER_ORDER: SponsorTier[] = ['Diamond', 'Major', 'Gold', 'Silver', 'Bronze', 'Supporting', 'Community', 'Other'];

const TIER_COPY: Record<SponsorTier, { title: string; note: string }> = {
  Diamond:    { title: 'Diamond Partner',    note: 'Lead partner across our flagship calendar.' },
  Major:      { title: 'Major Partners',     note: 'Backing our largest industry events.' },
  Gold:       { title: 'Gold Partners',      note: 'Recruiting and engaging with our cohort each term.' },
  Silver:     { title: 'Silver Partners',    note: 'Active across careers nights and recruitment.' },
  Bronze:     { title: 'Bronze Partners',    note: 'Supporting our day-to-day events.' },
  Supporting: { title: 'Supporting Partners', note: 'Helping us run student programs.' },
  Community:  { title: 'Community Partners', note: 'Local organisations partnering on initiatives.' },
  Other:      { title: 'Partners',           note: 'Organisations working with CEUS.' },
};

const headingBalance = { textWrap: 'balance' } as React.CSSProperties;

const SponsorsClient: React.FC<SponsorsClientProps> = ({ sponsors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<SponsorType | null>(null);

  const featuredSponsor = useMemo(
    () => sponsors.find(s => s.featured) ?? sponsors.find(s => s.id === 'ansto'),
    [sponsors]
  );

  const tierGroups = useMemo(
    () =>
      TIER_ORDER
        .map(tier => ({
          tier,
          sponsors: sponsors.filter(
            s => s.tier === tier && s.id !== featuredSponsor?.id
          ),
        }))
        .filter(group => group.sponsors.length > 0),
    [featuredSponsor, sponsors]
  );

  const handleLogoClick = (sponsor: SponsorType) => {
    setSelectedSponsor(sponsor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSponsor(null), 300);
  };

  const hasAnySponsors = Boolean(featuredSponsor) || tierGroups.length > 0;

  // Tier-driven grid: higher tiers get fewer columns so logos read at a larger size.
  const gridForTier = (tier: SponsorTier) => {
    switch (tier) {
      case 'Diamond':
      case 'Major':
        return 'grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8';
      case 'Gold':
        return 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'Silver':
        return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6';
      default:
        return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5';
    }
  };

  // Tier-driven logo size: pairs with the grid density so Diamond/Major logos
  // actually render proportionally larger, not just in fewer columns.
  const logoSizeForTier = (tier: SponsorTier): 'sm' | 'md' | 'lg' => {
    switch (tier) {
      case 'Diamond':
      case 'Major':
        return 'lg';
      case 'Gold':
      case 'Silver':
        return 'md';
      default:
        return 'sm';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="container mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1B397E] mb-4">
            Industry partners
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.05]"
            style={headingBalance}
          >
            The companies backing CEUS
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">
            CEUS is the student society for chemical engineering at UNSW. Our partners run careers nights, technical workshops, and the annual Engineering Ball with us, and recruit graduates from our cohort every year.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#1B397E] px-6 py-3 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Partner with CEUS
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-lg border-2 border-[#1B397E] bg-transparent px-6 py-3 text-base font-semibold text-[#1B397E] transition-colors duration-200 ease-out hover:bg-[#1B397E]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              See our events
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        <hr className="border-gray-200" />
      </div>

      {/* Featured / Lead partner */}
      {featuredSponsor && (
        <section className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1B397E] mb-2">
              {featuredSponsor.tier} spotlight
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              style={headingBalance}
            >
              Lead partner: {featuredSponsor.name}
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center rounded-xl border border-gray-200 bg-white shadow-lg p-6 md:p-10">
            <div className="lg:col-span-2 flex justify-center">
              <button
                type="button"
                onClick={() => handleLogoClick(featuredSponsor)}
                className="relative w-full max-w-sm aspect-[4/3] rounded-lg border border-gray-200 bg-white flex items-center justify-center p-8 transition-shadow duration-200 ease-out hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label={`View details for ${featuredSponsor.name}`}
              >
                <OptimizedImage
                  src={featuredSponsor.logoUrl}
                  alt={`${featuredSponsor.name} logo`}
                  width={320}
                  height={180}
                  objectFit="contain"
                />
              </button>
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={headingBalance}>
                {featuredSponsor.name}
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                {featuredSponsor.description || 'Our lead partner, supporting CEUS events and student programs across the year.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {featuredSponsor.websiteUrl && featuredSponsor.websiteUrl !== '#' && (
                  <a
                    href={featuredSponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#1B397E] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Visit {featuredSponsor.name}
                    <FaExternalLinkAlt className="ml-2 h-3 w-3" aria-hidden="true" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => handleLogoClick(featuredSponsor)}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-[#1B397E] bg-transparent px-6 py-3 text-sm font-semibold text-[#1B397E] transition-colors duration-200 ease-out hover:bg-[#1B397E]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  More about this partnership
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tiered partners */}
      {tierGroups.length > 0 && (
        <section className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
          <div className="space-y-16 md:space-y-20">
            {tierGroups.map(({ tier, sponsors: tierSponsors }) => {
              const copy = TIER_COPY[tier];
              return (
                <div key={tier}>
                  <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-6">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1B397E] mb-1">
                        {tier}
                      </p>
                      <h2
                        className="text-2xl md:text-3xl font-bold text-gray-900"
                        style={headingBalance}
                      >
                        {copy.title}
                      </h2>
                    </div>
                    <p className="text-base text-gray-600 md:max-w-md md:text-right">
                      {copy.note}
                    </p>
                  </div>

                  <div className={cn(gridForTier(tier))}>
                    {tierSponsors.map(sponsor => (
                      <div
                        key={sponsor.id}
                        className="group rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden flex flex-col"
                      >
                        <div className="flex items-center justify-center p-6 md:p-8 bg-white">
                          <SponsorLogo
                            sponsor={sponsor}
                            onClick={handleLogoClick}
                            size={logoSizeForTier(tier)}
                          />
                        </div>
                        <div className="px-5 pb-5 pt-3 border-t border-gray-200">
                          <h3 className="text-sm md:text-base font-semibold text-gray-900 text-center" style={headingBalance}>
                            {sponsor.name}
                          </h3>
                          <div className="mt-3 flex justify-center gap-4 text-sm">
                            {sponsor.websiteUrl && sponsor.websiteUrl !== '#' && (
                              <a
                                href={sponsor.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center font-semibold text-[#1B397E] hover:text-[#2563EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
                              >
                                Website
                                <FaExternalLinkAlt className="ml-1.5 h-3 w-3" aria-hidden="true" />
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => handleLogoClick(sponsor)}
                              className="font-semibold text-gray-700 hover:text-[#2563EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Empty state — invite sponsorship */}
      {!hasAnySponsors && (
        <section className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white shadow-lg px-8 py-10 md:px-12 md:py-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1B397E] mb-3">
              Open for 2026
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" style={headingBalance}>
              Looking for industry partners for the year ahead
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-6">
              If your team recruits chemical engineering students at UNSW, we&apos;d like to talk about careers nights, technical events, and the Engineering Ball.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#1B397E] px-6 py-3 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Get in touch
            </Link>
          </div>
        </section>
      )}

      {/* Partnership CTA — quiet, not a billboard */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1B397E] mb-3">
                Become a partner
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                style={headingBalance}
              >
                Partner with CEUS for 2026
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                We work with companies recruiting chemical, process, and materials engineering students at UNSW. Tiered packages cover branded careers events, technical workshops, and recognition across the year. Reach out and we&apos;ll share the prospectus.
              </p>
            </div>
            <div className="md:col-span-2 flex flex-col gap-3 md:items-end">
              <Link
                href="/contact"
                className="inline-flex w-full md:w-auto items-center justify-center rounded-lg bg-[#1B397E] px-6 py-3 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Get in touch
              </Link>
              <Link
                href="/events"
                className="inline-flex w-full md:w-auto items-center justify-center rounded-lg border-2 border-[#1B397E] bg-transparent px-6 py-3 text-base font-semibold text-[#1B397E] transition-colors duration-200 ease-out hover:bg-[#1B397E]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                See what we run
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SponsorModal isOpen={isModalOpen} sponsor={selectedSponsor} onClose={handleCloseModal} />
    </div>
  );
};

export default SponsorsClient;
