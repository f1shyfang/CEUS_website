// src/data/sponsorData.ts
import { Sponsor} from '../types';
import { getPublicStorageUrl } from '@/lib/storagePublicUrls';

// === IMPORTANT ===
// 1. Upload sponsor logos to Supabase storage bucket `sponsors`
// 2. Replace placeholder descriptions and website URLs with actual ones.

const sponsorLogo = (fileName: string): string => getPublicStorageUrl('sponsors', fileName);

const baseSponsors: Sponsor[] = [
  // Spotlight / featured sponsor (keeps ANSTO feature card intact)
  {
    id: 'ansto',
    name: 'ANSTO',
    logoUrl: sponsorLogo('ansto_logo.png'),
    websiteUrl: 'https://www.ansto.gov.au/',
    description:
      "Australia's national nuclear research and development organisation, partnering with CEUS to connect students with real-world scientific impact.",
    tier: 'Diamond',
    featured: true,
  },

  // Tiered layout inspired by CSESoc (adjust once 2026 sponsors are confirmed)
  {
    id: 'acps',
    name: 'Australian Coal Preparation Society',
    logoUrl: sponsorLogo('acps.png'),
    websiteUrl: 'https://www.acps.com.au/',
    description:
      'Promotes the science and practice of coal preparation and supports industry-ready graduates.',
    tier: 'Gold',
  },
  {
    id: 'ventia',
    name: 'Ventia',
    logoUrl: sponsorLogo('Ventia-logo.png'),
    websiteUrl: 'https://www.ventia.com/',
    description:
      'Leading infrastructure services provider delivering essential services across Australia and New Zealand.',
    tier: 'Silver',
  },
  {
    id: 'icheme',
    name: 'IChemE',
    logoUrl: sponsorLogo('IChemE-logo-2023-website.png'),
    websiteUrl: 'https://www.icheme.org/',
    description:
      'Global professional body advancing chemical engineering and professional accreditation.',
    tier: 'Silver',
  },
  {
    id: 'engineers-australia',
    name: 'Engineers Australia',
    logoUrl: sponsorLogo('engineersaustralia!.png'),
    websiteUrl: 'https://www.engineersaustralia.org.au/',
    description:
      'National forum for engineering excellence, professional development, and advocacy.',
    tier: 'Silver',
  },
  {
    id: 'arc',
    name: 'UNSW Arc',
    logoUrl: sponsorLogo('arc-clubs-logo.png'),
    websiteUrl: 'https://www.arc.unsw.edu.au/',
    description:
      'UNSW student organisation backing clubs, societies, and student-led initiatives.',
    tier: 'Community',
  },
];

export const allSponsors: Sponsor[] = baseSponsors;