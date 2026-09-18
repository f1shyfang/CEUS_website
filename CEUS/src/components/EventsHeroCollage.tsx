'use client';
// src/components/EventsHeroCollage.tsx
import React from 'react';
import { cn } from '../lib/utils';

// The photos are dealt out across the columns rather than repeated in each, so
// no photo shows up in two columns at once. Every column keeps its own speed so
// the treadmill reads as a collage rather than one sliding sheet.
const COLUMNS = [
  { duration: 76, visibility: '' },
  { duration: 68, visibility: '' },
  { duration: 80, visibility: 'hidden sm:block' },
  { duration: 74, visibility: 'hidden md:block' },
  { duration: 60, visibility: 'hidden lg:block' },
  { duration: 66, visibility: 'hidden xl:block' },
];

// A column's photos repeat until the loop is at least this many tiles, as a
// tile is about as wide as the column and the hero is several tiles tall. With
// fewer than this a short column would run out of photos and show a gap.
const MIN_TILES_PER_LOOP = 5;

// Dealt round-robin, so the columns differ by at most one photo and each photo
// lands in exactly one column.
const dealIntoColumns = (photos: string[], columnCount: number): string[][] => {
  const columns: string[][] = Array.from({ length: columnCount }, () => []);
  photos.forEach((photo, index) => columns[index % columnCount].push(photo));
  return columns;
};

// The track holds its photos twice over; sliding it up by exactly half its
// height lands on an identical frame, so the loop has no visible seam.
const buildTrack = (columnPhotos: string[]): string[] => {
  const repeats = Math.ceil(MIN_TILES_PER_LOOP / columnPhotos.length);
  const loop = Array.from({ length: repeats }, () => columnPhotos).flat();
  return [...loop, ...loop];
};

interface EventsHeroCollageProps {
  // Resolved by the events server component, so the photos are in the first
  // paint. Passing them in avoids a client-side swap after hydration.
  photos: string[];
}

const EventsHeroCollage: React.FC<EventsHeroCollageProps> = ({ photos }) => {
  // Fewer photos than columns would leave the tail columns empty, so only as
  // many columns as there are photos are laid out.
  const columnCount = Math.min(COLUMNS.length, photos.length);
  const dealtColumns = dealIntoColumns(photos, Math.max(columnCount, 1));

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-blue-600">
      {/* No photos (an empty folder, or a listing the anon role can't read)
          leaves the blue background and overlays, which the headline sits on. */}
      {photos.length > 0 && (
        <div className="flex h-full w-full gap-3 sm:gap-4">
          {COLUMNS.slice(0, columnCount).map(({ duration, visibility }, columnIndex) => {
            const track = buildTrack(dealtColumns[columnIndex]);

            return (
              <div key={columnIndex} className={cn('flex-1 min-w-0 overflow-hidden', visibility)}>
                <div
                  className="flex w-full flex-col animate-collage-scroll motion-reduce:animate-none"
                  style={{ animationDuration: `${duration}s` }}
                >
                  {track.map((src, index) => (
                    <div
                      key={`${src}-${index}`}
                      className="w-full aspect-square overflow-hidden bg-blue-800 mb-3 sm:mb-4"
                    >
                      {/* next/image cannot optimise these while
                          images.unoptimized is set in next.config.js, so the
                          collage uses plain img elements and relies on the
                          stored photos being sized for display. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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
