# CEUS Website API Documentation

This document provides comprehensive documentation for the data structures, types, and interfaces used in the CEUS website, focusing on the Supabase integration and shared helpers.

## Table of Contents
- [Overview](#overview)
- [Type Definitions](#type-definitions)
- [Supabase Data Access](#supabase-data-access)
- [Authentication Helpers](#authentication-helpers)
- [Storage Helpers](#storage-helpers)
- [Component Interfaces](#component-interfaces)
- [Error Handling](#error-handling)

## Overview

The CEUS website uses Supabase for persistent data storage and authentication. Data is retrieved through a set of asynchronous helper functions that ensure type safety and consistent data transformation between the database and the frontend.

## Type Definitions

### Core Types

```typescript
// src/types.ts

// Event-related types
export interface Event {
  id: string | number;
  title: string;
  date: string; // ISO string
  imageUrl: string;
  facebookEventLink: string;
  description: string;
  category: 'Flagship' | 'Careers' | 'Social' | 'Academic' | 'Welfare' | 'Recruitment' | 'Collaboration' | 'Other';
}

// Team member types
export interface Member {
  id: string | number;
  name: string;
  role: string;
  imageUrl?: string;
  email?: string;
  linkedInUrl?: string;
}

export interface TeamCategory {
  name: string;
  members: Member[];
}

// Sponsor types
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
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  tier: SponsorTier;
  featured?: boolean;
}
```

## Supabase Data Access

Located in `src/lib/supabase.ts`, these functions provide the primary interface for site data.

### Fetching Data

```typescript
// Fetch all events sorted by date
export async function fetchEvents(): Promise<Event[]>

// Fetch all sponsors
export async function fetchSponsors(): Promise<Sponsor[]>

// Fetch team members grouped by category
export async function fetchTeamCategories(): Promise<TeamCategory[]>

// Fetch all contact form submissions (Admin only)
export async function getContactSubmissions(): Promise<ContactSubmission[]>
```

### Mutating Data (Admin Only)

```typescript
// Create a new event
export async function createEvent(event: EventInput): Promise<Event>

// Update an existing event
export async function updateEvent(id: string, event: Partial<EventInput>): Promise<Event>

// Delete an event
export async function deleteEvent(id: string): Promise<boolean>

// Submit a new contact form entry
export async function submitContactForm(data: ContactSubmissionInput): Promise<any>
```

## Authentication Helpers

Authentication is handled via Supabase Auth.

```typescript
// Sign in with email and password
export async function signIn(email: string, password: string)

// Sign out the current user
export async function signOut()

// Get the current session
export async function getSession()

// Get the current user
export async function getUser()
```

## Storage Helpers

Managed via Supabase Storage buckets. All site images have been consolidated into a single public bucket.

### Buckets
- `public-images`: Main bucket for all site images (events, sponsors, team, assets).

### Helpers
```typescript
// Storage bucket names (all point to 'public-images')
export const STORAGE_BUCKETS = {
  PUBLIC_IMAGES: 'public-images',
  EVENTS: 'public-images',
  SPONSORS: 'public-images',
  TEAM: 'public-images',
  ASSETS: 'public-images',
} as const;

// Get a public URL for a file in a bucket
export function getStorageUrl(bucket: string, path: string): string

// Smart helper to resolve image paths (handles relative and absolute URLs)
// Automatically handles legacy paths and maps them to 'public-images'
export function getImageUrl(imagePath: string | null, defaultFallback: string, preferredBucket?: string): string

// Upload a file to storage
export async function uploadFile(bucket: string, path: string, file: File)
```

## Component Interfaces

### Common Prop Patterns

```typescript
export interface EventCardProps {
  event: Event;
  onCardClick?: (event: Event) => void;
  className?: string;
}

export interface SponsorLogoProps {
  sponsor: Sponsor;
  onLogoClick?: (sponsor: Sponsor) => void;
}

export interface AdminDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}
```

## Error Handling

All Supabase operations should be wrapped in try-catch blocks. Errors are logged to the console and thrown to be handled by the UI (e.g., displaying a toast notification).

```typescript
try {
  const events = await fetchEvents();
} catch (error) {
  console.error('Failed to load events:', error);
  // Display error to user
}
```

---

This documentation is maintained to reflect the current state of the CEUS Website backend and data structures. For implementation details, refer to `src/lib/supabase.ts`.
