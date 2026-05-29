---
target: CEUS/src/components/EventCard.tsx
total_score: 32
p0_count: 0
p1_count: 0
timestamp: 2026-05-29T05-48-45Z
slug: ceus-src-components-eventcard-tsx
---
# Design Critique: `CEUS/src/components/EventCard.tsx` (post-polish)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Smooth hover/transition feedback; no loading skeleton |
| 2 | Match System / Real World | 3 | `<time>` semantic, "View on Facebook" honest; categories self-explanatory |
| 3 | User Control and Freedom | 3 | Focus-visible rings on both variants; `motion-safe` guards on scales |
| 4 | Consistency and Standards | 4 | Brand Navy primary, Hairline border, Ink Body description — DESIGN.md aligned |
| 5 | Error Prevention | 3 | Defensive link handling; graceful degrade when facebookEventLink missing |
| 6 | Recognition Rather Than Recall | 4 | Photo + category chip + date + title is rich recognition |
| 7 | Flexibility and Efficiency | 3 | Keyboard works, focus visible; no bookmark/save affordance |
| 8 | Aesthetic and Minimalist Design | 3 | Hover overlay simplified to description-only; date visible without hover |
| 9 | Error Recovery | 3 | "Details coming soon" graceful state for missing CTA |
| 10 | Help and Documentation | 3 | n/a at component scale |
| **Total** | | **32/40** | **Good — address weak areas, solid foundation** |

## Anti-Patterns Verdict

No AI tells. Hover treatment restrained (capped at 1.02/1.10 scales, eased out, single-property transitions). Detector reported 0 findings.

## Priority Issues

### [P2] Long titles handled inconsistently between variants
Home variant: `truncate` (one line, hard cut). Default: `line-clamp-2`. Different physical truth for same data. Fix: bring home variant to `line-clamp-2 min-h-[3rem]` so carousel stays balanced. Command: `/impeccable layout`.

### [P2] Card clickability is asymmetric between variants
Home: whole card is link. Default: only bottom CTA. Same content type, two different interaction models. Touch users tap card image in default variant and nothing happens. Recommendation: make whole default-variant card clickable. Command: `/impeccable shape event-card-clickability`.

### [P3] Date is absolute, not relative
"Happening Soon" section promises relative-temporal framing; cards show only absolute "9 May 2026". Fix: hybrid "Friday 9 May · in 4 days" using date-fns `formatDistance`. Command: `/impeccable clarify`.

### [P3] No loading skeleton aligned to `src/components/skeletons/`
A skeletons dir exists; no EventCardSkeleton. Page renders flat during data fetch. Fix: add EventCardSkeleton.tsx mirroring card structure. Command: `/impeccable harden`.

### [P3] Hover gradient overlay on default variant adds little value
`bg-gradient-to-t from-black/40` fades in on hover with no copy overlay — vestige from a pattern with text. Fix: remove or replace with subtle Brand Navy tint. Command: `/impeccable distill`.

## Persona Red Flags

**Riley:** Long titles clip with no signal in home variant. Records with missing description show empty space; no "No description" hint.

**Sam:** Focus rings ✓, semantics ✓, motion-safe ✓. Minor: CTA aria-label duplicates link's accessible name.

**Casey:** Home variant whole-card tappable (good). Default variant only CTA tappable — tap on card image does nothing.

## Minor Observations

- `aria-label` on CTA duplicates link name; could simplify to "View on Facebook".
- `<article>` landmark may clutter screen-reader landmark list in a 12+ card grid.
- Category badge could use `aria-label="{category} event"` for context.
- Card has both border AND shadow-lg at rest — belt-and-suspenders, but matches DESIGN.md spec.
- `FALLBACK_IMAGE_URLS.event` not verified visually.

## Questions to Consider

- Should the whole default-variant card be clickable, matching home and the Eventbrite/Lu.ma/Meetup convention?
- Is the home overlay-on-hover earning its place when it only shows description?
- What's the degrade story when other fields (description, image, category) are missing — the polish handled link, the rest deserves the same care?
