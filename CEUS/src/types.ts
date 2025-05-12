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