'use client'

import { GRADE_LIST } from '@/lib/constants/grades'
import { GradeColor } from '@/types'

interface GradeFilterProps {
  selected: GradeColor[]
  onChange: (grades: GradeColor[]) => void
}

export function GradeFilter({ selected, onChange }: GradeFilterProps) {
  const toggleGrade = (grade: GradeColor) => {
    if (selected.includes(grade)) {
      onChange(selected.filter((g) => g !== grade))
    } else {
      onChange([...selected, grade])
    }
  }

  const selectAll = () => {
    onChange(GRADE_LIST.map((g) => g.color))
  }

  const clearAll = () => {
    onChange([])
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-300">Filtrar por grado</h3>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Todos
          </button>
          <button
            onClick={clearAll}
            className="text-xs text-gray-400 hover:text-gray-300"
          >
            Ninguno
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {GRADE_LIST.map((grade) => {
          const isSelected = selected.includes(grade.color)
          return (
            <button
              key={grade.color}
              onClick={() => toggleGrade(grade.color)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-800'
                  : 'opacity-50 hover:opacity-75'
              }`}
              style={{
                backgroundColor: grade.hex,
                color: grade.textColor,
              }}
            >
              {grade.range}
            </button>
          )
        })}
      </div>
    </div>
  )
}
