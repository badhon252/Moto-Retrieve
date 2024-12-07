import { NextResponse } from 'next/server'
import { Bike } from '../../../../types/bike'

// This is a mock database. In a real application, you would use a proper database.
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedBike: Bike = await request.json()
  const index = bikes.findIndex(bike => bike.id === params.id)
  
  if (index === -1) {
    return NextResponse.json({ error: 'Bike not found' }, { status: 404 })
  }

  bikes[index] = { ...updatedBike, id: params.id }
  return NextResponse.json(bikes[index])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = bikes.findIndex(bike => bike.id === params.id)
  
  if (index === -1) {
    return NextResponse.json({ error: 'Bike not found' }, { status: 404 })
  }

  bikes.splice(index, 1)
  return NextResponse.json({ message: 'Bike deleted successfully' })
}

