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
  const collections = ['All Memories', 'Beautiful Views', 'Restaurants', 'Cafes'];

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
        <div className="relative">
          <button
            type="button"
            className="ml-2 flex items-center px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors"
            aria-label="Select memory collection"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            {/* Folder icon (minimalist) */}
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h3.172a2 2 0 011.414.586l1.828 1.828A2 2 0 0012.828 8H19a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>
            <span className="text-gray-700 text-sm font-medium">{selectedCollection}</span>
            <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {collections.map((col) => (
                <li key={col}>
                  <button
                    type="button"
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg ${selectedCollection === col ? 'bg-gray-100 font-semibold' : ''}`}
                    onClick={() => { onCollectionChange(col); setDropdownOpen(false); }}
                  >
                    {col}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
} 