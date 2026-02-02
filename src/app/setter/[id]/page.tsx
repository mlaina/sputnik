'use client'

import { use } from 'react'
import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

const mockSetter = {
  name: 'Pablo Rodríguez',
  initial: 'PR',
  badge: 'Route Setter Oficial',
  bio: 'Setter en Sputnik Legazpi desde 2021. Especialista en desplomes y bloques técnicos.',
  stats: {
    boulders: 127,
    rating: 4.8,
    sends: '2.4K',
  },
}

const recentBoulders = [
  { id: '1', name: 'El Desplome Final', zone: 'Zona B', date: 'hace 3 días', grade: 'R', gradeColor: 'var(--grade-red)', sends: 24, rating: 4.9 },
  { id: '2', name: 'Técnico en Placa', zone: 'Zona A', date: 'hace 1 semana', grade: 'M', gradeColor: 'var(--grade-purple)', sends: 56, rating: 4.7 },
]

export default function SetterProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

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
          <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Setter</h1>
        </div>
        <button className="text-[var(--text-secondary)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-4 p-5">
          <div className="w-[88px] h-[88px] rounded-full bg-[var(--sputnik-gold)] flex items-center justify-center border-[3px] border-[var(--sputnik-gold)]">
            <span className="font-display text-[32px] font-bold text-[#0A0A0A]">{mockSetter.initial}</span>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-[var(--sputnik-gold)] font-body text-xs font-semibold text-[#0A0A0A] flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            {mockSetter.badge}
          </span>
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">{mockSetter.name}</h2>
          <p className="font-body text-sm text-[var(--text-secondary)] text-center max-w-[300px] leading-relaxed">
            {mockSetter.bio}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3 px-5 mb-5">
          <div className="flex-1 flex flex-col items-center gap-1 p-4 rounded-xl bg-[var(--bg-surface)]">
            <span className="font-display text-[28px] font-bold text-[var(--sputnik-gold)]">{mockSetter.stats.boulders}</span>
            <span className="font-body text-xs text-[var(--text-secondary)]">Bloques creados</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 p-4 rounded-xl bg-[var(--bg-surface)]">
            <span className="font-display text-[28px] font-bold text-[var(--text-primary)]">{mockSetter.stats.rating}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className={`w-3 h-3 ${i <= 4 ? 'text-[var(--sputnik-gold)]' : 'text-[var(--text-tertiary)]'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
            </div>
            <span className="font-body text-xs text-[var(--text-secondary)]">Valoración media</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 p-4 rounded-xl bg-[var(--bg-surface)]">
            <span className="font-display text-[28px] font-bold text-[var(--text-primary)]">{mockSetter.stats.sends}</span>
            <span className="font-body text-xs text-[var(--text-secondary)]">Envíos totales</span>
          </div>
        </div>

        {/* Recent Boulders */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-body text-base font-semibold text-[var(--text-primary)]">Bloques recientes</span>
            <span className="font-body text-[13px] text-[var(--sputnik-teal)]">Ver todos</span>
          </div>
          <div className="flex flex-col gap-3">
            {recentBoulders.map((boulder) => (
              <Link
                key={boulder.id}
                href={`/boulder/${boulder.id}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center font-display text-lg font-bold text-white"
                  style={{ backgroundColor: boulder.gradeColor }}
                >
                  {boulder.grade}
                </div>
                <div className="flex-1">
                  <span className="font-display text-sm font-semibold text-[var(--text-primary)] block">{boulder.name}</span>
                  <span className="font-body text-xs text-[var(--text-secondary)]">{boulder.zone} • {boulder.date}</span>
                </div>
                <div className="text-right">
                  <span className="font-body text-xs font-medium text-[var(--text-primary)] block">{boulder.sends} envíos</span>
                  <div className="flex items-center gap-1 justify-end">
                    <svg className="w-3 h-3 text-[var(--sputnik-gold)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span className="font-body text-xs text-[var(--text-secondary)]">{boulder.rating}</span>
                  </div>
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
