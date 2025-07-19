'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { Memory } from '@/app/types/memory'
import { sampleMemories } from './sampleData'

interface MemoryContextType {
  memories: Memory[];
  addMemory: (memory: Memory) => void;
  updateMemory: (id: string, memory: Memory) => void;
  deleteMemory: (id: string) => void;
  searchMemories: (query: string) => Memory[];
  filterByTags: (tags: string[]) => Memory[];
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined)

export function MemoryProvider({ children }: { children: React.ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>(sampleMemories)

  const addMemory = useCallback((memory: Memory) => {
    setMemories(prev => [...prev, memory])
  }, [])

  const updateMemory = useCallback((id: string, updatedMemory: Memory) => {
    setMemories(prev => prev.map(memory => 
      memory.id === id ? updatedMemory : memory
    ))
  }, [])

  const deleteMemory = useCallback((id: string) => {
    setMemories(prev => prev.filter(memory => memory.id !== id))
  }, [])

  const searchMemories = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return memories.filter(memory => 
      memory.note?.toLowerCase().includes(lowercaseQuery) ||
      memory.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      memory.location.name.toLowerCase().includes(lowercaseQuery)
    )
  }, [memories])

  const filterByTags = useCallback((tags: string[]) => {
    return memories.filter(memory =>
      tags.every(tag => memory.tags.includes(tag))
    )
  }, [memories])

  return (
    <MemoryContext.Provider value={{
      memories,
      addMemory,
      updateMemory,
      deleteMemory,
      searchMemories,
      filterByTags,
    }}>
      {children}
    </MemoryContext.Provider>
  )
}

export function useMemory() {
  const context = useContext(MemoryContext)
  if (context === undefined) {
    throw new Error('useMemory must be used within a MemoryProvider')
  }
  return context
} 