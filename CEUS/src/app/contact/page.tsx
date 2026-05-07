// src/app/contact/page.tsx
import React from 'react';
import ContactClient from './ContactClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Chemical Engineering Undergraduate Society at UNSW. We are here to answer your questions.',
};

export default function ContactPage() {
  return <ContactClient />;
}
