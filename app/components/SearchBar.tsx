'use client';

import React, { useState } from 'react';
import { useMemory } from '../contexts/MemoryContext';
import DOMPurify from 'dompurify';

interface SearchBarProps {
  selectedCollection: string;
  onCollectionChange: (collection: string) => void;
}

export default function SearchBar({ selectedCollection, onCollectionChange }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { searchMemories } = useMemory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const collections = ['Beautiful Views', 'Restaurants', 'Cafes'];

  const handleSearch = (value: string) => {
    setQuery(DOMPurify.sanitize(value));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm px-4 py-3 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <label htmlFor="memory-search" className="sr-only">Search your memories</label>
        <input
          id="memory-search"
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search your memories..."
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
          aria-label="Search your memories"
        />
      </div>
    </header>
  );
} 