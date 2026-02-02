'use client'

import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

const todaySummary = {
  suggested: 8,
  completed: 3,
  targetTime: '1h 30min',
}

const suggestedBoulders = [
  { id: '1', name: 'Placa Vertical #08', grade: '5c', gradeColor: 'var(--grade-green)', reason: 'Tu nivel actual', difficulty: 'Fácil' },
  { id: '2', name: 'Técnico Lateral #03', grade: '6a', gradeColor: 'var(--grade-yellow)', reason: 'Mejorar técnica', difficulty: 'Medio' },
  { id: '3', name: 'Inicio Bajo #11', grade: '5b', gradeColor: 'var(--grade-green)', reason: 'Calentamiento', difficulty: 'Fácil' },
  { id: '4', name: 'Desplome Central #15', grade: '6b', gradeColor: 'var(--grade-blue)', reason: 'Reto del día', difficulty: 'Difícil' },
]

export default function WorkoutPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Entrenamiento</h1>
        <button className="font-body text-sm text-[var(--sputnik-teal)]">Personalizar</button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 pb-4">
        {/* Summary Card */}
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] mb-5">
          <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-4">Plan de hoy</h2>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <span className="font-display text-2xl font-bold text-[var(--sputnik-gold)]">{todaySummary.suggested}</span>
              <span className="font-body text-xs text-[var(--text-secondary)] block">Bloques sugeridos</span>
            </div>
            <div className="flex-1">
              <span className="font-display text-2xl font-bold text-[var(--sputnik-teal)]">{todaySummary.completed}</span>
              <span className="font-body text-xs text-[var(--text-secondary)] block">Completados</span>
            </div>
            <div className="flex-1">
              <span className="font-display text-2xl font-bold text-[var(--text-primary)]">{todaySummary.targetTime}</span>
              <span className="font-body text-xs text-[var(--text-secondary)] block">Tiempo objetivo</span>
            </div>
          </div>
          <div className="h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden mb-4">
            <div
              className="h-full rounded-full bg-[var(--sputnik-teal)]"
              style={{ width: `${(todaySummary.completed / todaySummary.suggested) * 100}%` }}
            />
          </div>
        </div>

        {/* Suggested Boulders */}
        <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-3">Bloques sugeridos</h2>
        <div className="flex flex-col gap-3 mb-5">
          {suggestedBoulders.map((boulder, index) => (
            <Link
              key={boulder.id}
              href={`/boulder/${boulder.id}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
            >
              <span className="w-6 font-mono text-sm text-[var(--text-muted)]">{index + 1}</span>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-display text-sm font-bold text-white"
                style={{ backgroundColor: boulder.gradeColor }}
              >
                {boulder.grade}
              </div>
              <div className="flex-1">
                <span className="font-body text-sm font-semibold text-[var(--text-primary)] block">{boulder.name}</span>
                <span className="font-body text-xs text-[var(--text-tertiary)]">{boulder.reason}</span>
              </div>
              <span className={`px-2 py-1 rounded font-body text-xs ${
                boulder.difficulty === 'Fácil' ? 'bg-[var(--grade-green)]/20 text-[var(--grade-green)]' :
                boulder.difficulty === 'Medio' ? 'bg-[var(--grade-yellow)]/20 text-[var(--grade-yellow)]' :
                'bg-[var(--grade-red)]/20 text-[var(--grade-red)]'
              }`}>
                {boulder.difficulty}
              </span>
            </Link>
          ))}
        </div>

        {/* Start Button */}
        <Link
          href="/session"
          className="w-full h-12 rounded-xl bg-[var(--sputnik-teal)] font-body text-base font-semibold text-white flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Iniciar sesión
        </Link>
      </div>

      <BottomNav />
    </div>
  )
}
