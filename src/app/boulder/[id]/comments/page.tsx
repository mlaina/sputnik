'use client'

import { use } from 'react'
import Link from 'next/link'
import { useState } from 'react'

const mockComments = [
  {
    id: '1',
    user: { name: 'Carlos M.', initials: 'CM' },
    time: 'hace 2h',
    content: 'Empezar con talon derecho en la presa grande, despues cruzar con mano izquierda al bidedo. La clave esta en el empotre de rodilla para el siguiente movimiento.',
    likes: 12,
    tags: ['talon', 'empotre', 'crux'],
    isBeta: true,
  },
  {
    id: '2',
    user: { name: 'Laura P.', initials: 'LP' },
    time: 'hace 5h',
    content: 'Beta alternativo: se puede hacer sin el empotre saltando directamente al volumen. Es mas explosivo pero mas directo.',
    likes: 8,
    tags: ['dinamico', 'alternativo'],
    isBeta: true,
  },
]

type Tab = 'beta' | 'comments' | 'videos'

export default function BoulderCommentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState<Tab>('beta')

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <div className="flex items-center gap-3">
          <Link href={`/boulder/${id}`} className="text-[var(--text-primary)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Comentarios</h1>
        </div>
        <button className="text-[var(--text-secondary)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </header>

      {/* Boulder Info */}
      <div className="flex items-center gap-3 px-5 py-4 bg-[var(--bg-surface)]">
        <div className="w-12 h-12 rounded-lg bg-[var(--grade-purple)] flex items-center justify-center">
          <span className="font-display text-xl font-bold text-white">M</span>
        </div>
        <div className="flex-1">
          <span className="font-display text-base font-semibold text-[var(--text-primary)] block">La Serpiente</span>
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-[var(--text-secondary)]">Zona A</span>
            <span className="text-[var(--text-tertiary)]">·</span>
            <span className="font-body text-sm text-[var(--text-secondary)]">12 comentarios</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-5">
        {[
          { id: 'beta', label: 'Beta' },
          { id: 'comments', label: 'Comentarios' },
          { id: 'videos', label: 'Videos' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex-1 py-3 text-center font-body text-sm border-b-2 ${
              activeTab === tab.id
                ? 'text-[var(--sputnik-gold)] border-[var(--sputnik-gold)] font-semibold'
                : 'text-[var(--text-secondary)] border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-4 space-y-4">
        {mockComments.map((comment) => (
          <div key={comment.id} className="p-4 rounded-xl bg-[var(--bg-surface)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[var(--sputnik-teal)] flex items-center justify-center">
                  <span className="font-body text-xs font-bold text-white">{comment.user.initials}</span>
                </div>
                <div>
                  <span className="font-body text-sm font-medium text-[var(--text-primary)] block">{comment.user.name}</span>
                  <span className="font-body text-xs text-[var(--text-tertiary)]">{comment.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[var(--sputnik-gold)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="font-body text-xs text-[var(--text-secondary)]">{comment.likes}</span>
              </div>
            </div>
            <p className="font-body text-sm text-[var(--text-primary)] leading-relaxed mb-3">
              {comment.content}
            </p>
            <div className="flex flex-wrap gap-2">
              {comment.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-xl bg-[var(--sputnik-teal)]/20 text-[var(--sputnik-teal)] font-body text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-t border-[#27272A] bg-[var(--bg-surface)]">
        <div className="flex-1 h-11 rounded-full bg-[var(--bg-primary)] flex items-center px-4">
          <span className="font-body text-sm text-[var(--text-tertiary)]">Anade tu beta o comentario...</span>
        </div>
        <button className="w-11 h-11 rounded-full bg-[var(--sputnik-teal)] flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  )
}
