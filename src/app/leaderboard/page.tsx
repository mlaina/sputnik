'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

// Mocked data
const mockLeaderboard = [
  { id: '1', name: 'Carlos M.', initial: 'C', avatar_color: 'var(--sputnik-teal)', boulders: 52, flash: 18, score: 3120, rank: 1 },
  { id: '2', name: 'María G.', initial: 'M', avatar_color: 'var(--grade-blue)', boulders: 48, flash: 16, score: 2450, rank: 2 },
  { id: '3', name: 'Laura S.', initial: 'L', avatar_color: 'var(--grade-green)', boulders: 45, flash: 14, score: 2180, rank: 3 },
  { id: '4', name: 'Ana P.', initial: 'A', avatar_color: 'var(--grade-purple)', boulders: 42, flash: 15, score: 1890, rank: 4 },
  { id: '5', name: 'Jorge R.', initial: 'J', avatar_color: 'var(--grade-yellow)', boulders: 38, flash: 12, score: 1650, rank: 5 },
  { id: '6', name: 'Paula V.', initial: 'P', avatar_color: 'var(--grade-red)', boulders: 35, flash: 10, score: 1420, rank: 6 },
]

const currentUser = { id: '12', name: 'Tú', initial: 'T', boulders: 28, flash: 8, score: 980, rank: 12 }

type TabType = 'semanal' | 'mensual' | 'total'

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('semanal')

  const tabs: { key: TabType; label: string }[] = [
    { key: 'semanal', label: 'Semanal' },
    { key: 'mensual', label: 'Mensual' },
    { key: 'total', label: 'Total' },
  ]

  const podium = mockLeaderboard.slice(0, 3)
  const restOfLeaderboard = mockLeaderboard.slice(3)

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[var(--text-primary)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Ranking</h1>
        </div>
        <button className="text-[var(--text-secondary)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </header>

      {/* Tabs */}
      <div className="flex px-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 h-11 flex items-center justify-center font-body text-sm ${
              activeTab === tab.key
                ? 'text-[var(--sputnik-gold)] font-semibold border-b-2 border-[var(--sputnik-gold)]'
                : 'text-[var(--text-secondary)] font-medium'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 py-6 px-5">
        {/* 2nd Place */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-body text-2xl font-bold"
            style={{
              backgroundColor: podium[1]?.avatar_color,
              border: '3px solid #C0C0C0'
            }}
          >
            {podium[1]?.initial}
          </div>
          <span className="font-body text-[13px] font-semibold text-[var(--text-primary)]">{podium[1]?.name}</span>
          <span className="font-mono text-xs text-[var(--text-secondary)]">{podium[1]?.score.toLocaleString()} pts</span>
          <div className="w-7 h-7 rounded-full bg-[#C0C0C0] flex items-center justify-center">
            <span className="font-display text-sm font-bold text-[#0A0A0A]">2</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center gap-2">
          <svg className="w-6 h-6 text-[var(--sputnik-gold)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3a1 1 0 01-1 1H6a1 1 0 01-1-1v-1h14v1z" />
          </svg>
          <div
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white font-body text-[28px] font-bold"
            style={{
              backgroundColor: podium[0]?.avatar_color,
              border: '4px solid var(--sputnik-gold)'
            }}
          >
            {podium[0]?.initial}
          </div>
          <span className="font-body text-sm font-bold text-[var(--text-primary)]">{podium[0]?.name}</span>
          <span className="font-mono text-[13px] font-medium text-[var(--sputnik-gold)]">{podium[0]?.score.toLocaleString()} pts</span>
          <div className="w-8 h-8 rounded-full bg-[var(--sputnik-gold)] flex items-center justify-center">
            <span className="font-display text-base font-bold text-[#0A0A0A]">1</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-body text-xl font-bold"
            style={{
              backgroundColor: podium[2]?.avatar_color,
              border: '2px solid #CD7F32'
            }}
          >
            {podium[2]?.initial}
          </div>
          <span className="font-body text-xs font-semibold text-[var(--text-primary)]">{podium[2]?.name}</span>
          <span className="font-mono text-[11px] text-[var(--text-secondary)]">{podium[2]?.score.toLocaleString()} pts</span>
          <div className="w-6 h-6 rounded-full bg-[#CD7F32] flex items-center justify-center">
            <span className="font-display text-xs font-bold text-[#0A0A0A]">3</span>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex-1 overflow-auto px-5">
        {/* Current User Row */}
        <div className="flex items-center gap-4 py-4 px-4 rounded-lg bg-[#226A8A22] border border-[var(--sputnik-teal)] mb-2">
          <span className="font-mono text-base font-semibold text-[var(--sputnik-teal)] w-6">{currentUser.rank}</span>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-body text-base font-semibold"
            style={{ backgroundColor: 'var(--sputnik-teal)' }}
          >
            {currentUser.initial}
          </div>
          <div className="flex-1 flex flex-col gap-0.5">
            <span className="font-body text-sm font-bold text-[var(--sputnik-teal)]">{currentUser.name}</span>
            <span className="font-body text-xs text-[var(--text-secondary)]">
              {currentUser.boulders} bloques • {currentUser.flash} flash
            </span>
          </div>
          <span className="font-mono text-sm font-semibold text-[var(--sputnik-teal)]">{currentUser.score}</span>
        </div>

        {/* Rest of Leaderboard */}
        {restOfLeaderboard.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 py-4 border-b border-[var(--border-subtle)]"
          >
            <span className="font-mono text-base font-medium text-[var(--text-secondary)] w-6">{user.rank}</span>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-body text-base font-semibold"
              style={{ backgroundColor: user.avatar_color }}
            >
              {user.initial}
            </div>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="font-body text-sm font-semibold text-[var(--text-primary)]">{user.name}</span>
              <span className="font-body text-xs text-[var(--text-tertiary)]">
                {user.boulders} bloques • {user.flash} flash
              </span>
            </div>
            <span className="font-mono text-sm font-medium text-[var(--text-secondary)]">{user.score.toLocaleString()}</span>
          </div>
        ))}
      </div>

<BottomNav />
    </div>
  )
}
