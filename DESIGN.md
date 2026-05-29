---
name: CEUS Website
description: Visual system for the UNSW Chemical Engineering Undergraduate Society website.
colors:
  brand-navy: "#1B397E"
  accent-blue: "#2563EB"
  accent-blue-deep: "#1D4ED8"
  surface-white: "#FFFFFF"
  surface-tint-blue: "#EFF6FF"
  ink-strong: "#1F2937"
  ink-body: "#374151"
  ink-muted: "#4B5563"
  ink-soft: "#6B7280"
  hairline: "#E5E7EB"
  scrim: "rgba(0, 0, 0, 0.40)"
  scrim-strong: "rgba(0, 0, 0, 0.70)"
  category-flagship-bg: "#F3E8FF"
  category-flagship-ink: "#6B21A8"
  category-careers-bg: "#DBEAFE"
  category-careers-ink: "#1E40AF"
  category-social-bg: "#DCFCE7"
  category-social-ink: "#166534"
  category-academic-bg: "#FFEDD5"
  category-academic-ink: "#9A3412"
  category-welfare-bg: "#FCE7F3"
  category-welfare-ink: "#9D174D"
  category-recruitment-bg: "#E0E7FF"
  category-recruitment-ink: "#3730A3"
  category-collab-bg: "#CCFBF1"
  category-collab-ink: "#115E59"
  category-other-bg: "#F3F4F6"
  category-other-ink: "#1F2937"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.875rem, 4vw + 0.5rem, 3.125rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.1875em"
  subdisplay:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.156em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 3vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "normal"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  hero: "75vh"
components:
  button-primary:
    backgroundColor: "{colors.brand-navy}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    typography: "{typography.title}"
  button-primary-hover:
    backgroundColor: "{colors.accent-blue-deep}"
    textColor: "{colors.surface-white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.brand-navy}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  card-event:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.lg}"
    padding: "0"
  card-member:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.lg}"
    padding: "20px"
  chip-category:
    rounded: "{rounded.pill}"
    padding: "4px 12px"
    typography: "{typography.label}"
  nav-link:
    textColor: "{colors.ink-strong}"
    typography: "{typography.body}"
  nav-link-active:
    textColor: "{colors.brand-navy}"
    backgroundColor: "{colors.surface-tint-blue}"
  footer:
    backgroundColor: "{colors.brand-navy}"
    textColor: "{colors.surface-white}"
    padding: "12px 20px"
  hero-overlay:
    backgroundColor: "{colors.scrim}"
    textColor: "{colors.surface-white}"
---

# Design System: CEUS Website

## 1. Overview

**Creative North Star: "The Engineering Society Yearbook"**

The CEUS site reads like a well-kept student-society yearbook: deep university navy on the cover, real photography of real students inside, generous white margins, and chapters (events, team, sponsors) you can flip through without thinking. The brand color is institutional enough that sponsors take it seriously, the photography and student-led copy keep it warm enough that a first-year doesn't feel like they're applying to grad school. Density is generous, never cramped. Cards lift and breathe on hover; pages don't shout.

What this system rejects: the navy-and-gold institutional university-department template (dead, dense, no sense of a person behind it); the SaaS landing-page hero-metric template (we are a community, not a product launch); the corporate-finance dark-mode + gradient orb aesthetic (this is a student society, not a fintech). It also explicitly rejects clip-art / hobby-club energy: low-effort screenshots and stock illustrations don't earn sponsors' trust.

**Key Characteristics:**
- One serious brand color (UNSW-adjacent navy `#1B397E`) doing most of the identity work
- Photography-led — real CEUS events, members, and labs over stock imagery
- Generous white space; white surfaces with a single tinted accent (`#EFF6FF`)
- Card-based content surfaces that lift on hover (shadow + light scale)
- Single typeface (Inter), wide weight range (400 → 700) and deliberate tracking to give the hero ceremony
- Categorical color used only inside event chips; never as a page-level accent

## 2. Colors: The Yearbook Cover Palette

The palette is a single saturated brand navy carrying the identity, a near-twin blue carrying interactive accents, and an eight-color categorical set reserved for event chips and nothing else.

