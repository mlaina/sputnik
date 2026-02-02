'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

// Mocked data
const gradeFilters = [
  { id: 'all', label: 'Todos', color: 'var(--sputnik-teal)', active: true },
  { id: 'white', label: '4-5a', color: 'var(--grade-white)', active: false },
  { id: 'green', label: '5b-6a', color: 'var(--grade-green)', active: false },
  { id: 'yellow', label: '6a-6b', color: 'var(--grade-yellow)', active: false },
  { id: 'blue', label: '6b-6c', color: 'var(--grade-blue)', active: false },
]

const mockBoulders = [
  { id: '1', name: 'Placa Vertical #08', sector: 'Sector A', grade: '5c', gradeColor: 'var(--grade-green)', sends: 24 },
  { id: '2', name: 'Desplome Central #15', sector: 'Sector B', grade: '6b', gradeColor: 'var(--grade-blue)', sends: 18 },
  { id: '3', name: 'Técnico Lateral #03', sector: 'Sector A', grade: '6a', gradeColor: 'var(--grade-yellow)', sends: 32 },
  { id: '4', name: 'Extraplomo #22', sector: 'Sector C', grade: '6c', gradeColor: 'var(--grade-purple)', sends: 12 },
  { id: '5', name: 'Inicio Bajo #11', sector: 'Sector B', grade: '5b', gradeColor: 'var(--grade-green)', sends: 45 },
]

export default function BouldersPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="p-5 bg-[var(--bg-surface)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Bloques</h1>
          <div className="flex rounded-lg bg-[var(--bg-elevated)] overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-[var(--sputnik-teal)]' : ''}`}
            >
              <svg className={`w-5 h-5 ${viewMode === 'list' ? 'text-white' : 'text-[var(--text-muted)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-[var(--sputnik-teal)]' : ''}`}
            >
              <svg className={`w-5 h-5 ${viewMode === 'grid' ? 'text-white' : 'text-[var(--text-muted)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 h-11 px-4 rounded-xl bg-[var(--bg-elevated)] mb-4">
          <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar bloques..."
            className="flex-1 bg-transparent font-body text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {gradeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`shrink-0 px-3.5 py-2 rounded-full font-body text-[13px] ${
                activeFilter === filter.id
                  ? 'bg-[var(--sputnik-teal)] text-white font-semibold'
                  : 'border-2 font-normal'
              }`}
              style={{
                borderColor: activeFilter !== filter.id ? filter.color : undefined,
                color: activeFilter !== filter.id ? filter.color : undefined,
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex flex-col gap-3">
          {mockBoulders.map((boulder) => (
            <Link
              key={boulder.id}
              href={`/boulder/${boulder.id}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
            >
              <div className="w-16 h-16 rounded-lg bg-[var(--bg-elevated)]" />
              <div className="flex-1 flex flex-col gap-1">
                <span className="font-display text-sm font-semibold text-[var(--text-primary)]">{boulder.name}</span>
                <span className="font-body text-xs text-[var(--text-tertiary)]">{boulder.sector}</span>
                <span className="font-body text-xs text-[var(--text-secondary)]">{boulder.sends} envíos</span>
              </div>
              <span
                className="px-3 py-1.5 rounded-xl font-body text-sm font-bold text-white"
                style={{ backgroundColor: boulder.gradeColor }}
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
