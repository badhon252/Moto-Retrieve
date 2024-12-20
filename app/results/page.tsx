import { SearchResults } from '@/components/SearchResults'

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <SearchResults query={query} />
          </div>
        </div>
      </main>
    </div>
  )
}

