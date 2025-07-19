'use client'

import React, { useState, useRef } from 'react'
import { XMarkIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Memory, Photo, Location } from '@/app/types/memory'
import { useMemory } from '@/app/contexts/MemoryContext'
import DOMPurify from 'dompurify';

// Utility: escape text for rendering
function escapeText(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Utility: validate Google Maps link
function isValidGoogleMapsLink(link: string): boolean {
  return /^https:\/\/(www\.)?google\.[a-z.]+\/maps\//.test(link);
}

// Utility: validate image file
function isValidImageFile(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  return allowedTypes.includes(file.type) && file.size <= 5 * 1024 * 1024;
}

interface AddMemoryModalProps {
  onClose: () => void;
}

export default function AddMemoryModal({ onClose }: AddMemoryModalProps) {
  const { addMemory } = useMemory()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [coverPhoto, setCoverPhoto] = useState<Photo | null>(null)
  const [additionalPhotos, setAdditionalPhotos] = useState<Photo[]>([])
  const [note, setNote] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [location, setLocation] = useState<Location | null>(null)
  const [currentTag, setCurrentTag] = useState('')
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean) => {
    setError(null);
    const files = e.target.files;
    if (!files?.length) return;
    const file = files[0];
    if (!isValidImageFile(file)) {
      setError('Only .jpeg, .jpg, .png files under 5MB are allowed.');
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.src = url;
    await new Promise<void>(resolve => { img.onload = () => resolve(); });
    const aspectRatio = img.width / img.height;
    const photo: Photo = { url, aspectRatio };
    if (isCover) {
      setCoverPhoto(photo);
    } else {
      setAdditionalPhotos(prev => [...prev, photo]);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      const cleanTag = DOMPurify.sanitize(currentTag.trim());
      if (!tags.includes(cleanTag)) {
        setTags(prev => [...prev, cleanTag]);
      }
      setCurrentTag('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    if (!coverPhoto || !location) {
      setError('Cover photo and location are required.');
      setSubmitting(false);
      return;
    }
    // Sanitize note
    const cleanNote = DOMPurify.sanitize(note.trim());
    const newMemory: Memory = {
      id: Date.now().toString(),
      coverPhoto,
      additionalPhotos,
      note: cleanNote || undefined,
      tags,
      location,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addMemory(newMemory);
    setSubmitting(false);
    onClose();
  };

  // Fallback for geolocation
  const handleLocationSelect = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          name: 'Current Location',
          coordinates: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          placeId: 'gps',
        });
      },
      () => setError('Unable to retrieve your location.'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Focus trap and ESC to close
  const modalRef = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" aria-modal="true" role="dialog">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 p-6" autoComplete="off">
          {/* Error feedback */}
          {error && <div className="col-span-2 text-red-600 mb-2" role="alert">{error}</div>}
          {/* Left Column */}
          <div className="space-y-6">
          {/* Cover Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Photo
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative h-64 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer transition-colors"
            >
              {coverPhoto ? (
                <Image
                  src={coverPhoto.url}
                  alt="Cover"
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Click to upload cover photo</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={e => handleFileChange(e, true)}
                className="hidden"
              />
            </div>
          </div>

          {/* Additional Photos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Photos (up to 3)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (additionalPhotos.length <= index) {
                      fileInputRef.current?.click()
                    }
                  }}
                  className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer transition-colors"
                >
                  {additionalPhotos[index] ? (
                    <Image
                      src={additionalPhotos[index].url}
                      alt={`Additional ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">+</span>
                    </div>
                  )}
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note
            </label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
              rows={3}
              placeholder="Add a note about this memory..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={currentTag}
              onChange={e => setCurrentTag(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Add tags (press Enter to add)"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setTags(prev => prev.filter(t => t !== tag))}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <button
              type="button"
              onClick={handleLocationSelect}
              className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
            >
              {location ? (
                <span className="text-gray-700">{location.name}</span>
              ) : (
                <span className="text-gray-500">Click to select location</span>
              )}
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!coverPhoto || !location || submitting}
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Memory
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 