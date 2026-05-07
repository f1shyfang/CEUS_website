# CEUS Website

> The official website for the Chemical Engineering Undergraduate Society (CEUS) at UNSW.

A modern, responsive website built with Next.js, TypeScript, and Tailwind CSS featuring a Supabase-powered backend, an interactive admin dashboard, 3D interactive elements, event management, team profiles, and sponsor showcases.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Running the Project Locally](#running-the-project-locally)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Building for Production](#building-for-production)
- [Project Architecture](#project-architecture)
- [Components Overview](#components-overview)
- [Data Management](#data-management)
- [Styling](#styling)
- [3D Features](#3d-features)
- [Admin Dashboard](#admin-dashboard)
- [How to Contribute](#how-to-contribute)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive 3D Models**: 3D laboratory equipment using Three.js and React Three Fiber
- **Dynamic Content Management**: Supabase-backed data for events, sponsors, and team members
- **Admin Dashboard**: Full CRUD interface for managing site content
- **Event Management**: Dynamic event listings with category filtering
- **Team Profiles**: Executive team showcase with member cards
- **Sponsor Showcase**: Interactive sponsor logos with modal details
- **Modern UI/UX**: Clean, professional design with smooth animations
- **SEO Optimized**: Next.js metadata and structured data
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **Backend**: Supabase (Database, Auth, Storage)
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 3.4.17
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: GSAP 3.12.7
- **Forms**: React Hook Form, Zod
- **Icons**: React Icons 5.5.0
- **Carousel**: React Slick 0.30.3
- **Date Handling**: date-fns 4.1.0

## Project Structure

```
CEUS/
├── public/                 # Static assets (3D models, PDFs)
├── scripts/                # Database migrations and seed scripts
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── (about)/       # About pages
│   │   ├── admin/         # Protected admin dashboard
│   │   ├── contact/       # Contact page
│   │   ├── events/        # Events page
│   │   ├── publications/  # Publications page
│   │   ├── sponsors/      # Sponsors page
│   │   ├── team/          # Team page
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable React components
│   │   ├── admin/         # Admin-specific components
│   ├── data/              # Static fallback data files
│   ├── layouts/           # Layout components
│   ├── lib/               # Shared libraries (Supabase client)
│   └── types.ts           # TypeScript type definitions
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Running the Project Locally

### Prerequisites

- **Node.js**: Version 20.x or later
- **Package Manager**: npm
- **Supabase Project**: A Supabase project for database and storage

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/f1shyfang/CEUS_website.git
   cd CEUS_website/CEUS
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start the development server**
   ```sh
   npm run dev
   ```

The application will be available at **[http://localhost:3000](http://localhost:3000)**.

### Development

- **Development Server**: `npm run dev` - Starts the development server
- **Linting**: `npm run lint` - Runs ESLint
- **Type Checking**: `npm run tsc` - Runs TypeScript compiler check

### Building for Production

```sh
npm run build
npm start
```

## Project Architecture

### Data Architecture
The project uses a hybrid data approach:
- **Supabase**: Primary data source for dynamic content (Events, Sponsors, Team)
- **Storage**: Supabase Storage for images and assets
- **Static**: Fallback data is maintained in `src/data/` for reliability

### Admin Dashboard
Located at `/admin`, the dashboard provides:
- **Authentication**: Secure login via Supabase Auth
- **Content Management**: Create, Read, Update, and Delete site content
- **Image Management**: Direct uploads to Supabase Storage
- **Contact Monitoring**: View and manage contact form submissions

## Data Management

### Supabase Integration
Data is fetched through helper functions in `src/lib/supabase.ts`. These functions handle the transformation from database rows to application types.

### Schema
The application manages three main collections:
- `events`: Community and society events
- `sponsors`: Corporate partners and tiers
- `team_members`: Executive and committee members
- `contact_submissions`: Inbound inquiries from the contact form

## 3D Features

### Three.js Integration
- **React Three Fiber**: React renderer for Three.js
- **3D Models**: Laboratory equipment (burettes, flasks) located in `public/`
- **Performance Optimized**: Models are lazy-loaded and optimized for web

## Admin Dashboard

The admin panel provides a streamlined workflow for the society executives to keep the site updated without touching code:
- **Events**: Update event details, dates, and posters
- **Sponsors**: Manage partnership tiers and logos
- **Team**: Update roles and member photos
- **Contact**: Review and track student inquiries

## How to Contribute

We welcome contributions from the CEUS community!

1. **Fork the Repository**
2. **Create a Feature Branch** (`git checkout -b feature/YourFeatureName`)
3. **Commit Your Changes** (`git commit -m 'feat: add new feature'`)
4. **Push and Create Pull Request**

### Contribution Guidelines

- **TypeScript**: Add proper types for all new code
- **Styling**: Use Tailwind CSS and follow the existing design system
- **Validation**: Ensure all forms use Zod for validation

## Deployment

### Vercel
1. Connect your GitHub repository to Vercel
2. Add your Supabase environment variables
3. Deploy!

---

**Built with ❤️ by the CEUS Development Team**

