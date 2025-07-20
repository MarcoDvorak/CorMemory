'use client';
import { useParams } from 'next/navigation';
import MemoryGrid from '../../components/MemoryGrid';

export default function CollectionDetailPage() {
  const { collection } = useParams<{ collection: string }>();
  // Pass the collection name as selectedCollection to MemoryGrid
  return (
    <main className="min-h-screen bg-white">
      <MemoryGrid selectedCollection={collection} />
    </main>
  );
} 