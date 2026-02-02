'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

// Mocked data
const recentSearches = ['Desplome', '6b', 'Sector B']

const sectors = [
  { id: 'a', name: 'Sector A', boulders: 24, icon: 'A' },
  { id: 'b', name: 'Sector B', boulders: 32, icon: 'B' },
]

const boulders = [
  { id: '1', name: 'Placa Vertical #08', sector: 'Sector A', grade: '5c', color: 'var(--grade-green)' },
  { id: '2', name: 'Desplome Central #15', sector: 'Sector B', grade: '6b', color: 'var(--grade-yellow)' },
]

export default function SearchPage() {
  const [query, setQuery] = useState('')

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="p-5 bg-[var(--bg-surface)]">
        {/* Search Row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 flex items-center gap-3 h-11 px-4 rounded-xl bg-[var(--bg-elevated)]">
            <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar bloques, sectores..."
              className="flex-1 bg-transparent font-body text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
            />
          </div>
          <Link href="/" className="font-body text-sm font-semibold text-[var(--sputnik-teal)]">
            Cancelar
          </Link>
        </div>

        {/* Recent Searches */}
        <div className="flex gap-2 flex-wrap">
          {recentSearches.map((search) => (
            <button
              key={search}
              onClick={() => setQuery(search)}
              className="px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] font-body text-xs text-[var(--text-secondary)]"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-5">
        {/* Sectors Section */}
        <div className="mb-5">
          <h3 className="font-body text-[13px] font-semibold text-[var(--text-secondary)] mb-3">Sectores</h3>
          {sectors.map((sector) => (
            <Link
              key={sector.id}
              href={`/sector/${sector.id}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)] mb-2"
            >
              <div className="w-11 h-11 rounded-[10px] bg-[var(--sputnik-teal)] flex items-center justify-center font-display text-lg font-bold text-white">
                {sector.icon}
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="font-body text-sm font-semibold text-[var(--text-primary)]">{sector.name}</span>
                <span className="font-body text-xs text-[var(--text-tertiary)]">{sector.boulders} bloques</span>
              </div>
              <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Boulders Section */}
        <div>
          <h3 className="font-body text-[13px] font-semibold text-[var(--text-secondary)] mb-3">Bloques</h3>
          {boulders.map((boulder) => (
            <Link
              key={boulder.id}
              href={`/boulder/${boulder.id}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)] mb-2"
            >
              <div className="w-11 h-11 rounded-lg bg-[var(--bg-elevated)]" />
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="font-body text-sm font-semibold text-[var(--text-primary)]">{boulder.name}</span>
                <span className="font-body text-xs text-[var(--text-tertiary)]">{boulder.sector}</span>
              </div>
              <span
                className="px-2 py-1 rounded-xl font-body text-xs font-semibold text-white"
                style={{ backgroundColor: boulder.color }}
              >
                {boulder.grade}
              </span>
            </Link>
          ))}
        </div>
      </div>

<BottomNav />
    </div>
  )
}
