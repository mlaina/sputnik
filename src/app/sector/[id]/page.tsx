'use client'

import { use } from 'react'
import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

const mockSectors: Record<string, { name: string; description: string; boulders: number; image: string }> = {
  a: { name: 'Sector A', description: 'Placa vertical y técnico', boulders: 24, image: '/images/sector-a.jpg' },
  b: { name: 'Sector B', description: 'Desplomes y extraplomos', boulders: 32, image: '/images/sector-b.jpg' },
  c: { name: 'Sector C', description: 'Mixto y dinámico', boulders: 28, image: '/images/sector-c.jpg' },
}

const mockBoulders = [
  { id: '1', name: 'Placa Vertical #08', grade: '5c', gradeColor: 'var(--grade-green)', sends: 24 },
  { id: '2', name: 'Técnico Lateral #03', grade: '6a', gradeColor: 'var(--grade-yellow)', sends: 32 },
  { id: '3', name: 'Inicio Bajo #11', grade: '5b', gradeColor: 'var(--grade-green)', sends: 45 },
]

export default function SectorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const sector = mockSectors[id] || mockSectors['a']

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Hero */}
      <div
        className="h-[220px] w-full bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(180deg, transparent 0%, var(--bg-primary) 100%), url("${sector.image}")`,
          backgroundColor: 'var(--bg-elevated)',
        }}
      >
        <div className="absolute top-4 left-4">
          <Link href="/boulders" className="w-11 h-11 rounded-full bg-black/50 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 -mt-10">
        {/* Info Card */}
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] mb-5">
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">{sector.name}</h1>
          <p className="font-body text-sm text-[var(--text-secondary)] mb-4">{sector.description}</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--sputnik-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="font-body text-sm text-[var(--text-primary)]">{sector.boulders} bloques</span>
            </div>
          </div>
        </div>

        {/* Boulders */}
        <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-3">Bloques en este sector</h2>
        <div className="flex flex-col gap-3">
          {mockBoulders.map((boulder) => (
            <Link
              key={boulder.id}
              href={`/boulder/${boulder.id}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
            >
              <div className="w-14 h-14 rounded-lg bg-[var(--bg-elevated)]" />
              <div className="flex-1">
                <span className="font-display text-sm font-semibold text-[var(--text-primary)] block">{boulder.name}</span>
                <span className="font-body text-xs text-[var(--text-tertiary)]">{boulder.sends} envíos</span>
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
