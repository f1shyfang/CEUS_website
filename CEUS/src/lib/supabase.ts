// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Event, Sponsor, TeamCategory, Member } from '../types';
import { STORAGE_IMAGE_URLS } from './storagePublicUrls';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// Authentication Helpers
// ============================================

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }

  return true;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    throw error;
  }

  return data.session;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting user:', error);
    return null;
  }

  return data.user;
}

// Subscribe to auth state changes
export function onAuthStateChange(callback: (event: string, session: unknown) => void) {
  return supabase.auth.onAuthStateChange(callback);
}

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
    imageUrl: getImageUrl(
      row.image_url,
      getStorageUrl(STORAGE_BUCKETS.EVENTS, 'events/default-event-placeholder.png'),
      STORAGE_BUCKETS.EVENTS
    ),
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
    logoUrl: getImageUrl(row.logo_url, '', STORAGE_BUCKETS.SPONSORS),
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
      imageUrl: getImageUrl(
        row.image_url,
        getStorageUrl(STORAGE_BUCKETS.TEAM, 'team/no_profile_img.jpg'),
        STORAGE_BUCKETS.TEAM
      ),
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

// Function to delete a contact submission
export async function deleteContactSubmission(id: string) {
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting contact submission:', error);
    throw error;
  }

  return true;
}

// ============================================
// Events CRUD Operations
// ============================================

export interface EventInput {
  title: string;
  date: string;
  description: string;
  category: Event['category'];
  imageUrl?: string;
  facebookEventLink?: string;
}

export async function createEvent(event: EventInput) {
  const { data, error } = await supabase
    .from('events')
    .insert([
      {
        title: event.title,
        date: event.date,
        image_url: event.imageUrl || null,
        facebook_event_link: event.facebookEventLink || null,
        description: event.description,
        category: event.category,
      },
    ])
    .select();

  if (error) {
    console.error('Error creating event:', error);
    throw error;
  }

  return data[0];
}

export async function updateEvent(id: string, event: Partial<EventInput>) {
  const updateData: Record<string, unknown> = {};
  if (event.title !== undefined) updateData.title = event.title;
  if (event.date !== undefined) updateData.date = event.date;
  if (event.imageUrl !== undefined) updateData.image_url = event.imageUrl;
  if (event.facebookEventLink !== undefined) updateData.facebook_event_link = event.facebookEventLink;
  if (event.description !== undefined) updateData.description = event.description;
  if (event.category !== undefined) updateData.category = event.category;

  const { data, error } = await supabase
    .from('events')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating event:', error);
    throw error;
  }

  return data[0];
}

export async function deleteEvent(id: string) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    throw error;
  }

  return true;
}

// ============================================
// Sponsors CRUD Operations
// ============================================

export interface SponsorInput {
  name: string;
  description: string;
  tier: Sponsor['tier'];
  logoUrl?: string;
  websiteUrl?: string;
  featured?: boolean;
}

export async function createSponsor(sponsor: SponsorInput) {
  const { data, error } = await supabase
    .from('sponsors')
    .insert([
      {
        name: sponsor.name,
        logo_url: sponsor.logoUrl || null,
        website_url: sponsor.websiteUrl || null,
        description: sponsor.description,
        tier: sponsor.tier,
        featured: sponsor.featured || false,
      },
    ])
    .select();

  if (error) {
    console.error('Error creating sponsor:', error);
    throw error;
  }

  return data[0];
}

export async function updateSponsor(id: string, sponsor: Partial<SponsorInput>) {
  const updateData: Record<string, unknown> = {};
  if (sponsor.name !== undefined) updateData.name = sponsor.name;
  if (sponsor.logoUrl !== undefined) updateData.logo_url = sponsor.logoUrl;
  if (sponsor.websiteUrl !== undefined) updateData.website_url = sponsor.websiteUrl;
  if (sponsor.description !== undefined) updateData.description = sponsor.description;
  if (sponsor.tier !== undefined) updateData.tier = sponsor.tier;
  if (sponsor.featured !== undefined) updateData.featured = sponsor.featured;

  const { data, error } = await supabase
    .from('sponsors')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating sponsor:', error);
    throw error;
  }

  return data[0];
}

export async function deleteSponsor(id: string) {
  const { error } = await supabase
    .from('sponsors')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting sponsor:', error);
    throw error;
  }

  return true;
}

// ============================================
// Team Members CRUD Operations
// ============================================

export interface TeamMemberInput {
  name: string;
  role: string;
  imageUrl?: string;
  email?: string;
  linkedInUrl?: string;
  category: string;
  sortOrder: number;
}

