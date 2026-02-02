'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BottomNav } from '@/components/ui/BottomNav'

const gradeStats = [
  { color: 'white', name: 'Blanco', ticked: 8, total: 8, hex: 'var(--grade-white)' },
  { color: 'green', name: 'Verde', ticked: 10, total: 18, hex: 'var(--grade-green)' },
  { color: 'yellow', name: 'Amarillo', ticked: 6, total: 15, hex: 'var(--grade-yellow)' },
  { color: 'blue', name: 'Azul', ticked: 3, total: 12, hex: 'var(--grade-blue)' },
  { color: 'purple', name: 'Morado', ticked: 1, total: 10, hex: 'var(--grade-purple)' },
  { color: 'red', name: 'Rojo', ticked: 0, total: 8, hex: 'var(--grade-red)' },
  { color: 'black', name: 'Negro', ticked: 0, total: 5, hex: 'var(--grade-black)' },
]

type Tab = 'current' | 'month' | 'year'

export default function ProfileHistoryPage() {
  const [activeTab, setActiveTab] = useState<Tab>('current')

  const totalTicked = gradeStats.reduce((acc, g) => acc + g.ticked, 0)
  const totalBoulders = gradeStats.reduce((acc, g) => acc + g.total, 0)

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Mi Historial</h1>
        <Link href="/settings" className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </header>

      {/* Tabs */}
      <div className="flex px-5">
        {[
          { id: 'current', label: 'Actual' },
          { id: 'month', label: 'Ultimo mes' },
          { id: 'year', label: 'Ultimo ano' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex-1 py-3 text-center font-body text-sm border-b-2 ${
              activeTab === tab.id
                ? 'text-[var(--sputnik-teal)] border-[var(--sputnik-teal)] font-semibold'
                : 'text-[var(--text-secondary)] border-[var(--border-subtle)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-5 space-y-5">
        {/* Summary Card */}
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-body text-sm font-medium text-[var(--text-secondary)]">Bloques Actuales</span>
            <span className="font-body text-xs font-semibold text-[var(--sputnik-teal)]">Set actual</span>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 text-center">
              <span className="font-display text-3xl font-bold text-[var(--sputnik-gold)] block">{totalTicked}</span>
              <span className="font-body text-xs text-[var(--text-secondary)]">Tachados</span>
            </div>
            <div className="flex-1 text-center">
              <span className="font-display text-3xl font-bold text-[var(--text-primary)] block">{totalBoulders}</span>
              <span className="font-body text-xs text-[var(--text-secondary)]">Total</span>
            </div>
            <div className="flex-1 text-center">
              <span className="font-display text-3xl font-bold text-[var(--text-primary)] block">{Math.round((totalTicked / totalBoulders) * 100)}%</span>
              <span className="font-body text-xs text-[var(--text-secondary)]">Completado</span>
            </div>
          </div>
        </div>

        {/* By Grade */}
        <div>
          <span className="font-body text-sm font-medium text-[var(--text-secondary)] block mb-3">Por Grado</span>
          <div className="space-y-2">
            {gradeStats.map((grade) => (
              <Link
                key={grade.color}
                href={`/grade/${grade.color}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: grade.hex }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body text-sm font-medium text-[var(--text-primary)]">{grade.name}</span>
                    <span className="font-mono text-xs text-[var(--text-secondary)]">{grade.ticked}/{grade.total}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: grade.hex,
                        width: `${(grade.ticked / grade.total) * 100}%`,
                      }}
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
