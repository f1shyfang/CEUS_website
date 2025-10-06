'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Active/inactive link classes
  const linkClasses = (path: string): string => {
    const baseClasses =
      "px-4 py-3 text-lg font-extrabold transition-colors duration-200 block w-full text-left";
    const activeClasses = "text-[#1B397E]";
    const inactiveClasses = "text-black hover:text-[#1B397E]";
    return `${baseClasses} ${pathname === path ? activeClasses : inactiveClasses}`;
  };

  // Mobile link classes (for hamburger menu)
  const mobileLinkClasses = (path: string): string => {
    const baseClasses =
      "block px-4 py-3 text-lg font-extrabold transition-colors duration-200 hover:bg-gray-50";
    const activeClasses = "text-[#1B397E] bg-blue-50";
    const inactiveClasses = "text-black hover:text-[#1B397E]";
    return `${baseClasses} ${pathname === path ? activeClasses : inactiveClasses}`;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-wrap gap-2 justify-end">
        <Link href="/" className={linkClasses('/')}>Home</Link>
        <Link href="/team" className={linkClasses('/team')}>Team</Link>
        <Link href="/events" className={linkClasses('/events')}>Events</Link>
        <Link href="/publications" className={linkClasses('/publications')}>Publications</Link>
        <Link href="/sponsors" className={linkClasses('/sponsors')}>Sponsors</Link>
        <Link href="/contact" className={linkClasses('/contact')}>Contact Us</Link>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="p-2 text-black hover:text-[#1B397E] transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="py-2">
              <Link href="/" className={mobileLinkClasses('/')} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/team" className={mobileLinkClasses('/team')} onClick={() => setIsMenuOpen(false)}>
                Team
              </Link>
              <Link href="/events" className={mobileLinkClasses('/events')} onClick={() => setIsMenuOpen(false)}>
                Events
              </Link>
              <Link href="/publications" className={mobileLinkClasses('/publications')} onClick={() => setIsMenuOpen(false)}>
                Publications
              </Link>
              <Link href="/sponsors" className={mobileLinkClasses('/sponsors')} onClick={() => setIsMenuOpen(false)}>
                Sponsors
              </Link>
              <Link href="/contact" className={mobileLinkClasses('/contact')} onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
