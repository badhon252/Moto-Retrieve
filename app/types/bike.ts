export interface Bike {
  id: string
  make: string
  model: string
  color: string
  lastKnownLocation: string
  status: 'Found' | 'Not Found'
  lastUpdated: string
}

