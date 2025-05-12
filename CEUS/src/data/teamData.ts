// src/data/teamData.ts
import { TeamCategory, Member } from '../types';

const yearRepMembers: Member[] = [
  // 1st Year
  { id: 'daisyX', name: 'Daisy Xu', role: '1st Year Representative (Chem Eng)', imageUrl: '/images/team/daisy.jpg' },
  { id: 'brentH', name: 'Brent Heathcote', role: '1st Year Representative (Chem Eng)', imageUrl: '/images/team/brent.jpg' },

  // 2nd Year
  { id: 'pavleH', name: 'Pavle Hornsby', role: '2nd Year Representative (Chem Eng)', imageUrl: '/images/team/pavle.jpg' }, // Note: 'Hornsby' not 'Hornby' as in prev list
  { id: 'megI', name: 'Meg Idosaka', role: '2nd Year Representative (Chem Prod Eng)', imageUrl: '/images/team/meg.jpg' },

  // 3rd Year
  { id: 'jonathanC_yr', name: 'Jonathan Cao', role: '3rd Year Representative (Chem Eng)', imageUrl: '/images/team/jonathan_yr.jpg' }, // Added _yr to distinguish from Exec Jonathan Cao if different person or different photo needed
  { id: 'erikaD', name: 'Erika Daubaras', role: '3rd Year Representative (Chem Eng)', imageUrl: '/images/team/erika.jpg' },
  { id: 'alasterY', name: 'Alaster Yong', role: '3rd Year Representative (Chem Prod Eng)', imageUrl: '/images/team/alaster.jpg' },

  // 4th Year
  // Chemical Engineering 4th Year is listed as "-", so no one for that specific slot
  { id: 'abdelrahmanE', name: 'Abdelrahman el Atawna', role: '4th Year Representative (Chem Prod Eng)', imageUrl: '/images/team/abdelrahman.jpg' },
];
const executivesMembers: Member[] = [
  { id: 'veronicaP', name: 'Veronica Pelipos', role: 'President', imageUrl: '/images/team/veronica.jpg' },
  { id: 'ninaT', name: 'Nina Teerasuphaset', role: 'Vice President (Industry)', imageUrl: '/images/team/nina.jpg' },
  { id: 'kerriW', name: 'Kerri Wainstein', role: 'Vice President (Social)', imageUrl: '/images/team/kerri.jpg' },
  { id: 'annaK', name: 'Anna Koth-Ofoegbu', role: 'Secretary', imageUrl: '/images/team/anna.jpg' },
  { id: 'jonathanC_exec', name: 'Jonathan Cao', role: 'Treasurer', imageUrl: '/images/team/jonathan_exec.jpg' }, // Note: This is the Exec Treasurer. If same person as 3rd Yr Rep, decide on one entry or distinct roles/photos.
  { id: 'arianaH', name: 'Ariana Halar', role: 'Marketing Co-ordinator', imageUrl: '/images/team/ariana.jpg' },
  { id: 'sabrinaZ', name: 'Sabrina Zantua', role: 'Welfare Officer', imageUrl: '/images/team/sabrina.jpg' },
];

// --- INFORMATION TECHNOLOGY TEAM ---
const itMembers: Member[] = [
  { id: 'nirvanP', name: 'Nirvan Pulakhandam', role: 'Web Designer', imageUrl: '/images/team/nirvan.jpg' },
  { id: 'michaelF', name: 'Michael Feng', role: 'Web Designer', imageUrl: '/images/team/michael.jpg' },
];

// --- MARKETING TEAM ---
const marketingTeamMembers: Member[] = [
  { id: 'lucyL', name: 'Lucy Liu', role: 'Marketing Assistant', imageUrl: '/images/team/lucy.jpg' },
  { id: 'felicityP', name: 'Felicity Pham', role: 'Marketing Assistant', imageUrl: '/images/team/felicity.jpg' },
];

// --- SOCIALS/EVENTS TEAM ---
const socialsTeamMembers: Member[] = [
  { id: 'graceE', name: 'Grace', role: 'Event Officer', imageUrl: '/images/team/grace.jpg' },
  { id: 'charlieJ', name: 'Charlie Jiang', role: 'Event Officer', imageUrl: '/images/team/charlie.jpg' },
  { id: 'devonD', name: 'Devon D', role: 'Events Administrator', imageUrl: '/images/team/devon.jpg' },
];

// --- CAREERS/INDUSTRY TEAM ---
const careersTeamMembers: Member[] = [
  { id: 'jaymeC', name: 'Jayme Cheong', role: 'Industry Liaison', imageUrl: '/images/team/jayme.jpg' },
  { id: 'gabrielleS', name: 'Gabrielle Shoebridge', role: 'Industry Events Officer', imageUrl: '/images/team/gabrielle.jpg' },
];

// --- Admin TEAM ---
const AdminMembers: Member[] = [
  { id: 'annabelleS', name: 'Annabelle Scarlett', role: 'Admin Officer', imageUrl: '/images/team/annabelle.jpg' },
];

// --- OTHER TEAMS (Academics, Human Resources, Creative) - Define if needed ---
const academicsMembers: Member[] = [];
// ... (define other empty arrays if you have filter buttons for them)


// --- ALL TEAMS DEFINITION ---
export const allTeams: TeamCategory[] = [
  { name: 'Executives', members: executivesMembers },
  { name: 'Year Representatives', members: yearRepMembers }, // Added Year Reps as a distinct team
  { name: 'Information Technology', members: itMembers },
  { name: 'Marketing', members: marketingTeamMembers },
  { name: 'Socials', members: socialsTeamMembers },
  { name: 'Careers', members: careersTeamMembers },
  { name: 'Admin', members: AdminMembers },
  // { name: 'Academics', members: academicsMembers },
];

// --- FILTER BUTTONS ---
export const mainFilterCategories = [
    { id: 'executives', label: 'Executives' },
    { id: 'yearRepresentatives', label: 'Year Representatives' }, // Added filter button for Year Reps
    // { id: 'academics', label: 'Academics' },
    { id: 'Admin', label: 'Admin' },
    { id: 'careers', label: 'Careers' },
    { id: 'socials', label: 'Socials' },
    // { id: 'humanResources', label: 'Human Resources' },
    { id: 'marketing', label: 'Marketing' },
    // { id: 'creative', label: 'Creative' },
    { id: 'informationTechnology', label: 'Information Technology' },
];

// export const subFilterCategories = []; // Likely not needed