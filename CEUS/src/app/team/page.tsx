// src/app/team/page.tsx
import React from 'react';
import { fetchTeamCategories } from '../../lib/supabase';
import TeamClient from './TeamClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the dedicated students who run the Chemical Engineering Undergraduate Society at UNSW.',
};

export const revalidate = 3600;

export default async function TeamPage() {
  const categories = await fetchTeamCategories();

  return <TeamClient categories={categories} />;
}
