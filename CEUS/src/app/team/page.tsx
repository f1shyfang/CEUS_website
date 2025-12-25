import { Metadata } from 'next'
import TeamPage from '../../pages/TeamPage'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the dedicated executive team behind CEUS UNSW - the Chemical Engineering Undergraduate Society at UNSW Sydney.',
  openGraph: {
    title: 'Our Team | CEUS UNSW',
    description: 'Meet the dedicated executive team behind CEUS UNSW.',
  },
}

export default function Team() {
  return <TeamPage />
}
