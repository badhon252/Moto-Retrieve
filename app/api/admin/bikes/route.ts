import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { Bike } from '../../../types/bike'

const bikes: Bike[] = [
  {
    id: '1',
    make: 'Honda',
    model: 'CBR600RR',
    color: 'Red',
    lastKnownLocation: 'New York City',
    status: 'Found',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    make: 'Yamaha',
    model: 'YZF-R1',
    color: 'Blue',
    lastKnownLocation: 'Los Angeles',
    status: 'Not Found',
    lastUpdated: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json({ bikes })
}

export async function POST(request: Request) {
  const bike: Omit<Bike, 'id'> = await request.json()
  const newBike: Bike = { ...bike, id: uuidv4() }
  bikes.push(newBike)
  return NextResponse.json(newBike, { status: 201 })
}

