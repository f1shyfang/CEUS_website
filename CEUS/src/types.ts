// src/types.ts (or similar)
export interface Member {
    id: string | number;
    name: string;
    role: string;
    imageUrl?: string;
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