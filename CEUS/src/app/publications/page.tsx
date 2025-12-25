import { Metadata } from 'next'
import PublicationsPage from '../../pages/PublicationsPage'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Read the latest publications, newsletters, and resources from CEUS UNSW - the Chemical Engineering Undergraduate Society at UNSW Sydney.',
  openGraph: {
    title: 'Publications | CEUS UNSW',
    description: 'Read the latest publications and newsletters from CEUS UNSW.',
  },
}

export default function Publications() {
  return <PublicationsPage />
}
