import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar'; 
// Logo image is now served from public folder 

const Header: React.FC = () => {
  return (
    // Removed head_bar div, apply styles directly to header
    // bg-white, flex layout, centering, padding matching original somewhat
    <header className="bg-white w-full flex justify-between items-center py-2 px-6 shadow-sm"> {/* Simplified padding, added shadow */}
      <div className="logo"> {/* No specific Tailwind needed if parent handles layout */}
        <Link href="/">
          {/* CSS width: 100px -> w-24 (96px) or w-28(112px). Using h-auto */}
          <Image id="logoimg" src="/images/assets/ceuslogo_noback_noname.png" alt="CEUS Logo" width={96} height={96} className="w-24 h-auto" /> 
        </Link>
      </div>
      <Navbar /> 
    </header>
  );
};

export default Header;