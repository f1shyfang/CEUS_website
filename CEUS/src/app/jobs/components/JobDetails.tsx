'use client';
import React, { useState } from 'react';
import { Job } from '../../../types';
import {
  FaMapPin,
  FaBriefcase,
  FaBuilding,
  FaCalendar,
  FaIdCard,
  FaExternalLinkAlt,
  FaCopy,
  FaCheck,
  FaRobot,
  FaBookOpen,
} from 'react-icons/fa';
import { cn, formatEventDate } from '../../../lib/utils';
import CompanyLogo from './CompanyLogo';
import posthog from 'posthog-js';

interface JobDetailsProps {
  job?: Job | null;
}

function InfoTag({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-blue-50 py-1 px-2.5 rounded-lg text-sm text-gray-700">
      <span className="text-blue-500">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
      <span className="text-blue-600">{icon}</span>
      {title}
    </div>
  );
}

export default function JobDetails({ job }: JobDetailsProps) {
  const [copied, setCopied] = useState(false);

  if (!job) {
    return (
      <div className="h-full rounded-xl border border-gray-100 bg-white shadow-lg flex items-center justify-center p-10 text-center">
        <div className="text-gray-400 text-sm">Select a job to see the details.</div>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      const url =
        typeof window !== 'undefined' ? `${window.location.origin}/jobs#${job.id}` : '';
      await navigator.clipboard.writeText(url);
      setCopied(true);
      posthog.capture('job_link_copied', {
        job_id: job.id,
        job_title: job.title,
        company_name: job.company.name,
      });
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      /* no-op */
    }
  };

  const postedLabel = formatEventDate(job.createdAt, 'MMM d, yyyy');
  const closeLabel = job.closeDate ? formatEventDate(job.closeDate, 'MMM d, yyyy') : '';
  const locationsLabel = job.locations.join(', ');
  const workingRightsLabel = job.workingRights.join(', ');

  return (
    <div className="h-full rounded-xl border border-gray-100 bg-white shadow-lg flex flex-col p-5 sm:p-6">
      <div className="flex-grow overflow-y-auto pr-1 -mr-1">
        <div className="flex justify-between w-full gap-4">
          <div className="flex flex-col min-w-0">
            <span className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
              {job.title}
            </span>
            {job.company.website ? (
              <a
                href={job.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-blue-600 hover:text-blue-800 mt-1 text-sm w-fit"
              >
                {job.company.name}
              </a>
            ) : (
              <span className="text-gray-600 mt-1 text-sm">{job.company.name}</span>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              {locationsLabel && (
                <InfoTag icon={<FaMapPin className="w-3.5 h-3.5" />} text={locationsLabel} />
              )}
              <InfoTag
                icon={<FaCalendar className="w-3.5 h-3.5" />}
                text={`Found ${postedLabel}`}
              />
              {closeLabel && (
                <InfoTag
                  icon={<FaCalendar className="w-3.5 h-3.5" />}
                  text={`Closes ${closeLabel}`}
                />
              )}
              {job.type && (
                <InfoTag icon={<FaBriefcase className="w-3.5 h-3.5" />} text={`${job.type} Role`} />
              )}
              {job.industryField && (
                <InfoTag icon={<FaBuilding className="w-3.5 h-3.5" />} text={job.industryField} />
              )}
              {workingRightsLabel && (
                <InfoTag icon={<FaIdCard className="w-3.5 h-3.5" />} text={workingRightsLabel} />
              )}
            </div>
          </div>

          <CompanyLogo
            name={job.company.name}
            logo={job.company.logo}
            applicationUrl={job.applicationUrl}
            className="h-12 w-12 lg:h-16 lg:w-16"
          />
        </div>

        {job.oneLiner && (
          <div className="mt-5">
            <SectionHeading icon={<FaRobot className="w-3.5 h-3.5" />} title="Summary" />
            <p className="mt-2 lg:ml-6 text-sm text-gray-600 leading-relaxed">{job.oneLiner}</p>
          </div>
        )}

        {job.description && (
          <div className="mt-5">
            <SectionHeading icon={<FaBookOpen className="w-3.5 h-3.5" />} title="Job Description" />
            <p className="mt-2 lg:ml-6 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>
        )}

        {job.sourceUrls && job.sourceUrls.length > 0 && (
          <div className="mt-5">
            <SectionHeading icon={<FaExternalLinkAlt className="w-3 h-3" />} title="Sources" />
            <ul className="mt-2 lg:ml-6 space-y-1 text-sm">
              {job.sourceUrls.map((u) => (
                <li key={u}>
                  <a
                    href={u}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {u}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <a
          href={job.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => posthog.capture('job_applied', {
            job_id: job.id,
            job_title: job.title,
            company_name: job.company.name,
            job_type: job.type,
            industry_field: job.industryField,
          })}
          className={cn(
            'flex-grow inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg',
            'bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all'
          )}
        >
          <FaExternalLinkAlt className="w-3.5 h-3.5" />
          Apply Now
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg',
            'bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors',
            'min-w-[44px]'
          )}
        >
          {copied ? <FaCheck className="w-3.5 h-3.5" /> : <FaCopy className="w-3.5 h-3.5" />}
          <span className="hidden lg:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
}
