import { NextResponse } from 'next/server'

const mockSuggestions = [
  'ABC123456789',
  'XYZ987654321',
  'DEF456789012',
  'GHI789012345',
  'JKL012345678',
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
    }

    // Simulate database query
    await new Promise(resolve => setTimeout(resolve, 100))

    const suggestions = mockSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

