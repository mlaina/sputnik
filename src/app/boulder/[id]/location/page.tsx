'use client'

import { use } from 'react'
import Link from 'next/link'

export default function BoulderLocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Map Area */}
      <div className="relative h-[500px] bg-[#1a1a1a]">
        {/* Simulated Map Grid */}
        <div className="absolute inset-x-5 top-[60px] h-[380px] bg-[#27272A] rounded-xl">
          {/* Zones */}
          <div className="absolute w-[100px] h-[120px] rounded-lg bg-[#3F3F46] left-5 top-5 flex items-center justify-center">
            <span className="font-display text-xl font-semibold text-[var(--text-tertiary)]">A</span>
          </div>
          <div className="absolute w-[90px] h-[100px] rounded-lg bg-[#3F3F46]" style={{ left: '140px', top: '30px' }}>
            <span className="absolute font-display text-xl font-semibold text-[var(--text-tertiary)]" style={{ left: '35px', top: '35px' }}>B</span>
          </div>
          <div className="absolute w-[80px] h-[140px] rounded-lg bg-[#3F3F46]" style={{ left: '250px', top: '20px' }}>
            <span className="absolute font-display text-xl font-semibold text-[var(--text-tertiary)]" style={{ left: '30px', top: '55px' }}>C</span>
          </div>
          <div className="absolute w-[150px] h-[100px] rounded-lg bg-[#3F3F46]" style={{ left: '20px', top: '160px' }}>
            <span className="absolute font-display text-xl font-semibold text-[var(--text-tertiary)]" style={{ left: '65px', top: '35px' }}>D</span>
          </div>
          <div className="absolute w-[140px] h-[80px] rounded-lg bg-[#3F3F46]" style={{ left: '190px', top: '180px' }}>
            <span className="absolute font-display text-xl font-semibold text-[var(--text-tertiary)]" style={{ left: '60px', top: '25px' }}>E</span>
          </div>

          {/* Boulder Pin */}
          <div className="absolute w-12 h-12 rounded-full bg-[var(--grade-purple)] border-[3px] border-white flex items-center justify-center" style={{ left: '45px', top: '50px' }}>
            <span className="font-display text-lg font-bold text-white">M</span>
          </div>
          {/* Pulse effect */}
          <div className="absolute w-20 h-20 rounded-full border-2 border-[#9333EA] bg-[#9333EA]/20" style={{ left: '29px', top: '34px' }} />
        </div>

        {/* Back Button */}
        <Link
          href={`/boulder/${id}`}
          className="absolute top-[60px] left-5 w-11 h-11 rounded-full bg-black/50 flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>

      {/* Card */}
      <div className="flex-1 -mt-[20px] rounded-t-3xl bg-[var(--bg-primary)] px-5 pt-5 pb-4">
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-[#3F3F46] mx-auto mb-4" />

        {/* Boulder Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-[var(--grade-purple)] flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-white">M</span>
          </div>
          <div className="flex-1">
            <span className="font-display text-xl font-bold text-[var(--text-primary)] block">El Muro</span>
            <div className="flex items-center gap-2">
              <span className="font-body text-sm text-[var(--text-secondary)]">Zona A</span>
              <span className="text-[var(--text-tertiary)]">·</span>
              <span className="font-body text-sm text-[var(--text-secondary)]">by Pablo R.</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          {['desplome', 'potencia', 'cana'].map((tag) => (
            <span key={tag} className="px-2.5 py-1.5 rounded-xl bg-[var(--sputnik-teal)]/20 text-[var(--sputnik-teal)] font-body text-xs">
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 flex flex-col items-center gap-1 p-3 rounded-xl bg-[var(--bg-surface)]">
            <span className="font-display text-xl font-bold text-[var(--text-primary)]">127</span>
            <span className="font-body text-xs text-[var(--text-secondary)]">Intentos</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 p-3 rounded-xl bg-[var(--bg-surface)]">
            <span className="font-display text-xl font-bold text-[#22C55E]">43</span>
            <span className="font-body text-xs text-[var(--text-secondary)]">Envios</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 p-3 rounded-xl bg-[var(--bg-surface)]">
            <div className="flex items-center gap-1">
              <span className="font-display text-xl font-bold text-[var(--text-primary)]">4.5</span>
              <svg className="w-4 h-4 text-[var(--sputnik-gold)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <span className="font-body text-xs text-[var(--text-secondary)]">Rating</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href={`/session/tries`}
            className="flex-1 h-12 rounded-xl bg-[var(--sputnik-teal)] font-body text-base font-semibold text-white flex items-center justify-center"
          >
            Registrar intento
          </Link>
          <Link
            href={`/boulder/${id}/comments`}
            className="flex-1 h-12 rounded-xl border border-[var(--border-subtle)] font-body text-base font-semibold text-[var(--text-primary)] flex items-center justify-center"
          >
            Ver beta
          </Link>
        </div>
      </div>
    </div>
  )
}
