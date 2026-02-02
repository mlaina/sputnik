'use client'

import Link from 'next/link'

const routeItems = [
  { id: '1', name: 'Inicio Suave', zone: 'Zona A', grade: 'V', gradeColor: 'var(--grade-green)', textColor: '#0A0A0A' },
  { id: '2', name: 'Tecnico Fino', zone: 'Zona B', grade: 'A', gradeColor: 'var(--grade-yellow)', textColor: '#0A0A0A' },
  { id: '3', name: 'La Serpiente', zone: 'Zona A', grade: 'Az', gradeColor: 'var(--grade-blue)', textColor: '#FFFFFF' },
  { id: '4', name: 'El Muro', zone: 'Zona D', grade: 'M', gradeColor: 'var(--grade-purple)', textColor: '#FFFFFF' },
]

export default function RoutePlannerPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Map Area */}
      <div className="relative h-[450px] bg-[#1a1a1a]">
        {/* Header - overlayed */}
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between h-14 px-5 pt-[54px]">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[var(--text-primary)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Planificar circuito</h1>
          </div>
          <button className="font-body text-sm text-[var(--sputnik-teal)]">Limpiar</button>
        </header>

        {/* Route Map Grid */}
        <div className="absolute inset-x-5 top-[100px] h-[300px] bg-[#27272A] rounded-xl">
          {/* Zones */}
          <div className="absolute w-[100px] h-[100px] rounded-lg bg-[#3F3F46]" style={{ left: '20px', top: '20px' }} />
          <div className="absolute w-[90px] h-[80px] rounded-lg bg-[#3F3F46]" style={{ left: '140px', top: '30px' }} />
          <div className="absolute w-[80px] h-[120px] rounded-lg bg-[#3F3F46]" style={{ left: '250px', top: '20px' }} />
          <div className="absolute w-[150px] h-[80px] rounded-lg bg-[#3F3F46]" style={{ left: '20px', top: '140px' }} />
          <div className="absolute w-[140px] h-[60px] rounded-lg bg-[#3F3F46]" style={{ left: '190px', top: '160px' }} />

          {/* Route Pins */}
          {routeItems.map((item, idx) => {
            const positions = [
              { left: '40px', top: '40px' },
              { left: '160px', top: '50px' },
              { left: '270px', top: '60px' },
              { left: '80px', top: '160px' },
            ]
            return (
              <div
                key={item.id}
                className="absolute w-9 h-9 rounded-full border-2 border-white flex items-center justify-center"
                style={{
                  backgroundColor: item.gradeColor,
                  left: positions[idx].left,
                  top: positions[idx].top,
                }}
              >
                <span className="font-display text-sm font-bold" style={{ color: item.textColor }}>{idx + 1}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 -mt-[20px] rounded-t-3xl bg-[var(--bg-primary)] px-5 pt-5 pb-4 overflow-auto">
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-[#3F3F46] mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-display text-lg font-semibold text-[var(--text-primary)]">Mi circuito</span>
          <div className="flex items-center gap-3">
            <span className="font-body text-sm text-[var(--text-secondary)]">{routeItems.length} bloques</span>
            <span className="font-body text-sm text-[var(--sputnik-gold)]">~25 min</span>
          </div>
        </div>

        {/* Route List */}
        <div className="space-y-2 mb-4">
          {routeItems.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: item.gradeColor }}
              >
                <span className="font-display text-xs font-bold" style={{ color: item.textColor }}>{idx + 1}</span>
              </div>
              <div className="flex-1">
                <span className="font-body text-sm font-medium text-[var(--text-primary)] block">{item.name}</span>
                <span className="font-body text-xs text-[var(--text-tertiary)]">{item.zone}</span>
              </div>
              <button className="text-[var(--text-tertiary)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button className="w-full h-12 rounded-xl border border-[#3F3F46] flex items-center justify-center gap-2 mb-4">
          <svg className="w-5 h-5 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-body text-sm text-[var(--text-tertiary)]">Anadir bloque</span>
        </button>

        {/* Start Button */}
        <Link
          href="/session"
          className="w-full h-12 rounded-xl bg-[var(--sputnik-teal)] font-body text-base font-semibold text-white flex items-center justify-center"
        >
          Iniciar circuito
        </Link>
      </div>
    </div>
  )
}
