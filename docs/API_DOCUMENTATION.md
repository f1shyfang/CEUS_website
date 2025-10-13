# CEUS Website API Documentation

This document provides comprehensive documentation for the data structures, types, and interfaces used in the CEUS website.

## Table of Contents
- [Overview](#overview)
- [Type Definitions](#type-definitions)
- [Data Structures](#data-structures)
- [Component Interfaces](#component-interfaces)
- [Event System](#event-system)
- [3D Model Integration](#3d-model-integration)
- [Utility Functions](#utility-functions)
- [Error Handling](#error-handling)

## Overview

The CEUS website uses TypeScript interfaces and static data files to ensure type safety and maintainable code. While the site is primarily static, it includes interactive components and 3D features that require well-defined data structures.

## Type Definitions

### Core Types

```typescript
// src/types.ts

// Event-related types
export interface EventData {
  id: string;
  title: string;
  date: Date;
  location: string;
  description: string;
  image: string;
  category: EventCategory;
  registrationLink?: string;
  isUpcoming: boolean;
}

export type EventCategory = 'social' | 'academic' | 'career' | 'workshop' | 'other';

// Team member types
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  email: string;
  linkedin?: string;
  bio: string;
  year: number;
  degree: string;
}

// Sponsor types
export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  tier: SponsorTier;
}

export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'bronze';

// 3D Model types
export interface ThreeDModel {
  id: string;
  name: string;
  filePath: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  description: string;
}

// Component prop types
export interface EventCardProps {
  event: EventData;
  onCardClick?: (event: EventData) => void;
  className?: string;
}

export interface MemberCardProps {
  member: TeamMember;
  className?: string;
}

export interface SponsorLogoProps {
  sponsor: Sponsor;
  onLogoClick?: (sponsor: Sponsor) => void;
  className?: string;
}
```

## Data Structures

### Event Data Structure

```typescript
// src/data/eventData.ts

import { EventData } from '../types';

export const events: EventData[] = [
  {
    id: 'event-1',
    title: 'Industry Night 2024',
    date: new Date('2024-03-15T18:00:00'),
    location: 'UNSW Main Campus',
    description: 'Connect with industry professionals and explore career opportunities.',
    image: '/images/events/industry-night.jpg',
    category: 'career',
    registrationLink: 'https://example.com/register',
    isUpcoming: true
  },
  // ... more events
];

export const getUpcomingEvents = (): EventData[] => {
  const now = new Date();
  return events.filter(event => event.date > now && event.isUpcoming);
};

export const getPastEvents = (): EventData[] => {
  const now = new Date();
  return events.filter(event => event.date <= now);
};

export const getEventsByCategory = (category: EventCategory): EventData[] => {
  return events.filter(event => event.category === category);
};
```

### Team Data Structure

```typescript
// src/data/teamData.ts

import { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'John Doe',
    position: 'President',
    image: '/images/team/john-doe.jpg',
    email: 'president@ceus.unsw.edu.au',
    linkedin: 'https://linkedin.com/in/johndoe',
    bio: 'Passionate about chemical engineering and student leadership.',
    year: 3,
    degree: 'Bachelor of Chemical Engineering'
  },
  // ... more team members
];

export const getExecutives = (): TeamMember[] => {
  const executivePositions = ['President', 'Vice President', 'Secretary', 'Treasurer'];
  return teamMembers.filter(member => 
    executivePositions.includes(member.position)
  );
};

export const getCommitteeMembers = (): TeamMember[] => {
  const executivePositions = ['President', 'Vice President', 'Secretary', 'Treasurer'];
  return teamMembers.filter(member => 
    !executivePositions.includes(member.position)
  );
};
```

### Sponsor Data Structure

```typescript
// src/data/sponsorData.ts

import { Sponsor } from '../types';

export const sponsors: Sponsor[] = [
  {
    id: 'sponsor-1',
    name: 'ANSTO',
    logo: '/images/sponsors/ansto-logo.png',
    website: 'https://www.ansto.gov.au',
    description: 'Australian Nuclear Science and Technology Organisation',
    tier: 'platinum'
  },
  // ... more sponsors
];

export const getSponsorsByTier = (tier: SponsorTier): Sponsor[] => {
  return sponsors.filter(sponsor => sponsor.tier === tier);
};

export const getAllSponsors = (): Sponsor[] => {
  return sponsors;
};
```

## Component Interfaces

### EventCard Component

```typescript
// src/components/EventCard.tsx

import React from 'react';
import { EventCardProps } from '../types';
import { format } from 'date-fns';

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onCardClick,
  className = ''
}) => {
  const handleClick = () => {
    onCardClick?.(event);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`event-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 ${className}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${event.title}`}
    >
      <div className="relative h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
          {event.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {format(event.date, 'PPP')} at {format(event.date, 'p')}
        </p>
        <p className="text-gray-500 text-sm mb-2">
          📍 {event.location}
        </p>
        <p className="text-gray-700 text-sm line-clamp-2">
          {event.description}
        </p>
        
        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Register Now
          </a>
        )}
      </div>
    </div>
  );
};
```

### MemberCard Component

```typescript
// src/components/MemberCard.tsx

import React from 'react';
import { MemberCardProps } from '../types';

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  className = ''
}) => {
  return (
    <div className={`member-card bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="relative">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-lg font-semibold">{member.name}</h3>
          <p className="text-white/90 text-sm">{member.position}</p>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-2">
          {member.degree} - Year {member.year}
        </p>
        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
          {member.bio}
        </p>
        
        <div className="flex space-x-2">
          <a
            href={`mailto:${member.email}`}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Email
          </a>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
```

## Event System

### Event Filtering

```typescript
// src/hooks/useEventFilter.ts

import { useState, useMemo } from 'react';
import { EventData, EventCategory } from '../types';

export const useEventFilter = (events: EventData[]) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchTerm]);

  return {
    filteredEvents,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm
  };
};
```

### Event Categories

```typescript
// src/constants/eventCategories.ts

import { EventCategory } from '../types';

export const EVENT_CATEGORIES: { value: EventCategory; label: string; color: string }[] = [
  { value: 'social', label: 'Social Events', color: 'bg-blue-500' },
  { value: 'academic', label: 'Academic', color: 'bg-green-500' },
  { value: 'career', label: 'Career', color: 'bg-purple-500' },
  { value: 'workshop', label: 'Workshops', color: 'bg-orange-500' },
  { value: 'other', label: 'Other', color: 'bg-gray-500' }
];

export const getCategoryColor = (category: EventCategory): string => {
  const categoryData = EVENT_CATEGORIES.find(cat => cat.value === category);
  return categoryData?.color || 'bg-gray-500';
};
```

## 3D Model Integration

### 3D Model Configuration

```typescript
// src/config/threeDModels.ts

import { ThreeDModel } from '../types';

export const THREE_D_MODELS: ThreeDModel[] = [
  {
    id: 'burette',
    name: 'Burette',
    filePath: '/Burette.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    description: 'A laboratory apparatus used for precise dispensing of liquids.'
  },
  {
    id: 'flask',
    name: 'Conical Flask',
    filePath: '/con Flask.gltf',
    position: [2, 0, 0],
    rotation: [0, Math.PI / 4, 0],
    scale: [0.8, 0.8, 0.8],
    description: 'A conical flask used for mixing and storing solutions.'
  }
];

export const getModelById = (id: string): ThreeDModel | undefined => {
  return THREE_D_MODELS.find(model => model.id === id);
};
```

### 3D Model Component Interface

```typescript
// src/components/ThreeDModels.tsx

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { ThreeDModelsInner } from './ThreeDModelsInner';

interface ThreeDModelsProps {
  models: ThreeDModel[];
  className?: string;
}

export const ThreeDModels: React.FC<ThreeDModelsProps> = ({
  models,
  className = ''
}) => {
  return (
    <div className={`three-d-models h-96 w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)' }}
      >
        <Suspense fallback={null}>
          <ThreeDModelsInner models={models} />
          <Environment preset="studio" />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxDistance={10}
            minDistance={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
```

## Utility Functions

### Date Utilities

```typescript
// src/utils/dateUtils.ts

import { format, isToday, isTomorrow, isYesterday } from 'date-fns';

export const formatEventDate = (date: Date): string => {
  if (isToday(date)) {
    return `Today at ${format(date, 'p')}`;
  }
  if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, 'p')}`;
  }
  if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'p')}`;
  }
  
  return format(date, 'PPP p');
};

export const isUpcoming = (date: Date): boolean => {
  return date > new Date();
};

export const getDaysUntil = (date: Date): number => {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
```

### Image Utilities

```typescript
// src/utils/imageUtils.ts

export const getImageUrl = (path: string): string => {
  // Handle both relative and absolute paths
  if (path.startsWith('http')) {
    return path;
  }
  
  // Ensure path starts with /
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  return path;
};

export const getImageAlt = (path: string): string => {
  // Extract filename without extension
  const filename = path.split('/').pop()?.split('.')[0] || '';
  return filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};
```

### Validation Utilities

```typescript
// src/utils/validation.ts

import { EventData, TeamMember, Sponsor } from '../types';

export const validateEventData = (event: Partial<EventData>): string[] => {
  const errors: string[] = [];
  
  if (!event.title?.trim()) {
    errors.push('Event title is required');
  }
  
  if (!event.date) {
    errors.push('Event date is required');
  }
  
  if (!event.location?.trim()) {
    errors.push('Event location is required');
  }
  
  if (!event.description?.trim()) {
    errors.push('Event description is required');
  }
  
  return errors;
};

export const validateTeamMember = (member: Partial<TeamMember>): string[] => {
  const errors: string[] = [];
  
  if (!member.name?.trim()) {
    errors.push('Member name is required');
  }
  
  if (!member.position?.trim()) {
    errors.push('Member position is required');
  }
  
  if (!member.email?.trim()) {
    errors.push('Member email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
    errors.push('Invalid email format');
  }
  
  return errors;
};
```

## Error Handling

### Error Types

```typescript
// src/types/errors.ts

export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
  }
}
```

### Error Handling Utilities

```typescript
// src/utils/errorHandling.ts

import { AppError } from '../types/errors';

export const handleError = (error: unknown): AppError => {
  if (error instanceof Error) {
    return {
      code: error.name,
      message: error.message,
      details: error.stack
    };
  }
  
  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred',
    details: error
  };
};

export const logError = (error: AppError): void => {
  console.error('Application Error:', {
    code: error.code,
    message: error.message,
    details: error.details,
    timestamp: new Date().toISOString()
  });
};
```

### Error Boundaries

```typescript
// src/components/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-800 font-semibold">Something went wrong</h2>
          <p className="text-red-600 text-sm">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

This API documentation provides a comprehensive overview of the data structures, types, and interfaces used in the CEUS website. It serves as a reference for developers working on the project and ensures consistency across the codebase.
