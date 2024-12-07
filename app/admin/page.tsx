'use client'

import { useState, useEffect } from 'react'
import { Bike } from '../types/bike'
import AdminBikeForm from '../components/AdminBikeForm'
import AdminBikeList from '../components/AdminBikeList'

export default function AdminPage() {
  const [bikes, setBikes] = useState<Bike[]>([])
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null)

  useEffect(() => {
    fetchBikes()
  }, [])

  const fetchBikes = async () => {
    const response = await fetch('/api/admin/bikes')
    const data = await response.json()
    setBikes(data.bikes)
  }

  const handleAddBike = async (bike: Omit<Bike, 'id'>) => {
    const response = await fetch('/api/admin/bikes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bike),
    })
    if (response.ok) {
      fetchBikes()
    }
  }

  const handleUpdateBike = async (bike: Bike) => {
    const response = await fetch(`/api/admin/bikes/${bike.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bike),
    })
    if (response.ok) {
      fetchBikes()
      setSelectedBike(null)
    }
  }

  const handleDeleteBike = async (id: string) => {
    const response = await fetch(`/api/admin/bikes/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      fetchBikes()
      if (selectedBike?.id === id) {
        setSelectedBike(null)
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add/Edit Bike</h2>
          <AdminBikeForm
            bike={selectedBike}
            onSubmit={selectedBike ? handleUpdateBike : handleAddBike}
            onCancel={() => setSelectedBike(null)}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Bike List</h2>
          <AdminBikeList
            bikes={bikes}
            onEdit={setSelectedBike}
            onDelete={handleDeleteBike}
          />
        </div>
      </div>
    </div>
  )
}

