export type GradeColor = 'blanco' | 'verde' | 'amarillo' | 'azul' | 'morado' | 'rojo' | 'negro'

export interface Profile {
  id: string
  username: string | null
  avatar_url: string | null
  is_admin: boolean
  created_at: string
}

export interface Sector {
  id: string
  name: string
  svg_path: string | null
  position_x: number
  position_y: number
  created_at: string
}

export interface Boulder {
  id: string
  name: string
  grade: GradeColor
  grade_range: string
  hold_color: string
  sector_id: string
  image_url: string | null
  description: string | null
  setter: string | null
  created_at: string
  is_active: boolean
  sector?: Sector
  ascent_count?: number
  user_ascent?: Ascent | null
}

export interface Ascent {
  id: string
  user_id: string
  boulder_id: string
  sent_at: string
  attempts: number | null
  notes: string | null
}

export interface BoulderWithDetails extends Boulder {
  sector: Sector
  ascent_count: number
  user_ascent: Ascent | null
}
