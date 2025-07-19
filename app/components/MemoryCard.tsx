'use client'

import React from 'react'
import Image from 'next/image'
import type { Memory } from '@/app/types/memory'

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
}

// SSR-safe escape utility
function escapeHtml(text: string): string {
  return text.replace(/[&<>'"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[c] || c));
}

export default function MemoryCard({ memory, onClick }: MemoryCardProps) {
  const { coverPhoto, location } = memory

  return (
    <div 
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
      style={{ aspectRatio: coverPhoto.aspectRatio }}
      role="button"
      tabIndex={0}
      aria-label={`Open memory for ${escapeHtml(location.name)}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      {coverPhoto.url ? (
        <Image
          src={coverPhoto.url}
          alt={`Memory cover photo for ${escapeHtml(location.name)}`}
          fill
          className="object-cover transition-transform group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
          <span>{escapeHtml(location.name)}</span>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-medium">{escapeHtml(location.name)}</h3>
        </div>
      </div>
    </div>
  )
} 