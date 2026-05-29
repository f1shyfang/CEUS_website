import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={cn("animate-pulse bg-gray-200 rounded", className)} />
);

export const EventSkeleton: React.FC = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
    <div className="relative h-56 w-full">
      <Skeleton className="h-full w-full rounded-none" />
      <Skeleton className="absolute left-4 top-4 h-6 w-20 rounded-full bg-gray-300" />
    </div>
    <div className="flex flex-grow flex-col p-6">
      <Skeleton className="mb-3 h-4 w-2/5" />
      <Skeleton className="mb-2 h-5 w-3/4" />
      <Skeleton className="mb-4 h-5 w-1/2" />
      <div className="mb-6 flex-grow space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  </div>
);

export const EventHomeSkeleton: React.FC = () => (
  <div className="px-4">
    <Skeleton className="h-[260px] w-full rounded-lg" />
    <Skeleton className="mx-auto mt-5 h-6 w-3/4" />
    <Skeleton className="mx-auto mt-2 h-4 w-1/2" />
  </div>
);

export const TeamSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
    <Skeleton className="w-32 h-32 rounded-full mb-4" />
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

export const SponsorSkeleton: React.FC = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center">
    <Skeleton className="w-32 h-20 mb-4" />
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-3 w-1/2" />
  </div>
);
