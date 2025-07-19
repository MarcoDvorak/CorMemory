'use client'

import React, { useState } from 'react'
import { useMemory } from '../contexts/MemoryContext'
import MemoryCard from './MemoryCard'
import MemoryModal from './MemoryModal'
import type { Memory } from '../types/memory'

export default function MemoryGrid() {
  const { memories } = useMemory()
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 p-4 space-y-4 [&>*]:break-inside-avoid">
        {memories.map(memory => (
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