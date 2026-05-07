import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={cn("animate-pulse bg-gray-200 rounded", className)} />
);

export const EventSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
    <Skeleton className="h-56 w-full" />
    <div className="p-6">
      <Skeleton className="h-4 w-1/3 mb-3" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
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
