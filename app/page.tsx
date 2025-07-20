'use client'

import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import MemoryGrid from './components/MemoryGrid'
import AddMemoryButton from './components/AddMemoryButton'

export default function Home() {
  const [selectedCollection, setSelectedCollection] = useState('All Memories');
  return (
    <main className="min-h-screen bg-white">
      <SearchBar selectedCollection={selectedCollection} onCollectionChange={setSelectedCollection} />
      <MemoryGrid selectedCollection={selectedCollection} />
      <AddMemoryButton />
    </main>
  )
} 