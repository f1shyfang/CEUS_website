// src/data/teamData.ts
import { TeamCategory, Member } from '../types';
import { STORAGE_IMAGE_URLS, getPublicStorageUrl } from '@/lib/storagePublicUrls';

const teamImage = (fileName: string): string => getPublicStorageUrl('team', fileName);

const withSupabaseImageUrls = (members: Member[]): Member[] => members;

const yearRepMembers: Member[] = [
  // 1st Year
  { id: 'daisyX', name: 'Daisy Xu', role: '1st Year Rep', imageUrl: teamImage('Daisy X.JPG'),linkedInUrl:'http://www.linkedin.com/in/daisy-xu-9b115935a '},
  { id: 'brentH', name: 'Brent Heathcote', role: '1st Year Rep', imageUrl: teamImage('brent.jpg')  },


  // 2nd Year
  { id: 'nathanaelW', name: 'Nathanael Widjaya', role: '2nd Year Rep', imageUrl: STORAGE_IMAGE_URLS.defaultTeam },
  { id: 'janiceY', name: 'Janice Ye', role: '2nd Year Rep', imageUrl: STORAGE_IMAGE_URLS.defaultTeam },

  // 3rd Year
  { id: 'jasonY', name: 'Jason Yang', role: '3rd Year Rep', imageUrl: STORAGE_IMAGE_URLS.defaultTeam },
  { id: 'cassieW', name: 'Cassie Wood', role: '3rd Year Rep', imageUrl: STORAGE_IMAGE_URLS.defaultTeam },

  // 4th Year
  // Chemical Engineering 4th Year is listed as "-", so no one for that specific slot
  { id: 'abdelrahmanE', name: 'Abdelrahman el Atawna', role: '4th Year Representative (Chem Prod Eng)', imageUrl: teamImage('abdelrahman.jpg') ,linkedInUrl:"https://www.linkedin.com/in/abdelrahman-elatawna-337323255/"},
];
const executivesMembers: Member[] = [
  { id: 'mayankV', name: 'Mayank Verma', role: 'President', imageUrl: STORAGE_IMAGE_URLS.defaultTeam, linkedInUrl: 'https://www.linkedin.com/in/mayankkverma/' },
  { id: 'amelieVB', name: 'Amelie von Bibra', role: 'Industry VP', imageUrl: STORAGE_IMAGE_URLS.defaultTeam, linkedInUrl: 'https://www.linkedin.com/in/amelie-von-bibra-878b162b5/' },
  { id: 'jaxC_exec', name: 'Jax Carrick', role: 'Social VP', imageUrl: teamImage('jax.jpg'), linkedInUrl: 'http://linkedin.com/in/jax-carrick-267351371' },
  { id: 'pavleH_exec', name: 'Pavle Hornby', role: 'Treasurer', imageUrl: STORAGE_IMAGE_URLS.defaultTeam, linkedInUrl: 'https://www.linkedin.com/in/pavle-hornby-906238318/' },
  { id: 'lucyL_exec', name: 'Lucy Liu', role: 'Marketing', imageUrl: teamImage('lucy.jpg'), linkedInUrl: 'https://www.linkedin.com/in/lucy-liu-5777a9354?trk=contact-info' },
  { id: 'mitchellC_exec', name: 'Mitchell Cook', role: 'Secretary', imageUrl: teamImage('mitchell.jpg'), linkedInUrl: 'https://www.linkedin.com/in/mitchell-cook-9690142a5/' },
  { id: 'annabelleS_exec', name: 'Annabelle Scarlett', role: 'Arc Delegate', imageUrl: teamImage('annabelle.jpg'), linkedInUrl: 'https://www.linkedin.com/in/annabelle-scarlett-6b7a03372' },
  { id: 'felicityP_exec', name: 'Felicity Pham', role: 'Welfare Officer', imageUrl: teamImage('felicity.jpg'), linkedInUrl: 'https://www.linkedin.com/in/felicity-pham-aa293b365/' },
  { id: 'michaelF_exec', name: 'Michael Feng', role: 'IT Director', imageUrl: STORAGE_IMAGE_URLS.defaultTeam, linkedInUrl: 'https://www.linkedin.com/in/michaelfeng7/' },
];

