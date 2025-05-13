// src/data/sponsorData.ts
import { Sponsor, SponsorTier } from '../types';

// === IMPORTANT ===
// 1. Place sponsor logos in `public/images/sponsors/`
// 2. Replace placeholder descriptions and website URLs with actual ones.

export const allSponsors: Sponsor[] = [
  // --- Major Sponsors ---
  {
    id: 'amstelveen',
    name: 'Amstelveen',
    logoUrl: '/images/sponsors/CEUS-industry-night.jpeg', // Replace with actual path
    websiteUrl: 'https://www.amstelveen.com/', // Replace
    description: 'Amstelveen provides consulting services focusing on risk, performance, and technology. They help organizations navigate complex challenges and achieve sustainable growth.',
    tier: 'Major',
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    logoUrl: '/images/sponsors/atlassian.png', // Replace
    websiteUrl: 'https://www.atlassian.com/', // Replace
    description: 'Atlassian builds software like Jira, Confluence, and Trello to help teams organize, discuss, and complete shared work.',
    tier: 'Major',
  },
  {
    id: 'kpmg',
    name: 'KPMG Australia',
    logoUrl: '/images/sponsors/kpmg.png', // Replace
    websiteUrl: 'https://kpmg.com/au/en/home.html', // Replace
    description: 'KPMG is a global network of professional firms providing Audit, Tax and Advisory services, helping organizations mitigate risks and grasp opportunities.',
    tier: 'Major',
  },
  {
    id: 'macquarie',
    name: 'Macquarie Group',
    logoUrl: '/images/sponsors/macquarie.png', // Replace
    websiteUrl: 'https://www.macquarie.com/', // Replace
    description: 'Macquarie is a global financial services group operating in 34 markets, acting primarily as an investment intermediary for institutional, corporate and retail clients.',
    tier: 'Major',
  },

  // --- Supporting Sponsors ---
  {
    id: 'suncorp',
    name: 'Suncorp Group',
    logoUrl: '/images/sponsors/suncorp.png', // Replace
    websiteUrl: 'https://www.suncorpgroup.com.au/', // Replace
    description: 'Suncorp Group offers a range of financial products and services in banking, insurance, and superannuation across Australia and New Zealand.',
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