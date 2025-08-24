import React from 'react'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'event' | 'organization' | 'person'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  structuredData?: object
  noIndex?: boolean
  canonical?: string
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  structuredData,
  noIndex = false,
  canonical
}) => {
  const fullTitle = title ? `${title} | CEUS - Chemical Engineering Undergraduate Society` : 'CEUS - Chemical Engineering Undergraduate Society'
  const fullDescription = description || 'The Chemical Engineering Undergraduate Society (CEUS) at UNSW. Join our community of chemical engineering students for events, networking, and professional development opportunities.'
  const fullImage = image || 'https://www.ceusunsw.com/images/assets/ceuslogo_noback_noname.png'
  const fullUrl = url || 'https://www.ceusunsw.com'
  const canonicalUrl = canonical || fullUrl

  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CEUS - Chemical Engineering Undergraduate Society",
    "url": "https://www.ceusunsw.com",
    "logo": "https://www.ceusunsw.com/images/assets/ceuslogo_noback_noname.png",
    "description": fullDescription,
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
    ]
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Robots Meta Tags */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="CEUS - Chemical Engineering Undergraduate Society" />
      <meta property="og:locale" content="en_AU" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="CEUS - Chemical Engineering Undergraduate Society" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@CEUS_UNSW" />
      <meta name="twitter:site" content="@CEUS_UNSW" />
      
      {/* Article Specific Meta Tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.length > 0 && tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Event Specific Meta Tags */}
      {type === 'event' && (
        <>
          {publishedTime && <meta property="event:start_time" content={publishedTime} />}
          {modifiedTime && <meta property="event:end_time" content={modifiedTime} />}
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="CEUS Executive Team" />
      <meta name="copyright" content="CEUS - Chemical Engineering Undergraduate Society" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="CEUS" />
      
      {/* Performance Meta Tags */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />
    </>
  )
}

export default SEOHead
