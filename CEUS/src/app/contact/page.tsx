// src/app/contact/page.tsx
import React from 'react';
import ContactClient from './ContactClient';
import { Metadata } from 'next';
import { pageMetadata } from '../../lib/seo';
import { PageBreadcrumbs } from '../../components/PageBreadcrumbs';

export const metadata: Metadata = pageMetadata(
  'Contact Us',
  'Contact CEUS at UNSW — reach the Chemical Engineering Undergraduate Society for event enquiries, sponsorship, or student support.',
  '/contact',
);

export default function ContactPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <PageBreadcrumbs pathname="/contact" />
      </div>
      <ContactClient />
    </>
  );
}
