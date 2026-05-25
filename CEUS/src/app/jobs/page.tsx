import React from 'react';
import { Job } from '../../types';
import { fetchJobs } from '../../lib/supabase';
import JobsClient from './JobsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Board',
  description: 'Explore career opportunities, internships, and graduate positions curated for CEUS students.',
};

export const revalidate = 3600;

export default async function JobsPage() {
  let jobs: Job[] = [];
  try {
    jobs = await fetchJobs();
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
  }

  return <JobsClient jobs={jobs} />;
}
