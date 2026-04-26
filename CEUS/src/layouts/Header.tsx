import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';
import { STATIC_ASSET_URLS } from '../lib/storagePublicUrls';

const Header: React.FC = () => {
  return (
    <header className="bg-white w-full flex justify-between items-center py-2 px-6 shadow-sm">
      {/* Logo on the left */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image
            id="logoimg"
            src={STATIC_ASSET_URLS.logo}
            alt="CEUS Logo"
            width={96}
            height={96}
            className="w-24 h-auto"
          />
        </Link>
      </div>

      {/* Navbar pushed to far right */}
      <div className="flex-1 flex justify-end ml-4">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
