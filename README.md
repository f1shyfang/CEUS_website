# CEUS Website

> The official website for the Chemical Engineering Undergraduate Society (CEUS) at UNSW.

A modern, responsive website built with Next.js, TypeScript, and Tailwind CSS featuring 3D interactive elements, event management, team profiles, and sponsor showcases.

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
- [How to Contribute](#how-to-contribute)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive 3D Models**: 3D laboratory equipment using Three.js and React Three Fiber
- **Event Management**: Dynamic event listings with filtering capabilities
- **Team Profiles**: Executive team showcase with member cards
- **Sponsor Showcase**: Interactive sponsor logos with modal details
- **Modern UI/UX**: Clean, professional design with smooth animations
- **SEO Optimized**: Next.js metadata and structured data
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 15.4.6 (App Router)
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 3.4.17
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: GSAP 3.12.7
- **Icons**: React Icons 5.5.0
- **Carousel**: React Slick 0.30.3
- **Date Handling**: date-fns 4.1.0
- **Development**: ESLint, PostCSS, Autoprefixer

## Project Structure

```
CEUS/
├── public/                 # Static assets (images, 3D models, PDFs)
│   ├── images/            # Image assets organized by category
│   ├── *.glb, *.gltf      # 3D model files
│   └── *.pdf              # Document files
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── events/        # Events page
│   │   ├── publications/  # Publications page
│   │   ├── sponsors/      # Sponsors page
│   │   ├── team/          # Team page
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable React components
│   ├── data/              # Static data files
│   ├── layouts/           # Layout components
│   └── types.ts           # TypeScript type definitions
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Running the Project Locally

### Prerequisites

- **Node.js**: Version 18 or later (recommended: 20.x)
- **Package Manager**: npm, yarn, or pnpm
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/f1shyfang/CEUS_website.git
   cd CEUS_website/CEUS
   ```

2. **Install dependencies**
   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

The application will be available at **[http://localhost:3000](http://localhost:3000)**.

### Development

- **Development Server**: `npm run dev` - Starts the development server with hot reload
- **Linting**: `npm run lint` - Runs ESLint to check code quality
- **Type Checking**: TypeScript checking is integrated into the development process

### Building for Production

```sh
npm run build
npm start
```

## Project Architecture

### App Router Structure
The project uses Next.js 13+ App Router with the following structure:
- **Layout**: Shared layout with header and footer
- **Pages**: Individual page components for each route
- **Components**: Reusable UI components
- **Data**: Static data files for content management

### Component Architecture
- **Layout Components**: Header, Footer, Navigation
- **UI Components**: Cards, Buttons, Modals
- **Feature Components**: Event cards, Team member cards, Sponsor logos
- **3D Components**: Three.js integration for interactive models

## Components Overview

### Core Components
- **EventCard**: Displays event information with filtering
- **MemberCard**: Team member profile cards
- **SponsorLogo**: Interactive sponsor logo with modal
- **ThreeDModels**: 3D laboratory equipment viewer
- **FilterButton**: Event filtering functionality

### Layout Components
- **Header**: Navigation and branding
- **Footer**: Links and social media
- **HeroSection**: Landing page hero area
- **ContentSection**: Reusable content wrapper

## Data Management

### Static Data Files
- **eventData.ts**: Event information and metadata
- **sponsorData.ts**: Sponsor details and logos
- **teamData.ts**: Executive team member information

### Data Structure
All data is typed with TypeScript interfaces for type safety and consistency.

## Styling

### Tailwind CSS
- **Utility-first**: Rapid UI development with utility classes
- **Custom Configuration**: Extended color palette and spacing
- **Responsive Design**: Mobile-first responsive breakpoints
- **Dark Mode Ready**: Prepared for future dark mode implementation

### CSS Organization
- **Global Styles**: `src/index.css` for base styles
- **Component Styles**: Scoped styles within components
- **Utility Classes**: Tailwind utilities for consistent spacing and colors

## 3D Features

### Three.js Integration
- **React Three Fiber**: React renderer for Three.js
- **3D Models**: Laboratory equipment (burettes, flasks)
- **Interactive Elements**: Mouse controls and animations
- **Performance Optimized**: Efficient rendering and loading

### Model Management
- **File Formats**: GLB and GLTF for optimal performance
- **Texture Loading**: Automatic texture and material handling
- **Responsive**: 3D models adapt to different screen sizes

## How to Contribute

We welcome contributions from the CEUS community! Here's how you can help:

### Development Workflow

1. **Fork the Repository**
   ```sh
   git clone https://github.com/your-username/CEUS_website.git
   ```

2. **Create a Feature Branch**
   ```sh
   git checkout -b feature/YourFeatureName
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add TypeScript types for new features
   - Test your changes locally

4. **Commit Your Changes**
   ```sh
   git commit -m 'feat: add new feature description'
   ```

5. **Push and Create Pull Request**
   ```sh
   git push origin feature/YourFeatureName
   ```

### Contribution Guidelines

- **Code Style**: Follow existing patterns and ESLint rules
- **TypeScript**: Add proper types for all new code
- **Testing**: Test changes across different screen sizes
- **Documentation**: Update documentation for new features
- **Performance**: Consider impact on bundle size and loading times

### Areas for Contribution

- **Content Updates**: Event information, team member details
- **UI/UX Improvements**: Design enhancements, accessibility
- **New Features**: Additional pages, interactive elements
- **Performance**: Optimization, loading improvements
- **Documentation**: Code comments, README updates

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Other Platforms
- **Netlify**: Configure build settings for Next.js
- **AWS Amplify**: Use Next.js build settings
- **Self-hosted**: Build and serve the static files

### Environment Variables
Create a `.env.local` file for local development:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

For questions or support:
- **Technical Issues**: Create an issue on GitHub
- **Content Updates**: Contact the CEUS executive team
- **Feature Requests**: Submit through GitHub issues

---

**Built with ❤️ by the CEUS Development Team**

