// src/data/eventData.ts
import { Event } from '../types';

// Helper to create ISO date strings
const createDate = (year: number, month: number, day: number, hour: number = 17, minute: number = 0): string => {
  // Month is 0-indexed in JavaScript Date (0 = January)
  return new Date(year, month - 1, day, hour, minute).toISOString();
};

export const allEventsData: Event[] = [
  // --- UPCOMING EVENTS (From Term 2, Week 8 onwards) ---
  {
    id: 'ceusEventUpcoming1',
    title: 'CEUS x Pokersoc Poker Night',
    date: createDate(2025, 9, 1), // Estimated: Term 2, Week 8
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#', // Add Facebook event link
    description: 'A night of cards and friendly competition with Pokersoc. Beginners and experts are welcome!',
    category: 'Social',
  },
    {
    id: 'ceusEventUpcoming3',
    title: 'CEUS x ANSTO at Roundhouse',
    date: createDate(2025, 8, 8), // Estimated: Term 2, Week 9
    imageUrl: '/images/events/CEUS at Roundy (Facebook Cover).png',
    facebookEventLink: '#', // Add Facebook event link
    description: 'A special collaborative event with ANSTO held at the iconic Roundhouse.',
    category: 'Collaboration', // FIX: Changed 'Mix' to 'Collaboration'
  },
  {
    id: 'ceusEventUpcoming4',
    title: 'Study With CEUS',
    date: createDate(2025, 8, 11), // Estimated: Term 2, Week 10
    imageUrl: '/images/events/STUDY WITH CEUS T2 2025.png',
    facebookEventLink: '#', // Add Facebook event link
    description: 'Prepare for your final exams with our supported study sessions. Snacks and good company provided!',
    category: 'Academic', // FIX: Changed 'School' to 'Academic'
  },
  
  {
    id: 'ceusEventUpcoming6',
    title: 'CEUS x SUCES Pub Crawl',
    date: createDate(2025, 8, 8), // Estimated: Term 2, Week 10
    imageUrl: '/images/events/CEUS X SUCES PUBCRAWL T2 2025 (Facebook Cover).png',
    facebookEventLink: '#', // Add Facebook event link
    description: 'The legendary pub crawl in collaboration with SUCES is back! Not to be missed.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming7',
    title: 'CEUS x SUCES Trivia',
    date: createDate(2025, 9, 8), // Estimated: Term 3, Week 0
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#', // Add Facebook event link
    description: 'Test your knowledge at the start of term with a fun trivia night co-hosted with SUCES.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming8',
    title: 'Opal Site Tour',
    date: createDate(2025, 10, 29), // Estimated: Term 3, Week 7
    imageUrl: '/images/events/ANSTO SITE TOUR.png',
    facebookEventLink: '#', // Add Facebook event link
    description: 'An exclusive industrial site tour of the Opal facility. A fantastic opportunity for practical insights.',
    category: 'Careers', // FIX: Changed 'Industry' to 'Careers'
  },
  {
    id: 'ceusEventUpcoming9',
    title: 'Speed Networking Night',
    date: createDate(2025, 11, 5), // Estimated: Term 3, Week 8
    imageUrl: '/images/events/INDUSTRY NIGHT T2 2025 FB EVENT.png',
    facebookEventLink: '#', // Add Facebook event link
    description: 'Quick-fire networking rounds to meet a variety of industry professionals and peers.',
    category: 'Careers', // FIX: Changed 'Industry' to 'Careers'
  },
  {
    id: 'ceusEventUpcoming10',
    title: 'Ceus ball',
    date: createDate(2025, 9, 30), // Estimated: Term 3, Week 0
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#', // Add Facebook event link
    description: 'Test your knowledge at the start of term with a fun trivia night co-hosted with SUCES.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming11',
    title: 'Ceus AGM',
    date: createDate(2025, 10, 9), // Estimated: Term 3, Week 0
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#', // Add Facebook event link
    description: 'Test your knowledge at the start of term with a fun trivia night co-hosted with SUCES.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming12',
    title: 'Networking Night',
    date: createDate(2025, 10, 16), // Estimated: Term 3, Week 0
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#', // Add Facebook event link
    description: 'Test your knowledge at the start of term with a fun trivia night co-hosted with SUCES.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming13',
    title: 'Christmas Party',
    date: createDate(2025, 8, 16), // Estimated: Term 3, Week 0
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#', // Add Facebook event link
    description: 'Test your knowledge at the start of term with a fun trivia night co-hosted with SUCES.',
    category: 'Social',
  },

  // --- PAST EVENTS ---
  {
    id: 'ceusEventPast1',
    title: 'Trivia Night',
    date: createDate(2025, 2, 19), // Estimated: Term 1, Week 0
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'Kicked off the year with a fun and challenging trivia night for all members.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast2',
    title: 'Pizza Welcome Lunch',
    date: createDate(2025, 2, 26), // Estimated: Term 1, Week 1
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'Welcomed new and returning students with free pizza to start the term right.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast3',
    title: 'What is My Degree',
    date: createDate(2025, 2, 27), // Estimated: Term 1, Week 1
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'An info session for first-year students to understand the chemical engineering curriculum and specializations.',
    category: 'Academic', // FIX: Changed 'School' to 'Academic'
  },
  {
    id: 'ceusEventPast4',
    title: 'Lab Coat x EWB',
    date: createDate(2025, 2, 28), // Estimated: Term 1, Week 1
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'A collaboration with Engineers Without Borders, combining practical skills with social impact.',
    category: 'Collaboration', // FIX: Changed 'School' to 'Collaboration'
  },
    {
    id: 'ceusEventPast5',
    title: 'Coffee Crawl',
    date: createDate(2025, 3, 6), // Estimated: Term 1, Week 2
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'Explored the best campus coffee spots while mingling with fellow students.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast6',
    title: 'CAMP Enchanted',
    date: createDate(2025, 3, 28), // Estimated: Term 1, Week 4-5
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'The annual CEUS camp, a weekend packed with fun activities, challenges, and team bonding.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast7',
    title: 'Tooheys Tour',
    date: createDate(2025, 4, 3), // Estimated: Term 1, Week 5
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'An industrial tour of the Tooheys brewery, exploring the chemical processes behind brewing.',
    category: 'Careers', // FIX: Changed 'Industry' to 'Careers'
  },
  {
    id: 'ceusEventPast8',
    title: 'Post Camp Roundy',
    date: createDate(2025, 4, 10), // Estimated: Term 1, Week 6
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'A casual catch-up at the Roundhouse to relive camp memories and reconnect with friends.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast9',
    title: 'YR Beach Day',
    date: createDate(2025, 4, 18), // Estimated: Term 1, Week 7
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'A relaxing day at the beach organized by the Year Reps to de-stress before exams.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast10',
    title: 'Bouldering',
    date: createDate(2025, 4, 25), // Estimated: Term 1, Week 8
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'A fun and active social event, tackling bouldering problems together.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast11',
    title: 'O-day',
    date: createDate(2025, 5, 26), // Estimated: Term 2, Week 0
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'Showcasing our society during O-week to welcome new students to the university.',
    category: 'Recruitment',
  },
  {
    id: 'ceusEventPast12',
    title: 'Welcome Back Event',
    date: createDate(2025, 6, 4), // Estimated: Term 2, Week 1
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'Kicked off Term 2 with a social event to welcome everyone back to campus.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast13',
    title: 'Cruise',
    date: createDate(2025, 6, 6), // Estimated: Term 2, Week 1
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'A memorable cruise event to socialize and enjoy the views.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast14',
    title: 'Mineral Morning - Coffee Catch Up',
    date: createDate(2025, 6, 18), // Estimated: Term 2, Week 3
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'A morning coffee session with a focus on the minerals industry.',
    category: 'Collaboration', // FIX: Changed 'Mix' to 'Collaboration'
  },
    {
    id: 'ceusEventPast15',
    title: 'Industry Night',
    date: createDate(2025, 6, 26), // Estimated: Term 2, Week 4
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'Our flagship industry night, connecting students with leading companies and professionals.',
    category: 'Careers', // FIX: Changed 'Industry' to 'Careers'
  },
  {
    id: 'ceusEventPast16',
    title: 'ANSTO Site Tour + TOES Party',
    date: createDate(2025, 7, 3), // Estimated: Term 2, Week 5
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'An exclusive tour of the ANSTO facility followed by a fun social party.',
    category: 'Collaboration', // FIX: Changed 'Mix' to 'Collaboration'
  },
    {
    id: 'ceusEventPast17',
    title: 'CEUS Dinner',
    date: createDate(2025, 7, 4), // Estimated: Term 2, Week 5
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'An annual formal dinner for members to celebrate the year in style.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast18',
    title: 'Mineral Minds Trivia Night',
    date: createDate(2025, 7, 17), // Estimated: Term 2, Week 7
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: '#',
    description: 'A trivia night with a twist, focused on minerals and mining, co-hosted with SUCES or as a CEUS Bingo Night at Roundy.',
    category: 'Collaboration', // FIX: Changed 'Mix' to 'Collaboration'
  },
];