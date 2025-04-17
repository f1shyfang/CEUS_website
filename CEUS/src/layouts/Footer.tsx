import React from 'react';
import facebookIcon from '../assets/images/facebook_icon.svg';
import instagramIcon from '../assets/images/instagram_icon.svg';
import linkedinIcon from '../assets/images/linkedin_icon.svg';
import arcIcon from '../assets/images/Arc_icon.png';

const Footer: React.FC = () => {
  return (
    // bg-[#1B397E], padding py-3 (12px ~ 10px) px-5 (20px)
    <footer className="FooterContainer bg-[#1B397E] py-3 px-5 text-white"> 
      {/* Flex layout, responsive direction, space-between */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Copyright color text-white/50 */}
        <div className="FooterCopyright mb-3 md:mb-0 text-white/50"> 
          © 2024 UNSW CEUS. All Rights Reserved.
        </div>
        {/* Social links using flex and space-x instead of margin */}
        {/* space-x-12 approximates the 50px margin */}
        <div className="SocialLinkFoot flex items-center space-x-12"> 
          <a href="https://www.facebook.com/ceus.unsw" target="_blank" rel="noopener noreferrer"> 
             {/* height: 30px -> h-7 (28px) or h-8 (32px). Let's use h-7. w-auto */}
            <img src={facebookIcon} alt="Facebook" className="h-7 w-auto transition-opacity duration-200 hover:opacity-75" /> 
          </a>
          <a href="https://www.instagram.com/ceus.unsw/" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="h-7 w-auto transition-opacity duration-200 hover:opacity-75" />
          </a>
          <a href="https://www.linkedin.com/company/ceusunsw/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" className="h-7 w-auto transition-opacity duration-200 hover:opacity-75" />
          </a>
          <a href="https://www.arc.unsw.edu.au/get-involved/opportunity?name=Chemical%20Engineering%20Undergraduate%20Society" target="_blank" rel="noopener noreferrer">
            <img src={arcIcon} alt="Arc UNSW" className="h-7 w-auto transition-opacity duration-200 hover:opacity-75" />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;