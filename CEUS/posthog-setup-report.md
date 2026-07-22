# PostHog post-wizard report

The wizard completed a full audit of the existing PostHog integration and extended it with three new files. The core infrastructure (instrumentation-client.ts, posthog-server.ts, reverse proxy rewrites in next.config.js, and PostHogPageView) was already in place. This run added tracking for sponsor interactions and admin login/identification, which were the remaining untracked user journeys on the site.

| Event name | Description | File |
|---|---|---|
| `contact_form_submitted` | User successfully submitted the contact form. | `src/app/contact/ContactClient.tsx` |
| `contact_form_failed` | Contact form submission encountered an error. | `src/app/contact/ContactClient.tsx` |
| `job_viewed` | User clicked a job listing to view its details. | `src/app/jobs/JobsClient.tsx` |
| `job_applied` | User clicked the Apply Now button for a job listing. | `src/app/jobs/components/JobDetails.tsx` |
| `job_link_copied` | User copied the shareable link for a job listing. | `src/app/jobs/components/JobDetails.tsx` |
| `event_section_switched` | User switched between the upcoming and past events tabs. | `src/app/events/EventsClient.tsx` |
| `event_card_clicked` | User clicked View Event on an event card to open it externally. | `src/components/EventCard.tsx` |
| `home_events_link_clicked` | User clicked the View All Events link on the home page. | `src/app/HomeClient.tsx` |
| `calendar_subscribed` | User clicked the Subscribe to Calendar link on the home page. | `src/app/HomeClient.tsx` |
| `sponsor_website_clicked` | User clicked the Visit Website link for a sponsor in their detail modal. | `src/components/SponsorModal.tsx` |
| `sponsor_modal_opened` | User opened a sponsor's detail modal by clicking their logo or Learn More. | `src/app/sponsors/SponsorsClient.tsx` |
| `become_a_sponsor_clicked` | User clicked the Become a Sponsor or Get In Touch button on the sponsors page. | `src/app/sponsors/SponsorsClient.tsx` |
| `admin_logged_in` | An admin user successfully signed in to the admin panel. | `src/app/admin/login/page.tsx` |

## Next steps

We've built a dashboard and five insights to monitor user behavior across the site's key journeys:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/480598/dashboard/1743464)
- [Key engagement actions (30 days)](https://us.posthog.com/project/480598/insights/Avb947Lw)
- [Job board funnel: viewed → applied](https://us.posthog.com/project/480598/insights/6T7jNflt)
- [Contact form submissions](https://us.posthog.com/project/480598/insights/Uk68qZCm)
- [Sponsor engagement trend](https://us.posthog.com/project/480598/insights/YKYPZkNY)
- [Become a sponsor funnel](https://us.posthog.com/project/480598/insights/olMnsOyQ)

## Verify before merging

- [ ] Run a full production build (`pnpm build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — the admin login currently only identifies on fresh login; returning sessions authenticated via existing cookies will be on anonymous distinct IDs until they log in again.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code.
