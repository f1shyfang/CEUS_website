// src/data/teamData.ts
import { TeamCategory, Member } from '../types';

const executivesMembers: Member[] = [
  { id: 'Ver', name: 'Veronica ', role: 'President', imageUrl: '/path/to/kelly.jpg' },
  { id: 'nnag', name: 'Sabrina', role: 'Grievance Officer', imageUrl: '/path/to/neil.jpg' },
  {id: 'nnag', name: 'Anna', role: 'Secretary', imageUrl: '/path/to/neil.jpg' },
  { id: 'jhu', name: 'Jonathan', role: 'Treasurer & Arc Delegate', imageUrl: '/path/to/james.jpg' },
  { id: 'alal', name: 'Kerri', role: 'Vice President of Socials', imageUrl: '/path/to/aryan.jpg' },
  { id: 'tasdagx', name: 'Nina', role: 'Vice President of industry', imageUrl: '/path/to/thao.jpg' },
  { id: 'tasdgx', name: 'Alaster', role: '3rd Year rep', imageUrl: '/path/to/thao.jpg' },
  { id: 'tngasdax', name: 'Abdelrahman', role: '4th Year rep', imageUrl: '/path/to/thao.jpg' },
  { id: 'tnasdgx', name: 'Palve', role: '2nd Year rep', imageUrl: '/path/to/thao.jpg' },
  

// add rest later
];

// You'd create similar member arrays for other categories
// const academicsMembers: Member[] = [ ... ];
// const itMembers: Member[] = [ ... ];


export const allTeams: TeamCategory[] = [
  { name: 'Executives', members: executivesMembers },
  // { name: 'Academics', members: academicsMembers },
  // { name: 'Outreach', members: [] }, // Example of an empty category
  { name: 'Careers', members: [] },
  // { name: 'Socials', members: [] },
  // { name: 'Human Resources', members: [] },
   { name: 'Marketing', members: [] },
  // { name: 'Creative', members: [] },
   { name: 'Information Technology', members: [] },
];

// For the filter buttons specifically
export const mainFilterCategories = [
    { id: 'executives', label: 'Executives' },
    
    { id: 'outreach', label: 'Outreach' },
    { id: 'careers', label: 'Careers' },
    { id: 'socials', label: 'Socials' },
   
    { id: 'marketing', label: 'Marketing' },
   
    { id: 'Yearrep', label: 'Yearrep' },
];

export const subFilterCategories = [
    { id: 'informationTechnology', label: 'Information Technology' },
];