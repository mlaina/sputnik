'use client'

import { use } from 'react'
import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

const gradeFilters = [
  { label: 'Todos', color: 'var(--sputnik-teal)', selected: true },
  { label: 'B', color: 'var(--grade-white)', selected: false },
  { label: 'V', color: 'var(--grade-green)', selected: false },
  { label: 'A', color: 'var(--grade-yellow)', selected: false },
  { label: 'Az', color: 'var(--grade-blue)', selected: false },
  { label: 'M', color: 'var(--grade-purple)', selected: false },
  { label: 'R', color: 'var(--grade-red)', selected: false },
]

const zoneBoulders = [
  { id: '1', name: 'La Serpiente', grade: 'Az', gradeColor: 'var(--grade-blue)', tags: ['desplome', 'potencia'], completed: true },
  { id: '2', name: 'El Muro', grade: 'M', gradeColor: 'var(--grade-purple)', tags: ['vertical', 'tecnico'], completed: false },
  { id: '3', name: 'Tecnico Fino', grade: 'A', gradeColor: 'var(--grade-yellow)', tags: ['placa', 'equilibrio'], completed: true },
  { id: '4', name: 'El Desplome Final', grade: 'R', gradeColor: 'var(--grade-red)', tags: ['desplome', 'cana'], completed: false },
]

export default function ZoneDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const totalBoulders = zoneBoulders.length
  const completedBoulders = zoneBoulders.filter(b => b.completed).length
  const pendingBoulders = totalBoulders - completedBoulders

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[var(--text-primary)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Zona {id.toUpperCase()}</h1>
        </div>
        <button className="text-[var(--text-secondary)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </header>

      {/* Mini Map */}
      <div className="h-[140px] bg-[var(--bg-surface)] flex items-center justify-center">
        <div className="relative w-[200px] h-[100px] bg-[#27272A] rounded-lg">
          <div className="absolute w-[60px] h-[60px] rounded border-2 border-[var(--sputnik-teal)] bg-[var(--sputnik-teal)]/20 left-5 top-5 flex items-center justify-center">
            <span className="font-display text-xl font-bold text-[var(--sputnik-teal)]">{id.toUpperCase()}</span>
          </div>
          <div className="absolute w-[50px] h-[50px] rounded bg-[#3F3F46]" style={{ left: '90px', top: '30px' }} />
          <div className="absolute w-[40px] h-[70px] rounded bg-[#3F3F46]" style={{ left: '150px', top: '20px' }} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-4 py-3 px-5">
        <div className="text-center">
          <span className="font-display text-xl font-bold text-[var(--text-primary)] block">{totalBoulders}</span>
          <span className="font-body text-xs text-[var(--text-secondary)]">Bloques</span>
        </div>
        <div className="text-center">
          <span className="font-display text-xl font-bold text-[#22C55E] block">{completedBoulders}</span>
          <span className="font-body text-xs text-[var(--text-secondary)]">Tachados</span>
        </div>
        <div className="text-center">
          <span className="font-display text-xl font-bold text-[var(--sputnik-gold)] block">{pendingBoulders}</span>
          <span className="font-body text-xs text-[var(--text-secondary)]">Pendientes</span>
        </div>
      </div>

      {/* Grade Filter */}
      <div className="flex gap-2 px-5 py-2 overflow-x-auto">
        {gradeFilters.map((filter) => (
          <button
            key={filter.label}
            className={`px-3 py-1.5 rounded-full font-body text-xs font-semibold whitespace-nowrap ${
              filter.selected ? 'text-white' : 'text-[#0A0A0A]'
            }`}
            style={{ backgroundColor: filter.selected ? filter.color : filter.color }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Boulder List */}
      <div className="flex-1 overflow-auto px-5 py-2 space-y-2">
        {zoneBoulders.map((boulder) => (
          <Link
            key={boulder.id}
            href={`/boulder/${boulder.id}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: boulder.gradeColor }}
            >
              <span className="font-display text-base font-bold text-white">{boulder.grade}</span>
            </div>
            <div className="flex-1">
              <span className="font-display text-sm font-semibold text-[var(--text-primary)] block">{boulder.name}</span>
              <div className="flex items-center gap-1.5">
                {boulder.tags.map((tag) => (
                  <span key={tag} className="font-body text-xs text-[var(--text-tertiary)]">#{tag}</span>
                ))}
              </div>
            </div>
            {boulder.completed ? (
              <svg className="w-6 h-6 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12m-9 0a9 9 0 1018 0 9 9 0 10-18 0" />
              </svg>
            )}
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
