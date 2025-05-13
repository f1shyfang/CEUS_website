// src/types.ts (or similar)
export interface Member {
  id: string | number;
  name: string;
  role: string;
  imageUrl: string;
  email?: string; // Optional
  linkedIn?: string; // Optional
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







export type SponsorTier = 'Major' | 'Supporting' | 'Other'; // Or Gold, Silver etc.

export interface Sponsor {
  id: string; // Unique identifier (e.g., 'kpmg', 'atlassian')
  name: string; // Company name (e.g., "KPMG Australia")
  logoUrl: string; // Path to the logo image (e.g., '/images/sponsors/kpmg.png')
  websiteUrl: string; // Link to the sponsor's website
  description: string; // Text to display in the modal popup
  tier: SponsorTier;
}