'use client'

import { Boulder } from '@/types'
import { BoulderCard } from './BoulderCard'

interface BoulderListProps {
  boulders: Boulder[]
  userAscents: Set<string>
  showSector?: boolean
}

export function BoulderList({ boulders, userAscents, showSector }: BoulderListProps) {
  if (boulders.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay bloques que coincidan con los filtros
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {boulders.map((boulder) => (
        <BoulderCard
          key={boulder.id}
          boulder={boulder}
          isSent={userAscents.has(boulder.id)}
          showSector={showSector}
        />
      ))}
    </div>
  )
}
