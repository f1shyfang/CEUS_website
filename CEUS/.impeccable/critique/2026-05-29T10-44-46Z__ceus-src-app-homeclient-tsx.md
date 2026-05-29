---
target: CEUS/src/app/HomeClient.tsx
total_score: 33
p0_count: 0
p1_count: 0
timestamp: 2026-05-29T10-44-46Z
slug: ceus-src-app-homeclient-tsx
---
# Design Critique: `CEUS/src/app/HomeClient.tsx` (post-rewrite)

## Design Health Score

| # | Heuristic | Score | Δ | Key Issue |
|---|-----------|-------|---|-----------|
| 1 | Visibility of System Status | 3 | +1 | Hierarchy signals lede; no global loading skeleton |
| 2 | Match System / Real World | 4 | +1 | About copy in real student voice; "Happening Soon" is honest |
| 3 | User Control and Freedom | 3 | +1 | Anchor nav works; carousels still autoplay without pause control |
| 4 | Consistency and Standards | 4 | +2 | Every CTA is Brand Navy primary or Brand Navy ghost |
| 5 | Error Prevention | 3 | 0 | n/a |
| 6 | Recognition Rather Than Recall | 3 | 0 | Event cards / sponsor logos still carry recognition |
| 7 | Flexibility and Efficiency | 3 | +1 | Anchor nav from hero, focus-visible rings everywhere |
| 8 | Aesthetic and Minimalist Design | 4 | +2 | Hierarchy compressed, wall of text gone |
| 9 | Error Recovery | 3 | +1 | Both empty states have brand-voice copy + CTA |
| 10 | Help and Documentation | 3 | 0 | Reasonable for a brand landing |
| **Total** | | **33/40** | **+9** | **Good — solid foundation, address weak areas** |

## Anti-Patterns Verdict

Page reads like CEUS now. Hero answers "why am I here?", lede is the lede, copy doesn't try to be vibrant, palette doesn't fight itself. Detector 0 findings.

## Priority Issues

### [P2] Slick autoplay lacks reduced-motion guard
Sponsor 4.5s, events 7s, no visible pause control. GSAP hero is now guarded but autoplay isn't. Fix: detect `prefers-reduced-motion` and set `autoplay: false`, or add a visible toggle. Command: `/impeccable animate`.

### [P2] Hero subtitle contrast may be borderline on photographic backgrounds
`text-white/90` at body weight over `bg-black/45` scrim on a UNSW Ball photo. Bright parts of the photo may drop subtitle below 4.5:1. Fix: drop the /90 opacity, keep scrim. Command: `/impeccable polish`.

### [P3] No smooth-scroll for anchor links
Hero CTAs anchor-link to sections — page jumps instantly. Fix: add `scroll-behavior: smooth` to html selector in index.css.

### [P3] Video section title is a guess
"A look at CEUS" — I don't know what videoId="x3DD5gMo3fA" actually contains. Replace with real title.

### [P3] Hero secondary CTA "About CEUS" deep-links to same page
User can reach About by scrolling, which primary CTA already invites. Hero is busier than needed. Fix: remove secondary CTA. Command: `/impeccable distill`.

## Persona Red Flags

**Jordan:** Major improvement — concrete promise, clear next action. Remaining gap: no "How do I join?" path.

**Casey:** Hero now denser (4 elements). Smooth-scroll would help mobile anchor taps feel intentional.

**Sam:** h1 added (was missing), GSAP guard ✓, focus rings ✓. Slick autoplay still un-guarded. Skip-to-content link still missing at layout level.

## Minor Observations

- About section is short (one paragraph). If `/about` is also sparse, the home page is the only place visitors meet the society's story.
- `text-wrap: balance` via inline style; could use Tailwind's `text-balance` utility.
- Hero title uses fixed-step responsive sizes instead of fluid `clamp()`.
- Slick global styles still in `<style jsx global>` in the JSX file. Could move to index.css.

## Questions to Consider

- How do people *join* CEUS? Page tells what's happening but no "Join" CTA.
- Should the video be higher in the page (between hero and events) as an emotional moment?
- Should the sponsor carousel be a static logo strip instead? Auto-rotation hides logos from users who don't wait.
