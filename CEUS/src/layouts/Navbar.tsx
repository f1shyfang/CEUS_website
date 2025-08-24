'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  // Active/inactive link classes
  const linkClasses = (path: string): string => {
    const baseClasses =
      "px-4 py-2 text-lg font-extrabold transition-colors duration-200 whitespace-nowrap";
    const activeClasses = "text-[#1B397E]";
    const inactiveClasses = "text-black hover:text-[#1B397E]";
    return `${baseClasses} ${pathname === path ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="flex flex-wrap gap-2 justify-end">
      <Link href="/" className={linkClasses('/')}>Home</Link>
      <Link href="/about" className={linkClasses('/about')}>About</Link>
      <Link href="/team" className={linkClasses('/team')}>Team</Link>
      <Link href="/events" className={linkClasses('/events')}>Events</Link>
      <Link href="/publications" className={linkClasses('/publications')}>Publications</Link>
      <Link href="/sponsors" className={linkClasses('/sponsors')}>Sponsors</Link>
      <Link href="/3d-scene" className={linkClasses('/3d-scene')}>3D Lab</Link>
      <Link href="/contact" className={linkClasses('/contact')}>Contact Us</Link>
    </nav>
  );
};

export default Navbar;
