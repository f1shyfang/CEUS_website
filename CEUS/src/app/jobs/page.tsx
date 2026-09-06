import React from 'react';
import { Metadata } from 'next';
import { fetchJobs } from '../../lib/supabase';
import { Job } from '../../types';
import JobsClient from './JobsClient';
import { buildJobPostingListSchema, pageMetadata } from '../../lib/seo';
import { JsonLd } from '../../components/JsonLd';
import { PageBreadcrumbs } from '../../components/PageBreadcrumbs';

export const metadata: Metadata = pageMetadata(
  'Jobs',
  'Chemical engineering internships, graduate programs, and vacation roles in Sydney — curated job listings for CEUS members at UNSW.',
  '/jobs',
);

export const revalidate = 600;

export default async function JobsPage() {
  let jobs: Job[] = [];
  const today = new Date();
  try {
    const allJobs = await fetchJobs();
    jobs = allJobs.filter(job => !job.closeDate || new Date(job.closeDate) > today);
  } catch (error) {
    console.error('Error loading jobs:', error);
  }

  return (
    <>
      <JsonLd data={buildJobPostingListSchema(jobs)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <PageBreadcrumbs pathname="/jobs" />
      </div>
      <JobsClient jobs={jobs} />
    </>
  );
}
