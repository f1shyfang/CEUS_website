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

// Job types and categories
export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Internship',
  'Graduate',
  'Contract',
  'Casual',
  'Other',
] as const;

export const JOB_CATEGORIES = [
  'Structural',
  'Geotechnical',
  'Water',
  'Environmental',
  'Transport',
  'Construction',
  'Project Management',
  'General',
  'Other',
] as const;

// Job schema
export const jobSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  company: z.string().min(1, 'Company is required').max(200, 'Company must be less than 200 characters'),
  description: z.string().min(1, 'Description is required'),
  applicationUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  applicationDeadline: z.string().optional(),
  location: z.string().optional(),
  jobType: z.enum(JOB_TYPES),
  category: z.enum(JOB_CATEGORIES),
  logoUrl: z.string().optional().or(z.literal('')),
  featured: z.boolean(),
});

export type JobFormData = z.infer<typeof jobSchema>;

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
