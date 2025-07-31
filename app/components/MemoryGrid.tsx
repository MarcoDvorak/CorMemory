'use client'

import React, { useState } from 'react'
import { useMemory } from '../contexts/MemoryContext'
import MemoryCard from './MemoryCard'
import MemoryModal from './MemoryModal'
import LoadingSpinner from './LoadingSpinner'
import type { Memory } from '../types/memory'

interface MemoryGridProps {
  selectedCollection: string;
}

export default function MemoryGrid({ selectedCollection }: MemoryGridProps) {
  const { memories, loading, error } = useMemory()
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  
  const filteredMemories = !selectedCollection
    ? memories
    : memories.filter(m =>
        m.collection &&
        decodeURIComponent(selectedCollection).toLowerCase() === m.collection.toLowerCase()
      )

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64 p-8">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading memories...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64 p-8">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load memories</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Empty state
  if (filteredMemories.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-64 p-8">
        <div className="text-center max-w-md">
          <div className="text-gray-400 text-6xl mb-4">📸</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {selectedCollection ? 'No memories in this collection' : 'No memories yet'}
          </h3>
          <p className="text-gray-600">
            {selectedCollection
              ? 'Try selecting a different collection or add some memories to this one.'
              : 'Start creating your digital sanctuary by adding your first memory.'
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 p-4 space-y-4 [&>*]:break-inside-avoid">
        {filteredMemories.map(memory => (
          <div key={memory.id} className="mb-4">
            <MemoryCard
              memory={memory}
              onClick={() => setSelectedMemory(memory)}
            />
          </div>
        ))}
      </div>

      {selectedMemory && (
        <MemoryModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      )}
    </>
  )
}