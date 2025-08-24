// src/data/eventData.ts
import { Event } from '../types';

// Helper to create ISO date strings
const createDate = (year: number, month: number, day: number, hour: number = 17, minute: number = 0): string => {
  // Month is 0-indexed in JavaScript Date (0 = January)
  return new Date(year, month - 1, day, hour, minute).toISOString();
};

export const allEventsData: Event[] = [
  // --- UPCOMING EVENTS (2025) ---
  {
    id: 'ceusEventUpcoming1',
    title: 'CEUS x SUCES PUBCRAWL',
    date: createDate(2025, 8, 8), // Term 2, Week 9
    imageUrl: '/images/events/CEUS X SUCES PUBCRAWL T2 2025 (Facebook Cover).png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-suces-pubcrawl',
    description: 'The legendary pub crawl in collaboration with SUCES is back! Not to be missed.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming2',
    title: 'CEUS at Roundhouse',
    date: createDate(2025, 8, 8), // Term 2, Week 9
    imageUrl: '/images/events/CEUS at Roundy (Facebook Cover).png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-at-roundhouse',
    description: 'A special collaborative event with ANSTO held at the iconic Roundhouse.',
    category: 'Collaboration',
  },
  {
    id: 'ceusEventUpcoming3',
    title: 'CEUS x ANSTO Minerals Games Night',
    date: createDate(2025, 8, 15), // Term 2, Week 10
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-ansto-minerals-games-night',
    description: 'Fun games and activities with ANSTO, focusing on minerals and mining.',
    category: 'Collaboration',
  },
  {
    id: 'ceusEventUpcoming4',
    title: 'SURVIVING SECOND YEAR 🧪🧑‍🔬',
    date: createDate(2025, 8, 22), // Term 2, Week 11
    imageUrl: '/images/events/SURVIVING 2ND YEAR T2 2025 FB COVER.png',
    facebookEventLink: 'https://www.facebook.com/events/surviving-second-year',
    description: 'Essential tips and advice for second-year chemical engineering students.',
    category: 'Academic',
  },
  {
    id: 'ceusEventUpcoming5',
    title: 'ANSTO Site Tour',
    date: createDate(2025, 8, 29), // Term 2, Week 12
    imageUrl: '/images/events/ANSTO SITE TOUR.png',
    facebookEventLink: 'https://www.facebook.com/events/ansto-site-tour',
    description: 'An exclusive industrial site tour of the ANSTO facility.',
    category: 'Careers',
  },
  {
    id: 'ceusEventUpcoming6',
    title: 'REVISE AND REVITALISE!',
    date: createDate(2025, 9, 5), // Term 2, Week 13
    imageUrl: '/images/events/revise and revitalise fb.png',
    facebookEventLink: 'https://www.facebook.com/events/revise-and-revitalise',
    description: 'Study session with snacks and support to help you prepare for exams.',
    category: 'Academic',
  },
  {
    id: 'ceusEventUpcoming7',
    title: 'CEUS x FSA Industry Night 2025 💼📢',
    date: createDate(2025, 9, 12), // Term 3, Week 0
    imageUrl: '/images/events/INDUSTRY NIGHT T2 2025 FB EVENT.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-fsa-industry-night-2025',
    description: 'Our flagship industry night, connecting students with leading companies and professionals.',
    category: 'Careers',
  },
  {
    id: 'ceusEventUpcoming8',
    title: 'ANSTO x CEUS - Mineral Morning ☕️',
    date: createDate(2025, 9, 19), // Term 3, Week 1
    imageUrl: '/images/events/MINERAL MORNING COFFEE CATCH UP WK4 T2 (Facebook Cover).png',
    facebookEventLink: 'https://www.facebook.com/events/ansto-x-ceus-mineral-morning',
    description: 'A morning coffee session with a focus on the minerals industry.',
    category: 'Collaboration',
  },
  {
    id: 'ceusEventUpcoming9',
    title: '80s Rewind : Cruise',
    date: createDate(2025, 9, 26), // Term 3, Week 2
    imageUrl: '/images/events/cruise banner (t2wk2).png',
    facebookEventLink: 'https://www.facebook.com/events/80s-rewind-cruise',
    description: 'A memorable cruise event with 80s theme to socialize and enjoy the views.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming10',
    title: 'Industry Training Info Night 👨‍💼',
    date: createDate(2025, 10, 3), // Term 3, Week 3
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/industry-training-info-night',
    description: 'Information session about industry training opportunities and requirements.',
    category: 'Careers',
  },
  {
    id: 'ceusEventUpcoming11',
    title: '🍩 WELCOME BACK DOUGHNUTS 🍩',
    date: createDate(2025, 10, 10), // Term 3, Week 4
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/welcome-back-doughnuts',
    description: 'Welcome back event with free doughnuts to start the term right.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming12',
    title: 'CEUS X RED BULL - 2025 WINGS FOR LIFE WORLD RUN 🏃‍➡️🪽',
    date: createDate(2025, 10, 17), // Term 3, Week 5
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-red-bull-wings-for-life-world-run',
    description: 'Join CEUS for the Wings for Life World Run in partnership with Red Bull.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming13',
    title: 'REVISE AND REVITALISE T1 2025 - Wednesday',
    date: createDate(2025, 10, 22), // Term 3, Week 6
    imageUrl: '/images/events/revise and revitalise fb.png',
    facebookEventLink: 'https://www.facebook.com/events/revise-and-revitalise-t1-2025-wednesday',
    description: 'Study session on Wednesday to help you prepare for exams.',
    category: 'Academic',
  },
  {
    id: 'ceusEventUpcoming14',
    title: 'REVISE AND REVITALISE T1 2025 - Tuesday',
    date: createDate(2025, 10, 21), // Term 3, Week 6
    imageUrl: '/images/events/revise and revitalise fb.png',
    facebookEventLink: 'https://www.facebook.com/events/revise-and-revitalise-t1-2025-tuesday',
    description: 'Study session on Tuesday to help you prepare for exams.',
    category: 'Academic',
  },
  {
    id: 'ceusEventUpcoming15',
    title: 'DESN1000 PIZZA WRAP-UP',
    date: createDate(2025, 10, 24), // Term 3, Week 6
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/desn1000-pizza-wrap-up',
    description: 'Celebrate the end of DESN1000 with pizza and good company.',
    category: 'Academic',
  },
  {
    id: 'ceusEventUpcoming16',
    title: 'CEUS Goes Bouldering 🧗🍕',
    date: createDate(2025, 10, 31), // Term 3, Week 7
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-goes-bouldering',
    description: 'A fun and active social event, tackling bouldering problems together with pizza.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming17',
    title: 'Sunset Beach Volleyball 🌅🏐',
    date: createDate(2025, 11, 7), // Term 3, Week 8
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/sunset-beach-volleyball',
    description: 'Enjoy a sunset game of beach volleyball with fellow CEUS members.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming18',
    title: 'CEUS Professional Photoshoot 📸👔',
    date: createDate(2025, 11, 14), // Term 3, Week 9
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-professional-photoshoot',
    description: 'Get professional headshots for your LinkedIn and professional profiles.',
    category: 'Careers',
  },
  {
    id: 'ceusEventUpcoming19',
    title: 'ROUNDY CATCH UP - CEUS X FSA X MATSOC X RESOC',
    date: createDate(2025, 11, 21), // Term 3, Week 10
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/roundy-catch-up-ceus-x-fsa-x-matsoc-x-resoc',
    description: 'A casual catch-up at the Roundhouse with multiple engineering societies.',
    category: 'Collaboration',
  },
  {
    id: 'ceusEventUpcoming20',
    title: 'CEUS SUBCOMMITTEE RECRUITMENT 2025 T1 ‼️‼️‼️',
    date: createDate(2025, 11, 28), // Term 3, Week 11
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-subcommittee-recruitment-2025-t1',
    description: 'Join the CEUS subcommittee and help organize amazing events for the society.',
    category: 'Recruitment',
  },
  {
    id: 'ceusEventUpcoming21',
    title: 'Projects in the Pub 🍻',
    date: createDate(2025, 12, 5), // Term 3, Week 12
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/projects-in-the-pub',
    description: 'Discuss projects and assignments over drinks in a relaxed pub environment.',
    category: 'Academic',
  },
  {
    id: 'ceusEventUpcoming22',
    title: 'Tooheys Site Tour & Tasting 🍻',
    date: createDate(2025, 12, 12), // Term 3, Week 13
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/tooheys-site-tour-tasting',
    description: 'An industrial tour of the Tooheys brewery, exploring the chemical processes behind brewing.',
    category: 'Careers',
  },
  {
    id: 'ceusEventUpcoming23',
    title: 'CEUS x MATSOC x FSA x RESOC 2025 CAMP: Engineers and the Enchanted Expedition 🧙🔮✨',
    date: createDate(2025, 12, 19), // Term 3, Week 14
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-matsoc-x-fsa-x-resoc-2025-camp',
    description: 'The annual CEUS camp with multiple engineering societies, a weekend packed with fun activities.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming24',
    title: 'CEUS x FSA Coffee Crawl ☕️',
    date: createDate(2025, 12, 26), // Term 3, Week 15
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-fsa-coffee-crawl',
    description: 'Explored the best campus coffee spots while mingling with fellow students.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming25',
    title: 'EWB UNSW x CEUS - Embroidery Patch Stall',
    date: createDate(2025, 1, 2), // Term 1, Week 0
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ewb-unsw-x-ceus-embroidery-patch-stall',
    description: 'A collaboration with Engineers Without Borders, combining practical skills with social impact.',
    category: 'Collaboration',
  },
  {
    id: 'ceusEventUpcoming26',
    title: 'What Is My Degree? - CEUS x FSA',
    date: createDate(2025, 1, 9), // Term 1, Week 1
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/what-is-my-degree-ceus-x-fsa',
    description: 'An info session for first-year students to understand the chemical engineering curriculum and specializations.',
    category: 'Academic',
  },
  {
    id: 'ceusEventUpcoming27',
    title: '🍕 Pizza Welcome Lunch 🍕',
    date: createDate(2025, 1, 16), // Term 1, Week 2
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/pizza-welcome-lunch',
    description: 'Welcomed new and returning students with free pizza to start the term right.',
    category: 'Social',
  },
  {
    id: 'ceusEventUpcoming28',
    title: 'O-Week Trivia Night',
    date: createDate(2025, 1, 23), // Term 1, Week 3
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/o-week-trivia-night',
    description: 'Kicked off the year with a fun and challenging trivia night for all members.',
    category: 'Social',
  },

  // --- PAST EVENTS (2024) ---
  {
    id: 'ceusEventPast1',
    title: 'CEUS UNSW',
    date: createDate(2024, 12, 15), // End of 2024
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-unsw',
    description: 'General CEUS UNSW society event and information session.',
    category: 'Other',
  },
  {
    id: 'ceusEventPast2',
    title: 'CEUS x SUCES PUBCRAWL',
    date: createDate(2024, 11, 20), // Term 3, Week 11
    imageUrl: '/images/events/CEUS X SUCES PUBCRAWL T2 2025 (Facebook Cover).png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-suces-pubcrawl-2024',
    description: 'The legendary pub crawl in collaboration with SUCES.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast3',
    title: 'CEUS at Roundhouse',
    date: createDate(2024, 11, 13), // Term 3, Week 10
    imageUrl: '/images/events/CEUS at Roundy (Facebook Cover).png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-at-roundhouse-2024',
    description: 'A special collaborative event with ANSTO held at the iconic Roundhouse.',
    category: 'Collaboration',
  },
  {
    id: 'ceusEventPast4',
    title: 'CEUS x ANSTO Minerals Games Night',
    date: createDate(2024, 11, 6), // Term 3, Week 9
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-ansto-minerals-games-night-2024',
    description: 'Fun games and activities with ANSTO, focusing on minerals and mining.',
    category: 'Collaboration',
  },
  {
    id: 'ceusEventPast5',
    title: 'SURVIVING SECOND YEAR 🧪🧑‍🔬',
    date: createDate(2024, 10, 30), // Term 3, Week 8
    imageUrl: '/images/events/SURVIVING 2ND YEAR T2 2025 FB COVER.png',
    facebookEventLink: 'https://www.facebook.com/events/surviving-second-year-2024',
    description: 'Essential tips and advice for second-year chemical engineering students.',
    category: 'Academic',
  },
  {
    id: 'ceusEventPast6',
    title: 'ANSTO Site Tour',
    date: createDate(2024, 10, 23), // Term 3, Week 7
    imageUrl: '/images/events/ANSTO SITE TOUR.png',
    facebookEventLink: 'https://www.facebook.com/events/ansto-site-tour-2024',
    description: 'An exclusive industrial site tour of the ANSTO facility.',
    category: 'Careers',
  },
  {
    id: 'ceusEventPast7',
    title: 'REVISE AND REVITALISE!',
    date: createDate(2024, 10, 16), // Term 3, Week 6
    imageUrl: '/images/events/revise and revitalise fb.png',
    facebookEventLink: 'https://www.facebook.com/events/revise-and-revitalise-2024',
    description: 'Study session with snacks and support to help you prepare for exams.',
    category: 'Academic',
  },
  {
    id: 'ceusEventPast8',
    title: 'CEUS x FSA Industry Night 2024 💼📢',
    date: createDate(2024, 10, 9), // Term 3, Week 5
    imageUrl: '/images/events/INDUSTRY NIGHT T2 2025 FB EVENT.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-fsa-industry-night-2024',
    description: 'Our flagship industry night, connecting students with leading companies and professionals.',
    category: 'Careers',
  },
  {
    id: 'ceusEventPast9',
    title: 'ANSTO x CEUS - Mineral Morning ☕️',
    date: createDate(2024, 10, 2), // Term 3, Week 4
    imageUrl: '/images/events/MINERAL MORNING COFFEE CATCH UP WK4 T2 (Facebook Cover).png',
    facebookEventLink: 'https://www.facebook.com/events/ansto-x-ceus-mineral-morning-2024',
    description: 'A morning coffee session with a focus on the minerals industry.',
    category: 'Collaboration',
  },
  {
    id: 'ceusEventPast10',
    title: '80s Rewind : Cruise',
    date: createDate(2024, 9, 25), // Term 3, Week 3
    imageUrl: '/images/events/cruise banner (t2wk2).png',
    facebookEventLink: 'https://www.facebook.com/events/80s-rewind-cruise-2024',
    description: 'A memorable cruise event with 80s theme to socialize and enjoy the views.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast11',
    title: 'Industry Training Info Night 👨‍💼',
    date: createDate(2024, 9, 18), // Term 3, Week 2
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/industry-training-info-night-2024',
    description: 'Information session about industry training opportunities and requirements.',
    category: 'Careers',
  },
  {
    id: 'ceusEventPast12',
    title: '🍩 WELCOME BACK DOUGHNUTS 🍩',
    date: createDate(2024, 9, 11), // Term 3, Week 1
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/welcome-back-doughnuts-2024',
    description: 'Welcome back event with free doughnuts to start the term right.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast13',
    title: 'CEUS X RED BULL - 2024 WINGS FOR LIFE WORLD RUN 🏃‍➡️🪽',
    date: createDate(2024, 9, 4), // Term 3, Week 0
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-red-bull-wings-for-life-world-run-2024',
    description: 'Join CEUS for the Wings for Life World Run in partnership with Red Bull.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast14',
    title: 'REVISE AND REVITALISE T1 2024 - Wednesday',
    date: createDate(2024, 8, 28), // Term 2, Week 13
    imageUrl: '/images/events/revise and revitalise fb.png',
    facebookEventLink: 'https://www.facebook.com/events/revise-and-revitalise-t1-2024-wednesday',
    description: 'Study session on Wednesday to help you prepare for exams.',
    category: 'Academic',
  },
  {
    id: 'ceusEventPast15',
    title: 'REVISE AND REVITALISE T1 2024 - Tuesday',
    date: createDate(2024, 8, 27), // Term 2, Week 13
    imageUrl: '/images/events/revise and revitalise fb.png',
    facebookEventLink: 'https://www.facebook.com/events/revise-and-revitalise-t1-2024-tuesday',
    description: 'Study session on Tuesday to help you prepare for exams.',
    category: 'Academic',
  },
  {
    id: 'ceusEventPast16',
    title: 'DESN1000 PIZZA WRAP-UP',
    date: createDate(2024, 8, 30), // Term 2, Week 13
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/desn1000-pizza-wrap-up-2024',
    description: 'Celebrate the end of DESN1000 with pizza and good company.',
    category: 'Academic',
  },
  {
    id: 'ceusEventPast17',
    title: 'CEUS Goes Bouldering 🧗🍕',
    date: createDate(2024, 8, 23), // Term 2, Week 12
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-goes-bouldering-2024',
    description: 'A fun and active social event, tackling bouldering problems together with pizza.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast18',
    title: 'Sunset Beach Volleyball 🌅🏐',
    date: createDate(2024, 8, 16), // Term 2, Week 11
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/sunset-beach-volleyball-2024',
    description: 'Enjoy a sunset game of beach volleyball with fellow CEUS members.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast19',
    title: 'CEUS Professional Photoshoot 📸👔',
    date: createDate(2024, 8, 9), // Term 2, Week 10
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-professional-photoshoot-2024',
    description: 'Get professional headshots for your LinkedIn and professional profiles.',
    category: 'Careers',
  },
  {
    id: 'ceusEventPast20',
    title: 'ROUNDY CATCH UP - CEUS X FSA X MATSOC X RESOC',
    date: createDate(2024, 8, 2), // Term 2, Week 9
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/roundy-catch-up-ceus-x-fsa-x-matsoc-x-resoc-2024',
    description: 'A casual catch-up at the Roundhouse with multiple engineering societies.',
    category: 'Collaboration',
  },
  {
    id: 'ceusEventPast21',
    title: 'CEUS SUBCOMMITTEE RECRUITMENT 2024 T1 ‼️‼️‼️',
    date: createDate(2024, 7, 26), // Term 2, Week 8
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-subcommittee-recruitment-2024-t1',
    description: 'Join the CEUS subcommittee and help organize amazing events for the society.',
    category: 'Recruitment',
  },
  {
    id: 'ceusEventPast22',
    title: 'Projects in the Pub 🍻',
    date: createDate(2024, 7, 19), // Term 2, Week 7
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/projects-in-the-pub-2024',
    description: 'Discuss projects and assignments over drinks in a relaxed pub environment.',
    category: 'Academic',
  },
  {
    id: 'ceusEventPast23',
    title: 'Tooheys Site Tour & Tasting 🍻',
    date: createDate(2024, 7, 12), // Term 2, Week 6
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/tooheys-site-tour-tasting-2024',
    description: 'An industrial tour of the Tooheys brewery, exploring the chemical processes behind brewing.',
    category: 'Careers',
  },
  {
    id: 'ceusEventPast24',
    title: 'CEUS x MATSOC x FSA x RESOC 2024 CAMP: Engineers and the Enchanted Expedition 🧙🔮✨',
    date: createDate(2024, 7, 5), // Term 2, Week 5
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-matsoc-x-fsa-x-resoc-2024-camp',
    description: 'The annual CEUS camp with multiple engineering societies, a weekend packed with fun activities.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast25',
    title: 'CEUS x FSA Coffee Crawl ☕️',
    date: createDate(2024, 6, 28), // Term 2, Week 4
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ceus-x-fsa-coffee-crawl-2024',
    description: 'Explored the best campus coffee spots while mingling with fellow students.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast26',
    title: 'EWB UNSW x CEUS - Embroidery Patch Stall',
    date: createDate(2024, 6, 21), // Term 2, Week 3
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/ewb-unsw-x-ceus-embroidery-patch-stall-2024',
    description: 'A collaboration with Engineers Without Borders, combining practical skills with social impact.',
    category: 'Collaboration',
  },
  {
    id: 'ceusEventPast27',
    title: 'What Is My Degree? - CEUS x FSA',
    date: createDate(2024, 6, 14), // Term 2, Week 2
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/what-is-my-degree-ceus-x-fsa-2024',
    description: 'An info session for first-year students to understand the chemical engineering curriculum and specializations.',
    category: 'Academic',
  },
  {
    id: 'ceusEventPast28',
    title: '🍕 Pizza Welcome Lunch 🍕',
    date: createDate(2024, 6, 7), // Term 2, Week 1
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/pizza-welcome-lunch-2024',
    description: 'Welcomed new and returning students with free pizza to start the term right.',
    category: 'Social',
  },
  {
    id: 'ceusEventPast29',
    title: 'O-Week Trivia Night',
    date: createDate(2024, 5, 31), // Term 2, Week 0
    imageUrl: '/images/events/default-event-placeholder.png',
    facebookEventLink: 'https://www.facebook.com/events/o-week-trivia-night-2024',
    description: 'Kicked off the year with a fun and challenging trivia night for all members.',
    category: 'Social',
  },
];