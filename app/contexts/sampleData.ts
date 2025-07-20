import type { Memory } from '@/app/types/memory'

export const sampleMemories: Memory[] = [
  {
    id: '1',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
      aspectRatio: 0.75 // portrait (3:4)
    },
    note: 'Beautiful sunset in Italy',
    tags: ['travel', 'sunset', 'italy'],
    location: {
      name: 'Florence, Italy',
      coordinates: { lat: 43.7696, lng: 11.2558 },
      placeId: 'florence1'
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    collection: 'Beautiful Views',
  },
  {
    id: '2',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      aspectRatio: 1.3333 // landscape (4:3)
    },
    note: 'Starry night in the Swiss Alps',
    tags: ['nature', 'mountains', 'night'],
    location: {
      name: 'Zermatt, Switzerland',
      coordinates: { lat: 46.0207, lng: 7.7491 },
      placeId: 'zermatt1'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    collection: 'Beautiful Views',
  },
  {
    id: '3',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde',
      aspectRatio: 0.75 // portrait (3:4)
    },
    note: 'Cozy coffee shop morning',
    tags: ['coffee', 'cafe', 'morning'],
    location: {
      name: 'Coffee Lab, Amsterdam',
      coordinates: { lat: 52.3676, lng: 4.9041 },
      placeId: 'coffeelab1'
    },
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    collection: 'Cafes',
  },
  {
    id: '4',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      aspectRatio: 1.3333 // landscape (4:3)
    },
    note: 'Yosemite Valley at dawn',
    tags: ['nature', 'hiking', 'mountains'],
    location: {
      name: 'Yosemite National Park',
      coordinates: { lat: 37.8651, lng: -119.5383 },
      placeId: 'yosemite1'
    },
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    collection: 'Beautiful Views',
  },
  {
    id: '5',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
      aspectRatio: 0.75 // portrait (3:4)
    },
    note: 'First time making homemade pasta',
    tags: ['cooking', 'food', 'italian'],
    location: {
      name: 'Home Kitchen',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      placeId: 'home1'
    },
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    collection: 'Restaurants',
  },
  {
    id: '6',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1520443240718-fce21901db79',
      aspectRatio: 1.3333 // landscape (4:3)
    },
    note: 'Sunset yoga on the beach',
    tags: ['yoga', 'beach', 'wellness'],
    location: {
      name: 'Tulum Beach',
      coordinates: { lat: 20.2114, lng: -87.4654 },
      placeId: 'tulum1'
    },
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    collection: 'Beautiful Views',
  },
  {
    id: '7',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8',
      aspectRatio: 0.75 // portrait (3:4)
    },
    note: 'Night lights in Tokyo',
    tags: ['travel', 'city', 'night'],
    location: {
      name: 'Shibuya Crossing',
      coordinates: { lat: 35.6595, lng: 139.7004 },
      placeId: 'shibuya1'
    },
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-02-25'),
    collection: 'Beautiful Views',
  },
  {
    id: '8',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
      aspectRatio: 1.3333 // landscape (4:3)
    },
    note: 'First attempt at sushi making',
    tags: ['cooking', 'food', 'japanese'],
    location: {
      name: 'Cooking Class, Kyoto',
      coordinates: { lat: 35.0116, lng: 135.7681 },
      placeId: 'kyoto1'
    },
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    collection: 'Restaurants',
  },
  {
    id: '9',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      aspectRatio: 0.75 // portrait (3:4)
    },
    note: 'Morning fog in the mountains',
    tags: ['nature', 'morning', 'fog'],
    location: {
      name: 'Blue Mountains',
      coordinates: { lat: -33.7688, lng: 150.3715 },
      placeId: 'bluemountains1'
    },
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
    collection: 'Beautiful Views',
  },
  {
    id: '10',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1447279506476-3faec8071eee',
      aspectRatio: 1.3333 // landscape (4:3)
    },
    note: 'Vintage bookstore discovery',
    tags: ['books', 'vintage', 'exploring'],
    location: {
      name: 'Shakespeare and Company',
      coordinates: { lat: 48.8525, lng: 2.3498 },
      placeId: 'shakespeare1'
    },
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    collection: 'Cafes',
  },
  {
    id: '11',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a',
      aspectRatio: 0.75 // portrait (3:4)
    },
    note: 'Street art wandering',
    tags: ['art', 'urban', 'exploring'],
    location: {
      name: 'Shoreditch, London',
      coordinates: { lat: 51.5229, lng: -0.0777 },
      placeId: 'shoreditch1'
    },
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
    collection: 'Cafes',
  },
  {
    id: '12',
    coverPhoto: {
      url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
      aspectRatio: 1.3333 // landscape (4:3)
    },
    note: 'Autumn hike in the forest',
    tags: ['hiking', 'autumn', 'nature'],
    location: {
      name: 'Black Forest',
      coordinates: { lat: 48.2682, lng: 8.1873 },
      placeId: 'blackforest1'
    },
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
    collection: 'Beautiful Views',
  },
] 