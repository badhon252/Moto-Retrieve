import { useState, useEffect } from 'react'
import { Bike } from '@/app/types/bike'

interface AdminBikeFormProps {
  bike?: Bike | null
  onSubmit: (bike: Bike | Omit<Bike, 'id'>) => void
  onCancel: () => void
}

export default function AdminBikeForm({ bike, onSubmit, onCancel }: AdminBikeFormProps) {
  const [formData, setFormData] = useState<Omit<Bike, 'id'>>({
    make: '',
    model: '',
    color: '',
    lastKnownLocation: '',
    status: 'Not Found',
    lastUpdated: new Date().toISOString(),
  })

  useEffect(() => {
    if (bike) {
      setFormData(bike)
    }
  }, [bike])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(bike ? { ...formData, id: bike.id } : formData)
    setFormData({
      make: '',
      model: '',
      color: '',
      lastKnownLocation: '',
      status: 'Not Found',
      lastUpdated: new Date().toISOString(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
        <input
          type="text"
          id="make"
          name="make"
          value={formData.make}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
        <input
          type="text"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="lastKnownLocation" className="block text-sm font-medium text-gray-700">Last Known Location</label>
        <input
          type="text"
          id="lastKnownLocation"
          name="lastKnownLocation"
          value={formData.lastKnownLocation}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="Found">Found</option>
          <option value="Not Found">Not Found</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {bike ? 'Update' : 'Add'} Bike
        </button>
      </div>
    </form>
  )
}

