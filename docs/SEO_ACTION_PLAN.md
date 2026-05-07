# CEUS Website SEO Action Plan

## 🎯 **Executive Summary**

This document outlines the comprehensive SEO optimization plan for the CEUS website at [https://www.ceusunsw.com/](https://www.ceusunsw.com/). The plan focuses on improving search engine visibility, user experience, and overall website performance.

## 📊 **Current SEO Status**

### ✅ **Strengths**
- Modern Next.js framework (SEO-friendly)
- Basic sitemap.xml and robots.txt implementation
- Clean URL structure
- Mobile-responsive design
- Fast loading times

### ❌ **Areas for Improvement**
- Missing structured data
- Limited keyword optimization
- No Google Analytics setup
- Incomplete meta descriptions
- Missing performance optimizations

## 🚀 **SEO Improvements Implemented**

### **Phase 1: Core SEO Foundation (COMPLETED)**

#### 1. **Enhanced Root Layout Metadata**
- ✅ Comprehensive Open Graph tags
- ✅ Twitter Card optimization
- ✅ Structured data implementation
- ✅ Google Analytics setup
- ✅ Mobile optimization meta tags

#### 2. **Improved Sitemap**
- ✅ Added lastmod dates
- ✅ Added change frequency
- ✅ Enhanced priority settings
- ✅ Additional important pages

#### 3. **Advanced SEO Component**
- ✅ Enhanced SEOHead component
- ✅ Structured data support
- ✅ Performance optimizations
- ✅ Mobile-friendly meta tags

#### 4. **Image Optimization**
- ✅ Created OptimizedImage component
- ✅ Next.js Image integration
- ✅ Lazy loading implementation
- ✅ SEO-friendly alt text handling

## 📋 **Next Steps - Implementation Plan**

### **Phase 2: Page-Specific SEO (Week 1-2)**

#### 1. **Homepage Optimization**
```typescript
// Add to HomePage.tsx
<SEOHead
  title="CEUS - Chemical Engineering Undergraduate Society"
  description="Join CEUS, the premier Chemical Engineering student society at UNSW. Connect with peers, attend industry events, and advance your career in chemical engineering."
  keywords={[
    'CEUS',
    'Chemical Engineering Society',
    'UNSW Student Society',
    'Chemical Engineering Students',
    'Student Events'
  ]}
  type="website"
/>
```

#### 2. **Events Page Enhancement**
```typescript
// Add structured data for events
const eventStructuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.name,
  "description": event.description,
  "startDate": event.date,
  "location": {
    "@type": "Place",
    "name": "UNSW Main Campus"
  },
  "organizer": {
    "@type": "Organization",
    "name": "CEUS - Chemical Engineering Undergraduate Society"
  }
}
```

#### 3. **Team Page Optimization**
```typescript
// Add person schema for team members
const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": member.name,
  "jobTitle": member.role,
  "description": member.bio,
  "alumniOf": {
    "@type": "Organization",
    "name": "University of New South Wales"
  }
}
```

### **Phase 3: Content & Performance (Week 2-3)**

#### 1. **Content Optimization**
- [ ] Add FAQ section with structured data
- [ ] Create blog/news section
- [ ] Optimize event descriptions
- [ ] Add student testimonials

#### 2. **Performance Improvements**
- [ ] Compress large PDF files
- [ ] Implement image compression
- [ ] Add service worker for caching
- [ ] Optimize font loading

#### 3. **Internal Linking**
- [ ] Implement breadcrumbs
- [ ] Add related content links
- [ ] Create topic clusters
- [ ] Add anchor links

### **Phase 4: Advanced SEO (Week 3-4)**

#### 1. **Analytics & Monitoring**
- [ ] Set up Google Search Console
- [ ] Configure Google Analytics 4
- [ ] Set up Core Web Vitals monitoring
- [ ] Implement conversion tracking

#### 2. **Advanced Features**
- [ ] Add AMP support for events
- [ ] Implement PWA features
- [ ] Add social media integration
- [ ] Create XML feeds

## 🛠️ **Technical Implementation Guide**

### **1. Google Analytics Setup**

```typescript
// Add to layout.tsx
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `,
  }}
/>
```

### **2. Search Console Verification**

```typescript
// Add to metadata
verification: {
  google: 'your-google-verification-code',
}
```

### **3. Performance Monitoring**

```bash
# Install Lighthouse CI
npm install -g lighthouse-ci

