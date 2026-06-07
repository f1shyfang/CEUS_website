import React from 'react';
import { Metadata } from 'next';
import { fetchJobs } from '../../lib/supabase';
import { Job } from '../../types';
import JobsClient from './JobsClient';

export const metadata: Metadata = {
  title: 'Jobs',
  description: 'Chemical engineering internships, graduate programs, and roles for CEUS members.',
};

export const revalidate = 600;

export default async function JobsPage() {
  let jobs: Job[] = [];
  try {
    jobs = await fetchJobs();
  } catch (error) {
    console.error('Error loading jobs:', error);
  }

  return <JobsClient jobs={jobs} />;
}
