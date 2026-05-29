// src/app/team/page.tsx
import React from 'react';
import { fetchTeamCategories } from '../../lib/supabase';
import TeamClient from './TeamClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Team',
  description:
    'The 2026 CEUS committee at UNSW. Meet the executives, year reps, and portfolio teams behind every event, post, and industry night.',
};

export const revalidate = 3600;

export default async function TeamPage() {
  const categories = await fetchTeamCategories();

  return <TeamClient categories={categories} />;
}
