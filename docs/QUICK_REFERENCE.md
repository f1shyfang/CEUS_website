# CEUS Website Quick Reference

A quick reference guide for common tasks and commands when working with the CEUS website.

## Table of Contents
- [Quick Commands](#quick-commands)
- [File Locations](#file-locations)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Useful Links](#useful-links)

## Quick Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Stage changes
git add .

# Commit changes
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature-name

# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main
```

### Package Management
```bash
# Install dependencies
npm install

# Add new dependency
npm install package-name

# Add dev dependency
npm install --save-dev package-name

# Update dependencies
npm update

# Check for security issues
npm audit
npm audit fix
```

## File Locations

### Key Directories
```
CEUS/
├── src/
│   ├── app/                    # Next.js pages
│   ├── components/             # Reusable components
│   ├── data/                   # Static data files
│   ├── layouts/                # Layout components
│   └── types.ts               # TypeScript types
├── public/                     # Static assets
│   ├── images/                # Image files
│   ├── *.glb, *.gltf         # 3D models
│   └── *.pdf                 # Documents
└── package.json               # Dependencies
```

### Important Files
- **Main Layout**: `src/app/layout.tsx`
- **Home Page**: `src/app/page.tsx`
- **Event Data**: `src/data/eventData.ts`
- **Team Data**: `src/data/teamData.ts`
- **Sponsor Data**: `src/data/sponsorData.ts`
- **Type Definitions**: `src/types.ts`
- **Tailwind Config**: `tailwind.config.js`
- **Next.js Config**: `next.config.js`

### Component Files
- **Event Card**: `src/components/EventCard.tsx`
- **Member Card**: `src/components/MemberCard.tsx`
- **Sponsor Logo**: `src/components/SponsorLogo.tsx`
- **3D Models**: `src/components/ThreeDModels.tsx`
- **Header**: `src/layouts/Header.tsx`
- **Footer**: `src/layouts/Footer.tsx`

## Common Tasks

### Adding a New Event
1. Open `src/data/eventData.ts`
2. Add new event object:
```typescript
{
  id: 'unique-event-id',
  title: 'Event Title',
  date: new Date('2024-01-15T18:00:00'),
  location: 'UNSW Campus',
  description: 'Event description...',
  image: '/images/events/event-image.jpg',
  category: 'social',
  registrationLink: 'https://example.com/register',
  isUpcoming: true
}
```
3. Add event image to `public/images/events/`
4. Test locally: `npm run dev`

### Adding a Team Member
1. Open `src/data/teamData.ts`
2. Add new member object:
```typescript
{
  id: 'member-id',
  name: 'Full Name',
  position: 'Position Title',
  image: '/images/team/member-photo.jpg',
  email: 'member@unsw.edu.au',
  linkedin: 'https://linkedin.com/in/member',
  bio: 'Member bio...',
  year: 3,
  degree: 'Bachelor of Chemical Engineering'
}
```
3. Add member photo to `public/images/team/`
4. Test locally: `npm run dev`

### Adding a Sponsor
1. Open `src/data/sponsorData.ts`
2. Add new sponsor object:
```typescript
{
  id: 'sponsor-id',
  name: 'Sponsor Name',
  logo: '/images/sponsors/sponsor-logo.png',
  website: 'https://sponsor-website.com',
  description: 'Sponsor description...',
  tier: 'gold'
}
```
3. Add sponsor logo to `public/images/sponsors/`
4. Test locally: `npm run dev`

### Creating a New Page
1. Create directory: `src/app/new-page/`
2. Create file: `src/app/new-page/page.tsx`
3. Add page content:
```typescript
export default function NewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">New Page</h1>
      <p>Page content here...</p>
    </div>
  );
}
```
4. Add navigation link in `src/layouts/Header.tsx`

### Styling with Tailwind
```tsx
// Common utility classes
className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-md"

// Responsive design
className="text-sm md:text-base lg:text-lg"

// Colors
className="text-blue-600 bg-gray-100 border-red-500"

// Spacing
className="p-4 m-2 space-y-4 gap-6"

// Layout
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### Working with 3D Models
1. Add model file to `public/` directory
2. Update `src/components/ThreeDModelsInner.tsx`
3. Configure model properties:
```typescript
{
  id: 'model-id',
  name: 'Model Name',
  filePath: '/model-file.glb',
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
  description: 'Model description'
}
```

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

#### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit

# Fix common issues
npm run lint -- --fix
```

#### 3D Models Not Loading
- Check file paths in `public/` directory
- Verify model files are GLB or GLTF format
- Check browser console for errors
- Ensure models are optimized for web

#### Images Not Displaying
- Verify image paths start with `/`
- Check file exists in `public/images/`
- Use Next.js Image component for optimization
- Check file permissions

#### Styling Issues
- Clear browser cache
- Check Tailwind classes are correct
- Verify responsive breakpoints
- Check for CSS conflicts

### Debug Commands
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check build output
npm run build

# Run development server with verbose output
npm run dev -- --verbose

# Check for security vulnerabilities
npm audit

# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

### Performance Issues
```bash
# Analyze performance
npm run build
npx @next/bundle-analyzer

# Check Core Web Vitals
# Use Chrome DevTools Lighthouse

# Optimize images
# Use Next.js Image component
# Compress images before upload
```

## Useful Links

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Three.js Docs](https://threejs.org/docs)

### Tools
- [Vercel](https://vercel.com) - Deployment
- [Netlify](https://netlify.com) - Alternative deployment
- [GitHub](https://github.com) - Version control
- [Figma](https://figma.com) - Design (if applicable)

### Development Tools
- [VS Code](https://code.visualstudio.com) - Recommended editor
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Resources
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS-Tricks](https://css-tricks.com)
- [Stack Overflow](https://stackoverflow.com)
- [GitHub Issues](https://github.com/your-repo/issues)

## Environment Variables

### Development
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Git Commit Messages

Use conventional commit format:
```bash
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## Deployment Checklist

Before deploying:
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Images optimized
- [ ] 3D models working
- [ ] Responsive design tested
- [ ] Performance acceptable
- [ ] Environment variables set
- [ ] Documentation updated

---

This quick reference provides fast access to the most common tasks and commands. For detailed information, refer to the main documentation files.
