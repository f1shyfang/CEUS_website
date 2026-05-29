---
target: CEUS/src/app/HomeClient.tsx
total_score: 24
p0_count: 0
p1_count: 4
timestamp: 2026-05-29T05-39-58Z
slug: ceus-src-app-homeclient-tsx
---
# Design Critique: `CEUS/src/app/HomeClient.tsx`

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No loading skeletons before sliders init; no current-page indicator |
| 2 | Match System / Real World | 3 | "Happening Soon" reads natural; "About Us" copy slips into university-comms voice |
| 3 | User Control and Freedom | 2 | Two autoplay carousels with no visible pause control; no skip-to-content |
| 4 | Consistency and Standards | 2 | Two competing blues (brand-navy vs blue-600); CTA palette breaks system (emerald) |
| 5 | Error Prevention | 3 | n/a — no destructive actions |
| 6 | Recognition Rather Than Recall | 3 | Event cards and sponsor logos carry their own meaning |
| 7 | Flexibility and Efficiency | 2 | No keyboard hints; carousel arrows clip below 1024px |
| 8 | Aesthetic and Minimalist Design | 2 | Three flat-identical h2 headings; aphoristic intro copy; bare video block |
| 9 | Error Recovery | 2 | Empty states are flat sentences with no CTA, no warmth |
| 10 | Help and Documentation | 3 | Reasonable for a brand landing |
| **Total** | | **24/40** | Acceptable — significant improvements needed |

## Anti-Patterns Verdict

LLM: not blatantly AI-slop (no gradient text, eyebrows, 01·02·03, glass cards). Subtler failure mode: reads as a "generic university student society site" rather than as CEUS, which is exactly the anti-reference PRODUCT.md names first.

Deterministic scan: `detect.mjs` reported 0 findings. The issues are compositional and strategic.

## Priority Issues

### [P1] The hero is brand-shouting, not user-leading
Hero text "UNSW CEUS / Chemical Engineering Undergraduate Society" tells the visitor what they already know. **Zero CTA in the hero.** Fix: replace subtitle with concrete promise tied to next event OR add a single Brand Navy primary CTA. Command: `/impeccable shape hero-lede` or `/impeccable clarify`.

### [P1] About Us copy is the exact university-comms voice PRODUCT.md rejects
Lines 125-127: "vibrant, student-run organisation / enrich the university experience / fosters connection, collaboration, and a strong sense of belonging" — none of "student-led, credible, warm." Cut to one paragraph in student voice. Demote section below event slider. Command: `/impeccable clarify`.

### [P1] Section order violates Design Principle 2 ("next event is the lede")
Current: Hero → About (3 paragraphs) → Happening Soon. Events sit ~2.5 viewports below fold on mobile. Reorder: Hero → Happening Soon → Sponsors → Video → About. Command: `/impeccable layout`.

### [P1] CTA palette breaks the design system in two ways
Line 144: "View All Events" uses `bg-blue-600` (should be Brand Navy `#1B397E` per spec). Line 147: "Subscribe to Calendar" uses `bg-emerald-600` (out of palette entirely). Result: no primary action. Fix: View All Events → Brand Navy. Subscribe → Ghost button. Command: `/impeccable polish`.

### [P2] Heading hierarchy is flat — every h2 is `text-4xl md:text-5xl font-bold text-center`
No signal which section is priority. Make "Happening Soon" loudest; demote "About Us" and "Our Sponsors". Hierarchy through scale + weight contrast (≥1.25 ratio). Command: `/impeccable typeset`.

### [P2] Empty states lack warmth and remediation
"No sponsors to display right now." violates PRODUCT.md Design Principle 3 ("Sponsors get dignity"). Both empty states need photographic element, brand voice, real CTA. Sponsor empty state: *"Looking for industry partners for 2026 — let's talk."* + contact CTA. Command: `/impeccable onboard`.

### [P2] GSAP hero animation has no `prefers-reduced-motion` guard
Sam (a11y) sees fade+rise regardless. Worse: `fromTo` initial opacity:0 — JS failure window. Fix: wrap timeline in motion-no-preference check; default markup visible. Command: `/impeccable animate` or `/impeccable harden`.

## Persona Red Flags

**Jordan (First-Timer):** ~30s of scroll before reaching first useful info. No CTA above fold. No visible "join CEUS" entry point on home page.

**Casey (Mobile):** Hero `h-[75vh]` then ~2 screens of About prose before events. Two same-weight CTAs in different palette colors force unwanted choice.

**Sam (a11y):** GSAP ignores reduced motion. Slick autoplay (4.5s/7s) doesn't either. Carousel arrows positioned `-50px/-30px/-20px` outside viewport at mobile breakpoints. Hero scrim 40% may underdeliver on subtitle contrast.

## Minor Observations

- Video section line 179 has no heading or caption — bare black rectangle.
- `bg-black/5` (line 177) is the worst of both — neither commit nor invisible.
- Subscribe to Calendar URL is a 100-char opaque ID inline in JSX.
- Section heading alignment is mixed: "About Us" h2 centered, paragraphs `text-left`.
- Hero subtitle `tracking-[2.5px]` on `font-normal` 28-32px Inter is overstyled at body weight.

## Questions to Consider

- What would a visitor who has never heard of CEUS see in the hero? Right now: the brand name.
- Does this page need "About Us" at all, or just a one-paragraph who-we-are at the bottom?
- What if `Happening Soon` and the empty state were the same component (a persistent "next event" that degrades to "what we're planning")?
- What's the page doing that a sponsor wants to see?
