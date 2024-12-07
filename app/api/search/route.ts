import { NextResponse } from 'next/server'
import { Bike } from '../../types/bike'

const mockDatabase: Bike[] = [
  {
    id: 'MH43DE6789',
    make: 'Honda',
    model: 'CBR600RR',
    color: 'Red',
    lastKnownLocation: 'New York City',
    status: 'Found',
    lastUpdated: '2023-05-15T10:30:00Z',
  },
  {
    id: 'WMWZC5C50FWM47293',
    make: 'Yamaha',
    model: 'YZF-R1',
    color: 'Blue',
    lastKnownLocation: 'Los Angeles',
    status: 'Not Found',
    lastUpdated: '2023-05-14T14:45:00Z',
  },
  {
    id: 'KTM690SM5678',
    make: 'KTM',
    model: '690 Supermoto',
    color: 'Orange',
    lastKnownLocation: 'Chicago',
    status: 'Found',
    lastUpdated: '2023-05-13T09:15:00Z',
  },
  {
    id: 'HD96385VRSCDX',
    make: 'Harley-Davidson',
    model: 'V-Rod',
    color: 'Black',
    lastKnownLocation: 'Miami',
    status: 'Not Found',
    lastUpdated: '2023-05-12T16:20:00Z',
  },
  {
    id: 'JH2PC35071M200203',
    make: 'Honda',
    model: 'VFR800',
    color: 'Silver',
    lastKnownLocation: 'Seattle',
    status: 'Found',
    lastUpdated: '2023-05-11T11:00:00Z',
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  // Simulate database query
  await new Promise(resolve => setTimeout(resolve, 500))

  const results = mockDatabase.filter(bike => 
    bike.id.toLowerCase().includes(query.toLowerCase()) || 
    bike.make.toLowerCase().includes(query.toLowerCase()) || 
    bike.model.toLowerCase().includes(query.toLowerCase())
  )

  return NextResponse.json({ results })
}

