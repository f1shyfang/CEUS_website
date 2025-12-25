import { Metadata } from 'next'
import ContactPage from '../../pages/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with CEUS UNSW. Reach out for sponsorship inquiries, event collaborations, or general questions about the Chemical Engineering Undergraduate Society.',
  openGraph: {
    title: 'Contact Us | CEUS UNSW',
    description: 'Get in touch with CEUS UNSW for sponsorship inquiries, collaborations, or questions.',
  },
}

export default function Contact() {
  return <ContactPage />
}
