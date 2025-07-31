# CorMemory Documentation

CorMemory is a digital sanctuary for real-world memories, focusing on personal, lived experiences rather than digital content. The application provides a beautiful, minimalist interface for storing and organizing life's meaningful moments.

## Core Principles

### Purpose
- Focus exclusively on real-world memories and experiences
- Bridge between digital storage and real-world moments
- User-driven organization without AI/ML sorting
- Each memory represents a genuine moment experienced in the real world

### Design Philosophy
- Clean, minimalist aesthetic with white background and black/gray text
- Focus on the emotional weight of each memory
- Interface that gets out of the way of the content
- Every interaction should feel meaningful and intentional

## Technical Implementation

### Project Structure
```
CorMemory/
  ├── app/
  │   ├── components/
  │   │   ├── AddMemoryButton.tsx
  │   │   ├── AddMemoryModal.tsx
  │   │   ├── LoadingSpinner.tsx
  │   │   ├── MemoryCard.tsx
  │   │   ├── MemoryGrid.tsx
  │   │   ├── MemoryModal.tsx
  │   │   └── SearchBar.tsx
  │   ├── contexts/
  │   │   ├── MemoryContext.tsx
  │   │   └── sampleData.ts
  │   ├── types/
  │   │   └── memory.ts
  │   ├── globals.css
  │   ├── layout.tsx
  │   └── page.tsx
  ├── lib/
  │   ├── database.types.ts
  │   ├── memory-utils.ts
  │   ├── supabase.ts
  │   └── test-db-connection.ts
  ├── supabase/
  │   ├── migrations/
  │   │   └── 001_create_memories_table.sql
  │   └── seed.sql
  └── [configuration files]
```

### Key Components

#### MemoryGrid
- Implements masonry layout using CSS columns
- Responsive design with 1-4 columns based on screen size
- Handles both portrait (9:16) and landscape (16:9) images
- Uses CSS break-inside to prevent card splitting

#### MemoryCard
- Displays individual memory entries
- Supports two aspect ratios:
  - Portrait: 0.5625 (9:16)
  - Landscape: 1.7778 (16:9)
- Hover effects for location and tag information
- Optimized image loading with Next.js Image component

#### Memory Context
- Central state management for memories
- Provides async CRUD operations with Supabase
- Implements search and tag filtering
- Handles loading and error states
- Maintains memory data structure consistency
- Real-time database synchronization

### Data Structure

#### Memory Type
```typescript
interface Memory {
  id: string;
  coverPhoto: {
    url: string;
    aspectRatio: number; // 0.5625 for portrait, 1.7778 for landscape
  };
  additionalPhotos?: Photo[];
  note?: string;
  tags: string[];
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    placeId: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Technical Decisions

#### Framework & Libraries
- Next.js App Router structure
- React with TypeScript
- Tailwind CSS for styling
- Supabase for database and real-time features
- PostgreSQL database with Row Level Security

#### Design Patterns
- Functional React components with hooks
- Context-based state management
- Modular component architecture
- Semantic HTML structure

#### Image Handling
- Maintains original aspect ratios
- Two standardized formats:
  - Portrait (9:16 = 0.5625)
  - Landscape (16:9 = 1.7778)
- Optimized loading with Next.js Image
- Fallback to location display when no image

### Best Practices

#### Code Style
- 2-space indentation
- Single quotes
- Trailing commas where valid
- Prettier for formatting

#### Component Guidelines
- Keep components small and focused
- Use semantic HTML tags
- Avoid inline styles
- Implement proper TypeScript types

#### State Management
- Use local state for temporary data
- Context for shared state
- Callbacks for performance
- Proper type definitions

#### Security
- No hardcoded API keys
- Environment variables for secrets
- Secure image handling
- Type-safe operations

## User Interface

### Layout
- Masonry grid for memory display
- Responsive column count:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Large Desktop: 4 columns

### Interactions
- Click to view memory details
- Hover to show location and tags
- Search by text content
- Filter by tags
- Add new memories with modal

### Visual Design
- Clean, white background
- Black/gray text
- Subtle shadows
- Rounded corners
- Focus on content

## Future Considerations

### Planned Features
- Location-based memory browsing
- Advanced search capabilities
- Cross-device synchronization
- Sharing capabilities
- Offline support

### Performance Optimizations
- Image lazy loading
- Virtualized lists for large collections
- Optimized search indexing
- Efficient state updates

## Database Integration

### Supabase Setup
- PostgreSQL database with optimized schema
- Row Level Security (RLS) enabled
- Automatic timestamps with triggers
- Indexed columns for performance
- JSONB support for additional photos

### Database Schema
```sql
CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cover_photo_url TEXT NOT NULL,
  cover_photo_aspect_ratio DECIMAL(5,4) NOT NULL,
  additional_photos JSONB DEFAULT NULL,
  note TEXT DEFAULT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  location_name TEXT NOT NULL,
  location_lat DECIMAL(10,8) NOT NULL,
  location_lng DECIMAL(11,8) NOT NULL,
  location_place_id TEXT NOT NULL,
  collection TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

### Data Conversion
- Utility functions convert between database rows and Memory objects
- Type-safe operations with TypeScript
- Proper handling of optional fields and arrays
- Automatic timestamp management

## Development Guidelines

### Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase database (see SUPABASE_SETUP.md)
4. Configure environment variables
5. Run database migrations
6. Run development server: `npm run dev`

### Database Testing
- Use `lib/test-db-connection.ts` to verify setup
- Run in browser console: `testDatabaseConnection()`
- Comprehensive connection and functionality tests

### Code Contribution
- Follow existing code style
- Maintain type safety
- Write clear commit messages
- Test thoroughly before PR

### Testing
- Component testing with React Testing Library
- Type checking with TypeScript
- Visual regression testing
- Performance monitoring

## Maintenance

### Regular Tasks
- Update dependencies
- Monitor performance
- Back up data
- Review security

### Troubleshooting
- Check console errors
- Verify environment variables
- Confirm API endpoints
- Review recent changes 