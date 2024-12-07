'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'

export default function SearchForm() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const router = useRouter()

  const [debouncedQuery] = useDebounce(query, 300)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length < 3) {
        setSuggestions([])
        return
      }

      try {
        const response = await fetch(`/api/suggestions?q=${encodeURIComponent(debouncedQuery)}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setSuggestions(data.suggestions || [])
        setError('')
      } catch (err) {
        console.error('Error fetching suggestions:', err)
        setSuggestions([])
        setError('Failed to fetch suggestions. Please check your connection.')
      }
    }

    fetchSuggestions()
  }, [debouncedQuery])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!query.trim()) {
      setError('Please enter an engine or chassis number')
      setIsLoading(false)
      return
    }

    router.push(`/results?q=${encodeURIComponent(query)}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      setQuery(suggestions[highlightedIndex])
      setSuggestions([])
    }
  }

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion)
    setSuggestions([])
  }, [])

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md relative" aria-label="Search form">
      <div className="flex items-center border-b border-blue-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Enter engine or chassis number"
          aria-label="Search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`flex-shrink-0 bg-blue-600 hover:bg-blue-800 border-blue-600 hover:border-blue-800 text-sm border-4 text-white py-1 px-2 rounded ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={isLoading}
          aria-label={isLoading ? 'Searching' : 'Search'}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
      {suggestions.length > 0 && (
        <ul
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                index === highlightedIndex ? 'bg-gray-200' : ''
              }`}
              role="option"
              aria-selected={index === highlightedIndex}
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
