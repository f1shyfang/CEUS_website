import React from 'react';
import Navbar from './Navbar'; 
import logoImage from '../assets/images/ceuslogo_noback_noname.png'; 

const Header: React.FC = () => {
  return (
    // Removed head_bar div, apply styles directly to header
    // bg-white, flex layout, centering, padding matching original somewhat
    <header className="bg-white w-full flex justify-between items-center py-2 px-6 shadow-sm"> {/* Simplified padding, added shadow */}
      <div className="logo"> {/* No specific Tailwind needed if parent handles layout */}
        <a href="index.html">
          {/* CSS width: 100px -> w-24 (96px) or w-28(112px). Using h-auto */}
          <img id="logoimg" src={logoImage} alt="CEUS Logo" className="w-24 h-auto" /> 
        </a>
      </div>
      <Navbar /> 
    </header>
  );
};

export default Header;