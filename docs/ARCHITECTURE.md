# CEUS Website Architecture

This document provides a detailed overview of the technical architecture, design patterns, and component structure of the CEUS website.

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Architecture Patterns](#architecture-patterns)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Admin Architecture](#admin-architecture)
- [Performance Considerations](#performance-considerations)
- [Security](#security)
- [Deployment Architecture](#deployment-architecture)

## Overview

The CEUS website is built as a modern web application using Next.js 16 with the App Router and Supabase. The architecture emphasizes:

- **Performance**: Static rendering with client-side hydration and dynamic data fetching.
- **Maintainability**: TypeScript for type safety and clear interfaces.
- **Scalability**: Component-based architecture with a managed backend.
- **Dynamic Content**: Full CRUD capabilities for society executives via an admin dashboard.

## Technology Stack

### Frontend Framework
- **Next.js 16.2.4**: React framework with App Router.
- **React 19.1.1**: UI library with concurrent features.
- **TypeScript 5.7.2**: Type-safe JavaScript.

### Backend (BaaS)
- **Supabase**: 
  - **PostgreSQL Database**: Relational data storage for events, sponsors, and team members.
  - **Supabase Auth**: Secure authentication for the admin panel.
  - **Supabase Storage**: Managed file storage for images and assets.

### Styling & UI
- **Tailwind CSS 3.4.17**: Utility-first CSS framework.
- **PostCSS 8.5.3**: CSS processing.
- **GSAP 3.12.7**: Animation library.

### 3D Graphics
- **Three.js 0.160.1**: 3D graphics library.
- **React Three Fiber 8.18.0**: React renderer for Three.js.
- **React Three Drei 9.122.0**: Helpers for React Three Fiber.

### Additional Libraries
- **React Hook Form & Zod**: Form management and validation.
- **React Icons 5.5.0**: Icon library.
- **date-fns 4.1.0**: Date manipulation.

## Project Structure

```
CEUS/
├── scripts/                    # Database migrations and seed scripts
├── public/                     # Static assets (3D models, documents)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # Protected admin dashboard routes
│   │   │   ├── events/         # Event management
│   │   │   ├── sponsors/       # Sponsor management
│   │   │   ├── team/           # Team management
│   │   │   └── contacts/       # Contact submission management
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # Reusable components
│   │   ├── admin/              # Admin-specific UI components
│   │   ├── EventCard.tsx       # Event display component
│   │   ├── SponsorLogo.tsx     # Sponsor display component
│   │   └── ThreeDModels.tsx    # 3D model wrapper
│   ├── lib/                    # Shared logic
│   │   └── supabase.ts         # Supabase client and data helpers
│   ├── data/                   # Static fallback data
│   └── types.ts                # TypeScript type definitions
```

## Architecture Patterns

### 1. Hybrid Rendering
- **Static Content**: Core pages are pre-rendered for SEO and performance.
- **Client-Side Data**: Dynamic content (events, sponsors) is fetched from Supabase on the client side to ensure real-time updates without full rebuilds.

### 2. Managed Backend (Supabase)
- **Database**: Replaces static TS files with a relational database.
- **Storage**: Centralized asset management for all site images.
- **Auth**: Simplified user management for executive access.

### 3. Progressive Enhancement
- Core site functionality remains fast and accessible.
- Interactive features (3D models, filtering) enhance the experience.

## Component Architecture

### Component Categories

#### 1. Public UI Components
- **Layouts**: Header, Footer, HeroSection.
- **Features**: EventCard, MemberCard, SponsorLogo.
- **Interactive**: ThreeDModels, EventFilterButton.

#### 2. Admin UI Components
- **Data Tables**: Paginated and filterable views for managing records.
- **Forms**: Zod-validated forms for creating and editing data.
- **Image Uploads**: Specialized components for uploading to Supabase Storage.
- **Stats Cards**: Dashboard overview metrics.

## Data Flow

### 1. Public Data Flow

```
Supabase DB → lib/supabase.ts (Fetch) → Page Component → UI Components
```

- Data is fetched via `lib/supabase.ts` helpers.
- TypeScript interfaces ensure data consistency from DB to UI.
- Images are served via Supabase Storage public URLs.

### 2. Admin Data Flow

```
User Action → Admin Form → lib/supabase.ts (Mutation) → Supabase DB
```

- Mutations use Supabase client with Auth protection.
- Successful updates trigger local state refreshes or revalidations.

## State Management

### Local State
- **React Hooks**: `useState`, `useEffect` for component-level logic.
- **Forms**: `react-hook-form` for complex form state.

### Server State
- Managed primarily through Supabase client and direct fetches.
- Cached at the component level where appropriate.

## Admin Architecture

The admin panel is built to be a standalone management tool within the main application:
- **Authentication**: Route-level protection ensures only authorized users access `/admin`.
- **Layout**: Dedicated sidebar navigation and admin-focused header.
- **CRUD Operations**: Consistent patterns for managing all site entities.
- **Feedback**: Immediate visual feedback for all user actions (success/error).

## Performance Considerations

### 1. Asset Optimization
- **Supabase Storage**: Serves images with appropriate cache controls.
- **Next.js Image**: Automatic optimization for public assets.

### 2. Code Splitting
- Admin dashboard code is only loaded for authenticated users.
- 3D models and heavy libraries (GSAP) are split to minimize initial bundle size.

## Security

### 1. Database Security
- **RLS (Row Level Security)**: Supabase policies restrict write access to authenticated users.
- **Public Read**: Policies allow public read access for site content.

### 2. Authentication
- Secure password-based login via Supabase Auth.
- Session-based persistence for admin access.

## Deployment Architecture

### 1. Hosting
- **Vercel**: Optimized for Next.js deployments.
- **Global CDN**: Static assets and pre-rendered pages served from the edge.

### 2. Environment Management
- Environment-specific keys for Supabase URL and keys.
- Production and preview environments for safe testing.

## Conclusion

The CEUS website architecture provides a robust, scalable foundation that balances the performance of a static site with the flexibility of a dynamic, managed backend.