// --- INFORMATION TECHNOLOGY TEAM ---
const itMembers: Member[] = [
  { id: 'michaelF_exec', name: 'Michael Feng', role: 'IT Director', imageUrl: STORAGE_IMAGE_URLS.defaultTeam, linkedInUrl: 'https://www.linkedin.com/in/michaelfeng7/' },
  { id: 'nirvanP', name: 'Nirvan Pulakhandam', role: 'IT Assistant', imageUrl: teamImage('nirvan.jpg'), linkedInUrl: 'https://www.linkedin.com/in/nirvan-pulakhandam-192816383/' },
];

// --- MARKETING TEAM ---
const marketingTeamMembers: Member[] = [
  { id: 'lucyL_exec', name: 'Lucy Liu', role: 'Marketing', imageUrl: teamImage('lucy.jpg'), linkedInUrl: 'https://www.linkedin.com/in/lucy-liu-5777a9354?trk=contact-info' },
  { id: 'jaidanM', name: 'Jaidan', role: 'Marketing Assistant', imageUrl: STORAGE_IMAGE_URLS.defaultTeam, linkedInUrl: 'https://www.linkedin.com/in/jaidan-hassan-16348627a/' },
  { id: 'graceM', name: 'Grace', role: 'Marketing Assistant', imageUrl: teamImage('grace.jpg'), linkedInUrl: 'https://www.linkedin.com/in/gracelin1317/' },
];

// --- SOCIALS/EVENTS TEAM ---
const socialsTeamMembers: Member[] = [
  { id: 'jaxC_exec', name: 'Jax Carrick', role: 'Social VP', imageUrl: teamImage('jax.jpg'), linkedInUrl: 'http://linkedin.com/in/jax-carrick-267351371' },
  { id: 'anishaE', name: 'Anisha', role: 'Events Coordinator', imageUrl: STORAGE_IMAGE_URLS.defaultTeam },
  { id: 'devanE', name: 'Devan', role: 'Events Coordinator', imageUrl: teamImage('devon.jpg') },
  { id: 'charlieI', name: 'Charlie Jiang', role: 'Intersociety Representative', imageUrl: teamImage('charlie.JPG'), linkedInUrl: 'http://www.linkedin.com/in/charlie-jiang-0065a6239' },
];

// --- CAREERS/INDUSTRY TEAM ---
const careersTeamMembers: Member[] = [
  { id: 'amelieVB', name: 'Amelie von Bibra', role: 'Industry VP', imageUrl: STORAGE_IMAGE_URLS.defaultTeam, linkedInUrl: 'https://www.linkedin.com/in/amelie-von-bibra-878b162b5/' },
  { id: 'gabbyS', name: 'Gabby', role: 'Sponsorship Director', imageUrl: teamImage('gabrielle.jpg'), linkedInUrl: 'https://www.linkedin.com/in/gabrielle-shoebridge-087479281/' },
  { id: 'jaymeS', name: 'Jayme Cheong', role: 'Sponsorship Director', imageUrl: teamImage('jayme.jpg'), linkedInUrl: 'https://www.linkedin.com/in/jayme-cheong-63332a2b2/' },
  { id: 'jasmineI', name: 'Jasmine', role: 'Industry Events Coordinator', imageUrl: STORAGE_IMAGE_URLS.defaultTeam },
];

// --- Admin TEAM ---
const AdminMembers: Member[] = [
  { id: 'annabelleS_exec', name: 'Annabelle Scarlett', role: 'Arc Delegate', imageUrl: teamImage('annabelle.jpg'), linkedInUrl: 'https://www.linkedin.com/in/annabelle-scarlett-6b7a03372' },
  { id: 'felicityP_exec', name: 'Felicity Pham', role: 'Welfare Officer', imageUrl: teamImage('felicity.jpg'), linkedInUrl: 'https://www.linkedin.com/in/felicity-pham-aa293b365/' },
];




// --- ALL TEAMS DEFINITION ---
export const allTeams: TeamCategory[] = [
  { name: 'Executives', members: withSupabaseImageUrls(executivesMembers) },
  { name: 'Year Representatives', members: withSupabaseImageUrls(yearRepMembers) },
  { name: 'Information Technology', members: withSupabaseImageUrls(itMembers) },
  { name: 'Marketing', members: withSupabaseImageUrls(marketingTeamMembers) },
  { name: 'Socials', members: withSupabaseImageUrls(socialsTeamMembers) },
  { name: 'Careers', members: withSupabaseImageUrls(careersTeamMembers) },
  { name: 'Admin', members: withSupabaseImageUrls(AdminMembers) },
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