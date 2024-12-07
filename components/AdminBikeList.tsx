import { Bike } from '@/app/types/bike'

interface AdminBikeListProps {
  bikes: Bike[]
  onEdit: (bike: Bike) => void
  onDelete: (id: string) => void
}

export default function AdminBikeList({ bikes, onEdit, onDelete }: AdminBikeListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bikes.map((bike) => (
            <tr key={bike.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bike.make}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bike.model}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bike.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => onEdit(bike)}
                className="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(bike.id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