### Primary
- **Brand Navy** (`#1B397E`): UNSW-adjacent deep navy. The single most important color in the system. Used on the footer surface, navbar active state, and any element that signals "this is CEUS, not the university." It is the cover color of the yearbook.

### Secondary
- **Accent Blue** (`#2563EB` — Tailwind `blue-600`): A brighter, more interactive blue used for link hovers, focus ring tints, "view more" affordances, and progressive-disclosure cues. It is *not* the brand color; it is the click-target color.
- **Accent Blue Deep** (`#1D4ED8` — `blue-700`): Hover state for accent-blue elements.
- **Surface Tint Blue** (`#EFF6FF` — `blue-50`): The only colored surface in the system. Used as the active-state background under the mobile nav link. Never as a section background.

### Neutral
- **Surface White** (`#FFFFFF`): All page surfaces, all card surfaces, all input surfaces. The yearbook's paper.
- **Ink Strong** (`#1F2937` — `gray-800`): Card titles, headings, foregrounds where the design wants weight.
- **Ink Body** (`#374151` — `gray-700`): Default body copy.
- **Ink Muted** (`#4B5563` — `gray-600`): Member roles, dates, supporting metadata.
- **Ink Soft** (`#6B7280` — `gray-500`): Placeholder text, icon-only controls, tertiary captions.
- **Hairline** (`#E5E7EB` — `gray-200`): Card borders, dividers. Always 1px.
- **Scrim** (`rgba(0,0,0,0.40)`): Hero photo overlay so white display type stays legible.
- **Scrim Strong** (`rgba(0,0,0,0.70)`): Hover-reveal overlay on home event cards.

### Categorical (event chips only)
Eight ` *-100 / *-800` pairs, drawn from Tailwind's palette. Each pair labels one event category and exists only inside the category chip — never as a section accent, gradient stop, or page background.

| Category | Background | Ink |
|---|---|---|
| Flagship | `#F3E8FF` | `#6B21A8` |
| Careers | `#DBEAFE` | `#1E40AF` |
| Social | `#DCFCE7` | `#166534` |
| Academic | `#FFEDD5` | `#9A3412` |
| Welfare | `#FCE7F3` | `#9D174D` |
| Recruitment | `#E0E7FF` | `#3730A3` |
| Collaboration | `#CCFBF1` | `#115E59` |
| Other | `#F3F4F6` | `#1F2937` |

### Named Rules

**The Brand Navy Rule.** `#1B397E` is the only color that signals "CEUS." It earns its place on the footer surface, the navbar active state, and primary buttons. It is *not* used on backgrounds of mid-page sections, on hero scrims, or in gradients. The accent-blue family carries interactivity; the brand navy carries identity. Don't mix the two jobs.

**The Categorical Cage Rule.** The eight categorical color pairs exist only inside event chips. Promoting any of them to a section background, button color, or gradient stop fractures the palette and turns the site into a club hobby page.

## 3. Typography

**Display & Body Font:** Inter (with `system-ui, -apple-system, Segoe UI, Roboto, sans-serif` fallbacks).

**Character:** One typeface, wide range. Inter is neutral, legible, and unfussy — the right call for a student society that needs to feel both credible and approachable. Personality is carried by *weight contrast* (400 vs. 700) and by *deliberate letter-spacing* on display sizes, not by adding a second family.

### Hierarchy

- **Display** (Inter 700, `clamp(1.875rem, 4vw + 0.5rem, 3.125rem)`, line-height 1.1, tracking `0.1875em` / ~3px): The hero title "UNSW CEUS." Wide tracking is the ceremony move — gives the brand wordmark on the homepage a yearbook-cover bearing.
- **Subdisplay** (Inter 400, `clamp(1.75rem, 3vw + 0.5rem, 2rem)`, tracking `0.156em` / ~2.5px): The hero subtitle "Chemical Engineering Undergraduate Society." Light weight against the bold display creates the contrast.
- **Headline** (Inter 700, `clamp(2.25rem, 3vw, 3rem)`, line-height 1.15): Page-level h2 on /about, /sponsors, /team — the "Interested in Sponsoring CEUS?" register.
- **Title** (Inter 600, `1.5rem`, line-height 1.3): Card titles. Event names, member names, sponsor names inside cards.
- **Body** (Inter 400, `1rem` / 16px, line-height 1.6): Default paragraph text. Capped at 65–75ch in long-form sections.
- **Label** (Inter 600, `0.75rem` / 12px, line-height 1): Category chips, metadata badges. Sentence case, not uppercase.

