import { Bike } from '../types/bike'
import { MapPin, Calendar, Hash } from 'lucide-react'

export default function BikeDetails({ bike }: { bike: Bike }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{bike.make} {bike.model}</h3>
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
          bike.status === 'Found' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {bike.status}
        </span>
      </div>
      <div className="space-y-2">
        <div className="text-gray-600 flex items-center">
          <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
            <Hash size={14} />
          </span>
          ID: {bike.id}
        </div>
        <div className="text-gray-600 flex items-center">
          <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
            <span className="w-3 h-3 rounded-full" style={{backgroundColor: bike.color.toLowerCase()}}></span>
          </span>
          Color: {bike.color}
        </div>
        <div className="text-gray-600 flex items-center">
          <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
            <MapPin size={14} />
          </span>
          Last Known Location: {bike.lastKnownLocation}
        </div>
        <div className="text-gray-600 flex items-center">
          <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
            <Calendar size={14} />
          </span>
          Last Updated: {new Date(bike.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

