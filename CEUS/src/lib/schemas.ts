// src/lib/schemas.ts
import { z } from 'zod';

// Event categories
export const EVENT_CATEGORIES = [
  'Flagship',
  'Careers',
  'Social',
  'Academic',
  'Welfare',
  'Recruitment',
  'Collaboration',
  'Other',
] as const;

// Sponsor tiers
export const SPONSOR_TIERS = [
  'Diamond',
  'Gold',
  'Silver',
  'Bronze',
  'Community',
  'Major',
  'Supporting',
  'Other',
] as const;

// Team categories
export const TEAM_CATEGORIES = [
  'Executives',
  'Year Representatives',
  'Information Technology',
  'Marketing',
  'Socials',
  'Careers',
  'Admin',
] as const;

// Event schema
export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  facebookEventLink: z.string().url('Invalid URL').optional().or(z.literal('')),
  category: z.enum(EVENT_CATEGORIES),
});

export type EventFormData = z.infer<typeof eventSchema>;

// Sponsor schema
export const sponsorSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  logoUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  websiteUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  description: z.string().min(1, 'Description is required'),
  tier: z.enum(SPONSOR_TIERS),
  featured: z.boolean(),
});

export type SponsorFormData = z.infer<typeof sponsorSchema>;

// Team member schema
export const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  role: z.string().min(1, 'Role is required').max(100, 'Role must be less than 100 characters'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  linkedInUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  category: z.string().min(1, 'Category is required'),
  sortOrder: z.number().int().min(0, 'Sort order must be a positive number'),
});

export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

// Job types
export const JOB_TYPES = [
  'Internship',
  'Graduate Program',
  'Cadetship',
  'Vacation Program',
  'Part-time',
  'Full-time',
  'Contract',
  'Casual',
  'Volunteer',
] as const;

// Working rights options shown on the application form and used for filtering.
export const WORKING_RIGHTS = [
  'Australian Citizen',
  'Australian Permanent Resident',
  'Australian Work Visa',
  'New Zealand Citizen',
  'International Student',
  'No Visa Required',
] as const;

// Industry fields. Free-form text is also accepted, but these power the filter dropdown.
export const INDUSTRY_FIELDS = [
  'Process Engineering',
  'Pharmaceuticals',
  'Food & Beverage',
  'Oil & Gas',
  'Mining & Minerals',
  'Water Treatment',
  'Energy & Renewables',
  'Biotechnology',
  'Chemicals & Manufacturing',
  'Consulting',
  'Research',
  'Other',
] as const;

const jobCompanySchema = z.object({
  name: z.string().min(1, 'Company name is required').max(200),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  logo: z.string().url('Invalid URL').optional().or(z.literal('')),
});

// Job schema for the CEUS job board.
export const jobSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  company: jobCompanySchema,
  description: z.string().min(1, 'Description is required'),
  oneLiner: z.string().max(200, 'One-liner must be less than 200 characters').optional().or(z.literal('')),
  applicationUrl: z.string().url('Application URL must be a valid URL'),
  sourceUrls: z.array(z.string().url('Source URL must be a valid URL')).default([]),
  type: z.enum(JOB_TYPES),
  locations: z.array(z.string().min(1)).min(1, 'At least one location is required'),
  industryField: z.string().min(1, 'Industry field is required').max(100),
  workingRights: z.array(z.enum(WORKING_RIGHTS)).default([]),
  closeDate: z.string().optional().or(z.literal('')),
  isSponsored: z.boolean(),
  outdated: z.boolean(),
});

export type JobFormData = z.infer<typeof jobSchema>;

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
