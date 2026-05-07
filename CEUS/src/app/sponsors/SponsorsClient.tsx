'use client'
// src/app/sponsors/SponsorsClient.tsx
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaHandshake, FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import { Sponsor as SponsorType, SponsorTier } from '../../types';
import { STATIC_ASSET_URLS } from '../../lib/storagePublicUrls';
import SponsorLogo from '../../components/SponsorLogo';
import SponsorModal from '../../components/SponsorModal';
import OptimizedImage from '../../components/OptimizedImage';
import { cn } from '../../lib/utils';

interface SponsorsClientProps {
  sponsors: SponsorType[];
}

const TIER_ORDER: SponsorTier[] = ['Diamond', 'Gold', 'Silver', 'Bronze', 'Community'];

const TIER_STYLES: Record<SponsorTier, { title: string; accent: string; pill: string; bg: string }> = {
  Diamond: { title: 'Diamond Sponsor', accent: 'from-sky-500 to-blue-600', pill: 'bg-sky-500', bg: 'bg-sky-50' },
  Gold: { title: 'Gold Sponsors', accent: 'from-amber-500 to-yellow-500', pill: 'bg-amber-500', bg: 'bg-amber-50' },
  Silver: { title: 'Silver Sponsors', accent: 'from-slate-500 to-gray-500', pill: 'bg-slate-500', bg: 'bg-slate-50' },
  Bronze: { title: 'Bronze Sponsors', accent: 'from-amber-700 to-amber-800', pill: 'bg-amber-700', bg: 'bg-amber-100' },
  Community: { title: 'Community Partners', accent: 'from-emerald-500 to-green-500', pill: 'bg-emerald-500', bg: 'bg-emerald-50' },
  Major: { title: 'Major Sponsors', accent: 'from-blue-600 to-indigo-600', pill: 'bg-blue-600', bg: 'bg-blue-50' },
  Supporting: { title: 'Supporting Sponsors', accent: 'from-green-600 to-emerald-600', pill: 'bg-green-600', bg: 'bg-green-50' },
  Other: { title: 'Partners', accent: 'from-gray-600 to-gray-500', pill: 'bg-gray-500', bg: 'bg-gray-50' },
};

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${STATIC_ASSET_URLS.heroBackground})` }}></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
              <FaHandshake className="text-3xl" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Our Sponsors</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              We&apos;re grateful for the continued support of our sponsors who make our events and initiatives possible. 
              Their contributions help us create valuable opportunities for Chemical Engineering students at UNSW.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">Become a Sponsor</Link>
            <Link href="/events" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">View Our Events</Link>
          </div>
        </div>
      </section>

      {featuredSponsor && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6">
                <FaStar className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Featured Sponsor</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-yellow-700 font-bold mb-4">
                    {featuredSponsor.tier} Spotlight
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredSponsor.name}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {featuredSponsor.description || 'Our principal sponsor providing exceptional support to CEUS and our student community.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    {featuredSponsor.websiteUrl && featuredSponsor.websiteUrl !== '#' && (
                      <a href={featuredSponsor.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all duration-300">
                        Visit Website <FaExternalLinkAlt className="ml-2" />
                      </a>
                    )}
                    <button onClick={() => handleLogoClick(featuredSponsor)} className="inline-flex items-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all duration-300">Learn More</button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-64 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-6 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => handleLogoClick(featuredSponsor)}>
                    <OptimizedImage src={featuredSponsor.logoUrl} alt={featuredSponsor.name} width={200} height={100} objectFit="contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {tierGroups.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {tierGroups.map(({ tier, sponsors }) => {
              const style = TIER_STYLES[tier];
              return (
                <div key={tier} className="space-y-8">
                  <div className="text-center">
                    <div className={cn("inline-flex items-center justify-center px-4 py-2 rounded-full text-white font-bold mb-4 bg-gradient-to-r", style.accent)}>
                      {style.title}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sponsors.map(sponsor => (
                      <div key={sponsor.id} className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                        <div className={cn(style.bg, "bg-opacity-60 flex items-center justify-center p-6")}>
                          <SponsorLogo sponsor={sponsor} onClick={handleLogoClick} />
                        </div>
                        <div className="px-4 pb-4 pt-3">
                          <h3 className="text-base font-bold text-gray-900 text-center">{sponsor.name}</h3>
                          <div className="flex justify-center gap-3 mt-4">
                            {sponsor.websiteUrl && sponsor.websiteUrl !== '#' && (
                              <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800">
                                Website <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                              </a>
                            )}
                            <button onClick={() => handleLogoClick(sponsor)} className="text-sm font-bold text-gray-700 hover:text-blue-600">Details</button>
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

      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Interested in Sponsoring CEUS?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Partner with CEUS to connect with talented Chemical Engineering students at UNSW and support the next generation of engineers.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">Get In Touch</Link>
          </div>
        </div>
      </section>

      <SponsorModal isOpen={isModalOpen} sponsor={selectedSponsor} onClose={handleCloseModal} />
    </div>
  );
};

export default SponsorsClient;