export async function fetchAllTeamMembers(): Promise<(Member & { category: string; sortOrder: number })[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('id, name, role, image_url, email, linkedin_url, category, sort_order')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }

  return (data as TeamMemberRow[] | null ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    imageUrl: row.image_url || undefined,
    email: row.email || undefined,
    linkedInUrl: row.linkedin_url || undefined,
    category: row.category,
    sortOrder: row.sort_order,
  }));
}

export async function createTeamMember(member: TeamMemberInput) {
  const { data, error } = await supabase
    .from('team_members')
    .insert([
      {
        name: member.name,
        role: member.role,
        image_url: member.imageUrl || null,
        email: member.email || null,
        linkedin_url: member.linkedInUrl || null,
        category: member.category,
        sort_order: member.sortOrder,
      },
    ])
    .select();

  if (error) {
    console.error('Error creating team member:', error);
    throw error;
  }

  return data[0];
}

export async function updateTeamMember(id: string, member: Partial<TeamMemberInput>) {
  const updateData: Record<string, unknown> = {};
  if (member.name !== undefined) updateData.name = member.name;
  if (member.role !== undefined) updateData.role = member.role;
  if (member.imageUrl !== undefined) updateData.image_url = member.imageUrl;
  if (member.email !== undefined) updateData.email = member.email;
  if (member.linkedInUrl !== undefined) updateData.linkedin_url = member.linkedInUrl;
  if (member.category !== undefined) updateData.category = member.category;
  if (member.sortOrder !== undefined) updateData.sort_order = member.sortOrder;

  const { data, error } = await supabase
    .from('team_members')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating team member:', error);
    throw error;
  }

  return data[0];
}

export async function deleteTeamMember(id: string) {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }

  return true;
}

// ============================================
// Supabase Storage Helpers
// ============================================

// Storage bucket names
export const STORAGE_BUCKETS = {
  PUBLIC_IMAGES: 'public-images',
  EVENTS: 'events',
  SPONSORS: 'sponsors',
  TEAM: 'team',
  ASSETS: 'assets',
} as const;

export const STORAGE_FOLDERS = {
  EVENTS: 'events',
  SPONSORS: 'sponsors',
  TEAM: 'team',
  ASSETS: 'assets',
} as const;

type BucketName = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

/**
 * Get the public URL for a file in Supabase Storage
 */
export function getStorageUrl(bucket: BucketName, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Convert a relative image path (e.g., "events/filename.png") to a full Supabase URL
 * Falls back to default placeholder if path is not available
 */
export function getImageUrl(
  imagePath: string | null | undefined,
  defaultFallback: string,
  preferredBucket?: BucketName
): string {
  if (!imagePath) {
    return defaultFallback;
  }

  // Keep absolute URLs untouched (external CDN, etc.)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  let normalizedPath = imagePath.trim();
  normalizedPath = normalizedPath.replace(/^\/+/, '');

  // Support legacy formats like /images/events/foo.png and images/events/foo.png
  if (normalizedPath.startsWith('images/')) {
    normalizedPath = normalizedPath.slice('images/'.length);
  }

  const parts = normalizedPath.split('/');
  if (parts.length < 2) {
    if (preferredBucket) {
      try {
        return getStorageUrl(preferredBucket, normalizedPath);
      } catch (err) {
        console.warn(`Failed to generate Supabase URL for ${imagePath}:`, err);
      }
    }
    return defaultFallback;
  }

  const bucket = parts[0] as BucketName;
  const isValidBucket = Object.values(STORAGE_BUCKETS).includes(bucket);

  if (!isValidBucket) {
    return defaultFallback;
  }

  try {
    return getStorageUrl(bucket, normalizedPath);
  } catch (err) {
    console.warn(`Failed to generate Supabase URL for ${imagePath}:`, err);
    return defaultFallback;
  }
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  bucket: BucketName,
  path: string,
  file: File,
  options?: { upsert?: boolean }
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: options?.upsert ?? false,
    });

  if (error) {
    console.error(`Error uploading to ${bucket}:`, error);
    throw error;
  }

  return {
    path: data.path,
    url: getStorageUrl(bucket, data.path),
  };
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(bucket: BucketName, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    console.error(`Error deleting from ${bucket}:`, error);
    throw error;
  }

  return true;
}

/**
 * List files in a Supabase Storage bucket
 */
export async function listFiles(bucket: BucketName, folder?: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder || '', {
      limit: 100,
      sortBy: { column: 'name', order: 'asc' },
    });

  if (error) {
    console.error(`Error listing files in ${bucket}:`, error);
    throw error;
  }

  return data;
}