### Named Rules

**The Single-Family Rule.** Inter is the only typeface. No serif for "warmth," no display font for "personality." Personality lives in weight (400/600/700) and in the tracked hero. Adding a second family flattens the system into Generic University Microsite.

**The Tracked-Hero Rule.** Display and subdisplay carry wide positive tracking (~3px / ~2.5px). Every other size uses normal tracking. Tracking is the hero's job, not a general typographic effect: applying it to body or labels turns the page into a 2012 photographer portfolio.

## 4. Elevation

The system is **flat-by-default with state-driven elevation**. Surfaces sit on the page with no shadow at rest, except for cards and the header (which carry a baseline `shadow-sm` / `shadow-lg` to separate them from the page). Depth arrives on hover: cards lift via shadow growth + a small scale transform, signalling "this is the click target." There is no ambient drop-shadow language on buttons, inputs, or chips.

### Shadow Vocabulary

- **Header rest** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): The white site header, separating it from white page surfaces.
- **Card rest** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` — Tailwind `shadow-lg`): The default for event and member cards. Enough to read as a card without dominating.
- **Card hover, primary** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` — `shadow-xl`): MemberCard hover.
- **Card hover, lifted** (`box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)` — `shadow-2xl`): EventCard hover. The signature "lift" of the site.

### Named Rules

**The Lift-on-Hover Rule.** Elevation is interactive, not decorative. Cards rest flat-ish, then lift. Static elevation on a non-interactive element (e.g. a panel that nothing happens to) is forbidden — it reads as nervous design.

**The No-Glassmorphism Rule.** No `backdrop-filter: blur`, no translucent layered panes. Sponsors and faculty read the site; glass cards feel like a startup pitch deck.

## 5. Components

### Buttons
- **Shape:** Slightly rounded rectangle (`rounded-md` / 8px). Pill buttons are reserved for category chips.
- **Primary:** Brand Navy background (`#1B397E`), white text, `12px 24px` padding. Title typography (Inter 600, 24px).
- **Hover / Focus:** Background shifts to Accent Blue Deep (`#1D4ED8`); focus emits a 2px Accent Blue ring with 2px white offset.
- **Ghost:** Transparent background, Brand Navy text, same padding. Hover: text shifts to Accent Blue Deep, underline appears.

### Chips (event category)
- **Style:** Pill (`rounded-full`), `4px 12px` padding, label typography. One of the eight categorical pairs from the Colors section — never any other color.
- **Position:** Absolute, top-left of an event card image, with a subtle `shadow-sm`.

### Cards — Event
- **Corner Style:** `rounded-xl` (12px).
- **Background:** Surface White.
- **Shadow Strategy:** `shadow-lg` at rest → `shadow-2xl` on hover (see Elevation).
- **Border:** 1px Hairline (`#E5E7EB`).
- **Internal Padding:** `0` on the wrapper (image is full-bleed), `1rem` on the text region.
- **Hover Behavior:** Scale 1.02, image inside zooms scale 1.10, gradient overlay from black/40 fades in over the image bottom.
- **Signature:** Image-led card. The event poster is the protagonist; copy supports.

### Cards — Member
- **Corner Style:** `rounded-xl` (12px).
- **Background:** Surface White.
- **Shadow Strategy:** `shadow-lg` at rest → `shadow-xl` on hover.
- **Internal Padding:** `1.25rem` mobile, `1.5rem` desktop.
- **Hover Behavior:** Scale **1.25** — deliberately exuberant; the team page is the warm-hearted chapter of the yearbook.
- **Focus Ring:** 2px Accent Blue with 2px offset on keyboard focus, when the card is an external LinkedIn link.
- **Photo:** Circular (`rounded-full`), `96–112px` square, 2px Hairline border.

