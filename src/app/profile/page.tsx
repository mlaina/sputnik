'use client'

import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

// Mocked data
const userProfile = {
  name: 'Marcos García',
  handle: '@marcosgarcia',
  initial: 'MG',
  memberSince: 'Enero 2024',
  stats: {
    ticked: 87,
    friends: 12,
    photos: 34,
  },
}

const gradeProgress = [
  { grade: 'Blanco', color: 'var(--grade-white)', textColor: '#0A0A0A', completed: 24, total: 24, percent: 100 },
  { grade: 'Verde', color: 'var(--grade-green)', textColor: '#FFFFFF', completed: 18, total: 24, percent: 75 },
  { grade: 'Amarillo', color: 'var(--grade-yellow)', textColor: '#0A0A0A', completed: 14, total: 24, percent: 58 },
  { grade: 'Azul', color: 'var(--grade-blue)', textColor: '#FFFFFF', completed: 8, total: 24, percent: 33 },
  { grade: 'Morado', color: 'var(--grade-purple)', textColor: '#FFFFFF', completed: 4, total: 24, percent: 17 },
  { grade: 'Rojo', color: 'var(--grade-red)', textColor: '#FFFFFF', completed: 2, total: 24, percent: 8 },
  { grade: 'Negro', color: 'var(--grade-black)', textColor: '#FFFFFF', completed: 0, total: 24, percent: 0, hasBorder: true },
]

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Mi Perfil</h1>
        <Link href="/settings" className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 pb-4">
        {/* Profile Card */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--bg-surface)] mb-6">
          <div
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white font-display text-2xl font-bold"
            style={{ backgroundColor: 'var(--sputnik-teal)' }}
          >
            {userProfile.initial}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <span className="font-display text-xl font-semibold text-[var(--text-primary)]">{userProfile.name}</span>
            <span className="font-body text-sm text-[var(--text-tertiary)]">{userProfile.handle}</span>
            <span className="font-body text-xs text-[var(--text-muted)]">Miembro desde {userProfile.memberSince}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 mb-6">
          <Link href="/statistics" className="flex-1 flex flex-col items-center gap-1 p-4 rounded-xl bg-[var(--bg-surface)]">
            <span className="font-display text-[32px] font-bold text-[var(--sputnik-gold)]">{userProfile.stats.ticked}</span>
            <span className="font-body text-xs text-[var(--text-tertiary)]">Tachados</span>
          </Link>
          <Link href="/friends" className="flex-1 flex flex-col items-center gap-1 p-4 rounded-xl bg-[var(--bg-surface)]">
            <span className="font-display text-[32px] font-bold text-[var(--text-primary)]">{userProfile.stats.friends}</span>
            <span className="font-body text-xs text-[var(--text-tertiary)]">Amigos</span>
          </Link>
          <Link href="/achievements" className="flex-1 flex flex-col items-center gap-1 p-4 rounded-xl bg-[var(--bg-surface)]">
            <span className="font-display text-[32px] font-bold text-[var(--text-primary)]">{userProfile.stats.photos}</span>
            <span className="font-body text-xs text-[var(--text-tertiary)]">Fotos</span>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <Link
            href="/achievements"
            className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-surface)]"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--sputnik-gold)] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#0A0A0A]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-body text-sm font-semibold text-[var(--text-primary)]">Logros</span>
              <span className="font-body text-xs text-[var(--text-tertiary)]">8/24 desbloqueados</span>
            </div>
          </Link>
          <Link
            href="/statistics"
            className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-surface)]"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--sputnik-teal)] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4 3h2v11h-2V10zm4-6h2v17h-2V4zm4 4h2v13h-2V8z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-body text-sm font-semibold text-[var(--text-primary)]">Estadísticas</span>
              <span className="font-body text-xs text-[var(--text-tertiary)]">Ver progreso</span>
            </div>
          </Link>
        </div>

        {/* Grade Progress */}
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">Progreso por grado</h2>
          <div className="flex flex-col gap-2">
            {gradeProgress.map((grade) => (
              <div key={grade.grade} className="flex items-center gap-3">
                <div
                  className="w-14 h-8 rounded-lg flex items-center justify-center font-display text-xs font-bold"
                  style={{
                    backgroundColor: grade.color,
                    color: grade.textColor,
                    border: grade.hasBorder ? '1px solid var(--border-muted)' : 'none',
                  }}
                >
                  {grade.grade.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 h-2 rounded bg-[var(--bg-elevated)] overflow-hidden">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${grade.percent}%`,
                      backgroundColor: grade.color,
                    }}
                  />
                </div>
                <span className="font-mono text-xs text-[var(--text-secondary)] w-12 text-right">
                  {grade.completed}/{grade.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

<BottomNav />
    </div>
  )
}
