'use client'

import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

const styleStats = {
  strengths: { name: 'Desplome', icon: 'trending-up', color: 'var(--sputnik-gold)', percentage: 78 },
  weaknesses: { name: 'Placa', icon: 'trending-down', color: 'var(--grade-red)', percentage: 34 },
}

const typeStats = [
  { name: 'Desplome', icon: 'mountain', percentage: 78, color: 'var(--sputnik-gold)' },
  { name: 'Vertical', icon: 'align-vertical', percentage: 65, color: 'var(--sputnik-teal)' },
  { name: 'Placa', icon: 'square', percentage: 34, color: 'var(--grade-red)' },
]

const techniqueStats = [
  { name: 'Cana', count: 24, percentage: 85 },
  { name: 'Empotre', count: 18, percentage: 72 },
  { name: 'Dinamico', count: 15, percentage: 60 },
  { name: 'Talon', count: 12, percentage: 48 },
  { name: 'Rodilla', count: 8, percentage: 32 },
  { name: 'Coordinacion', count: 6, percentage: 24 },
]

export default function StyleStatisticsPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <div className="flex items-center gap-3">
          <Link href="/statistics" className="text-[var(--text-primary)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Mis Estadisticas</h1>
        </div>
        <button className="text-[var(--text-secondary)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-4 space-y-5">
        {/* Overview */}
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)]">
          <span className="font-body text-base font-semibold text-[var(--text-primary)] block mb-1">Resumen de Estilo</span>
          <span className="font-body text-xs text-[var(--text-secondary)] block mb-4">Basado en 42 bloques completados</span>
          <div className="flex gap-3">
            <div className="flex-1 p-3 rounded-xl bg-[var(--bg-elevated)]">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-[var(--sputnik-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="font-body text-xs text-[var(--text-secondary)]">Fuerte</span>
              </div>
              <span className="font-display text-lg font-bold text-[var(--text-primary)]">{styleStats.strengths.name}</span>
            </div>
            <div className="flex-1 p-3 rounded-xl bg-[var(--bg-elevated)]">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-[var(--grade-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                <span className="font-body text-xs text-[var(--text-secondary)]">A mejorar</span>
              </div>
              <span className="font-display text-lg font-bold text-[var(--text-primary)]">{styleStats.weaknesses.name}</span>
            </div>
          </div>
        </div>

        {/* By Type */}
        <div>
          <span className="font-body text-sm font-medium text-[var(--text-secondary)] block mb-3">Por Tipo de Bloque</span>
          <div className="space-y-3">
            {typeStats.map((type) => (
              <div key={type.name} className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-surface)]">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body text-sm font-medium text-[var(--text-primary)]">{type.name}</span>
                    <span className="font-mono text-xs" style={{ color: type.color }}>{type.percentage}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ backgroundColor: type.color, width: `${type.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Technique */}
        <div>
          <span className="font-body text-sm font-medium text-[var(--text-secondary)] block mb-3">Por Tecnica</span>
          <div className="grid grid-cols-3 gap-2">
            {techniqueStats.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--bg-surface)]">
                <span className="font-display text-xl font-bold text-[var(--text-primary)]">{tech.count}</span>
                <span className="font-body text-xs text-[var(--text-secondary)]">{tech.name}</span>
                <div className="w-full h-1 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--sputnik-teal)]"
                    style={{ width: `${tech.percentage}%` }}
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
