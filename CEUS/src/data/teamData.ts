// src/data/teamData.ts
import { TeamCategory, Member } from '../types';

const yearRepMembers: Member[] = [
  // 1st Year
  { id: 'daisyX', name: 'Daisy Xu', role: '1st Year Rep', imageUrl: '/images/team/Daisy X.JPG',linkedInUrl:'http://www.linkedin.com/in/daisy-xu-9b115935a '},
  { id: 'brentH', name: 'Brent Heathcote', role: '1st Year Rep', imageUrl: '/images/team/brent.jpg' },

  // 2nd Year
  { id: 'nathanaelW', name: 'Nathanael Widjaya', role: '2nd Year Rep', imageUrl: '/images/team/no_profile_img.jpg' },
  { id: 'janiceY', name: 'Janice Ye', role: '2nd Year Rep', imageUrl: '/images/team/no_profile_img.jpg' },

  // 3rd Year
  { id: 'jasonY', name: 'Jason Yang', role: '3rd Year Rep', imageUrl: '/images/team/no_profile_img.jpg' },
  { id: 'cassieW', name: 'Cassie Wood', role: '3rd Year Rep', imageUrl: '/images/team/no_profile_img.jpg' },

  // 4th Year
  // Chemical Engineering 4th Year is listed as "-", so no one for that specific slot
  { id: 'abdelrahmanE', name: 'Abdelrahman el Atawna', role: '4th Year Representative (Chem Prod Eng)', imageUrl: '/images/team/abdelrahman.jpg' ,linkedInUrl:"https://www.linkedin.com/in/abdelrahman-elatawna-337323255/"},
];
const executivesMembers: Member[] = [
  { id: 'mayankV', name: 'Mayank Verma', role: 'President', imageUrl: '/images/team/no_profile_img.jpg' },
  { id: 'amelieVB', name: 'Amelie von Bibra', role: 'Industry VP', imageUrl: '/images/team/no_profile_img.jpg' },
  { id: 'jaxC_exec', name: 'Jax Carrick', role: 'Social VP', imageUrl: '/images/team/jax.jpg', linkedInUrl: 'http://linkedin.com/in/jax-carrick-267351371' },
  { id: 'pavleH_exec', name: 'Pavle Hornby', role: 'Treasurer', imageUrl: '/images/team/no_profile_img.jpg' },
  { id: 'lucyL_exec', name: 'Lucy Liu', role: 'Marketing', imageUrl: '/images/team/lucy.jpg', linkedInUrl: 'https://www.linkedin.com/in/lucy-liu-5777a9354?trk=contact-info' },
  { id: 'mitchellC_exec', name: 'Mitchell Cook', role: 'Secretary', imageUrl: '/images/team/mitchell.jpg', linkedInUrl: 'https://www.linkedin.com/in/mitchell-cook-9690142a5/' },
  { id: 'annabelleS_exec', name: 'Annabelle Scarlett', role: 'Arc Delegate', imageUrl: '/images/team/annabelle.jpg', linkedInUrl: 'https://www.linkedin.com/in/annabelle-scarlett-6b7a03372' },
  { id: 'felicityP_exec', name: 'Felicity Pham', role: 'Welfare Officer', imageUrl: '/images/team/felicity.jpg' },
  { id: 'michaelF_exec', name: 'Michael Feng', role: 'IT Director', imageUrl: '/images/team/no_profile_img.jpg' },
];

// --- INFORMATION TECHNOLOGY TEAM ---
const itMembers: Member[] = [
  { id: 'nirvanP', name: 'Nirvan Pulakhandam', role: 'Web Designer', imageUrl: '/images/team/nirvan.jpg' },
];

// --- MARKETING TEAM ---
const marketingTeamMembers: Member[] = [
];

// --- SOCIALS/EVENTS TEAM ---
const socialsTeamMembers: Member[] = [
  { id: 'graceE', name: 'Grace', role: 'Event Officer', imageUrl: '/images/team/grace.jpg' },
  { id: 'charlieJ', name: 'Charlie Jiang', role: 'Event Officer', imageUrl: '/images/team/charlie.JPG', linkedInUrl: 'http://www.linkedin.com/in/charlie-jiang-0065a6239' },
  { id: 'devonD', name: 'Devon D', role: 'Events Administrator', imageUrl: '/images/team/devon.jpg' },
];

// --- CAREERS/INDUSTRY TEAM ---
const careersTeamMembers: Member[] = [
  { id: 'jaymeC', name: 'Jayme Cheong', role: 'Industry Liaison', imageUrl: '/images/team/jayme.jpg',linkedInUrl:"https://www.linkedin.com/in/jayme-cheong-63332a2b2/" },
  { id: 'gabrielleS', name: 'Gabrielle Shoebridge', role: 'Industry Events Officer', imageUrl: '/images/team/gabrielle.jpg',linkedInUrl:"https://www.linkedin.com/in/gabrielle-shoebridge-087479281/" },
];

// --- Admin TEAM ---
const AdminMembers: Member[] = [
];




// --- ALL TEAMS DEFINITION ---
export const allTeams: TeamCategory[] = [
  { name: 'Executives', members: executivesMembers },
  { name: 'Year Representatives', members: yearRepMembers },
  { name: 'Information Technology', members: itMembers },
  { name: 'Marketing', members: marketingTeamMembers },
  { name: 'Socials', members: socialsTeamMembers },
  { name: 'Careers', members: careersTeamMembers },
  { name: 'Admin', members: AdminMembers },
];

// --- FILTER BUTTONS ---
export const mainFilterCategories = [
    { id: 'executives', label: 'Executives' },
    { id: 'yearRepresentatives', label: 'Year Representatives' },
    { id: 'Admin', label: 'Admin' },
    { id: 'careers', label: 'Careers' },
    { id: 'socials', label: 'Socials' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'informationTechnology', label: 'Information Technology' },
];

// export const subFilterCategories = []; //probs not needed