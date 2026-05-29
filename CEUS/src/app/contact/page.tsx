// src/app/contact/page.tsx
import React from 'react';
import ContactClient from './ContactClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact CEUS',
  description:
    'Get in touch with the Chemical Engineering Undergraduate Society at UNSW. Send us a message about events, merch, or sponsorship and we will reply within 3 to 4 days during term.',
};

export default function ContactPage() {
  return <ContactClient />;
}
