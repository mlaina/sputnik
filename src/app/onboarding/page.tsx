'use client'

import Link from 'next/link'

export default function OnboardingPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Hero Image */}
      <div
        className="h-[400px] w-full bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(180deg, transparent 0%, var(--bg-primary) 100%), url("/images/climbing-hero.jpg")',
          backgroundColor: 'var(--bg-elevated)',
        }}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 py-6">
        {/* Text Block */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-display text-5xl font-bold text-[var(--sputnik-gold)]">SPUTNIK</h1>
          <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] text-center">
            Tu rocódromo en el bolsillo
          </h2>
          <p className="font-body text-base text-[var(--text-secondary)] text-center max-w-[320px]">
            Explora bloques, registra tus envíos y compite con tus amigos en tiempo real.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-[var(--sputnik-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="font-body text-sm text-[var(--text-secondary)]">Mapa interactivo del rocódromo</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-[var(--sputnik-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-body text-sm text-[var(--text-secondary)]">Registra tus envíos y progreso</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-[var(--sputnik-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="font-body text-sm text-[var(--text-secondary)]">Compite en el ranking con amigos</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/register"
            className="w-full h-12 flex items-center justify-center rounded-xl bg-[var(--sputnik-teal)] font-body text-base font-semibold text-white"
          >
            Comenzar
          </Link>
          <Link
            href="/login"
            className="w-full h-12 flex items-center justify-center rounded-xl border border-[var(--border-muted)] font-body text-base font-medium text-[var(--text-primary)]"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </div>
  )
}
