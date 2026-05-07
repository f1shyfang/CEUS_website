# Contributing to CEUS Website

Thank you for your interest in contributing to the CEUS website! This document provides guidelines and information for contributors.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Component Development](#component-development)
- [Data Management](#data-management)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Common Tasks](#common-tasks)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Git
- Basic knowledge of React, TypeScript, and Next.js

### First Time Setup
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Make your changes
6. Test thoroughly
7. Submit a pull request

## Development Setup

### Environment Setup
Create a `.env.local` file in the CEUS directory:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Development Workflow
1. **Create a feature branch**: `git checkout -b feature/your-feature-name`
2. **Make changes**: Follow the coding guidelines below
3. **Test your changes**: Ensure everything works across different screen sizes
4. **Commit your changes**: Use conventional commit messages
5. **Push and create PR**: Submit a pull request with detailed description

## Code Style Guidelines

### TypeScript
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Avoid `any` type - use proper typing
- Use type guards when necessary

```typescript
// Good
interface EventData {
  id: string;
  title: string;
  date: Date;
  location: string;
}

// Bad
const event: any = { id: '1', title: 'Event' };
```

### React Components
- Use functional components with hooks
- Implement proper prop typing
- Use React.memo for performance optimization when needed
- Follow the component structure below

```typescript
import React from 'react';
import { ComponentProps } from './types';

interface Props {
  title: string;
  description?: string;
  onClick?: () => void;
}

export const Component: React.FC<Props> = ({ 
  title, 
  description, 
  onClick 
}) => {
  return (
    <div className="component">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {onClick && (
        <button onClick={onClick}>
          Click me
        </button>
      )}
    </div>
  );
};
```

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Use consistent spacing and colors
- Avoid custom CSS unless necessary

```tsx
// Good
<div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
</div>

// Bad
<div style={{ display: 'flex', padding: '24px', backgroundColor: 'white' }}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Title</h2>
</div>
```

### File Naming
- Use PascalCase for components: `EventCard.tsx`
- Use camelCase for utilities: `formatDate.ts`
- Use kebab-case for pages: `about/page.tsx`
- Use descriptive names that indicate purpose

## Component Development

### Component Structure
Follow this structure for new components:

```typescript
// 1. Imports
import React from 'react';
import { ComponentProps } from '../types';

// 2. Interface definition
interface Props {
  // Define all props with proper types
}

// 3. Component definition
export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // 4. Hooks and state
  const [state, setState] = React.useState();
  
  // 5. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 6. Render
  return (
    <div className="component-classes">
      {/* Component content */}
    </div>
  );
};
```

### Component Guidelines
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use proper error boundaries
- Implement loading states
- Add proper accessibility attributes

### Custom Hooks
Create custom hooks for reusable logic:

```typescript
// hooks/useEventData.ts
import { useState, useEffect } from 'react';
import { EventData } from '../types';

export const useEventData = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch or process event data
    setEvents(eventData);
    setLoading(false);
  }, []);
  
  return { events, loading };
};
```

## Data Management

### Adding New Events
1. Open `src/data/eventData.ts`
2. Add new event object following the existing structure
3. Ensure all required fields are populated
4. Use proper date formatting

```typescript
{
  id: 'unique-event-id',
  title: 'Event Title',
  date: new Date('2024-01-15T18:00:00'),
  location: 'UNSW Campus',
  description: 'Event description...',
  image: '/images/events/event-image.jpg',
  category: 'social',
  registrationLink: 'https://example.com/register'
}
```

### Adding Team Members
1. Open `src/data/teamData.ts`
2. Add new member object
3. Ensure profile image exists in `public/images/team/`
4. Use consistent formatting

```typescript
{
  id: 'member-id',
  name: 'Full Name',
  position: 'Position Title',
  image: '/images/team/member-photo.jpg',
  email: 'member@unsw.edu.au',
  linkedin: 'https://linkedin.com/in/member',
  bio: 'Member bio...'
}
```

### Adding Sponsors
1. Open `src/data/sponsorData.ts`
2. Add sponsor object
3. Ensure logo image exists in `public/images/sponsors/`
4. Include all required information

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

## Testing Guidelines

### Manual Testing Checklist
Before submitting a PR, ensure:
- [ ] Component renders correctly on desktop
- [ ] Component renders correctly on mobile
- [ ] All interactive elements work
- [ ] No console errors
- [ ] Accessibility features work (keyboard navigation, screen readers)
- [ ] Performance is acceptable

### Cross-browser Testing
Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Considerations
- Optimize images before adding to public folder
- Use Next.js Image component for images
- Minimize bundle size
- Implement proper loading states

## Pull Request Process

### Before Submitting
1. **Test thoroughly**: Ensure all functionality works
2. **Check linting**: Run `npm run lint` and fix any issues
3. **Type check**: Ensure TypeScript compilation passes
4. **Update documentation**: Add comments for complex logic
5. **Screenshot**: Include screenshots for UI changes

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] No console errors
- [ ] Accessibility tested

## Screenshots
[Add screenshots if UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process
1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** by maintainers
4. **Approval** and merge

## Common Tasks

### Adding a New Page
1. Create page file in `src/app/[page-name]/page.tsx`
2. Add navigation link in `src/layouts/Header.tsx`
3. Update routing if necessary
4. Add page metadata

### Updating Content
1. Locate appropriate data file in `src/data/`
2. Update content following existing structure
3. Test changes locally
4. Submit PR with content update

### Styling Changes
1. Use Tailwind utility classes
2. Follow existing design patterns
3. Ensure responsive design
4. Test across different screen sizes

### 3D Model Integration
1. Add model files to `public/` directory
2. Update `ThreeDModelsInner.tsx` component
3. Ensure proper loading and error handling
4. Test performance impact

## Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Questions
- Create an issue for bugs or feature requests
- Ask questions in the issue comments
- Contact the development team directly

## Recognition

Contributors will be recognized in:
- Project README
- Release notes
- CEUS website credits

Thank you for contributing to the CEUS website! 🎉
