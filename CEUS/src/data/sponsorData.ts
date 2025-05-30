// src/data/sponsorData.ts
import { Sponsor} from '../types';
//import { Sponsor, SponsorTier } from '../types';





// === IMPORTANT ===
// 1. Place sponsor logos in `public/images/sponsors/`
// 2. Replace placeholder descriptions and website URLs with actual ones.

export const allSponsors: Sponsor[] = [
  // --- Major Sponsors ---
  
  
  
  {
    id: 'Beer!!!',
    name: 'Soju Group',
    logoUrl: '/images/sponsors/macquarie.png', // Replace
    websiteUrl: 'https://www.macquarie.com/', // Replace
    description: 'I love soju.',
    tier: 'Major',
  },

  // --- Supporting Sponsors ---
  {
    id: 'ARC',
    name: 'UNSW arc',
    logoUrl: '/images/sponsors/suncorp.png', // Replace
    websiteUrl: 'https://www.suncorpgroup.com.au/', // Replace
    description: 'Arc.',
    tier: 'Supporting',
  },

  // Add more sponsors as needed...
  // {
  //   id: 'otherSponsor',
  //   name: 'Another Sponsor Inc.',
  //   logoUrl: '/images/sponsors/another.png',
  //   websiteUrl: '#',
  //   description: 'Details about another sponsor.',
  //   tier: 'Other',
  // },
];