### Inputs / Fields
- **Style:** White background, 1px Hairline border, `rounded-md` (8px), `12px 16px` padding, body typography.
- **Focus:** Border shifts to Accent Blue (`#2563EB`), 3px Accent Blue ring at 25% opacity. No "glow."
- **Error:** 1px `#DC2626` (red-600) border, helper text in `#B91C1C` (red-700).
- **Disabled:** Background `#F9FAFB` (gray-50), text Ink Soft.

### Navigation
- **Style:** Inline horizontal nav on desktop, hamburger sheet on mobile. Inter 600 at body size.
- **Default:** Ink Strong text.
- **Hover:** Text shifts to Brand Navy.
- **Active (desktop):** Brand Navy text; no underline, no background.
- **Active (mobile):** Brand Navy text on Surface Tint Blue (`#EFF6FF`) `rounded-md` pill.
- **Mobile toggle:** Min `48×48px` tap target.

### Hero Section (signature)
- **Layout:** Full-bleed photographic background (`object-cover`), `75vh` tall capped at `600px`, Scrim (`rgba(0,0,0,0.40)`) over the image so display type stays legible.
- **Type:** Left-aligned Display + Subdisplay in white, tracked.
- **Motion:** GSAP fade-rise from `y: 20, opacity: 0` to `y: 0, opacity: 1`, `power2.out`, 0.8s, subdisplay staggered `-0.6s`. Respects `prefers-reduced-motion` (currently relies on user OS — flagged as a Don't to enforce explicitly).

### Sponsor Carousel (signature)
- **Layout:** Slick carousel, 3 slides desktop / 2 tablet / 2 mobile, autoplay 4.5s, pause on hover. Arrows in Accent Blue.
- **Cell:** Each slide centers a sponsor logo with generous padding, white background, no card chrome — the logo *is* the card.

## 6. Do's and Don'ts

### Do:
- **Do** lead with real CEUS photography. Events, members, lab moments. Photography is the warmth budget.
- **Do** reserve Brand Navy (`#1B397E`) for identity moments (footer, primary button, active nav). Use Accent Blue (`#2563EB`) for interactive accents only.
- **Do** keep cards flat-ish at rest and let hover do the lifting (`shadow-lg` → `shadow-xl/2xl`, gentle scale).
- **Do** keep Inter as the only typeface. Pull personality from weight (400/600/700) and the tracked hero.
- **Do** confine the eight categorical colors to event chips only.
- **Do** test display headings at every breakpoint. The clamp ceilings here are deliberate; if copy overflows, rewrite the copy or lower the clamp max.
- **Do** make every motion respect `prefers-reduced-motion`. The GSAP hero, slick autoplay, and `1.25x` member-card scale all need the reduced-motion alternative wired explicitly.

### Don't:
- **Don't** put the page into navy-and-gold institutional dress. The "generic university department" anti-reference (from PRODUCT.md) is the single most likely failure mode for a UNSW society site.
- **Don't** reach for the SaaS landing-page hero-metric template ("10,000+ members served"). The community is the proof, not the metric.
- **Don't** use clip-art, stock illustrations, or generic "students at laptops" stock photography — the hobby-club register kills sponsor trust.
- **Don't** introduce a second typeface for "warmth." Inter at the right weight is the warmth.
- **Don't** promote any categorical event color to a page-level background, gradient stop, or section accent. They live in chips, full stop.
- **Don't** use glassmorphism, gradient orbs, or animated mesh backgrounds. Corporate-finance / fintech aesthetic is on the no-list.
- **Don't** use `border-left: 4px solid <color>` as a callout accent. Use a full border or a tinted background.
- **Don't** use gradient text (`background-clip: text`). Emphasis via weight or size, not color tricks.
- **Don't** use the eyebrow / 01·02·03 numbered-section template as default scaffolding. The site has six pages — number them only if the order carries real information.
- **Don't** let the `admin` UI bleed into the public site's visual language. Admin is a small product surface inside an otherwise brand site; the public visitor should never encounter or infer it.
