'use client'

import Link from 'next/link'
import { useState } from 'react'

const recentTries = [
  { id: '1', time: 'hace 2 min', result: 'fall', zone: false },
  { id: '2', time: 'hace 5 min', result: 'fall', zone: true },
  { id: '3', time: 'hace 8 min', result: 'fall', zone: false },
]

export default function TriesCounterPage() {
  const [count, setCount] = useState(7)

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <Link href="/session" className="text-[var(--text-primary)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
        <h1 className="font-display text-lg font-semibold text-[var(--text-primary)]">Registrar Intento</h1>
        <button className="text-[var(--text-secondary)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-4 space-y-6">
        {/* Boulder Card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-surface)]">
          <div className="w-14 h-14 rounded-xl bg-[var(--grade-green)] flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-white">V</span>
          </div>
          <div className="flex-1">
            <span className="font-display text-xl font-semibold text-[var(--text-primary)] block">V-23</span>
            <span className="font-body text-sm text-[var(--text-secondary)]">Zona A · Sector 2</span>
          </div>
          <svg className="w-6 h-6 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Counter */}
        <div className="text-center">
          <span className="font-body text-sm text-[var(--text-secondary)] block mb-5">Intentos de hoy</span>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => setCount(Math.max(0, count - 1))}
              className="w-16 h-16 rounded-full bg-[var(--bg-surface)] flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="font-display text-7xl font-bold text-[var(--sputnik-gold)]">{count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="w-16 h-16 rounded-full bg-[var(--sputnik-teal)] flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <button className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--bg-surface)]">
            <svg className="w-6 h-6 text-[var(--sputnik-gold)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-body text-sm font-medium text-[var(--text-primary)]">Flash!</span>
            <span className="font-body text-xs text-[var(--text-tertiary)]">1er intento</span>
          </button>
          <button className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--bg-surface)]">
            <svg className="w-6 h-6 text-[var(--grade-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-body text-sm font-medium text-[var(--text-primary)]">Tachado!</span>
            <span className="font-body text-xs text-[var(--text-tertiary)]">Registrar top</span>
          </button>
          <button className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--bg-surface)]">
            <svg className="w-6 h-6 text-[var(--grade-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-body text-sm font-medium text-[var(--text-primary)]">Caida</span>
            <span className="font-body text-xs text-[var(--text-tertiary)]">+1 intento</span>
          </button>
        </div>

        {/* Stats */}
        <div>
          <span className="font-body text-sm font-medium text-[var(--text-secondary)] block mb-3">Resumen</span>
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col items-center gap-1 p-4 rounded-xl bg-[var(--bg-surface)]">
              <span className="font-display text-2xl font-bold text-[var(--text-primary)]">23</span>
              <span className="font-body text-xs text-[var(--text-secondary)]">Total</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 p-4 rounded-xl bg-[var(--bg-surface)]">
              <span className="font-display text-2xl font-bold text-[var(--text-primary)]">3</span>
              <span className="font-body text-xs text-[var(--text-secondary)]">Sesiones</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 p-4 rounded-xl bg-[var(--bg-surface)]">
              <span className="font-display text-2xl font-bold text-[var(--sputnik-gold)]">5</span>
              <span className="font-body text-xs text-[var(--text-secondary)]">Mejor</span>
            </div>
          </div>
        </div>

        {/* Recent Tries */}
        <div>
          <span className="font-body text-sm font-medium text-[var(--text-secondary)] block mb-3">Ultimos intentos</span>
          <div className="space-y-2">
            {recentTries.map((t) => (
              <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.result === 'fall' ? 'bg-[var(--grade-red)]/20' : 'bg-[var(--grade-green)]/20'}`}>
                  <svg className={`w-4 h-4 ${t.result === 'fall' ? 'text-[var(--grade-red)]' : 'text-[var(--grade-green)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {t.result === 'fall' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    )}
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="font-body text-sm text-[var(--text-primary)] block">{t.result === 'fall' ? 'Caida' : 'Top'}</span>
                  <span className="font-body text-xs text-[var(--text-tertiary)]">{t.time}</span>
                </div>
                {t.zone && (
                  <span className="px-2 py-1 rounded bg-[var(--sputnik-teal)]/20 text-[var(--sputnik-teal)] font-body text-xs">Zone</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
