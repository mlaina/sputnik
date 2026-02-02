'use client'

import Link from 'next/link'

const hashtags = ['SputnikClimbing', 'Bouldering', 'CaveBori24', '6c', 'Legazpi']

const shareOptions = [
  { name: 'Feed', icon: 'grid' },
  { name: 'Story', icon: 'clock' },
  { name: 'Copiar', icon: 'copy' },
  { name: 'Más', icon: 'more-horizontal' },
]

export default function SharePage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
            <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
          <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Compartir</h1>
        </div>
        <div className="w-10" />
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-4">
        {/* Preview */}
        <div className="mb-6">
          <span className="font-body text-sm text-[var(--text-secondary)] block mb-4">Vista previa</span>
          <div className="relative w-[280px] h-[280px] mx-auto rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1651607840987-fd7b0a14dc89?w=400)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-display text-lg font-bold text-white block">Cave Bori #24</span>
              <span className="font-body text-sm text-white/80">6c · Flash</span>
            </div>
          </div>
        </div>

        {/* Hashtags */}
        <div className="mb-6">
          <span className="font-display text-base font-semibold text-[var(--text-primary)] block mb-2">Hashtags incluidos</span>
          <span className="font-body text-sm text-[var(--text-tertiary)] block mb-3">Se copiarán automáticamente al compartir</span>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-[var(--sputnik-teal)]/20 text-[var(--sputnik-teal)] font-body text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share destinations */}
        <div className="mb-6">
          <span className="font-display text-base font-semibold text-[var(--text-primary)] block mb-4">Compartir en</span>
          <div className="flex justify-center gap-4">
            {shareOptions.map((option) => (
              <button key={option.name} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-[var(--bg-surface)] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {option.icon === 'grid' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />}
                    {option.icon === 'clock' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    {option.icon === 'copy' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />}
                    {option.icon === 'more-horizontal' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />}
                  </svg>
                </div>
                <span className="font-body text-xs text-[var(--text-secondary)]">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-5 py-4 border-t border-[var(--border-subtle)]">
        <button className="w-full h-12 rounded-xl bg-[var(--sputnik-gold)] font-body text-base font-semibold text-[#0A0A0A] flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
          </svg>
          Compartir en Instagram
        </button>
      </div>
    </div>
  )
}
