import { Metadata } from 'next'
import SponsersPage from '../../pages/SponsersPage'

export const metadata: Metadata = {
  title: 'Our Sponsors',
  description: 'Meet the industry partners and sponsors who support CEUS UNSW and help us deliver exceptional experiences for chemical engineering students.',
  openGraph: {
    title: 'Our Sponsors | CEUS UNSW',
    description: 'Meet the industry partners and sponsors who support CEUS UNSW.',
  },
}

export default function Sponsors() {
  return <SponsersPage />
}
