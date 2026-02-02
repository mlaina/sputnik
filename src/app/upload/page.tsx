'use client'

import Link from 'next/link'
import { useState } from 'react'

const suggestedHashtags = [
  { tag: 'SputnikClimbing', selected: true },
  { tag: 'Bouldering', selected: false },
  { tag: 'SendIt', selected: false },
  { tag: 'ClimbingLife', selected: false },
  { tag: 'GymClimb', selected: false },
]

export default function VideoUploadPage() {
  const [caption, setCaption] = useState('Mi primer verde del set!')

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[var(--text-primary)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
          <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Subir Video</h1>
        </div>
        <button className="px-4 py-2 rounded-lg bg-[var(--sputnik-gold)] font-body text-sm font-semibold text-[#0A0A0A]">
          Publicar
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-4 space-y-5">
        {/* Video Preview */}
        <div className="relative h-[280px] rounded-2xl bg-[#1a1a1a] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60">
            <span className="font-mono text-xs text-white">0:32</span>
          </div>
        </div>

        {/* Boulder Selection */}
        <div>
          <span className="font-body text-xs text-[var(--text-secondary)] block mb-2">Bloque</span>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--bg-surface)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--grade-green)] flex items-center justify-center font-display text-sm font-bold text-white">
                V
              </div>
              <div>
                <span className="font-display text-sm font-semibold text-[var(--text-primary)] block">V-23</span>
                <span className="font-body text-xs text-[var(--text-secondary)]">Zona A · Sector 2</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Caption */}
        <div>
          <span className="font-body text-xs text-[var(--text-secondary)] block mb-2">Descripcion</span>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full h-24 p-4 rounded-xl bg-[var(--bg-surface)] text-[var(--text-primary)] font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--sputnik-teal)]"
            placeholder="Escribe una descripcion..."
          />
        </div>

        {/* Hashtags */}
        <div>
          <span className="font-body text-xs text-[var(--text-secondary)] block mb-2">Hashtags sugeridos</span>
          <div className="flex flex-wrap gap-2">
            {suggestedHashtags.map((ht) => (
              <button
                key={ht.tag}
                className={`px-3 py-1.5 rounded-full font-body text-sm border ${
                  ht.selected
                    ? 'bg-[var(--sputnik-teal)] border-[var(--sputnik-teal)] text-white'
                    : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                #{ht.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Share Options */}
        <div>
          <span className="font-body text-xs text-[var(--text-secondary)] block mb-3">Compartir tambien en</span>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[var(--bg-surface)]">
              <svg className="w-5 h-5 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
              </svg>
              <span className="font-body text-sm text-[var(--text-primary)]">Instagram</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[var(--bg-surface)]">
              <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-body text-sm text-[var(--text-primary)]">Story</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
