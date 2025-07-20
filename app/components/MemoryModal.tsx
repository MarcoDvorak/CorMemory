'use client';

import React from 'react';
import Image from 'next/image';
import { Memory } from '../types/memory';
import DOMPurify from 'dompurify';
import { useMemory } from '../contexts/MemoryContext';

interface MemoryModalProps {
  memory: Memory;
  onClose: () => void;
}

// SSR-safe escape utility
function escapeHtml(text: string): string {
  return text.replace(/[&<>'"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[c] || c));
}

export default function MemoryModal({ memory, onClose }: MemoryModalProps) {
  const { coverPhoto, additionalPhotos, note, location, tags, collection, id } = memory;
  const { updateMemory } = useMemory();
  const [selectedCollection, setSelectedCollection] = React.useState<'Beautiful Views' | 'Restaurants' | 'Cafes' | undefined>(collection);
  const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCollection = e.target.value as 'Beautiful Views' | 'Restaurants' | 'Cafes';
    setSelectedCollection(e.target.value === '' ? undefined : newCollection);
    updateMemory(id, { ...memory, collection: e.target.value === '' ? undefined : newCollection, updatedAt: new Date() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" aria-modal="true" role="dialog">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
          aria-label="Close memory details"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photos section */}
          <div className="space-y-4 p-6">
            <div 
              className="relative rounded-lg overflow-hidden"
              style={{ aspectRatio: coverPhoto.aspectRatio.toString() }}
            >
              <Image
                src={coverPhoto.url}
                alt={`Memory cover photo for ${escapeHtml(location.name)}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {additionalPhotos && additionalPhotos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {additionalPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden"
                    style={{ aspectRatio: photo.aspectRatio.toString() }}
                  >
                    <Image
                      src={photo.url}
                      alt={`Additional memory photo ${index + 1} for ${escapeHtml(location.name)}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 16vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details section */}
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-medium mb-2">{escapeHtml(location.name)}</h2>
              {note && <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note) }} />}
            </div>

            {tags.length > 0 && (
              <section aria-label="Memory tags">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                    >
                      {escapeHtml(tag)}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section aria-label="Memory location">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Location</h3>
              <div className="relative rounded-lg overflow-hidden" style={{ height: '200px' }}>
                {/* TODO: Add Google Maps component */}
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
                  Map preview coming soon
                </div>
              </div>
            </section>

            {/* Collection select */}
            <section aria-label="Memory collection">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Add to a collection</h3>
              <select
                value={selectedCollection || ''}
                onChange={handleCollectionChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="">No collection</option>
                <option value="Beautiful Views">Beautiful Views</option>
                <option value="Restaurants">Restaurants</option>
                <option value="Cafes">Cafes</option>
              </select>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 