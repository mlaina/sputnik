'use client'

import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

// Mocked data
const achievements = {
  unlocked: 8,
  total: 24,
  progress: 33,
}

const unlockedAchievements = [
  { id: 1, title: 'Primeros pasos', desc: '10 bloques', color: 'var(--sputnik-gold)', icon: '🏔️' },
  { id: 2, title: 'En racha', desc: '7 días seguidos', color: 'var(--sputnik-teal)', icon: '🔥' },
  { id: 3, title: 'Precisión', desc: 'Flash x5', color: 'var(--grade-purple)', icon: '⚡' },
]

const nextAchievement = {
  title: 'Escalador experto',
  desc: 'Completa 50 bloques',
  current: 32,
  target: 50,
}

export default function AchievementsPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 px-5 bg-[var(--bg-surface)]">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Logros</h1>
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[var(--bg-elevated)]">
          <svg className="w-4 h-4 text-[var(--sputnik-gold)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <span className="font-mono text-sm font-semibold text-[var(--sputnik-gold)]">
            {achievements.unlocked}/{achievements.total}
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-5">
        {/* Progress Section */}
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-lg font-semibold text-[var(--text-primary)]">Progreso total</span>
            <span className="font-mono text-lg font-bold text-[var(--sputnik-gold)]">{achievements.progress}%</span>
          </div>
          <div className="h-2 rounded bg-[var(--bg-elevated)] overflow-hidden">
            <div
              className="h-full rounded bg-[var(--sputnik-gold)]"
              style={{ width: `${achievements.progress}%` }}
            />
          </div>
        </div>

        {/* Unlocked Achievements */}
        <div className="mb-6">
          <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-3">Logros desbloqueados</h2>
          <div className="flex gap-3">
            {unlockedAchievements.map((ach) => (
              <div
                key={ach.id}
                className="flex-1 flex flex-col items-center gap-3 p-4 rounded-2xl bg-[var(--bg-surface)]"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: ach.color }}
                >
                  {ach.icon}
                </div>
                <span className="font-body text-[13px] font-semibold text-[var(--text-primary)] text-center">
                  {ach.title}
                </span>
                <span className="font-body text-[11px] text-[var(--text-tertiary)] text-center">
                  {ach.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Achievement */}
        <div>
          <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-3">Próximo logro</h2>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-surface)]">
            <div className="w-14 h-14 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <span className="font-body text-[15px] font-semibold text-[var(--text-primary)]">{nextAchievement.title}</span>
              <span className="font-body text-[13px] text-[var(--text-tertiary)]">{nextAchievement.desc}</span>
              <span className="font-mono text-xs font-semibold text-[var(--sputnik-teal)]">
                {nextAchievement.current}/{nextAchievement.target}
              </span>
            </div>
          </div>
        </div>
      </div>

<BottomNav />
    </div>
  )
}
