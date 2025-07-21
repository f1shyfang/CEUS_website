// src/data/sponsorData.ts
import { Sponsor} from '../types';
//import { Sponsor, SponsorTier } from '../types';





// === IMPORTANT ===
// 1. Place sponsor logos in `public/images/sponsors/`
// 2. Replace placeholder descriptions and website URLs with actual ones.

export const allSponsors: Sponsor[] = [
  // --- Major Sponsors ---
  
  {
    id: 'Ansto!!!',
    name: 'Ansto',
    logoUrl: '/images/sponsors/Arc_icon.png', // Replace
    websiteUrl: 'https://www.macquarie.com/', // Replace
    description: 'I .',
    tier: 'Major',
  },

  // --- Supporting Sponsors ---
  {
    id: 'ARC',
    name: 'UNSW arc',
    logoUrl: '/images/sponsors/Arc_icon.png', // Replace
    websiteUrl: 'https://www.suncorpgroup.com.au/', // Replace
    description: 'Arc.',
    tier: 'Supporting',
  },

  // Added Ansto
  {
    id: 'ansto',
    name: 'ANSTO',
    logoUrl: '/images/sponsors/ansto_logo.png', // Placeholder - Replace with actual logo path
    websiteUrl: 'https://www.ansto.gov.au/', // Placeholder - Replace with actual website URL
    description: 'Details about ANSTO.', // Placeholder - Add actual description
    tier: 'Supporting', // Placeholder - Specify the correct tier
  },
  // Added Ventia
  {
    id: 'ventia',
    name: 'Ventia',
    logoUrl: '/images/sponsors/ventia_logo.png', // Placeholder - Replace with actual logo path
    websiteUrl: 'https://www.ventia.com/', // Placeholder - Replace with actual website URL
    description: 'Details about Ventia.', // Placeholder - Add actual description
    tier: 'Supporting', // Placeholder - Specify the correct tier
  },
    // Added IChemE
    {
      id: 'icheme',
      name: 'IChemE',
      logoUrl: '/images/sponsors/icheme_logo.png', // Placeholder
      websiteUrl: '#', // Placeholder
      description: 'Details about IChemE.', // Placeholder
      tier: 'Supporting', // Placeholder
    },
    // Added Engineers Australia
    {
      id: 'engineers-australia',
      name: 'Engineers Australia',
      logoUrl: '/images/sponsors/engineers_australia_logo.png', // Placeholder
      websiteUrl: '#', // Placeholder
      description: 'Details about Engineers Australia.', // Placeholder
      tier: 'Supporting', // Placeholder
    },
    // Added Australian Coal Preparation Society
    {
      id: 'acps',
      name: 'Australian Coal Preparation Society',
      logoUrl: '/images/sponsors/acps_logo.png', // Placeholder
      websiteUrl: '#', // Placeholder
      description: 'Details about the Australian Coal Preparation Society.', // Placeholder
      tier: 'Supporting', // Placeholder
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