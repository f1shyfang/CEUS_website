import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isValid } from 'date-fns';

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an ISO date string to a human-readable format
 * Default: "MMMM d, yyyy"
 */
export function formatEventDate(dateString: string | Date, formatStr: string = 'MMMM d, yyyy'): string {
  if (!dateString) return 'Date TBD';
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (!isValid(date)) return 'Invalid Date';
  return format(date, formatStr);
}

/**
 * Formats an ISO date string for the homepage hero/sections
 * e.g., "Monday, May 4, 2026"
 */
export function formatLongDate(dateString: string | Date): string {
  return formatEventDate(dateString, 'cccc, MMMM d, yyyy');
}
