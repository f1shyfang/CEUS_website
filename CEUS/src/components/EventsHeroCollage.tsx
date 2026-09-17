'use client';
// src/components/EventsHeroCollage.tsx
import React from 'react';
import { cn } from '../lib/utils';

// Each column gets its own rotation of the photo set so neighbouring columns
// never show the same image side by side, plus its own speed so the treadmill
// reads as a collage rather than one sliding sheet.
const COLUMNS = [
  { offset: 0, duration: 46, visibility: '' },
  { offset: 3, duration: 58, visibility: '' },
  { offset: 5, duration: 40, visibility: 'hidden sm:block' },
  { offset: 1, duration: 64, visibility: 'hidden md:block' },
  { offset: 6, duration: 50, visibility: 'hidden lg:block' },
  { offset: 2, duration: 56, visibility: 'hidden xl:block' },
];

interface EventsHeroCollageProps {
  // Resolved by the events server component, so the photos are in the first
  // paint. Passing them in avoids a client-side swap after hydration.
  photos: string[];
}

const EventsHeroCollage: React.FC<EventsHeroCollageProps> = ({ photos }) => {
  // Offsets are taken modulo the set size so every column stays in range
  // whatever number of photos the folder happens to hold.
  const rotate = (offset: number) => {
    const pivot = offset % photos.length;
    return [...photos.slice(pivot), ...photos.slice(0, pivot)];
  };

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-blue-600">
      {/* No photos (an empty folder, or a listing the anon role can't read)
          leaves the blue background and overlays, which the headline sits on. */}
      {photos.length > 0 && (
        <div className="flex h-full w-full gap-3 sm:gap-4">
          {COLUMNS.map(({ offset, duration, visibility }, columnIndex) => {
            const columnPhotos = rotate(offset);

            return (
              <div key={columnIndex} className={cn('flex-1 min-w-0 overflow-hidden', visibility)}>
                {/* The track holds the photo set twice; sliding it down by exactly
                    half its height lands on an identical frame, so the loop is seamless. */}
                <div
                  className="flex w-full flex-col animate-collage-scroll motion-reduce:animate-none"
                  style={{ animationDuration: `${duration}s` }}
                >
                  {[...columnPhotos, ...columnPhotos].map((src, index) => (
                    <div
                      key={`${src}-${index}`}
                      className="w-full aspect-square overflow-hidden bg-blue-800 mb-3 sm:mb-4"
                    >
                      <img
                        src={src}
                        alt=""
                        loading={columnIndex < 2 && index < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Blue wash keeps the bars on-brand and the headline readable over the photos. */}
      <div className="absolute inset-0 bg-blue-900/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/65 via-blue-950/20 to-blue-950/70" />
      {/* Extra depth right behind the headline, so it never fights a busy poster. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,32,84,0.8)_0%,rgba(12,32,84,0.45)_38%,rgba(12,32,84,0)_70%)]" />
    </div>
  );
};

export default EventsHeroCollage;
