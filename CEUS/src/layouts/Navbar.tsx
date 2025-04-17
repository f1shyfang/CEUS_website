import React from 'react';

// TODO: Replace <a> with <Link> from react-router-dom in Phase 5
const Navbar: React.FC = () => {
  return (
    // Use flex and control spacing between links via padding on the links
    <nav className="navbar flex items-center"> {/* Removed space-x, added items-center */}
      {/* Added px-4 py-2 for padding around links, text-lg (18px), font-extrabold (800) */}
      <a href="index.html" className="text-black hover:text-[#1B397E] px-4 py-2 text-lg font-extrabold">Home</a> 
      <a href="about.html" className="text-black hover:text-[#1B397E] px-4 py-2 text-lg font-extrabold">About</a>
      <a href="events.html" className="text-black hover:text-[#1B397E] px-4 py-2 text-lg font-extrabold">Events</a>
      <a href="publication.html" className="text-black hover:text-[#1B397E] px-4 py-2 text-lg font-extrabold">Publications</a>
      <a href="contactus.html" className="text-black hover:text-[#1B397E] px-4 py-2 text-lg font-extrabold">Contact Us</a>
    </nav>
  );
};

export default Navbar;