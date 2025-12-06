// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Event, Sponsor, TeamCategory, Member } from '../types';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type EventRow = {
  id: string;
  title: string;
  date: string;
  image_url: string | null;
  facebook_event_link: string | null;
  description: string | null;
  category: Event['category'];
};

type SponsorRow = {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  tier: Sponsor['tier'];
  featured: boolean | null;
};

type TeamMemberRow = {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  category: string;
  sort_order: number;
};

export async function fetchEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, date, image_url, facebook_event_link, description, category')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  return (data as EventRow[] | null ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    date: row.date,
    imageUrl: row.image_url || '/images/events/default-event-placeholder.png',
    facebookEventLink: row.facebook_event_link || '#',
    description: row.description || '',
    category: row.category,
  }));
}

export async function fetchSponsors(): Promise<Sponsor[]> {
  const { data, error } = await supabase
    .from('sponsors')
    .select('id, name, logo_url, website_url, description, tier, featured');

  if (error) {
    console.error('Error fetching sponsors:', error);
    throw error;
  }

  return (data as SponsorRow[] | null ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    logoUrl: row.logo_url || '',
    websiteUrl: row.website_url || '#',
    description: row.description || '',
    tier: row.tier,
    featured: Boolean(row.featured),
  }));
}

export async function fetchTeamCategories(): Promise<TeamCategory[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('id, name, role, image_url, email, linkedin_url, category, sort_order')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }

  const grouped: Record<string, Member[]> = {};
  (data as TeamMemberRow[] | null ?? []).forEach((row) => {
    const member: Member = {
      id: row.id,
      name: row.name,
      role: row.role,
      imageUrl: row.image_url || undefined,
      email: row.email || undefined,
      linkedInUrl: row.linkedin_url || undefined,
    };
    if (!grouped[row.category]) {
      grouped[row.category] = [];
    }
    grouped[row.category].push(member);
  });

  return Object.entries(grouped).map(([name, members]) => ({
    name,
    members,
  }));
}

// Type definition for contact form submissions
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  status?: 'new' | 'read' | 'replied';
}

// Function to submit contact form data
export async function submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) {
  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert([
      {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: 'new',
      },
    ])
    .select();

  if (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }

  return result;
}

// Function to get all contact submissions (for admin dashboard in future)
export async function getContactSubmissions() {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact submissions:', error);
    throw error;
  }

  return data;
}

// Function to update submission status (for admin use)
export async function updateSubmissionStatus(id: string, status: 'new' | 'read' | 'replied') {
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating submission status:', error);
    throw error;
  }

  return data;
}

