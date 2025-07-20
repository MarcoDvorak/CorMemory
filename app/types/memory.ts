/** Location information for a memory */
export interface Location {
  /** Display name of the location */
  name: string;
  /** Geographic coordinates */
  coordinates: {
    lat: number;
    lng: number;
  };
  /** Google Maps place ID for location details */
  placeId: string;
}

/** Photo information */
export interface Photo {
  /** URL of the photo (can be local or remote) */
  url: string;
  /** Aspect ratio (width/height) - 0.75 for portrait (3:4) or 1.3333 for landscape (4:3) */
  aspectRatio: number;
}

/** Memory entry containing all information about a saved memory */
export interface Memory {
  /** Unique identifier for the memory */
  id: string;
  /** Main photo displayed in the grid */
  coverPhoto: Photo;
  /** Optional additional photos shown in detail view */
  additionalPhotos?: Photo[];
  /** Optional text description of the memory */
  note?: string;
  /** User-defined tags for categorization */
  tags: string[];
  /** Location where the memory was created */
  location: Location;
  /** Optional collection this memory belongs to */
  collection?: 'Beautiful Views' | 'Restaurants' | 'Cafes';
  /** When the memory was first created */
  createdAt: Date;
  /** When the memory was last modified */
  updatedAt: Date;
} 