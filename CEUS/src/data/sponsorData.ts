// src/data/sponsorData.ts
import { Sponsor} from '../types';

// === IMPORTANT ===
// 1. Place sponsor logos in `public/images/sponsors/`
// 2. Replace placeholder descriptions and website URLs with actual ones.

export const allSponsors: Sponsor[] = [
  // --- Principal Sponsor ---
  {
    id: 'ansto',
    name: 'ANSTO',
    logoUrl: '/images/sponsors/ansto_logo.png',
    websiteUrl: 'https://www.ansto.gov.au/',
    description: 'Australian Nuclear Science and Technology Organisation - Australia\'s national nuclear research and development organisation.',
    tier: 'Major',
  },
  
  // --- Major Sponsors ---
  {
    id: 'acps',
    name: 'Australian Coal Preparation Society',
    logoUrl: '/images/sponsors/acps.png',
    websiteUrl: 'https://www.acps.com.au/',
    description: 'The Australian Coal Preparation Society promotes the science and practice of coal preparation in Australia.',
    tier: 'Major',
  },
  
  // --- Supporting Sponsors ---
  {
    id: 'arc',
    name: 'UNSW Arc',
    logoUrl: '/images/sponsors/arc-clubs-logo.png',
    websiteUrl: 'https://www.arc.unsw.edu.au/',
    description: 'UNSW Arc is the student organisation at UNSW, supporting student clubs and societies.',
    tier: 'Supporting',
  },
  
  {
    id: 'ventia',
    name: 'Ventia',
    logoUrl: '/images/sponsors/Ventia-logo.png',
    websiteUrl: 'https://www.ventia.com/',
    description: 'Ventia is a leading infrastructure services company, delivering essential services to the community.',
    tier: 'Supporting',
  },
  
  {
    id: 'icheme',
    name: 'IChemE',
    logoUrl: '/images/sponsors/IChemE-logo-2023-website.png',
    websiteUrl: 'https://www.icheme.org/',
    description: 'The Institution of Chemical Engineers (IChemE) is a global professional engineering institution.',
    tier: 'Supporting',
  },
  
  {
    id: 'engineers-australia',
    name: 'Engineers Australia',
    logoUrl: '/images/sponsors/EngineersAu.png',
    websiteUrl: 'https://www.engineersaustralia.org.au/',
    description: 'Engineers Australia is the national forum for the advancement of engineering and the professional development of engineers.',
    tier: 'Supporting',
  },
];