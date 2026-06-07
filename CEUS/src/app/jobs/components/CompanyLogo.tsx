'use client';
import React, { useState } from 'react';
import { cn } from '../../../lib/utils';

interface CompanyLogoProps {
  name: string;
  logo?: string;
  applicationUrl?: string;
  className?: string;
}

const SKIP_DOMAINS = [
  'bit.ly',
  'tinyurl.com',
  'goo.gl',
  'gradconnection.com',
  'gradconnect.com',
  'prosple.com',
  'linkedin.com',
  'lnkd.in',
  'surveymonkey.com',
  'forms.gle',
];

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

function shouldSkipUrl(url: string): boolean {
  const domain = extractDomain(url);
  if (!domain) return true;
  return SKIP_DOMAINS.some((d) => domain.includes(d));
}

export default function CompanyLogo({ name, logo, applicationUrl, className }: CompanyLogoProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [clearbitFailed, setClearbitFailed] = useState(false);

  const baseClasses = 'object-contain rounded-md bg-white flex-shrink-0';

  if (logo && !logoFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={name || 'Company'}
        className={cn(baseClasses, className)}
        onError={() => setLogoFailed(true)}
        loading="lazy"
      />
    );
  }

  if (applicationUrl && !shouldSkipUrl(applicationUrl) && !clearbitFailed) {
    const domain = extractDomain(applicationUrl);
    if (domain) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name || 'Company'}
          className={cn(baseClasses, className)}
          onError={() => setClearbitFailed(true)}
          loading="lazy"
        />
      );
    }
  }

  return (
    <div
      className={cn(
        baseClasses,
        'flex items-center justify-center text-gray-700 font-bold',
        className
      )}
    >
      <span>{name ? name.charAt(0).toUpperCase() : '?'}</span>
    </div>
  );
}
