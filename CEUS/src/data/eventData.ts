// src/data/eventData.ts
import { Event } from '../types';

// Helper to create ISO date strings
const createDate = (year: number, month: number, day: number, hour: number = 17, minute: number = 0): string => {
  // Month is 0-indexed in JavaScript Date (0 = January)
  return new Date(year, month - 1, day, hour, minute).toISOString();
};

export const allEventsData: Event[] = [
  // --- UPCOMING EVENT EXAMPLE ---
  {
    id: 'ceusEventUpcoming1',
    title: 'CEUS First Year Senior assassin',
    date: createDate(2025, 10, 15), // October 15, 2025
    imageUrl: '../images/2022Cruise.jpeg', // USE A REAL, EXISTING IMAGE PATH IN public/images/events/
    facebookEventLink: 'https://www.facebook.com/events/550799454699655',
    description: 'Explore the future of chemical engineering with industry leaders and workshops. A flagship event not to be missed!',
    category: 'Flagship',
  },
  // --- PAST EVENT EXAMPLE ---
  {
    id: 'ceusEventPast1',
    title: 'CEUS Camp',
    date: createDate(2024, 3, 20), // March 20, 2024
    imageUrl: '../images/2022Cruise.jpeg', // USE A REAL, EXISTING IMAGE PATH
    facebookEventLink: 'https://www.facebook.com/events/550799454699655',
    description: 'Connect with CEUS alumni and gain valuable career insights. A great opportunity for networking.',
    category: 'Flagship',
  },
  {
    id: 'ceusEventPast2',
    title: 'CEUS Welcome Pizza',
    date: createDate(2024, 2, 15), // February 15, 2024
    imageUrl: '../images/2022Cruise.jpeg', // USE A REAL, EXISTING IMAGE PATH
    facebookEventLink: 'https://www.facebook.com/events/550799454699655',
    description: 'Kick off the semester with a fun hangout, meet new friends, and learn about CEUS activities.',
    category: 'Social',
  },
];