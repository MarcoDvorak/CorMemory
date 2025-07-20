'use client';
import { useMemory } from '../contexts/MemoryContext';
import Image from 'next/image';
import Link from 'next/link';

const COLLECTIONS = [
  'Beautiful Views',
  'Restaurants',
  'Cafes',
] as const;

type CollectionName = typeof COLLECTIONS[number];

export default function CollectionsPage() {
  const { memories } = useMemory();

  // For each collection, find a cover image from one of its memories
  const collectionCards = COLLECTIONS.map((col) => {
    const memory = memories.find((m) => m.collection === col && m.coverPhoto?.url);
    return {
      name: col,
      coverUrl: memory?.coverPhoto?.url || '',
    };
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {collectionCards.map(({ name, coverUrl }) => (
          <Link
            key={name}
            href={`/collections/${encodeURIComponent(name)}`}
            className="bg-white rounded-xl shadow-sm flex flex-col items-center p-4 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-black"
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3 flex items-center justify-center">
              {coverUrl ? (
                <Image src={coverUrl} alt={name} width={300} height={300} className="object-cover w-full h-full" />
              ) : (
                <span className="text-gray-400 text-lg">No image</span>
              )}
            </div>
            <span className="text-lg font-medium text-gray-800 text-center">{name}</span>
          </Link>
        ))}
      </div>
    </main>
  );
} 