'use client'

import React, { useState } from 'react'
import { useMemory } from '../contexts/MemoryContext'
import MemoryCard from './MemoryCard'
import MemoryModal from './MemoryModal'
import type { Memory } from '../types/memory'

interface MemoryGridProps {
  selectedCollection: string;
}

export default function MemoryGrid({ selectedCollection }: MemoryGridProps) {
  const { memories } = useMemory()
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const filteredMemories = !selectedCollection
    ? memories
    : memories.filter(m =>
        m.collection &&
        decodeURIComponent(selectedCollection).toLowerCase() === m.collection.toLowerCase()
      )

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