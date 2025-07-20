'use client'

import React from 'react'
import SearchBar from './components/SearchBar'
import MemoryGrid from './components/MemoryGrid'
import AddMemoryButton from './components/AddMemoryButton'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  const collections = ['Beautiful Views', 'Restaurants', 'Cafes'];
  return (
    <main className="min-h-screen bg-white">
      <SearchBar selectedCollection={''} onCollectionChange={() => {}} />
      <div className="max-w-4xl mx-auto flex gap-2 px-4 mt-2 mb-4">
        {collections.map((col) => (
          <button
            key={col}
            type="button"
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-black bg-white text-gray-700 border-gray-200 hover:bg-gray-100`}
            onClick={() => router.push(`/collections/${encodeURIComponent(col)}`)}
          >
            {col}
          </button>
        ))}
      </div>
      <MemoryGrid selectedCollection={''} />
      <AddMemoryButton />
    </main>
  )
} 