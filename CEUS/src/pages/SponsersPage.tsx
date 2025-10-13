'use client'
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHandshake, FaStar, FaUsers, FaBuilding, FaExternalLinkAlt } from 'react-icons/fa';
import { Sponsor as SponsorType } from '../types';
import { allSponsors } from '../data/sponsorData';
import SponsorLogo from '../components/SponsorLogo';
import SponsorModal from '../components/SponsorModal';

const SponsorsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<SponsorType | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);

  // Filter sponsors by tier
  const mainSponsor = useMemo(() => allSponsors.find(s => s.id === 'ansto'), []);
  const majorSponsors = useMemo(() => allSponsors.filter(s => s.tier === 'Major' && s.id !== 'ansto'), []);
  const supportingSponsors = useMemo(() => allSponsors.filter(s => s.tier === 'Supporting'), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    [heroRef.current, sponsorsRef.current].forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

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
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/images/assets/Ceus_ball_group_edited.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
              <FaHandshake className="text-3xl" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Our Sponsors
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              We're grateful for the continued support of our sponsors who make our events and initiatives possible. 
              Their contributions help us create valuable opportunities for Chemical Engineering students at UNSW.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Become a Sponsor
            </Link>
            <Link
              href="/events"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              View Our Events
            </Link>
          </div>
        </div>
      </section>

      {/* Main Sponsor Section */}
      {mainSponsor && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6">
                <FaStar className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Gold Partner
              </h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{mainSponsor.name}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {mainSponsor.description || 'Our principal sponsor providing exceptional support to CEUS and our student community.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href={mainSponsor.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300"
                    >
                      Visit Website
                      <FaExternalLinkAlt className="ml-2" />
                    </a>
                    <button
                      onClick={() => handleLogoClick(mainSponsor)}
                      className="inline-flex items-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-64 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-6 hover:shadow-xl transition-all duration-300">
                    <Image
                      src={mainSponsor.logoUrl}
                      alt={`${mainSponsor.name} logo`}
                      width={200}
                      height={100}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Major Sponsors Section */}
      {majorSponsors.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
                <FaBuilding className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Major Sponsors
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our major sponsors provide significant support to our initiatives and events
              </p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {majorSponsors.map(sponsor => (
                <div key={sponsor.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-48 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                      <Image
                        src={sponsor.logoUrl}
                        alt={`${sponsor.name} logo`}
                        width={180}
                        height={80}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{sponsor.name}</h3>
                  <p className="text-gray-600 text-center mb-6">
                    {sponsor.description || 'Supporting CEUS initiatives and student development.'}
                  </p>
                  <div className="flex justify-center gap-4">
                    <a
                      href={sponsor.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all duration-300"
                    >
                      Website
                      <FaExternalLinkAlt className="ml-1" />
                    </a>
                    <button
                      onClick={() => handleLogoClick(sponsor)}
                      className="inline-flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Supporting Sponsors Section */}
      {supportingSponsors.length > 0 && (
        <section ref={sponsorsRef} className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Supporting Sponsors
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our valued partners who support our community and initiatives
              </p>
              <div className="w-24 h-1 bg-green-600 mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {supportingSponsors.map(sponsor => (
                <div key={sponsor.id} className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-20 bg-white rounded-xl flex items-center justify-center p-3">
                      <Image
                        src={sponsor.logoUrl}
                        alt={`${sponsor.name} logo`}
                        width={120}
                        height={60}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">{sponsor.name}</h3>
                  <div className="flex justify-center gap-2">
                    <a
                      href={sponsor.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-700 transition-all duration-300"
                    >
                      Visit
                    </a>
                    <button
                      onClick={() => handleLogoClick(sponsor)}
                      className="inline-flex items-center border border-green-600 text-green-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
                    >
                      Info
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Become a Sponsor Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Interested in Sponsoring CEUS?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Partner with CEUS to connect with talented Chemical Engineering students at UNSW and support the next generation of engineers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get In Touch
            </Link>
            <Link
              href="/events"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              View Our Events
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsor Modal */}
      <SponsorModal
        isOpen={isModalOpen}
        sponsor={selectedSponsor}
        onClose={handleCloseModal}
      />

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SponsorsPage;