# Run performance audits
lhci autorun
```

## 📈 **SEO Metrics to Track**

### **Technical SEO**
- Core Web Vitals scores
- Page load speed
- Mobile usability
- Indexing status

### **Content Performance**
- Organic search traffic
- Keyword rankings
- Click-through rates
- Bounce rate

### **User Engagement**
- Time on page
- Pages per session
- Social shares
- Event registrations

## 🎯 **Keyword Strategy**

### **Primary Keywords**
- CEUS
- Chemical Engineering Society
- UNSW Student Society
- Chemical Engineering Students

### **Long-tail Keywords**
- Chemical Engineering Undergraduate Society UNSW
- Chemical Engineering Student Events Sydney
- UNSW Engineering Student Organizations
- Chemical Engineering Career Development

### **Event-specific Keywords**
- Industry Night CEUS
- Chemical Engineering Networking Events
- Student Professional Development
- Engineering Career Opportunities

## 📱 **Mobile Optimization Checklist**

- [x] Responsive design
- [x] Mobile-friendly meta tags
- [x] Touch-friendly navigation
- [x] Fast mobile loading
- [ ] AMP implementation
- [ ] PWA features

## 🔍 **Search Console Setup**

### **1. Verify Ownership**
- Add verification code to metadata
- Submit sitemap.xml
- Monitor indexing status

### **2. Monitor Performance**
- Track search queries
- Monitor click-through rates
- Analyze user behavior
- Identify technical issues

## 📊 **Analytics Implementation**

### **Google Analytics 4 Events**
```typescript
// Track important user interactions
gtag('event', 'event_registration', {
  event_category: 'engagement',
  event_label: eventName
});

gtag('event', 'page_view', {
  page_title: pageTitle,
  page_location: pageUrl
});
```

### **Conversion Tracking**
- Event registrations
- Contact form submissions
- Newsletter signups
- Social media clicks

## 🚀 **Performance Optimization**

### **Image Optimization**
```typescript
// Use OptimizedImage component
<OptimizedImage
  src="/images/events/event-image.jpg"
  alt="CEUS Industry Night 2024"
  width={400}
  height={300}
  priority={true}
  quality={85}
/>
```

### **Font Optimization**
```typescript
// Optimize Google Fonts
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})
```

## 📅 **Content Calendar**

### **Weekly Tasks**
- Update event information
- Monitor search performance
- Check for broken links
- Review analytics

### **Monthly Tasks**
- Content audit
- Keyword analysis
- Performance review
- Competitor analysis

### **Quarterly Tasks**
- SEO strategy review
- Technical audit
- Content planning
- Performance optimization

## 🎯 **Success Metrics**

### **Short-term Goals (1-3 months)**
- Improve Core Web Vitals scores
- Increase organic traffic by 25%
- Achieve top 10 rankings for primary keywords
- Reduce bounce rate by 15%

### **Long-term Goals (6-12 months)**
- Become the #1 result for "CEUS UNSW"
- Increase event registrations by 50%
- Achieve 1000+ monthly organic visitors
- Build strong backlink profile

## 📚 **Resources & Tools**

### **SEO Tools**
- Google Search Console
- Google Analytics
- PageSpeed Insights
- Lighthouse
- Schema.org Validator

### **Monitoring Tools**
- Google Search Console
- Google Analytics
- Core Web Vitals
- PageSpeed Insights

### **Content Tools**
- Google Trends
- Answer the Public
- SEMrush
- Ahrefs

## 🔄 **Ongoing Maintenance**

### **Daily**
- Monitor website performance
- Check for errors
- Review analytics

### **Weekly**
- Update content
- Monitor rankings
- Check competitors

### **Monthly**
- Performance audit
- Content review
- Strategy adjustment

---

## 📞 **Next Steps**

1. **Immediate Actions:**
   - Set up Google Analytics with your measurement ID
   - Add Google Search Console verification code
   - Implement page-specific SEO components

2. **Week 1:**
   - Complete page-specific optimizations
   - Set up monitoring tools
   - Begin content optimization

3. **Week 2-4:**
   - Implement advanced features
   - Monitor and adjust strategy
   - Plan future optimizations

This SEO action plan provides a comprehensive roadmap for improving the CEUS website's search engine visibility and user experience. Regular monitoring and adjustments will ensure continued success.
