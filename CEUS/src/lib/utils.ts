import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInCalendarDays, format, isValid } from 'date-fns';

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

/**
 * Discovery-oriented date string for event cards.
 * Within a week: "Today · 7:00 pm", "Tomorrow · 6:30 pm", "Friday · in 4 days".
 * Past week, current year: "Fri 9 May". Other years: "Fri 9 May 2026".
 * Empty / invalid inputs return "Date TBD" / "Invalid Date".
 */
export function formatRelativeEventDate(dateString: string | Date): string {
  if (!dateString) return 'Date TBD';
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (!isValid(date)) return 'Invalid Date';

  const now = new Date();
  const diffDays = differenceInCalendarDays(date, now);
  const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0;
  const timePart = hasTime ? ` · ${format(date, 'h:mm a')}` : '';

  if (diffDays === 0) return `Today${timePart}`;
  if (diffDays === 1) return `Tomorrow${timePart}`;
  if (diffDays >= 2 && diffDays <= 6) return `${format(date, 'EEEE')} · in ${diffDays} days`;
  if (diffDays === -1) return 'Yesterday';
  if (diffDays >= -6 && diffDays < -1) return `${format(date, 'EEEE')} · ${Math.abs(diffDays)} days ago`;

  const sameYear = date.getFullYear() === now.getFullYear();
  return format(date, sameYear ? 'EEE d MMM' : 'EEE d MMM yyyy');
}
