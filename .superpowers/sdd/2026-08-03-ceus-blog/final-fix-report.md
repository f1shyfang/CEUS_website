# CEUS blog final-fix report

Implementation commit: `93cbb77 fix: harden CEUS blog publishing and SEO`

## Delivered fixes

- JSON-LD serialization now escapes `<`, `>`, `&`, U+2028, and U+2029 before it reaches a script element. The XSS regression uses a CMS headline containing `</script><script>…` and verifies the serialized value remains valid JSON.
- Draft persistence now includes `is_featured: false` in the same Supabase update payload. This prevents the database's `not is_featured or status = 'published'` constraint from rejecting a featured published post being unpublished. The feature RPC is not called for this transition; ordinary published feature selection still uses it.
- Blog editor controls now have stable IDs and `FormField` links labels with `htmlFor`; the cover-image upload accepts that ID on its actual file input.
- `/blog` now has dedicated metadata (title, description, canonical URL, Open Graph URL) and renders an ItemList JSON-LD schema for published posts.
- Public category labels now say `CEUS News` in the filter, rendered metadata, and page copy.
- Added route coverage for missing/draft article `notFound`, cover-image metadata present/absent, and sitemap success/error paths.

## RED/GREEN evidence

### RED

The initial focused suite was run before production changes:

```sh
npm test -- src/components/JsonLd.test.tsx src/lib/supabase.blog.test.ts src/app/admin/blog/page.test.tsx src/app/blog/BlogIndexClient.test.tsx src/lib/seo.test.ts src/app/blog/page.test.tsx 'src/app/blog/[slug]/page.test.tsx' src/app/sitemap.test.ts
```

It reported the intended missing behaviors: raw `</script>` in JSON-LD, no `buildBlogListSchema`, no `/blog` metadata, `News` rather than `CEUS News`, and unassociated admin labels. The first persistence-test harness lacked a mocked Supabase client; after adding that test-only mock, its focused RED run failed exactly because the update payload omitted `is_featured: false`:

```text
Expected: is_featured: false
Received update payload: status: draft (without is_featured)
```

The article metadata/notFound and sitemap tests passed on their first run because the implementation already contained those branches; they are deferred coverage additions rather than code defects.

### GREEN

After the fixes, the focused suite passed:

```sh
npm test -- src/components/JsonLd.test.tsx src/lib/supabase.blog.test.ts src/app/admin/blog/page.test.tsx src/app/blog/BlogIndexClient.test.tsx src/lib/seo.test.ts src/app/blog/page.test.tsx 'src/app/blog/[slug]/page.test.tsx' src/app/sitemap.test.ts
# 8 test files passed, 19 tests passed
```

Final full-suite verification:

```sh
npm test
# 13 test files passed, 27 tests passed

npm run tsc
# tsc --noEmit: exit 0

npx eslint src/components/JsonLd.tsx src/lib/supabase.ts src/components/admin/FormModal.tsx src/components/admin/ImageUpload.tsx src/app/admin/blog/page.tsx src/app/blog/page.tsx src/app/blog/BlogIndexClient.tsx src/components/blog/BlogMetadata.tsx src/lib/seo.ts src/components/JsonLd.test.tsx src/lib/supabase.blog.test.ts src/app/admin/blog/page.test.tsx src/app/blog/BlogIndexClient.test.tsx src/lib/seo.test.ts src/app/blog/page.test.tsx 'src/app/blog/[slug]/page.test.tsx' src/app/sitemap.test.ts
# exit 0
```

## Files changed

- `CEUS/src/components/JsonLd.tsx`, `CEUS/src/components/JsonLd.test.tsx`
- `CEUS/src/lib/supabase.ts`, `CEUS/src/lib/supabase.blog.test.ts`
- `CEUS/src/components/admin/FormModal.tsx`, `CEUS/src/components/admin/ImageUpload.tsx`, `CEUS/src/app/admin/blog/page.tsx`, and its test
- `CEUS/src/lib/seo.ts`, `CEUS/src/lib/seo.test.ts`, `CEUS/src/app/blog/page.tsx`, and its test
- `CEUS/src/app/blog/BlogIndexClient.tsx`, `CEUS/src/components/blog/BlogMetadata.tsx`, and the index-client test
- `CEUS/src/app/blog/[slug]/page.test.tsx`, `CEUS/src/app/sitemap.test.ts`

## Constraints and remaining checks

- `npm run lint` continues to fail only on the documented unrelated baseline errors: 2 `react-hooks/static-components` errors in `src/app/HomeClient.tsx` and 2 `react/no-unescaped-entities` errors in `src/app/publications/page.tsx`. It also reports existing non-blog warnings. No blog-scope lint errors were reported by the targeted lint command.
- `npm run build` compiled successfully and completed TypeScript, but failed while collecting data for `/blog` and `/sitemap.xml` because this worktree has no Supabase environment configuration (`supabaseUrl is required` / missing `NEXT_PUBLIC_SUPABASE_URL`).
