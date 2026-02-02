'use client'

import { use } from 'react'
import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

const gradeConfig: Record<string, { name: string; hex: string; textColor: string }> = {
  white: { name: 'Blanco', hex: 'var(--grade-white)', textColor: '#0A0A0A' },
  green: { name: 'Verde', hex: 'var(--grade-green)', textColor: '#0A0A0A' },
  yellow: { name: 'Amarillo', hex: 'var(--grade-yellow)', textColor: '#0A0A0A' },
  blue: { name: 'Azul', hex: 'var(--grade-blue)', textColor: '#FFFFFF' },
  purple: { name: 'Morado', hex: 'var(--grade-purple)', textColor: '#FFFFFF' },
  red: { name: 'Rojo', hex: 'var(--grade-red)', textColor: '#FFFFFF' },
  black: { name: 'Negro', hex: 'var(--grade-black)', textColor: '#FFFFFF' },
}

const tickedBoulders = [
  { id: '1', name: 'Placa Fina #12', date: 'hace 2 dias' },
  { id: '2', name: 'Lateral #08', date: 'hace 3 dias' },
  { id: '3', name: 'Desplome Suave #03', date: 'hace 5 dias' },
  { id: '4', name: 'Tecnico #15', date: 'hace 1 semana' },
]

const pendingBoulders = [
  { id: '5', name: 'Volumen Central #21', setter: 'Pablo R.' },
  { id: '6', name: 'Romo Dificil #09', setter: 'Maria G.' },
  { id: '7', name: 'Inicio Bajo #18', setter: 'Carlos M.' },
]

export default function GradeDetailPage({ params }: { params: Promise<{ color: string }> }) {
  const { color } = use(params)
  const config = gradeConfig[color] || gradeConfig.green

  const ticked = tickedBoulders.length
  const total = ticked + pendingBoulders.length
  const percentage = Math.round((ticked / total) * 100)

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <div className="flex items-center gap-2">
          <Link href="/profile/history" className="text-[var(--text-primary)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.hex }} />
            <span className="font-display text-xl font-semibold text-[var(--text-primary)]">{config.name}</span>
          </div>
        </div>
        <span className="font-mono text-sm text-[var(--text-secondary)]">{ticked}/{total}</span>
      </header>

      {/* Progress */}
      <div className="px-5 pb-4">
        <div className="h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden mb-2">
          <div
            className="h-full rounded-full"
            style={{ backgroundColor: config.hex, width: `${percentage}%` }}
          />
        </div>
        <span className="font-body text-xs text-[var(--text-secondary)]">{percentage}% completado</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 space-y-4">
        {/* Ticked */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-sm font-semibold text-[var(--sputnik-gold)]">Tachados</span>
            <span className="font-body text-xs text-[var(--text-secondary)]">{ticked} bloques</span>
          </div>
          <div className="space-y-2">
            {tickedBoulders.map((boulder) => (
              <Link
                key={boulder.id}
                href={`/boulder/${boulder.id}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: config.hex }}
                >
                  <svg className="w-5 h-5" style={{ color: config.textColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="font-display text-sm font-semibold text-[var(--text-primary)] block">{boulder.name}</span>
                  <span className="font-body text-xs text-[var(--text-tertiary)]">{boulder.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pending */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-sm font-semibold text-[var(--text-secondary)]">Pendientes</span>
            <span className="font-body text-xs text-[var(--text-secondary)]">{pendingBoulders.length} bloques</span>
          </div>
          <div className="space-y-2">
            {pendingBoulders.map((boulder) => (
              <Link
                key={boulder.id}
                href={`/boulder/${boulder.id}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center opacity-50"
                  style={{ backgroundColor: config.hex }}
                >
                  <span className="font-display text-lg font-bold" style={{ color: config.textColor }}>?</span>
                </div>
                <div className="flex-1">
                  <span className="font-display text-sm font-semibold text-[var(--text-primary)] block">{boulder.name}</span>
                  <span className="font-body text-xs text-[var(--text-tertiary)]">by {boulder.setter}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
