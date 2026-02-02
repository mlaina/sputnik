'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

const mockSession = {
  active: false,
  duration: '0:00',
  boulders: 0,
  sends: 0,
}

const recentSessions = [
  { id: '1', date: 'Hoy', duration: '1h 45min', boulders: 12, sends: 8 },
  { id: '2', date: 'Ayer', duration: '2h 10min', boulders: 15, sends: 11 },
  { id: '3', date: 'Lun 27', duration: '1h 30min', boulders: 10, sends: 7 },
]

export default function SessionPage() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 px-5 bg-[var(--bg-surface)]">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Sesión</h1>
        {isActive && (
          <span className="px-3 py-1 rounded-full bg-[var(--grade-green)] font-body text-xs font-semibold text-white">
            En curso
          </span>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-5">
        {/* Current Session Card */}
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] mb-5">
          <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-4">
            {isActive ? 'Sesión activa' : 'Iniciar sesión'}
          </h2>

          {isActive ? (
            <>
              <div className="flex justify-center mb-6">
                <span className="font-mono text-5xl font-bold text-[var(--sputnik-gold)]">1:23:45</span>
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex-1 text-center">
                  <span className="font-display text-2xl font-bold text-[var(--text-primary)] block">8</span>
                  <span className="font-body text-xs text-[var(--text-tertiary)]">Bloques</span>
                </div>
                <div className="flex-1 text-center">
                  <span className="font-display text-2xl font-bold text-[var(--sputnik-teal)] block">5</span>
                  <span className="font-body text-xs text-[var(--text-tertiary)]">Envíos</span>
                </div>
                <div className="flex-1 text-center">
                  <span className="font-display text-2xl font-bold text-[var(--text-primary)] block">62%</span>
                  <span className="font-body text-xs text-[var(--text-tertiary)]">Éxito</span>
                </div>
              </div>
              <button
                onClick={() => setIsActive(false)}
                className="w-full h-12 rounded-xl bg-[var(--grade-red)] font-body text-base font-semibold text-white"
              >
                Finalizar sesión
              </button>
            </>
          ) : (
            <>
              <p className="font-body text-sm text-[var(--text-secondary)] mb-6 text-center">
                Registra tus envíos y lleva un seguimiento de tu entrenamiento
              </p>
              <button
                onClick={() => setIsActive(true)}
                className="w-full h-12 rounded-xl bg-[var(--sputnik-teal)] font-body text-base font-semibold text-white flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Iniciar sesión
              </button>
            </>
          )}
        </div>

        {/* Recent Sessions */}
        <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-3">Sesiones recientes</h2>
        <div className="flex flex-col gap-3">
          {recentSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-surface)]">
              <div>
                <span className="font-body text-sm font-semibold text-[var(--text-primary)] block">{session.date}</span>
                <span className="font-body text-xs text-[var(--text-tertiary)]">{session.duration}</span>
              </div>
              <div className="flex gap-4 text-right">
                <div>
                  <span className="font-mono text-sm font-semibold text-[var(--text-primary)] block">{session.boulders}</span>
                  <span className="font-body text-xs text-[var(--text-muted)]">bloques</span>
                </div>
                <div>
                  <span className="font-mono text-sm font-semibold text-[var(--sputnik-teal)] block">{session.sends}</span>
                  <span className="font-body text-xs text-[var(--text-muted)]">envíos</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
