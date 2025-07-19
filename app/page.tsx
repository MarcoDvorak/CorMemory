'use client'

import React from 'react'
import SearchBar from './components/SearchBar'
import MemoryGrid from './components/MemoryGrid'
import AddMemoryButton from './components/AddMemoryButton'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SearchBar />
      <MemoryGrid />
      <AddMemoryButton />
    </main>
  )
} 