import type { Metadata } from 'next'
import { Inter, Literata } from 'next/font/google'
import Script from 'next/script'
import '../index.css'
import AnalyticsProviders from '../components/analytics/AnalyticsProviders'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import { TRPCReactProvider } from '../trpc/react'

const SUPABASE_PUBLIC_BASE = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');
const SEO_LOGO_URL = `${SUPABASE_PUBLIC_BASE}/storage/v1/object/public/assets/assets/ceuslogo_noback_noname.png`;

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

const literata = Literata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-literata',
})

export const metadata: Metadata = {
  title: {
    default: 'CEUS - Chemical Engineering Undergraduate Society | UNSW',
    template: '%s | CEUS - Chemical Engineering Undergraduate Society'
  },
  description: 'The Chemical Engineering Undergraduate Society (CEUS) at UNSW. Join our community of chemical engineering students for events, networking, and professional development opportunities.',
  keywords: [
    'CEUS',
    'Chemical Engineering Society',
    'UNSW Student Society',
    'Chemical Engineering Students',
    'Student Events',
    'Professional Development',
    'Chemical Engineering UNSW',
    'Engineering Student Organizations'
  ],
  authors: [{ name: 'CEUS Executive Team' }],
  creator: 'CEUS - Chemical Engineering Undergraduate Society',
  publisher: 'CEUS - Chemical Engineering Undergraduate Society',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.ceusunsw.com'),
  icons: {
    icon: '/SVGlogo.svg',
    apple: '/SVGlogo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.ceusunsw.com',
    title: 'CEUS - Chemical Engineering Undergraduate Society | UNSW',
    description: 'The Chemical Engineering Undergraduate Society (CEUS) at UNSW. Join our community of chemical engineering students for events, networking, and professional development opportunities.',
    siteName: 'CEUS - Chemical Engineering Undergraduate Society',
    images: [
      {
        url: SEO_LOGO_URL,
        width: 1200,
        height: 630,
        alt: 'CEUS Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CEUS - Chemical Engineering Undergraduate Society | UNSW',
    description: 'The Chemical Engineering Undergraduate Society (CEUS) at UNSW. Join our community of chemical engineering students for events, networking, and professional development opportunities.',
    images: [SEO_LOGO_URL],
    creator: '@CEUS_UNSW',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
  other: {
    'msapplication-TileColor': '#ffffff',
    'theme-color': '#ffffff',
  },
}

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CEUS - Chemical Engineering Undergraduate Society",
              "url": "https://www.ceusunsw.com",
              "logo": SEO_LOGO_URL,
              "description": "The Chemical Engineering Undergraduate Society (CEUS) at UNSW. Join our community of chemical engineering students for events, networking, and professional development opportunities.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sydney",
                "addressRegion": "NSW",
                "addressCountry": "AU",
                "postalCode": "2052"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@ceusunsw.com"
              },
              "sameAs": [
                "https://www.facebook.com/CEUS.UNSW",
                "https://www.instagram.com/ceus_unsw",
                "https://www.linkedin.com/company/ceus-unsw"
              ],
              "foundingDate": "2020",
              "alumniOf": {
                "@type": "Organization",
                "name": "University of New South Wales",
                "url": "https://www.unsw.edu.au"
              }
            })
          }}
        />

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.className} ${literata.variable}`}>
        <AnalyticsProviders>
          <TRPCReactProvider>
            <div className="flex flex-col min-h-screen bg-white">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </TRPCReactProvider>
        </AnalyticsProviders>
      </body>
    </html>
  )
}
