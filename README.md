# CEUS Website

> The official website for the Chemical Engineering Undergraduate Society (CEUS) at UNSW.

A modern, responsive website built with Next.js, TypeScript, and Tailwind CSS. Content is managed through Supabase (events, sponsors, team, jobs, contact submissions) with an admin dashboard for society executives.

**Full documentation:** [docs/](docs/)

---

## Features

- **Responsive design** — Mobile-first layout with Tailwind CSS
- **Dynamic content** — Events, sponsors, team profiles, and job listings from Supabase
- **Admin dashboard** — CRUD interface at `/admin` for events, sponsors, team, jobs, and contact submissions
- **Job board** — Filterable listings for internships, graduate programs, and roles
- **Contact form** — Submissions stored in Supabase and reviewable in admin
- **SEO** — Metadata, structured data, sitemap, and robots.txt
- **TypeScript** — End-to-end type safety

> **Note:** Interactive 3D models (Three.js) are temporarily disabled to reduce bundle size. The placeholder component can be re-enabled — see [QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md#re-enabling-3d-models).

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 3.4 |
| Backend | Supabase (PostgreSQL, Auth, Storage) |
| Data fetching | Supabase client + tRPC (events pagination) |
| Forms | React Hook Form, Zod |
| Animations | GSAP |

## Project structure

```
CEUS_website/
├── docs/                   # Documentation
├── package.json            # Root scripts (delegate to CEUS/)
└── CEUS/                   # Next.js application
    ├── public/             # Static assets (PDFs, legacy images)
    ├── scripts/            # SQL migrations and data scripts
    └── src/
        ├── app/            # Pages and routes
        │   ├── admin/      # Protected admin dashboard
        │   ├── events/     # Events listing
        │   ├── jobs/       # Job board
        │   ├── team/       # Team profiles
        │   ├── sponsors/   # Sponsor showcase
        │   ├── contact/    # Contact form
        │   └── publications/
        ├── components/     # UI components
        ├── layouts/        # Header, Footer, Navbar
        ├── lib/            # Supabase client, storage helpers, schemas
        ├── server/         # tRPC API routers
        ├── data/           # Static fallback data
        └── types.ts        # Shared TypeScript types
```

## Quick start

See [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) for the full walkthrough.

```bash
git clone https://github.com/f1shyfang/CEUS_website.git
cd CEUS_website/CEUS
npm install
cp .env.example .env.local   # add Supabase credentials
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run tsc` | TypeScript check |

Run from `CEUS/`, or from the repo root (root `package.json` delegates to `CEUS/`).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Scripts only | Service role key for bulk uploads |

See [CEUS/.env.example](CEUS/.env.example) for the template.

## Content management

Most content is managed through the **admin dashboard** at `/admin`:

| Section | Public page | Admin route |
|---------|-------------|-------------|
| Events | `/events` | `/admin/events` |
| Sponsors | `/sponsors` | `/admin/sponsors` |
| Team | `/team` | `/admin/team` |
| Jobs | `/jobs` | `/admin/jobs` |
| Contact | `/contact` | `/admin/contacts` |

Admin users are created in the Supabase dashboard under **Authentication → Users**.

**For society executives:** see the [Admin User Guide](docs/ADMIN_USER_GUIDE.md) for step-by-step instructions on managing events, sponsors, team, jobs, and contact messages.

Static fallback data in `src/data/` is used when Supabase is unavailable during development.

## Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](docs/GETTING_STARTED.md) | First-time local setup |
| [Quick Reference](docs/QUICK_REFERENCE.md) | Commands and common tasks |
| [Architecture](docs/ARCHITECTURE.md) | Technical design and data flow |
| [API Documentation](docs/API_DOCUMENTATION.md) | Types and Supabase helpers |
| [Deployment](docs/DEPLOYMENT.md) | Vercel and production setup |
| [Contributing](docs/CONTRIBUTING.md) | Contribution guidelines |
| [Admin User Guide](docs/ADMIN_USER_GUIDE.md) | Content management for executives |
| [Public Images](CEUS/docs/public-images.md) | Supabase Storage setup |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit with [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, etc.)
4. Open a pull request

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for code style and PR guidelines.

## Deployment

The recommended host is **Vercel**. Set the project **Root Directory** to `CEUS` and add Supabase environment variables.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for step-by-step instructions.

---

**Built with care by the CEUS Development Team**
