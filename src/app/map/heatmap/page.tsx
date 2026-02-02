'use client'

import Link from 'next/link'
import { useState } from 'react'

const heatmapZones = [
  { id: 'A', color: '#EF444488', value: 34 },
  { id: 'B', color: '#F6B63E66', value: 21 },
  { id: 'C', color: '#22C55E44', value: 12 },
  { id: 'D', color: '#EF444466', value: 28 },
  { id: 'E', color: '#226A8A44', value: 8 },
  { id: 'F', color: '#F6B63E44', value: 15 },
  { id: 'G', color: '#22C55E22', value: 5 },
]

type ViewMode = 'my' | 'global'

export default function HeatmapPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('my')

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Map Area */}
      <div className="relative h-[550px] bg-[#1a1a1a]">
        {/* Header - overlayed */}
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between h-14 px-5 pt-[54px]">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[var(--text-primary)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Mapa de calor</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('my')}
              className={`px-3 py-1.5 rounded-full font-body text-xs font-semibold ${
                viewMode === 'my' ? 'bg-[var(--sputnik-teal)] text-white' : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
              }`}
            >
              Mi actividad
            </button>
            <button
              onClick={() => setViewMode('global')}
              className={`px-3 py-1.5 rounded-full font-body text-xs font-semibold ${
                viewMode === 'global' ? 'bg-[var(--sputnik-teal)] text-white' : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
              }`}
            >
              Global
            </button>
          </div>
        </header>

        {/* Heatmap Grid */}
        <div className="absolute inset-x-5 top-[100px] h-[380px] bg-[#27272A] rounded-xl">
          {/* Zone A */}
          <div className="absolute w-[100px] h-[120px] rounded-lg" style={{ backgroundColor: heatmapZones[0].color, left: '20px', top: '20px' }}>
            <span className="absolute font-display text-xl font-semibold text-white" style={{ left: '40px', top: '45px' }}>A</span>
          </div>
          {/* Zone B */}
          <div className="absolute w-[90px] h-[100px] rounded-lg" style={{ backgroundColor: heatmapZones[1].color, left: '140px', top: '30px' }}>
            <span className="absolute font-display text-xl font-semibold text-white" style={{ left: '35px', top: '35px' }}>B</span>
          </div>
          {/* Zone C */}
          <div className="absolute w-[80px] h-[140px] rounded-lg" style={{ backgroundColor: heatmapZones[2].color, left: '250px', top: '20px' }}>
            <span className="absolute font-display text-xl font-semibold text-white" style={{ left: '30px', top: '55px' }}>C</span>
          </div>
          {/* Zone D */}
          <div className="absolute w-[150px] h-[100px] rounded-lg" style={{ backgroundColor: heatmapZones[3].color, left: '20px', top: '160px' }}>
            <span className="absolute font-display text-xl font-semibold text-white" style={{ left: '65px', top: '35px' }}>D</span>
          </div>
          {/* Zone E */}
          <div className="absolute w-[140px] h-[80px] rounded-lg" style={{ backgroundColor: heatmapZones[4].color, left: '190px', top: '180px' }}>
            <span className="absolute font-display text-xl font-semibold text-white" style={{ left: '60px', top: '25px' }}>E</span>
          </div>
          {/* Zone F */}
          <div className="absolute w-[120px] h-[80px] rounded-lg" style={{ backgroundColor: heatmapZones[5].color, left: '20px', top: '280px' }}>
            <span className="absolute font-display text-xl font-semibold text-white" style={{ left: '50px', top: '25px' }}>F</span>
          </div>
          {/* Zone G */}
          <div className="absolute w-[170px] h-[80px] rounded-lg" style={{ backgroundColor: heatmapZones[6].color, left: '160px', top: '280px' }}>
            <span className="absolute font-display text-xl font-semibold text-[#71717A]" style={{ left: '75px', top: '25px' }}>G</span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-[50px] left-5 right-5 h-10 rounded-lg bg-[var(--bg-surface)] flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#22C55E44]" />
            <span className="font-body text-xs text-[var(--text-secondary)]">Poco</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#F6B63E88]" />
            <span className="font-body text-xs text-[var(--text-secondary)]">Medio</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#EF4444CC]" />
            <span className="font-body text-xs text-[var(--text-secondary)]">Mucho</span>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 -mt-[24px] rounded-t-3xl bg-[var(--bg-primary)] px-5 pt-5 pb-4">
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-[#3F3F46] mx-auto mb-4" />

        <span className="font-display text-lg font-semibold text-[var(--text-primary)] block mb-4">Tu actividad por zona</span>

        {/* Stats */}
        <div className="space-y-3">
          {heatmapZones.slice(0, 4).map((zone) => (
            <div key={zone.id} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center"
                style={{ backgroundColor: zone.color }}
              >
                <span className="font-display text-sm font-bold text-white">{zone.id}</span>
              </div>
              <div className="flex-1 h-6 rounded bg-[var(--bg-surface)] overflow-hidden">
                <div
                  className="h-full rounded"
                  style={{
                    backgroundColor: zone.color,
                    width: `${(zone.value / 40) * 100}%`,
                  }}
                />
              </div>
              <span className="font-mono text-sm font-medium text-[var(--text-primary)] w-8 text-right">{zone.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
