// src/types.ts (or similar)
export interface Member {
  id: string | number;
  name: string;
  role: string;
  imageUrl?: string;
  email?: string; // Optional
  linkedInUrl?: string; // Optional
}

export interface TeamCategory {
  name: string;
  members: Member[];
}

// For the filter buttons, we might have a simpler structure if they directly map to categories
export interface FilterButtonData {
  id: string;
  label: string;
}



export interface Event {
  id: string | number;
  title: string;
  date: string; // ISO string (e.g., "2025-05-04T10:00:00Z")
  imageUrl: string; // Path to event poster/image
  facebookEventLink: string; // Direct link to the Facebook event
  description: string; // Short description for the card
  category: 'Flagship' | 'Careers' | 'Social' | 'Academic' | 'Welfare' | 'Recruitment' | 'Collaboration' | 'Other';
}







// Expand tiers so the sponsors page can mirror CSESoc-style groupings.
export type SponsorTier =
  | 'Diamond'
  | 'Gold'
  | 'Silver'
  | 'Bronze'
  | 'Community'
  | 'Major'
  | 'Supporting'
  | 'Other';

export interface Sponsor {
  id: string; // Unique identifier (e.g., 'kpmg', 'atlassian')
  name: string; // Company name (e.g., "KPMG Australia")
  logoUrl: string; // Public image URL (Supabase storage or external URL)
  websiteUrl: string; // Link to the sponsor's website
  description: string; // Text to display in the modal popup
  tier: SponsorTier;
  featured?: boolean; // Marks the sponsor for the spotlight section
}

export type JobType =
  | 'Internship'
  | 'Graduate Program'
  | 'Cadetship'
  | 'Vacation Program'
  | 'Part-time'
  | 'Full-time'
  | 'Contract'
  | 'Casual'
  | 'Volunteer';

export type WorkingRight =
  | 'Australian Citizen'
  | 'Australian Permanent Resident'
  | 'Australian Work Visa'
  | 'New Zealand Citizen'
  | 'International Student'
  | 'No Visa Required';

export interface JobCompany {
  name: string;
  website?: string;
  logo?: string;
}

export interface Job {
  id: string;
  title: string;
  company: JobCompany;
  description: string;
  oneLiner?: string;
  applicationUrl: string;
  sourceUrls: string[];
  type: JobType;
  locations: string[];
  industryField: string;
  workingRights: WorkingRight[];
  createdAt: string;
  updatedAt: string;
  closeDate?: string;
  isSponsored: boolean;
  outdated: boolean;
}

export const BLOG_CATEGORIES = ['news', 'student-guides', 'careers-industry'] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogPostStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  excerpt: string;
  authorName: string;
  body: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  status: BlogPostStatus;
  isFeatured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type BlogPostInput = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>;
