'use client';
import React from 'react';
import { Job } from '../../../types';
import { cn, formatEventDate } from '../../../lib/utils';
import CompanyLogo from './CompanyLogo';

interface JobCardProps {
  job: Job;
  isSelected?: boolean;
  onClick?: () => void;
}

interface BadgeProps {
  text: string;
  variant?: 'default' | 'accent' | 'danger';
  className?: string;
}

function Badge({ text, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap',
        variant === 'accent' && 'bg-amber-100 text-amber-800',
        variant === 'danger' && 'bg-red-100 text-red-700',
        variant === 'default' && 'bg-blue-50 text-blue-700',
        className
      )}
    >
      {text}
    </span>
  );
}

export default function JobCard({ job, isSelected, onClick }: JobCardProps) {
  const postedLabel = formatEventDate(job.createdAt, 'MMM d');
  const locationsLabel =
    job.locations.length > 0
      ? job.locations.slice(0, 2).join(', ') + (job.locations.length > 2 ? ', …' : '')
      : '';

  const workingRightsLabel = (() => {
    if (!job.workingRights || job.workingRights.length === 0) return '';
    const isIntl = job.workingRights.some((r) => /international/i.test(r));
    return isIntl ? 'International' : 'Citizen / PR';
  })();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-2 shadow-sm',
        isSelected
          ? 'bg-blue-50 border-blue-400 ring-1 ring-blue-400/30 shadow-md'
          : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
      )}
    >
      <div className="flex justify-between gap-3">
        <div className="flex flex-1 min-w-0 gap-3">
          <CompanyLogo
            name={job.company.name}
            logo={job.company.logo}
            applicationUrl={job.applicationUrl}
            className="h-10 w-10 lg:h-12 lg:w-12"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm lg:text-[15px] font-bold leading-tight line-clamp-2 text-gray-900 pr-1">
              {job.title}
            </span>
            <span className="text-xs leading-tight text-gray-500 line-clamp-1 mt-0.5">
              {job.company.name}
            </span>
          </div>
        </div>
        <span className="text-[11px] text-gray-400 flex-shrink-0 mt-0.5">{postedLabel}</span>
      </div>

      {(job.oneLiner || job.description) && (
        <p className="text-xs text-gray-600 line-clamp-3 leading-snug">
          {job.oneLiner || job.description}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mt-1">
        {job.isSponsored && <Badge text="Sponsored" variant="accent" />}
        {job.type && <Badge text={job.type} />}
        {workingRightsLabel && <Badge text={workingRightsLabel} />}
        {!job.isSponsored && job.industryField && <Badge text={job.industryField} />}
        {locationsLabel && (
          <Badge text={locationsLabel} className="hidden lg:inline-flex" />
        )}
        {job.outdated && <Badge text="Outdated" variant="danger" />}
      </div>
    </button>
  );
}
