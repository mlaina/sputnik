'use client'

import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

const mockPosts = [
  {
    id: '1',
    user: { name: 'Carlos M.', avatar: 'C', color: 'var(--sputnik-teal)' },
    type: 'send',
    boulder: 'Desplome Central #15',
    grade: '6b',
    gradeColor: 'var(--grade-blue)',
    message: '¡Por fin! Después de 3 sesiones intentándolo 💪',
    likes: 12,
    comments: 4,
    time: 'hace 2h',
  },
  {
    id: '2',
    user: { name: 'María G.', avatar: 'M', color: 'var(--grade-purple)' },
    type: 'achievement',
    achievement: 'En racha',
    message: 'Nueva racha de 7 días seguidos escalando 🔥',
    likes: 24,
    comments: 8,
    time: 'hace 4h',
  },
  {
    id: '3',
    user: { name: 'Laura S.', avatar: 'L', color: 'var(--grade-green)' },
    type: 'flash',
    boulder: 'Técnico Lateral #03',
    grade: '6a',
    gradeColor: 'var(--grade-yellow)',
    message: 'Flash a la primera! La clave está en el talón izquierdo',
    likes: 18,
    comments: 6,
    time: 'hace 6h',
  },
]

export default function CommunityPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 px-5 bg-[var(--bg-surface)]">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Comunidad</h1>
        <button className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
          <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {mockPosts.map((post) => (
          <div key={post.id} className="p-4 border-b border-[var(--border-subtle)]">
            {/* User Header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-body font-semibold"
                style={{ backgroundColor: post.user.color }}
              >
                {post.user.avatar}
              </div>
              <div className="flex-1">
                <span className="font-body text-sm font-semibold text-[var(--text-primary)]">{post.user.name}</span>
                <span className="font-body text-xs text-[var(--text-muted)] block">{post.time}</span>
              </div>
              {post.type === 'flash' && (
                <span className="px-2 py-1 rounded-lg bg-[var(--sputnik-gold)] font-body text-xs font-semibold text-[#0A0A0A]">
                  ⚡ Flash
                </span>
              )}
            </div>

            {/* Content */}
            {post.boulder && (
              <div className="flex items-center gap-2 mb-2">
                <span className="font-body text-sm text-[var(--text-primary)]">{post.boulder}</span>
                <span
                  className="px-2 py-0.5 rounded font-body text-xs font-bold text-white"
                  style={{ backgroundColor: post.gradeColor }}
                >
                  {post.grade}
                </span>
              </div>
            )}
            {post.achievement && (
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded-lg bg-[var(--sputnik-gold)] font-body text-xs font-semibold text-[#0A0A0A]">
                  🏆 {post.achievement}
                </span>
              </div>
            )}
            <p className="font-body text-sm text-[var(--text-secondary)] mb-3">{post.message}</p>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-[var(--text-muted)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-body text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-[var(--text-muted)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="font-body text-sm">{post.comments}</span>
              </button>
              <button className="text-[var(--text-muted)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
