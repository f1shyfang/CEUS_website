# Design System - CEUS Website

## Product Context

- **What this is:** The official website for the Chemical Engineering Undergraduate Society (CEUS) at UNSW, with public-facing content and an admin-managed events pipeline.
- **Who it's for:** Current and prospective students, society members, sponsors, and university stakeholders.
- **Space/industry:** University student society and engineering community communications.
- **Project type:** Marketing and information site with event conversion as the primary behavioral goal.

## Aesthetic Direction

- **Direction:** Blue Process Lab
- **Decoration level:** Intentional
- **Mood:** Clean and credible at first glance, then dynamic and interactive on hover. The landing experience should feel modern and "alive" without looking gimmicky.
- **Memorable outcome:** "That is a nice-looking landing page, and I want to go to more events."

## Typography

- **Display/Hero:** Satoshi - contemporary geometric sans with strong presence for event-first messaging.
- **Body:** Instrument Sans - highly readable for mixed informational and promotional content.
- **UI/Labels:** Instrument Sans (same family for consistency).
- **Data/Tables:** JetBrains Mono - stable date/time/event metadata alignment with tabular numerals.
- **Code:** JetBrains Mono.
- **Loading:** Self-host where possible for stability; Google Fonts fallback acceptable in early iterations.
- **Scale:**
  - `--text-xs: 0.75rem`
  - `--text-sm: 0.875rem`
  - `--text-base: 1rem`
  - `--text-lg: 1.125rem`
  - `--text-xl: 1.25rem`
  - `--text-2xl: 1.5rem`
  - `--text-3xl: 1.875rem`
  - `--text-4xl: 2.25rem`
  - `--text-5xl: 3rem`

## Color

- **Approach:** Balanced (brand-anchored blue/white with restrained support tones).
- **Primary:** `#0A4D9B` - CEUS core brand action color.
- **Primary deep:** `#07356C` - hover/depth states.
- **Primary bright:** `#2A74D7` - interactive highlights.
- **Background:** `#F7FAFF` - light blue-white canvas.
- **Surface:** `#FFFFFF` - cards and elevated modules.
- **Text primary:** `#0F1F33`
- **Text muted:** `#4B607A`
- **Border/subtle lines:** `#D7E3F4`
- **Dark mode strategy:** Preserve hue identity, reduce saturation 10-15 percent, raise luminance contrast for legibility.
- **Semantic:** success `#0B8F5A`, warning `#B7791F`, error `#C53030`, info `#0A4D9B`.

## Spacing

- **Base unit:** 8px
- **Density:** Comfortable
- **Scale:** 2xs(2), xs(4), sm(8), md(16), lg(24), xl(32), 2xl(48), 3xl(64)

## Layout

- **Approach:** Hybrid (grid-disciplined core with selective editorial asymmetry in hero/events).
- **Grid:** 12 columns desktop, 8 tablet, 4 mobile.
- **Max content width:** 1200px (hero can break to 1320px for drama).
- **Border radius:** sm 6px, md 10px, lg 14px, xl 20px, pill 9999px.
- **Process motif usage:** Pipe/process lines are structural accents, not decorative clutter. Use as section connectors, event timeline rails, and background guidance lines.

## Motion

- **Approach:** Intentional
- **Easing:** enter `cubic-bezier(0.2, 0.8, 0.2, 1)`, exit `cubic-bezier(0.4, 0, 1, 1)`, move `cubic-bezier(0.4, 0, 0.2, 1)`
- **Duration:** micro(80-120ms), short(160-240ms), medium(260-380ms), long(420-650ms)
- **Reduced motion:** Provide static fallback for all fluid-interactive visuals.

## Signature Interaction: Fluid + Process System

- **Primary effect:** Mouse-reactive fluid field in hero background, constrained to a safe zone behind content.
- **Behavior:** Cursor proximity introduces subtle ripples and flow distortion; no explosive particles, no game-like trails.
- **Process integration:** Pipe-like vector channels suggest flow direction from hero toward upcoming events modules.
- **Performance guardrails:** Cap rendering cost on low-power devices, degrade to static gradient/noise texture if FPS drops.
- **Accessibility guardrails:** Maintain WCAG contrast for text regardless of fluid state; never animate critical copy itself.

## Conversion-First Event UX Rules

- Put the next 2-3 events above the fold on desktop and within first swipe on mobile.
- Each event card shows date, time, location, and one clear action.
- Use primary blue on event CTAs consistently; avoid competing CTA colors.
- Visual flow cues (fluid/pipes) should guide eyes toward event actions, not away.

## Do / Do Not

- **Do:** Keep the interface mostly light and clean, then use motion as an accent.
- **Do:** Use motion to reinforce hierarchy and action intent.
- **Do:** Treat the landing hero as a poster moment for events.
- **Do not:** Overuse glow, saturation, or continuous animation loops.
- **Do not:** Let process lines intersect critical text blocks.
- **Do not:** Add multiple competing visual gimmicks.

## Decisions Log


| Date       | Decision                        | Rationale                                                        |
| ---------- | ------------------------------- | ---------------------------------------------------------------- |
| 2026-05-05 | Blue-and-white lock             | Aligns strictly with CEUS brand/logo identity.                   |
| 2026-05-05 | Interactive fluid hero          | Delivers memorable visual signature tied to user cursor intent.  |
| 2026-05-05 | Pipe/process motif              | Reflects chemical engineering domain language in a coherent way. |
| 2026-05-05 | Event-first conversion emphasis | Directly supports "I want to go to more events" outcome.         |
