'use client'

import { useState, useEffect } from 'react'
import BikeDetails from './BikeDetails'
import { Bike } from '@/app/types/bike'
import { Search, AlertCircle } from 'lucide-react'

export function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<Bike[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (!response.ok) {
          throw new Error('Failed to fetch results')
        }
        const data = await response.json()
        setResults(data.results)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('An error occurred while fetching results. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 bg-red-100 rounded-lg flex items-center justify-center" aria-live="assertive">
        <AlertCircle className="mr-2" />
        {error}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center p-4 bg-yellow-100 rounded-lg flex items-center justify-center" aria-live="polite">
        <Search className="mr-2" />
        No results found for &quot;{query}&quot;
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Results for &quot;{query}&quot;</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((bike) => (
          <BikeDetails key={bike.id} bike={bike} />
        ))}
      </div>
    </div>
  )
}

