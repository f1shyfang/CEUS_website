# CEUS Website SEO Action Plan

Prioritized backlog of SEO work. Items marked **Done** reflect the current codebase.

## Status summary

| Area | Status |
|------|--------|
| Next.js metadata API | **Done** — global + per-page with canonical URLs |
| Open Graph / Twitter Cards | **Done** — in root layout + per-page overrides |
| Organization JSON-LD | **Done** — in root layout |
| Event / Person / JobPosting JSON-LD | **Done** — on `/events`, `/team`, `/jobs` |
| BreadcrumbList JSON-LD + UI | **Done** — `PageBreadcrumbs` on all public pages |
| `robots.ts` | **Done** — blocks admin and API routes |
| Dynamic sitemap (`sitemap.ts`) | **Done** — includes all public routes including `/jobs` |
| Image optimization | **Done** — `OptimizedImage` component |
| Google Analytics | **Env-configured** — set `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Search Console verification | **Env-configured** — set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |
| PWA manifest | **Not done** |
| `SEOHead.tsx` | **Unused** — redundant with App Router metadata API |

---

## Priority 1 — Configuration (deployment)

These unblock measurement and indexing. No code changes needed — set env vars in Vercel / `.env.local`.

- [ ] **Set Google Analytics ID** — add `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` to production env
- [ ] **Verify Google Search Console** — add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` from the HTML tag method; submit sitemap at `https://www.ceusunsw.com/sitemap.xml`

## Priority 2 — Content and metadata quality

- [ ] **Review page descriptions** — update copy in each page's `pageMetadata()` call when content changes significantly
- [ ] **Event content** — ensure upcoming events have complete titles, descriptions, and poster images in admin
- [ ] **Job listings** — mark outdated jobs in admin; keep one-liners descriptive for search snippets

## Priority 3 — UX and internal linking

- [ ] **Internal links** — link between related pages in body copy (e.g. events → sponsors, jobs → contact)
- [ ] **Remove `SEOHead.tsx`** — optional cleanup; component is unused now that metadata is server-rendered

## Priority 4 — Performance

- [ ] **Lighthouse audit** — run on home, events, and jobs pages; address any regressions
- [ ] **Alt text audit** — verify images uploaded via admin have meaningful context from surrounding content
- [ ] **Core Web Vitals** — monitor via Search Console after GA and verification are live

## Priority 5 — Future (not planned)

Lower priority unless there is a specific need:

- Blog or news section for fresh content
- FAQ page with FAQ schema
- PWA manifest and service worker
- AMP support
- Internationalization

---

## Ongoing maintenance

### When adding a new public page

1. Add `pageMetadata()` export to `page.tsx` (see `src/lib/seo.ts`)
2. Add the route to `PUBLIC_ROUTES` in `src/app/sitemap.ts`
3. Add breadcrumb case in `src/components/Breadcrumbs.tsx`
4. Add `<PageBreadcrumbs pathname="..." />` to the page
5. Verify the page is not blocked in `robots.ts`

### Monthly

- [ ] Check Google Search Console for crawl errors
- [ ] Review top search queries and click-through rates

### Per event season

- [ ] Ensure upcoming events have complete titles, descriptions, and poster images
- [ ] Archive or remove past events that are no longer relevant
- [ ] Mark outdated jobs using the **Outdated** flag in admin

---

## Resources

- [SEO Guide (implemented features)](SEO_OPTIMIZATION_GUIDE.md)
- [Google Search Console](https://search.google.com/search-console)
- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
