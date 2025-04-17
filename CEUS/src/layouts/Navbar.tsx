// src/layouts/Navbar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink

const Navbar: React.FC = () => {
  
  // Helper function to define active/inactive classes
  const linkClasses = ({ isActive }: { isActive: boolean }): string => {
    const baseClasses = "px-4 py-2 text-lg font-extrabold transition-colors duration-200";
    const activeClasses = "text-[#1B397E]"; // Active color
    const inactiveClasses = "text-black hover:text-[#1B397E]"; // Inactive + hover
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="navbar flex items-center"> 
      <NavLink to="/" className={linkClasses}>Home</NavLink> 
      <NavLink to="/about" className={linkClasses}>About</NavLink>
      <NavLink to="/events" className={linkClasses}>Events</NavLink>
      <NavLink to="/publications" className={linkClasses}>Publications</NavLink>
      <NavLink to="/contact" className={linkClasses}>Contact Us</NavLink> {/* Match path in App.tsx */}
    </nav>
  );
};

export default Navbar;