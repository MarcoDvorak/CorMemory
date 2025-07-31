'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { Memory } from '@/app/types/memory'
import { supabase } from '@/lib/supabase'
import { dbRowToMemory, memoryToDbInsert, memoryToDbUpdate } from '@/lib/memory-utils'

interface MemoryContextType {
  memories: Memory[];
  loading: boolean;
  error: string | null;
  addMemory: (memory: Memory) => Promise<void>;
  updateMemory: (id: string, memory: Memory) => Promise<void>;
  deleteMemory: (id: string) => Promise<void>;
  searchMemories: (query: string) => Memory[];
  filterByTags: (tags: string[]) => Memory[];
  refreshMemories: () => Promise<void>;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined)

export function MemoryProvider({ children }: { children: React.ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch memories from Supabase
  const fetchMemories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      const memoriesData = data?.map(dbRowToMemory) || []
      setMemories(memoriesData)
    } catch (err) {
      console.error('Error fetching memories:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch memories')
    } finally {
      setLoading(false)
    }
  }, [])

  // Load memories on mount
  useEffect(() => {
    fetchMemories()
  }, [fetchMemories])

  const addMemory = useCallback(async (memory: Memory) => {
    try {
      setError(null)
      const dbMemory = memoryToDbInsert(memory)
      
      const { data, error } = await supabase
        .from('memories')
        .insert([dbMemory])
        .select()
        .single()

      if (error) {
        throw error
      }

      if (data) {
        const newMemory = dbRowToMemory(data)
        setMemories(prev => [newMemory, ...prev])
      }
    } catch (err) {
      console.error('Error adding memory:', err)
      setError(err instanceof Error ? err.message : 'Failed to add memory')
      throw err
    }
  }, [])

  const updateMemory = useCallback(async (id: string, updatedMemory: Memory) => {
    try {
      setError(null)
      const dbUpdate = memoryToDbUpdate(updatedMemory)
      
      const { data, error } = await supabase
        .from('memories')
        .update(dbUpdate)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw error
      }

      if (data) {
        const memory = dbRowToMemory(data)
        setMemories(prev => prev.map(m => m.id === id ? memory : m))
      }
    } catch (err) {
      console.error('Error updating memory:', err)
      setError(err instanceof Error ? err.message : 'Failed to update memory')
      throw err
    }
  }, [])

  const deleteMemory = useCallback(async (id: string) => {
    try {
      setError(null)
      
      const { error } = await supabase
        .from('memories')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

      setMemories(prev => prev.filter(memory => memory.id !== id))
    } catch (err) {
      console.error('Error deleting memory:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete memory')
      throw err
    }
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

  const refreshMemories = useCallback(async () => {
    await fetchMemories()
  }, [fetchMemories])

  return (
    <MemoryContext.Provider value={{
      memories,
      loading,
      error,
      addMemory,
      updateMemory,
      deleteMemory,
      searchMemories,
      filterByTags,
      refreshMemories,
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