# CEUS Website API Documentation

Types, Supabase helpers, and data interfaces used across the CEUS website.

Implementation lives in `src/lib/supabase.ts`, `src/lib/storagePublicUrls.ts`, and `src/types.ts`.

## Table of Contents

- [Overview](#overview)
- [Type Definitions](#type-definitions)
- [Supabase Data Access](#supabase-data-access)
- [Authentication](#authentication)
- [Storage](#storage)
- [Error Handling](#error-handling)

## Overview

The app uses Supabase for persistence. All database access goes through typed helper functions in `src/lib/supabase.ts`, which transform snake_case database rows to camelCase application types.

The Supabase client is configured in `src/lib/supabase.ts`:

- **Browser** — `createBrowserClient` from `@supabase/ssr` (cookie-based sessions)
- **Server** — `createClient` with sessions disabled (anonymous reads only)

## Type Definitions

Defined in `src/types.ts`:

### Event

```typescript
interface Event {
  id: string | number;
  title: string;
  date: string;           // ISO 8601
  imageUrl: string;
  facebookEventLink: string;
  description: string;
  category: 'Flagship' | 'Careers' | 'Social' | 'Academic'
    | 'Welfare' | 'Recruitment' | 'Collaboration' | 'Other';
}
```

### Team

```typescript
interface Member {
  id: string | number;
  name: string;
  role: string;
  imageUrl?: string;
  email?: string;
  linkedInUrl?: string;
}

interface TeamCategory {
  name: string;
  members: Member[];
}
```

### Sponsor

```typescript
type SponsorTier = 'Diamond' | 'Gold' | 'Silver' | 'Bronze'
  | 'Community' | 'Major' | 'Supporting' | 'Other';

interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  tier: SponsorTier;
  featured?: boolean;
}
```

### Job

```typescript
type JobType = 'Internship' | 'Graduate Program' | 'Cadetship'
  | 'Vacation Program' | 'Part-time' | 'Full-time'
  | 'Contract' | 'Casual' | 'Volunteer';

type WorkingRight = 'Australian Citizen' | 'Australian Permanent Resident'
  | 'Australian Work Visa' | 'New Zealand Citizen'
  | 'International Student' | 'No Visa Required';

interface JobCompany {
  name: string;
  website?: string;
  logo?: string;
}

interface Job {
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
```

### Contact submission

```typescript
interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  status?: 'new' | 'read' | 'replied';
}
```

## Supabase Data Access

### Public reads

```typescript
fetchEvents(): Promise<Event[]>
fetchSponsors(): Promise<Sponsor[]>
fetchTeamCategories(): Promise<TeamCategory[]>
fetchJobs(): Promise<Job[]>
```

### Contact form

```typescript
submitContactForm(data): Promise<ContactSubmission>
```

### Admin reads

```typescript
getContactSubmissions(): Promise<ContactSubmission[]>
fetchAllTeamMembers(): Promise<GroupedTeamMember[]>
```

### Events CRUD

```typescript
interface EventInput {
  title: string;
  date: string;
  description: string;
  category: Event['category'];
  imageUrl?: string;
  facebookEventLink?: string;
}

createEvent(event: EventInput): Promise<Event>
updateEvent(id: string, event: Partial<EventInput>): Promise<Event>
deleteEvent(id: string): Promise<boolean>
```

### Sponsors CRUD

```typescript
interface SponsorInput {
  name: string;
  description: string;
  tier: Sponsor['tier'];
  logoUrl?: string;
  websiteUrl?: string;
  featured?: boolean;
}

createSponsor(sponsor: SponsorInput): Promise<Sponsor>
updateSponsor(id: string, sponsor: Partial<SponsorInput>): Promise<Sponsor>
deleteSponsor(id: string): Promise<boolean>
```

### Team CRUD

```typescript
interface TeamMemberInput {
  name: string;
  role: string;
  imageUrl?: string;
  email?: string;
  linkedInUrl?: string;
  categories: string[];
  sortOrder: number;
}

createTeamMember(member: TeamMemberInput): Promise<GroupedTeamMember>
updateTeamMember(id: string, member: TeamMemberInput): Promise<GroupedTeamMember>
deleteTeamMember(id: string): Promise<boolean>
```

### Jobs CRUD

```typescript
interface JobInput {
  title: string;
  company: JobCompany;
  description: string;
  applicationUrl: string;
  type: JobType;
  locations: string[];
  industryField: string;
  workingRights: WorkingRight[];
  sourceUrls?: string[];
  oneLiner?: string;
  closeDate?: string;
  isSponsored?: boolean;
  outdated?: boolean;
}

createJob(job: JobInput): Promise<Job>
updateJob(id: string, job: Partial<JobInput>): Promise<Job>
deleteJob(id: string): Promise<boolean>
```

### Contact admin

```typescript
updateSubmissionStatus(id: string, status: 'new' | 'read' | 'replied'): Promise<void>
deleteContactSubmission(id: string): Promise<boolean>
```

## Authentication

```typescript
signIn(email: string, password: string)
signOut()
getSession()
getUser()
onAuthStateChange(callback)
```

Admin routes are additionally guarded by `src/proxy.ts` middleware.

## Storage

All site images use a single public bucket: `public-images`.

Folders: `assets/`, `events/`, `sponsors/`, `team/`

```typescript
const STORAGE_BUCKETS = {
  PUBLIC_IMAGES: 'public-images',
  EVENTS: 'public-images',
  SPONSORS: 'public-images',
  TEAM: 'public-images',
  ASSETS: 'public-images',
} as const;

getStorageUrl(bucket: string, path: string): string
getImageUrl(imagePath: string | null, defaultFallback: string, preferredBucket?: string): string
uploadFile(bucket: string, path: string, file: File): Promise<string>
deleteFile(bucket: string, path: string): Promise<void>
listFiles(bucket: string, folder?: string): Promise<FileObject[]>
```

Image URL resolution is also available in `src/lib/storagePublicUrls.ts`.

## tRPC (events pagination)

Paginated events are available via tRPC at `/api/trpc`:

```
events.getInfinite — cursor-based pagination
```

Router: `src/server/api/routers/events/`

## Error Handling

Supabase helpers throw on error after logging to the console. Wrap calls in try/catch at the UI layer:

```typescript
try {
  const events = await fetchEvents();
} catch (error) {
  console.error('Failed to load events:', error);
  // Show user-facing error state
}
```

Admin forms should display success/error feedback after mutations.

## Database tables

| Table | Purpose |
|-------|---------|
| `events` | Society events |
| `sponsors` | Corporate partners |
| `team_members` | Executive and committee members |
| `jobs` | Job board listings |
| `contact_submissions` | Contact form entries |

Schema defined in `scripts/migrations/`. RLS policies control public read vs authenticated write access.
