'use client'

import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

// Mocked data
const stats = {
  activeBoulders: 127,
  totalSends: '2.4k',
  weeklyChange: '+23%',
}

const weeklyActivity = [
  { day: 'L', value: 60 },
  { day: 'M', value: 90 },
  { day: 'X', value: 45 },
  { day: 'J', value: 110, isHighlight: true },
  { day: 'V', value: 75 },
  { day: 'S', value: 55 },
  { day: 'D', value: 85 },
]

const gradeDistribution = [
  { label: '4-5a', percent: 80 },
  { label: '5b-6a', percent: 60 },
  { label: '6a-6b', percent: 35 },
]

export default function StatisticsPage() {
  const maxValue = Math.max(...weeklyActivity.map((d) => d.value))

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 px-5 bg-[var(--bg-surface)]">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Estadísticas</h1>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-elevated)]">
          <span className="font-body text-sm text-[var(--text-secondary)]">Últimos 30 días</span>
          <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-5">
        {/* Overview Stats */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 flex flex-col items-center gap-1 p-4 rounded-2xl bg-[var(--bg-surface)]">
            <span className="font-display text-[32px] font-bold text-[var(--sputnik-gold)]">{stats.activeBoulders}</span>
            <span className="font-body text-xs text-[var(--text-tertiary)]">Bloques activos</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 p-4 rounded-2xl bg-[var(--bg-surface)]">
            <span className="font-display text-[32px] font-bold text-[var(--sputnik-teal)]">{stats.totalSends}</span>
            <span className="font-body text-xs text-[var(--text-tertiary)]">Envíos totales</span>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] mb-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-display text-lg font-semibold text-[var(--text-primary)]">Actividad semanal</span>
            <span className="font-body text-[13px] text-[var(--grade-green)]">{stats.weeklyChange} vs anterior</span>
          </div>
          <div className="flex items-end justify-around h-[140px]">
            {weeklyActivity.map((item) => (
              <div key={item.day} className="flex flex-col items-center gap-2">
                <div
                  className="w-8 rounded-md"
                  style={{
                    height: `${(item.value / maxValue) * 100}px`,
                    backgroundColor: item.isHighlight ? 'var(--sputnik-gold)' : 'var(--sputnik-teal)',
                  }}
                />
                <span className="font-body text-xs text-[var(--text-muted)]">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)]">
          <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-3">Distribución por grado</h2>
          <div className="flex flex-col gap-2">
            {gradeDistribution.map((grade) => (
              <div key={grade.label} className="flex items-center gap-3">
                <span className="font-body text-[13px] text-[var(--text-secondary)] w-12">{grade.label}</span>
                <div className="flex-1 h-2 rounded bg-[var(--bg-elevated)] overflow-hidden">
                  <div
                    className="h-full rounded bg-[var(--sputnik-teal)]"
                    style={{ width: `${grade.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

<BottomNav />
    </div>
  )
}
