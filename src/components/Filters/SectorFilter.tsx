'use client'

import { Sector } from '@/types'

interface SectorFilterProps {
  sectors: Sector[]
  selected: string | null
  onChange: (sectorId: string | null) => void
}

export function SectorFilter({ sectors, selected, onChange }: SectorFilterProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-300 mb-3">Filtrar por sector</h3>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            selected === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Todos
        </button>
        {sectors.map((sector) => (
          <button
            key={sector.id}
            onClick={() => onChange(sector.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selected === sector.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {sector.name}
          </button>
        ))}
      </div>
    </div>
  )
}
