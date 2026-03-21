# Project Rating System - Usage Guide

## Overview

The rating system allows users to rate projects from 1-5 stars. Each user can rate a project once, with the ability to update their rating later.

## Components

### StarRating Component

Interactive star rating component with hover effects and click-to-rate functionality.

```tsx
import { StarRating } from '@/components/projects';

function ProjectCard({ project, userRating }) {
  return (
    <div>
      <h3>{project.title}</h3>
      <StarRating
        projectId={project.id}
        currentRating={userRating}
        onRated={(newRating) => console.log('Rated:', newRating)}
        size="md"
      />
    </div>
  );
}
```

**Props:**
- `projectId` (string, required): The ID of the project to rate
- `currentRating` (number, optional): The user's current rating (0-5)
- `onRated` (function, optional): Callback when rating is submitted
- `disabled` (boolean, default: false): Disable interaction
- `size` ('sm' | 'md' | 'lg', default: 'md'): Size of stars
- `readonly` (boolean, default: false): Display-only mode

### RatingDisplay Component

Display component showing average rating with stars and count.

```tsx
import { RatingDisplay } from '@/components/projects';

function ProjectHeader({ project }) {
  const average = project.rating_count > 0
    ? project.rating_sum / project.rating_count
    : 0;

  return (
    <RatingDisplay
      average={average}
      count={project.rating_count}
      size="md"
      showCount={true}
    />
  );
}
```

**Props:**
- `average` (number, required): The average rating (0-5)
- `count` (number, required): Total number of ratings
- `size` ('sm' | 'md' | 'lg', default: 'md'): Size of stars
- `showCount` (boolean, default: true): Show rating count
- `variant` ('default' | 'compact', default: 'default'): Display style

### RatingMini Component

Compact rating display for cards and lists.

```tsx
import { RatingMini } from '@/components/projects';

function ProjectListItem({ project }) {
  const average = project.rating_count > 0
    ? project.rating_sum / project.rating_count
    : 0;

  return (
    <div className="flex justify-between">
      <span>{project.title}</span>
      <RatingMini average={average} count={project.rating_count} />
    </div>
  );
}
```

## Server Actions

### rateProject

Submit or update a rating for a project.

```ts
import { rateProject } from '@/lib/ratings';

const result = await rateProject(projectId, 4);

if (result.success) {
  console.log('New average:', result.data.average);
  console.log('Total ratings:', result.data.count);
}
```

### getProjectRating

Get the average rating and count for a project.

```ts
import { getProjectRating } from '@/lib/ratings';

const rating = await getProjectRating(projectId);

if (rating) {
  console.log('Average:', rating.average);
  console.log('Count:', rating.count);
}
```

### getCurrentUserRating

Get the current user's rating for a project.

```ts
import { getCurrentUserRating } from '@/lib/ratings';

const result = await getCurrentUserRating(projectId);

if (result.success) {
  console.log('User rated:', result.data);
}
```

## API Endpoints

### POST /api/ratings

Submit or update a rating.

```json
{
  "projectId": "uuid-here",
  "rating": 4
}
```

Response:
```json
{
  "success": true,
  "data": {
    "average": 4.5,
    "count": 23,
    "userRating": 4
  }
}
```

### GET /api/ratings?projectId=xxx

Get ratings for a project.

Response:
```json
{
  "average": 4.5,
  "count": 23
}
```

### DELETE /api/ratings?projectId=xxx

Remove the current user's rating for a project.

## Database Schema

The rating system uses two tables:

### `projects` table
- `rating_count`: Number of ratings
- `rating_sum`: Sum of all ratings (for calculating average)

### `project_ratings` table
- `user_id`: The user who rated
- `project_id`: The project being rated
- `rating`: The rating value (1-5)
- Primary key: (user_id, project_id) - ensures one rating per user per project

## Styling

All components use the cyberpunk theme with:
- Yellow/gold colors for filled stars (`text-yellow-400`)
- Gradient backgrounds for rating displays
- Glow effects (`drop-shadow`)
- Smooth transitions and hover effects
- Pulse animation on successful rating
