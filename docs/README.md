# CEUS Website Documentation

Documentation for the Chemical Engineering Undergraduate Society (CEUS) website at UNSW.

## Start here

| Document | Audience | What it covers |
|----------|----------|----------------|
| [../README.md](../README.md) | Everyone | Project overview, features, local setup |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Developers | Commands, file locations, common tasks |
| [GETTING_STARTED.md](GETTING_STARTED.md) | New contributors | First-time setup from clone to running site |

## Architecture and data

| Document | What it covers |
|----------|----------------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | App structure, rendering, admin, security |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | Types, Supabase helpers, storage |
| [../CEUS/docs/public-images.md](../CEUS/docs/public-images.md) | Supabase Storage bucket setup |

## Operations

| Document | Audience | What it covers |
|----------|----------|----------------|
| [ADMIN_USER_GUIDE.md](ADMIN_USER_GUIDE.md) | Society executives | Managing content via `/admin` (no code) |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Developers | Vercel and production setup |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Developers | Code style, PR process, workflows |

## SEO

| Document | What it covers |
|----------|----------------|
| [SEO_OPTIMIZATION_GUIDE.md](SEO_OPTIMIZATION_GUIDE.md) | What is implemented today and how to maintain it |
| [SEO_ACTION_PLAN.md](SEO_ACTION_PLAN.md) | Prioritized backlog of remaining SEO work |

## Repository layout

```
CEUS_website/
├── README.md           # Project overview (start here)
├── package.json        # Root scripts (delegates to CEUS/)
├── docs/               # Documentation (this folder)
└── CEUS/               # Next.js application
    ├── src/            # Application source
    ├── scripts/        # Migrations and data scripts
    ├── public/         # Static assets
    └── .env.example    # Environment variable template
```

All application commands run from `CEUS/`, or from the repo root via `npm run dev` (which delegates to `CEUS/`).
