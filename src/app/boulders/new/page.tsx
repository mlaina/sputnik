'use client'

import Link from 'next/link'

const newBoulders = [
  { id: '1', name: 'Volcan Activo', zone: 'Zona A', grade: 'R', gradeColor: 'var(--grade-red)', setter: 'Pablo R.', date: 'hace 2 dias' },
  { id: '2', name: 'Tecnico Extremo', zone: 'Zona C', grade: 'M', gradeColor: 'var(--grade-purple)', setter: 'Maria G.', date: 'hace 3 dias' },
  { id: '3', name: 'Azul Profundo', zone: 'Zona F', grade: 'Az', gradeColor: 'var(--grade-blue)', setter: 'Carlos M.', date: 'hace 5 dias' },
]

export default function NewBouldersPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Map Area */}
      <div className="relative h-[500px] bg-[#1a1a1a]">
        {/* Header - overlayed */}
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between h-14 px-5 pt-[54px]">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[var(--text-primary)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Nuevos bloques</h1>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-[var(--sputnik-gold)] font-body text-xs font-semibold text-[#0A0A0A]">
            3 nuevos
          </span>
        </header>

        {/* Map Grid */}
        <div className="absolute inset-x-5 top-[100px] h-[340px] bg-[#27272A] rounded-xl">
          {/* Zones */}
          <div className="absolute w-[100px] h-[100px] rounded-lg bg-[#3F3F46]" style={{ left: '20px', top: '20px' }} />
          <div className="absolute w-[90px] h-[80px] rounded-lg bg-[#3F3F46]" style={{ left: '140px', top: '30px' }} />
          <div className="absolute w-[80px] h-[120px] rounded-lg bg-[#3F3F46]" style={{ left: '250px', top: '20px' }} />
          <div className="absolute w-[150px] h-[80px] rounded-lg bg-[#3F3F46]" style={{ left: '20px', top: '140px' }} />
          <div className="absolute w-[140px] h-[60px] rounded-lg bg-[#3F3F46]" style={{ left: '190px', top: '160px' }} />
          <div className="absolute w-[120px] h-[80px] rounded-lg bg-[#3F3F46]" style={{ left: '20px', top: '240px' }} />

          {/* New Boulder Pins with badges */}
          <div className="absolute" style={{ left: '45px', top: '40px' }}>
            <div className="w-10 h-10 rounded-full bg-[var(--grade-red)] border-[3px] border-[var(--sputnik-gold)] flex items-center justify-center">
              <span className="font-display text-base font-bold text-white">R</span>
            </div>
            <span className="absolute -top-2 -right-3 px-1.5 py-0.5 rounded bg-[var(--sputnik-gold)] font-body text-[8px] font-bold text-[#0A0A0A]">NEW</span>
          </div>
          <div className="absolute" style={{ left: '270px', top: '50px' }}>
            <div className="w-10 h-10 rounded-full bg-[var(--grade-purple)] border-[3px] border-[var(--sputnik-gold)] flex items-center justify-center">
              <span className="font-display text-base font-bold text-white">M</span>
            </div>
            <span className="absolute -top-2 -right-3 px-1.5 py-0.5 rounded bg-[var(--sputnik-gold)] font-body text-[8px] font-bold text-[#0A0A0A]">NEW</span>
          </div>
          <div className="absolute" style={{ left: '50px', top: '260px' }}>
            <div className="w-10 h-10 rounded-full bg-[var(--grade-blue)] border-[3px] border-[var(--sputnik-gold)] flex items-center justify-center">
              <span className="font-display text-sm font-bold text-white">Az</span>
            </div>
            <span className="absolute -top-2 -right-3 px-1.5 py-0.5 rounded bg-[var(--sputnik-gold)] font-body text-[8px] font-bold text-[#0A0A0A]">NEW</span>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 -mt-[20px] rounded-t-3xl bg-[var(--bg-primary)] px-5 pt-5 pb-4 overflow-auto">
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-[#3F3F46] mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-display text-lg font-semibold text-[var(--text-primary)]">Esta semana</span>
          <span className="font-body text-sm text-[var(--text-secondary)]">27 Ene - 2 Feb</span>
        </div>

        {/* Boulder List */}
        <div className="space-y-3">
          {newBoulders.map((boulder) => (
            <Link
              key={boulder.id}
              href={`/boulder/${boulder.id}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: boulder.gradeColor }}
              >
                <span className="font-display text-base font-bold text-white">{boulder.grade}</span>
              </div>
              <div className="flex-1">
                <span className="font-display text-sm font-semibold text-[var(--text-primary)] block">{boulder.name}</span>
                <span className="font-body text-xs text-[var(--text-tertiary)]">{boulder.zone} · {boulder.setter}</span>
              </div>
              <span className="px-2 py-1 rounded-lg bg-[var(--sputnik-gold)] font-body text-xs font-semibold text-[#0A0A0A]">
                {boulder.date}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
