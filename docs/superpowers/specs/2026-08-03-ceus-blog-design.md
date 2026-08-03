# CEUS Blog Design

## Purpose

Add a public CEUS blog that brings together society news, practical student guides, and careers-and-industry articles. It adopts Substack's reading-first calm and single-story focus without copying its brand or product mechanics.

## Audience and outcome

Students and prospective students arrive to catch up on CEUS, solve an academic or career problem, or browse useful material. They should be able to identify a relevant article in one glance and read it comfortably on any device. CEUS executives publish and maintain material through the existing admin dashboard.

## Scope

### Included

- A `/blog` index with one featured article, category filters, and a chronological article feed.
- Article pages at `/blog/[slug]`.
- Three public categories: **CEUS News**, **Student Guides**, and **Careers & Industry**.
- Admin creation, editing, publishing, unpublishing, and deletion of articles.
- Draft/published status, unique slugs, an optional featured flag, cover images, author/byline, excerpt, body, publication date, and reading-time display.
- SEO metadata and Article structured data.
- Empty, loading, and not-found states.

### Explicitly excluded

- Newsletter signup, email delivery, comments, reactions, member accounts, paywalls, and article search.

## Information architecture

Add **Blog** to the main navigation. The index contains, in order:

1. A featured story with category, title, standfirst, author, date, reading time, cover image, and a clear link to read it.
2. Filter controls for All posts, CEUS News, Student Guides, and Careers & Industry.
3. A newest-first article feed. Each entry gives title, excerpt, metadata, category, and an optional thumbnail; it uses a right-side thumbnail on desktop and a leading image on narrow screens.

An article page places its title, metadata, and optional hero image before a narrow prose column. A category-related reading section appears after the article. The page uses no comments or subscription calls to action.

## Visual direction

The surface is an editorial library: welcoming, scholarly, and energetic. It should feel like a well-kept study journal rather than a glossy media portal.

- Retain the established **Inter** family for controls, navigation, labels, and general CEUS UI.
- Introduce **Literata** for long-form article headings and reading copy. Its screen-first design supports longer reading sessions while creating a useful contrast with Inter.
- Use a type scale of approximately 48–64px for desktop article titles, 34–40px on mobile, 18px reading text, and 14px metadata.
- Constrain reading copy to 68ch with 1.7 line-height; balance headlines and avoid overly tight letter spacing.
- Preserve CEUS navy as the anchor, with off-white reading surfaces and near-black text. Reserved CEUS blue is the sole prominent interactive accent. Categories use subdued navy-tinted backgrounds.
- Prefer thin neutral dividers and whitespace to cards, heavy shadows, or oversized corner radii.
- Make featured cover imagery available but not mandatory. Content images must have meaningful alternative text.

## Content model and behaviour

Introduce a `blog_posts` data model managed by the current admin dashboard. Its required fields are `title`, `slug`, `category`, `excerpt`, `author_name`, `body`, and `status`. Optional fields are `cover_image_url`, `published_at`, and `is_featured`.

`category` is constrained to `news`, `student-guides`, or `careers-industry`; `status` is constrained to `draft` or `published`; `slug` is unique. Only published posts are returned by public queries. At most one published post can be featured; marking another post as featured clears the existing feature inside the same database operation. The index falls back to the most recent published post when there is no explicit feature.

Article reading time is derived from the article body using a documented words-per-minute rule and is not stored as editorial content. The public index sorts remaining posts newest first by `published_at`. Category controls filter the public list without a full-page navigation.

## Admin workflow

The admin has a Blog posts list with publication status and primary actions. The form permits drafting, saving changes, publishing, unpublishing, setting/unsetting the feature, and deleting after confirmation. Server-side validation enforces the required fields, category/status options, unique slug, and safe public image URL before persistence. Editing a published post preserves its published date unless an admin explicitly changes it.

## Accessibility, resilience, and SEO

- Meet WCAG 2.2 AA contrast; every control has a visible keyboard focus indicator.
- Use semantic article, heading, navigation, button, and list elements; do not use category colour as the sole indicator.
- Respect `prefers-reduced-motion`; interactions use only short non-essential colour and opacity transitions.
- Provide an intentional empty state for no published articles, a not-found state for absent or draft slugs, and loading feedback while filters update.
- Generate unique page titles, descriptions, Open Graph data, canonical URLs, and `BlogPosting` structured data for each article.

## Technical approach

The Next.js App Router implementation uses the existing Supabase client and current admin route patterns. A migration defines the new table and appropriate public/admin access policies. Focused shared types, validation schemas, data access functions, and reusable blog presentation components keep the public index, article page, and administration surface coherent without refactoring unrelated routes.

## Verification

- Validate the database model and server schema: categories/statuses, required fields, unique slugs, and the single-featured-post rule.
- Test public queries exclude drafts, choose the explicit feature or latest fallback, sort remaining posts, and filter by category.
- Test admin authoring flows for draft, publish, unpublish, feature replacement, edit, and delete confirmation.
- Test valid and invalid article routes, empty blog content, and loading/filter behaviour.
- Run type checking and linting, then inspect desktop/mobile layouts, keyboard navigation, focus, contrast, semantic headings, and image alternatives.

## Acceptance criteria

1. An admin can publish a CEUS News, Student Guide, or Careers & Industry post without developer support.
2. The public `/blog` route makes a featured story and each category easy to browse.
3. A published post has a clean dedicated URL and a comfortable long-form reading experience.
4. Drafts never appear in public index, sitemap, or direct article routes.
5. The interface is responsive and keyboard-accessible, with no newsletter, reactions, or paywall functionality in the first release.
