# Product

## Register

brand

## Users

Three audiences sharing one site, with a strong primary:

- **Primary — UNSW Chemical Engineering students** (prospective and current). They land here when deciding whether to join CEUS, looking up an upcoming event, checking who's on the exec, or hunting for industry connections. Mobile-heavy, time-pressed, browsing between classes.
- **Secondary — corporate sponsors and prospective partners.** Engineering firms evaluating CEUS as a recruitment / brand channel. Desktop-heavy, looking for credibility cues (active events, real student body, past partners).
- **Internal — CEUS executive team** using `/admin` to keep events, sponsors, and team profiles current. Not the design audience; the admin surface is the small product register inside this otherwise brand site.

## Product Purpose

The CEUS website is the society's public face. It exists to:

1. **Recruit and retain** chemical engineering students into the society's community and event calendar.
2. **Showcase the society's activity** (events, exec team, publications) so members and prospective members trust it's alive and worth their time.
3. **Surface and credit sponsors** so industry partnerships feel valuable to both sides and renew year over year.

Success looks like: students arriving via search or word of mouth find the next event in under 10 seconds; sponsors see their logo treated with care; the exec team can update content without touching code.

## Brand Personality

Three words: **student-led, credible, warm.**

- **Student-led** — written by students for students. The voice should sound like a smart peer, not a university comms office.
- **Credible** — it's still an engineering society at a research university. The visuals shouldn't feel like a club hobby page; sponsors need to take it seriously.
- **Warm** — community, not corporate. Photography of real people doing real things beats stock; warmth in color and copy makes it inviting rather than intimidating to first-years.

Emotional goals: *belonging* (you're one of us), *momentum* (something is always happening), *trust* (we're organized and worth your time).

## Anti-references

- **Generic university department pages** — dense walls of text, stock banner photo, navy-gold institutional palette, no sense of who's behind it.
- **Generic SaaS marketing template** — hero-metric template, identical icon-card grids, "supercharge your engineering experience" copy. The site is a community, not a product launch.
- **Hobby-club site** — clip art, Comic Sans energy, low-effort screenshots. Sponsors won't trust it.
- **Overly serious / corporate finance aesthetic** — black + gold, glass cards, gradient orbs. This isn't a startup pitch deck.

## Design Principles

1. **Real over stock.** Photography of actual CEUS events, members, and labs always beats library imagery. The site's credibility comes from showing the society is real and active.
2. **The next event is the lede.** Whatever a student lands for, they should see what's happening soon, without scrolling, without filters.
3. **Sponsors get dignity, not vanity.** Logos at readable size, in context, with care. Sponsors fund the society; the site should make them feel that.
4. **Light scaffolding.** This is a small site for a small audience. Resist over-engineering — no needless dashboards, no "build a design system" detour. Edit content, ship the page.
5. **Admin invisible to the public.** The exec dashboard is a tool, not a feature. Public visitors should never encounter, infer, or be slowed down by its existence.

## Accessibility & Inclusion

- **Target WCAG 2.1 AA.** This is a UNSW student society site; the university expects it, and members include students with disabilities.
- **Body text ≥4.5:1 contrast** on every surface. The blue accent (currently `text-blue-600`) is fine on white but needs verification on tinted or photographic backgrounds.
- **Reduced motion.** GSAP hero animation, slick carousel autoplay, and any future scroll-driven motion must respect `prefers-reduced-motion`.
- **Keyboard navigation.** Sponsor carousel, event filter buttons, modal close — all reachable and operable without a mouse.
- **Alt text on every photo.** Events, team members, sponsor logos. Auto-fallbacks are not enough.

---

*Note: this PRODUCT.md was inferred from the codebase, README, and SEO metadata. Sections most worth confirming with the team: **Brand Personality** (the three words), **Anti-references** (any specific sites the exec wants to avoid resembling), and **Design Principles 1 & 3** (whether real photography and sponsor presentation are in fact the load-bearing visual commitments). Run `/impeccable init` to refine these via interview.*
