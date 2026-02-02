'use client'

import Link from 'next/link'

export default function Wall3DViewPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* 3D Wall View Area */}
      <div className="relative h-[550px] bg-[#1a1a1a]">
        {/* Header - overlayed */}
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between h-14 px-5 pt-[54px]">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[var(--text-primary)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Vista de pared</h1>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-[var(--bg-surface)] flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="font-body text-xs font-semibold text-[var(--text-primary)]">Zona A</span>
          </span>
        </header>

        {/* Simulated 3D Wall */}
        <div className="absolute inset-x-5 top-[110px] h-[400px] bg-[#27272A] rounded-2xl overflow-hidden">
          {/* Wall texture */}
          <div className="absolute inset-0 bg-[#3F3F4633] rounded-2xl" />

          {/* Holds - Red (selected boulder) */}
          <div className="absolute w-[30px] h-[30px] rounded-full bg-[var(--grade-red)]" style={{ left: '40px', top: '50px' }} />
          <div className="absolute w-[25px] h-[25px] rounded-full bg-[var(--grade-red)]" style={{ left: '100px', top: '80px' }} />
          <div className="absolute w-[35px] h-[35px] rounded-full bg-[var(--grade-red)]" style={{ left: '70px', top: '130px' }} />
          <div className="absolute w-[28px] h-[28px] rounded-full bg-[var(--grade-red)]" style={{ left: '130px', top: '170px' }} />
          <div className="absolute w-[32px] h-[32px] rounded-full bg-[var(--grade-red)]" style={{ left: '90px', top: '230px' }} />
          <div className="absolute w-[40px] h-[20px] rounded-full bg-[var(--grade-red)]" style={{ left: '55px', top: '290px' }} />
          <div className="absolute w-[35px] h-[35px] rounded-full bg-[var(--grade-red)]" style={{ left: '120px', top: '330px' }} />
          {/* Start hold */}
          <div className="absolute w-[50px] h-[25px] rounded-lg bg-[var(--grade-red)] border-[3px] border-[#22C55E] flex items-center justify-center" style={{ left: '80px', top: '360px' }}>
            <span className="font-mono text-[8px] font-bold text-white">START</span>
          </div>

          {/* Other holds */}
          <div className="absolute w-[28px] h-[28px] rounded-full bg-[var(--grade-blue)]" style={{ left: '200px', top: '60px' }} />
          <div className="absolute w-[32px] h-[32px] rounded-full bg-[var(--grade-purple)]" style={{ left: '250px', top: '120px' }} />
          <div className="absolute w-[25px] h-[25px] rounded-full bg-[var(--grade-yellow)]" style={{ left: '280px', top: '200px' }} />
          <div className="absolute w-[30px] h-[30px] rounded-full bg-[var(--grade-green)]" style={{ left: '220px', top: '260px' }} />
          <div className="absolute w-[28px] h-[28px] rounded-full bg-[var(--grade-blue)]" style={{ left: '300px', top: '320px' }} />
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-[35px] top-[130px] flex flex-col items-center gap-2 p-2 rounded-full bg-[var(--bg-surface)]">
          <button className="w-6 h-6 flex items-center justify-center">
            <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <div className="w-6 h-px bg-[#3F3F46]" />
          <button className="w-6 h-6 flex items-center justify-center">
            <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>

        {/* Rotate Button */}
        <button className="absolute right-[35px] top-[240px] w-11 h-11 rounded-full bg-[var(--bg-surface)] flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Card */}
      <div className="flex-1 -mt-[20px] rounded-t-3xl bg-[var(--bg-primary)] px-5 pt-5 pb-4 overflow-auto">
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-[#3F3F46] mx-auto mb-4" />

        {/* Boulder Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[52px] h-[52px] rounded-full bg-[var(--grade-red)] flex items-center justify-center">
            <span className="font-display text-xl font-bold text-white">R</span>
          </div>
          <div className="flex-1">
            <span className="font-display text-xl font-semibold text-[var(--text-primary)] block">Volcan Activo</span>
            <span className="font-body text-sm text-[var(--text-secondary)]">Setter: Carlos · 28 Ene 2024</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-5 mb-4">
          <div>
            <span className="font-display text-2xl font-bold text-[var(--sputnik-teal)] block">47</span>
            <span className="font-body text-xs text-[var(--text-secondary)]">Ascensos</span>
          </div>
          <div>
            <span className="font-display text-2xl font-bold text-[var(--sputnik-gold)] block">8</span>
            <span className="font-body text-xs text-[var(--text-secondary)]">Presas</span>
          </div>
          <div>
            <span className="font-display text-2xl font-bold text-[#EC4899] block">4.2</span>
            <span className="font-body text-xs text-[var(--text-secondary)]">Rating</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-4">
          <button className="flex-1 h-12 rounded-xl bg-[var(--sputnik-teal)] font-body text-sm font-semibold text-white flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Registrar ascenso
          </button>
          <button className="flex-1 h-12 rounded-xl border border-[var(--border-subtle)] font-body text-sm font-semibold text-[var(--text-primary)] flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Foto
          </button>
        </div>

        {/* Tip */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)]">
          <svg className="w-5 h-5 text-[var(--sputnik-gold)] mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
          </svg>
          <span className="font-body text-sm text-[var(--text-secondary)] flex-1">
            Tip: Empieza con la mano izquierda en la presa verde
          </span>
        </div>
      </div>
    </div>
  )
}
