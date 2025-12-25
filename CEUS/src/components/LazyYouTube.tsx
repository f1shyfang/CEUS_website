'use client'
import React, { useState } from 'react';
import Image from 'next/image';

interface LazyYouTubeProps {
  videoId: string;
  title: string;
}

/**
 * LazyYouTube - A performance-optimized YouTube embed
 * Shows a thumbnail and play button, only loads the iframe when clicked.
 * This improves LCP and reduces initial page load by ~500KB.
 */
const LazyYouTube: React.FC<LazyYouTubeProps> = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (isLoaded) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      onClick={() => setIsLoaded(true)}
      className="absolute inset-0 w-full h-full cursor-pointer group focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
      aria-label={`Play video: ${title}`}
    >
      {/* Thumbnail */}
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
      
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300">
          <svg 
            className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default React.memo(LazyYouTube);
