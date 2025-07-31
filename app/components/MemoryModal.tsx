'use client';

import React, { useState } from 'react';
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
  return text.replace(/[&<>'"]/g, (c) => {
    switch (c) {
      case '&': return '&';
      case '<': return '<';
      case '>': return '>';
      case '\'': return ''';
      case '"': return '"';
      default: return c;
    }
  });
}

export default function MemoryModal({ memory, onClose }: MemoryModalProps) {
  const { updateMemory } = useMemory();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMemory, setEditedMemory] = useState<Memory>(memory);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedMemory(memory);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMemory(memory);
    setError(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      await updateMemory(memory.id, {
        ...editedMemory,
        updatedAt: new Date()
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating memory:', err);
      setError('Failed to save memory. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedMemory({
      ...editedMemory,
      note: e.target.value
    });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tag = e.target.value;
    const tags = tag.split(',').map(t => t.trim()).filter(t => t);
    setEditedMemory({
      ...editedMemory,
      tags
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMemory({
      ...editedMemory,
      location: {
        ...editedMemory.location,
        name: e.target.value
      }
    });
  };

  const { coverPhoto, additionalPhotos, note, location, tags, collection, id } = editedMemory;
  const selectedCollection = collection;
  const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCollection = e.target.value as 'Beautiful Views' | 'Restaurants' | 'Cafes' | '';
    setEditedMemory({
      ...editedMemory,
      collection: e.target.value === '' ? undefined : (newCollection as any)
    });
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
            {isEditing ? (
              // Edit mode
              <div className="space-y-6">
                {error && (
                  <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Name
                  </label>
                  <input
                    type="text"
                    value={editedMemory.location.name}
                    onChange={handleLocationChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note
                  </label>
                  <textarea
                    value={editedMemory.note || ''}
                    onChange={handleNoteChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editedMemory.tags.join(', ')}
                    onChange={handleTagChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Add tags (comma separated)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add to a collection
                  </label>
                  <select
                    value={editedMemory.collection || ''}
                    onChange={handleCollectionChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="">No collection</option>
                    <option value="Beautiful Views">Beautiful Views</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Cafes">Cafes</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors disabled:opacity-50"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-medium mb-2">{escapeHtml(location.name)}</h2>
                    <button
                      onClick={handleEdit}
                      className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm"
                    >
                      Edit
                    </button>
                  </div>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}