'use client'

import { Boulder } from '@/types'
import { GRADES } from '@/lib/constants/grades'

interface BoulderMarkerProps {
  boulder: Boulder
  onClick: () => void
  isSent?: boolean
}

export function BoulderMarker({ boulder, onClick, isSent }: BoulderMarkerProps) {
  const grade = GRADES[boulder.grade]

  return (
    <button
      onClick={onClick}
      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
        isSent ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-gray-900' : ''
      }`}
      style={{ backgroundColor: grade.hex }}
      title={`${boulder.name} - ${grade.range}`}
    >
      {isSent && (
        <svg
          className="w-4 h-4"
          style={{ color: grade.textColor }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  )
}
