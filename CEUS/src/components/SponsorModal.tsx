// src/components/SponsorModal.tsx
'use client'
import React, { useEffect } from 'react';
import { Sponsor } from '../types';
import { gsap } from 'gsap';

interface SponsorModalProps {
  sponsor: Sponsor | null; // Sponsor data or null if closed
  isOpen: boolean;
  onClose: () => void; // Function to close the modal
}

const SponsorModal: React.FC<SponsorModalProps> = ({ sponsor, isOpen, onClose }) => {
  // Handle Escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden';
      // Animate modal entrance
      gsap.to(".sponsor-modal-content", { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(".sponsor-modal-overlay", { opacity: 1, duration: 0.3 });

    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Ensure scroll is restored
    };
  }, [isOpen, onClose]);


  if (!isOpen || !sponsor) {
    return null; // Don't render anything if modal is closed or no sponsor data
  }


  // Animate modal exit before unmounting (could be more sophisticated)
  const handleCloseAnimation = () => {
      gsap.to(".sponsor-modal-content", { opacity: 0, scale: 0.9, duration: 0.2, ease: "power1.in", onComplete: onClose });
      gsap.to(".sponsor-modal-overlay", { opacity: 0, duration: 0.2 });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sponsor-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <div
         className="sponsor-modal-overlay fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
         onClick={handleCloseAnimation} // Close when overlay is clicked
         style={{ opacity: 0 }} // Initial state for GSAP
      ></div>

      {/* Modal Content */}
      <div
         className="sponsor-modal-content relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
         style={{ opacity: 0, scale: 0.9 }} // Initial state for GSAP
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <h2 id="sponsor-modal-title" className="text-2xl font-bold text-gray-800">
              {sponsor.name}
            </h2>
            <button
              onClick={handleCloseAnimation}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-1"
              aria-label="Close sponsor details"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Optional: Display logo again inside modal if desired */}
          {/* <img src={sponsor.logoUrl} alt={`${sponsor.name} logo`} className="max-h-12 w-auto mb-4" /> */}

          <p className="text-gray-600 leading-relaxed mb-6">
            {sponsor.description}
          </p>

          <a
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group transition-colors duration-150"
          >
            Visit Website
            <svg className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SponsorModal;