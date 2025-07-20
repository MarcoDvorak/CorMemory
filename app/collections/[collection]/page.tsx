'use client';
import { useParams } from 'next/navigation';
import MemoryGrid from '../../components/MemoryGrid';

export default function CollectionDetailPage() {
  const { collection } = useParams<{ collection: string }>();
  // Pass the collection name as selectedCollection to MemoryGrid
  return (
    <main className="min-h-screen bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900 capitalize">{decodeURIComponent(collection)}</h1>
      <MemoryGrid selectedCollection={collection} />
    </main>
  );
} 