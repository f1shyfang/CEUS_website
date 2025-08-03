// src/data/teamData.ts
import { TeamCategory, Member } from '../types';

const yearRepMembers: Member[] = [
  // 1st Year
  { id: 'daisyX', name: 'Daisy Xu', role: '1st Year Rep', imageUrl: '/images/team/professional photo - Daisy X.JPG',linkedInUrl:'http://www.linkedin.com/in/daisy-xu-9b115935a '},
  { id: 'brentH', name: 'Brent Heathcote', role: '1st Year Rep', imageUrl: '/images/team/brent.jpg' },

  // 2nd Year
  { id: 'pavleH', name: 'Pavle Hornby', role: '2nd Year Rep', imageUrl: '/images/team/pavle.jpg' }, // Note: 'Hornsby' not 'Hornby' as in prev list
  { id: 'megI', name: 'Meg Idosaka', role: '2nd Year Rep', imageUrl: '/images/team/meg.jpg' },

  // 3rd Year
  { id: 'jonathanC_yr', name: 'Jonathan Cao', role: '3rd Year Representative (Chem Eng)', imageUrl: '/images/team/jonathan_yr.jpg' }, // Added _yr to distinguish from Exec Jonathan Cao if different person or different photo needed
  { id: 'erikaD', name: 'Erika Daubaras', role: '3rd Year Representative (Chem Eng)', imageUrl: '/images/team/erika.jpg' ,linkedInUrl:"https://www.linkedin.com/in/erika-d-bbb301280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
  { id: 'alasterY', name: 'Alaster Yong', role: '3rd Year Representative (Chem Prod Eng)', imageUrl: '/images/team/alaster.jpg' ,linkedInUrl:'https://www.linkedin.com/in/alaster-yong-a7a2642a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'},

  // 4th Year
  // Chemical Engineering 4th Year is listed as "-", so no one for that specific slot
  { id: 'abdelrahmanE', name: 'Abdelrahman el Atawna', role: '4th Year Representative (Chem Prod Eng)', imageUrl: '/images/team/abdelrahman.jpg' ,linkedInUrl:"https://www.linkedin.com/in/abdelrahman-elatawna-337323255/"},
];
const executivesMembers: Member[] = [
  { id: 'veronicaP', name: 'Veronica Pelipos', role: 'President', imageUrl: '/images/team/Veronica.jpeg' ,linkedInUrl: 'https://au.linkedin.com/in/veronica-pelipos-45427821b?original_referer=https%3A%2F%2Fwww.google.com%2F'},
  { id: 'ninaT', name: 'Nina Teerasuphaset', role: 'Industry Vice President', imageUrl: '/images/team/Nina Teerasuphaset.jpeg',linkedInUrl: 'https://www.linkedin.com/in/nina-teerasuphaset-8b6a1521b/'},
  { id: 'kerriW', name: 'Kerri Wainstein', role: 'Vice President (Social)', imageUrl: '/images/team/kerri.jpg' },
  { id: 'annaK', name: 'Anna Koth-Ofoegbu', role: 'Secretary', imageUrl: '/images/team/Anna_Koth.jpg' ,linkedInUrl: 'http://www.linkedin.com/in/anna-koth-094979199'},
  { id: 'jonathanC_exec', name: 'Jonathan Cao', role: 'Treasurer', imageUrl: '/images/team/jonathan_exec.jpg' }, 
  { id: 'arianaH', name: 'Ariana Halar', role: 'Marketing Co-ordinator', imageUrl: '/images/team/ariana.jpg' },
  { id: 'sabrinaZ', name: 'Sabrina Zantua', role: 'Welfare Officer', imageUrl: '/images/team/sabrina.jpg' ,linkedInUrl:"www.linkedin.com/in/sabrina-zantua"},
];

// --- INFORMATION TECHNOLOGY TEAM ---
const itMembers: Member[] = [
  { id: 'nirvanP', name: 'Nirvan Pulakhandam', role: 'Web Designer', imageUrl: '/images/team/nirvan.jpg' },
  { id: 'michaelF', name: 'Michael Feng', role: 'Web Designer', imageUrl: '/images/team/michael.jpg' },
];

// --- MARKETING TEAM ---
const marketingTeamMembers: Member[] = [
  { id: 'lucyL', name: 'Lucy Liu', role: 'Marketing Assistant', imageUrl: '/images/team/lucy.jpg' ,linkedInUrl:"https://www.linkedin.com/in/lucy-liu-5777a9354?trk=contact-info"},
  { id: 'felicityP', name: 'Felicity Pham', role: 'Marketing Assistant', imageUrl: '/images/team/felicity.jpg',linkedInUrl:"https://www.linkedin.com/in/lucy-liu-5777a9354?trk=contact-info" },
{id:'MitchellC',name:'Mitchell Cook ',role:'Marketing Assistant',imageUrl:'/images/team/mitchell.jpg',linkedInUrl:"https://www.linkedin.com/in/mitchell-cook-9690142a5/"},
];

// --- SOCIALS/EVENTS TEAM ---
const socialsTeamMembers: Member[] = [
  { id: 'graceE', name: 'Grace', role: 'Event Officer', imageUrl: '/images/team/grace.jpg' },
  { id: 'charlieJ', name: 'Charlie Jiang', role: 'Event Officer', imageUrl: '/images/team/charlie.JPG', linkedInUrl: 'http://www.linkedin.com/in/charlie-jiang-0065a6239' },
  { id: 'devonD', name: 'Devon D', role: 'Events Administrator', imageUrl: '/images/team/devon.jpg' },
  {id:'jaxC',name:'Jax Carrick',role:'Events Coordinator ',imageUrl:'/images/team/jax.jpg',linkedInUrl:"http://linkedin.com/in/jax-carrick-267351371"},
];

// --- CAREERS/INDUSTRY TEAM ---
const careersTeamMembers: Member[] = [
  { id: 'jaymeC', name: 'Jayme Cheong', role: 'Industry Liaison', imageUrl: '/images/team/jayme.jpg',linkedInUrl:"https://www.linkedin.com/in/jayme-cheong-63332a2b2/" },
  { id: 'gabrielleS', name: 'Gabrielle Shoebridge', role: 'Industry Events Officer', imageUrl: '/images/team/gabrielle.jpg',linkedInUrl:"https://www.linkedin.com/in/gabrielle-shoebridge-087479281/" },
];

// --- Admin TEAM ---
const AdminMembers: Member[] = [
  { id: 'annabelleS', name: 'Annabelle Scarlett', role: 'Admin Officer', imageUrl: '/images/team/annabelle.jpg',linkedInUrl:"https://www.linkedin.com/in/annabelle-scarlett-6b7a03372" },
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