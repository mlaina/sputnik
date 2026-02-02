import { GradeColor } from '@/types'

export interface GradeInfo {
  color: GradeColor
  range: string
  hex: string
  textColor: string
  order: number
}

export const GRADES: Record<GradeColor, GradeInfo> = {
  blanco: {
    color: 'blanco',
    range: '4a-5a',
    hex: '#FFFFFF',
    textColor: '#000000',
    order: 1,
  },
  verde: {
    color: 'verde',
    range: '5b-6a',
    hex: '#22C55E',
    textColor: '#FFFFFF',
    order: 2,
  },
  amarillo: {
    color: 'amarillo',
    range: '6a+-6b+',
    hex: '#EAB308',
    textColor: '#000000',
    order: 3,
  },
  azul: {
    color: 'azul',
    range: '6b+-6c+',
    hex: '#3B82F6',
    textColor: '#FFFFFF',
    order: 4,
  },
  morado: {
    color: 'morado',
    range: '6c+-7a+',
    hex: '#A855F7',
    textColor: '#FFFFFF',
    order: 5,
  },
  rojo: {
    color: 'rojo',
    range: '7a+-7b+',
    hex: '#EF4444',
    textColor: '#FFFFFF',
    order: 6,
  },
  negro: {
    color: 'negro',
    range: '7c-8a',
    hex: '#1F2937',
    textColor: '#FFFFFF',
    order: 7,
  },
}

export const GRADE_LIST = Object.values(GRADES).sort((a, b) => a.order - b.order)
