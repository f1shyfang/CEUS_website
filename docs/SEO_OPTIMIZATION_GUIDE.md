# CEUS Website SEO Guide

What is implemented today, where it lives in the codebase, and how to maintain it.

**Production site:** [https://www.ceusunsw.com](https://www.ceusunsw.com)

For outstanding tasks, see [SEO_ACTION_PLAN.md](SEO_ACTION_PLAN.md).

## What is implemented

### Metadata (Next.js App Router)

Global metadata is defined in `CEUS/src/app/layout.tsx`:

- Title template: `%s | CEUS - Chemical Engineering Undergraduate Society`
- Default description and keywords
- `metadataBase`: `https://www.ceusunsw.com`
- Open Graph and Twitter Card tags
- Robots directives (`index`, `follow`)
- Favicon (`/SVGlogo.svg`)

Per-page titles, descriptions, and **canonical URLs** use the shared `pageMetadata()` helper in `src/lib/seo.ts`:

| Page | File |
|------|------|
| Home | `src/app/page.tsx` |
| Events | `src/app/events/page.tsx` |
| Team | `src/app/team/page.tsx` |
| Sponsors | `src/app/sponsors/page.tsx` |
| Jobs | `src/app/jobs/page.tsx` |
| Contact | `src/app/contact/page.tsx` |
| Publications | `src/app/publications/page.tsx` |

### Structured data

| Schema | Where |
|--------|-------|
| Organization | `src/app/layout.tsx` |
| Event (ItemList) | `src/app/events/page.tsx` — upcoming events from Supabase |
| Person (ItemList) | `src/app/team/page.tsx` — team members from Supabase |
| JobPosting (ItemList) | `src/app/jobs/page.tsx` — active (non-outdated) jobs |
| BreadcrumbList | `src/components/PageBreadcrumbs.tsx` — all public pages |

Builders live in `src/lib/seo.ts`. JSON-LD is rendered via `src/components/JsonLd.tsx`.

### Breadcrumbs

`PageBreadcrumbs` wraps the existing `Breadcrumbs` component and emits matching `BreadcrumbList` schema. Used on every public page.

### Crawling and indexing

| File | Type | Notes |
|------|------|-------|
| `src/app/robots.ts` | Dynamic | Blocks `/admin/`, `/api/`, `/_next/`; points to sitemap |
| `src/app/sitemap.ts` | Dynamic | All public routes: `/`, `/events`, `/jobs`, `/team`, `/sponsors`, `/publications`, `/contact` |

The legacy static `public/sitemap.xml` and `public/robots.txt` have been removed — App Router routes take precedence.

### Images

`OptimizedImage` (`src/components/OptimizedImage.tsx`) wraps Next.js `Image` with lazy loading and Supabase remote patterns. Used on the home page, event cards, sponsor logos, and team member cards.

Upload images through the admin dashboard or Supabase Storage — see [public-images.md](../CEUS/docs/public-images.md).

### Fonts

Inter is loaded via `next/font/google` with `display: 'swap'` in `layout.tsx`.

### Analytics and Search Console

Both are **opt-in via environment variables** (see `.env.example`):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 tracking — scripts only load when set |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console HTML tag verification |

### Components not in use

- `src/components/SEOHead.tsx` — legacy client-side meta helper; superseded by the Metadata API

## What is not implemented

- PWA / web app manifest
- Blog or news section
- FAQ schema
- AMP pages
- Internationalization (i18n)

## Maintaining SEO as a content editor

When updating the site through the admin panel:

1. **Write descriptive titles** — event and job titles appear on public pages and in search results.
2. **Fill in descriptions** — the event description and job one-liner are the main text search engines index for those pages.
3. **Use clear image alt text** — when uploading images, ensure the surrounding content (title, name) is descriptive.
4. **Keep the Facebook event link current** — helps users and provides an external signal for events.
5. **Mark outdated jobs** — outdated listings are excluded from JobPosting structured data.

## Maintaining SEO as a developer

### Add a new public page

```typescript
import { pageMetadata } from '@/lib/seo';
import { PageBreadcrumbs } from '@/components/PageBreadcrumbs';

export const metadata = pageMetadata(
  'Page Title',
  '150–160 character description with relevant keywords.',
  '/your-path',
);

export default function YourPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <PageBreadcrumbs pathname="/your-path" />
      </div>
      {/* page content */}
    </>
  );
}
```

Also add the route to `PUBLIC_ROUTES` in `src/app/sitemap.ts` and a case in `getBreadcrumbs()`.

### Configure Google Analytics

Add to `.env.local` (or Vercel project settings):

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Configure Search Console

1. In Google Search Console, verify ownership via HTML tag method.
2. Copy the verification code into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Deploy, then submit `https://www.ceusunsw.com/sitemap.xml`.

### Validate changes

- [Google Rich Results Test](https://search.google.com/test/rich-results) — Event, JobPosting, Person schemas
- [Schema.org Validator](https://validator.schema.org) — JSON-LD in page source
- Chrome DevTools → Lighthouse — performance and SEO audit
- [PageSpeed Insights](https://pagespeed.web.dev)

## Target keywords

Primary terms the site should rank for:

- CEUS UNSW
- Chemical Engineering Undergraduate Society
- Chemical Engineering Society UNSW
- UNSW chemical engineering events
- Chemical engineering internships Sydney

Use these naturally in page descriptions and event/job content — not as keyword stuffing.

## Related files

```
CEUS/src/lib/seo.ts                 # pageMetadata(), structured data builders
CEUS/src/app/layout.tsx             # Global metadata, org schema, GA scripts
CEUS/src/app/sitemap.ts             # Dynamic sitemap
CEUS/src/app/robots.ts              # Dynamic robots.txt
CEUS/src/components/JsonLd.tsx       # JSON-LD script renderer
CEUS/src/components/PageBreadcrumbs.tsx  # Breadcrumbs + BreadcrumbList schema
CEUS/src/components/Breadcrumbs.tsx
CEUS/src/components/OptimizedImage.tsx
CEUS/.env.example                   # GA and Search Console env vars
```
