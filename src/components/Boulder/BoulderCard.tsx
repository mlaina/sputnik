'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Boulder } from '@/types'
import { GRADES } from '@/lib/constants/grades'

interface BoulderCardProps {
  boulder: Boulder
  isSent?: boolean
  showSector?: boolean
}

export function BoulderCard({ boulder, isSent, showSector }: BoulderCardProps) {
  const grade = GRADES[boulder.grade]

  return (
    <Link
      href={`/boulder/${boulder.id}`}
      className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
    >
      <div className="relative h-40 bg-gray-700">
        {boulder.image_url ? (
          <Image
            src={boulder.image_url}
            alt={boulder.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Sin imagen
          </div>
        )}
        {isSent && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
            Enviado
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="px-2 py-1 rounded text-xs font-bold"
            style={{
              backgroundColor: grade.hex,
              color: grade.textColor,
            }}
          >
            {grade.range}
          </span>
          <span className="text-xs text-gray-400">
            Presas {boulder.hold_color}
          </span>
        </div>

        <h3 className="font-medium text-white truncate">{boulder.name}</h3>

        {showSector && boulder.sector && (
          <p className="text-sm text-gray-400 mt-1">{boulder.sector.name}</p>
        )}

        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          {boulder.setter && <span>by {boulder.setter}</span>}
          {boulder.ascent_count !== undefined && (
            <span>{boulder.ascent_count} envíos</span>
          )}
        </div>
      </div>
    </Link>
  )
}
