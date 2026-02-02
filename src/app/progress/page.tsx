'use client'

import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

const progressData = {
  currentSet: {
    ticked: 42,
    total: 168,
    percent: 25,
  },
  grades: [
    { name: 'Blanco', color: 'var(--grade-white)', textColor: '#0A0A0A', ticked: 24, total: 24, percent: 100 },
    { name: 'Verde', color: 'var(--grade-green)', textColor: '#FFFFFF', ticked: 18, total: 24, percent: 75 },
    { name: 'Amarillo', color: 'var(--grade-yellow)', textColor: '#0A0A0A', ticked: 0, total: 24, percent: 0 },
    { name: 'Azul', color: 'var(--grade-blue)', textColor: '#FFFFFF', ticked: 0, total: 24, percent: 0 },
    { name: 'Morado', color: 'var(--grade-purple)', textColor: '#FFFFFF', ticked: 0, total: 24, percent: 0 },
    { name: 'Rojo', color: 'var(--grade-red)', textColor: '#FFFFFF', ticked: 0, total: 24, percent: 0 },
    { name: 'Negro', color: 'var(--grade-black)', textColor: '#FFFFFF', ticked: 0, total: 24, percent: 0, hasBorder: true },
  ],
}

export default function ProgressPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 px-5 bg-[var(--bg-surface)]">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Mi Progreso</h1>
        <Link href="/statistics" className="font-body text-sm text-[var(--sputnik-teal)]">
          Ver estadísticas
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-5">
        {/* Summary Card */}
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-sm font-medium text-[var(--text-secondary)]">Bloques Actuales</span>
            <span className="font-body text-xs font-semibold text-[var(--sputnik-teal)]">Set actual</span>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <span className="font-display text-[32px] font-bold text-[var(--sputnik-gold)]">{progressData.currentSet.ticked}</span>
              <span className="font-body text-xs text-[var(--text-secondary)] block">Tachados</span>
            </div>
            <div className="flex-1">
              <span className="font-display text-[32px] font-bold text-[var(--text-primary)]">{progressData.currentSet.total}</span>
              <span className="font-body text-xs text-[var(--text-secondary)] block">Total</span>
            </div>
            <div className="flex-1">
              <span className="font-display text-[32px] font-bold text-[var(--sputnik-teal)]">{progressData.currentSet.percent}%</span>
              <span className="font-body text-xs text-[var(--text-secondary)] block">Completado</span>
            </div>
          </div>
        </div>

        {/* Grades Section */}
        <div>
          <h2 className="font-body text-sm font-medium text-[var(--text-secondary)] mb-3">Por Grado</h2>
          <div className="flex flex-col gap-2">
            {progressData.grades.map((grade) => (
              <Link
                key={grade.name}
                href={`/grade/${grade.name.toLowerCase()}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: grade.color,
                    border: grade.hasBorder ? '1px solid var(--text-tertiary)' : 'none',
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body text-sm font-semibold text-[var(--text-primary)]">{grade.name}</span>
                    <span className="font-mono text-xs text-[var(--text-secondary)]">{grade.ticked}/{grade.total}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${grade.percent}%`, backgroundColor: grade.color }}
                    />
                  </div>
                </div>
                <svg className="w-5 h-5 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
