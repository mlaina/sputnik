'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

// Mocked data
const mockFriends = [
  { id: '1', name: 'Carlos M.', initial: 'C', color: 'var(--sputnik-teal)', lastActivity: 'Envió "Placa Vertical #08"', time: 'hace 2h', online: true },
  { id: '2', name: 'María G.', initial: 'M', color: 'var(--grade-blue)', lastActivity: 'Completó 5 bloques hoy', time: 'hace 4h', online: true },
  { id: '3', name: 'Laura S.', initial: 'L', color: 'var(--grade-green)', lastActivity: 'Nuevo logro: En racha', time: 'hace 1d', online: false },
  { id: '4', name: 'Ana P.', initial: 'A', color: 'var(--grade-purple)', lastActivity: 'Se unió a Sputnik', time: 'hace 2d', online: false },
  { id: '5', name: 'Jorge R.', initial: 'J', color: 'var(--grade-yellow)', lastActivity: 'Flash en "Desplome Central"', time: 'hace 3d', online: false },
]

const mockRequests = [
  { id: '6', name: 'Pablo R.', initial: 'P', color: 'var(--sputnik-gold)' },
  { id: '7', name: 'Elena V.', initial: 'E', color: 'var(--grade-red)' },
]

type TabType = 'amigos' | 'solicitudes'

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('amigos')

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Amigos</h1>
        <button className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
          <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </button>
      </header>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-3 h-11 px-4 rounded-xl bg-[var(--bg-surface)]">
          <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar amigos..."
            className="flex-1 bg-transparent font-body text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-5 border-b border-[var(--border-subtle)]">
        <button
          onClick={() => setActiveTab('amigos')}
          className={`flex-1 h-11 flex items-center justify-center font-body text-sm ${
            activeTab === 'amigos'
              ? 'text-[var(--sputnik-teal)] font-semibold border-b-2 border-[var(--sputnik-teal)]'
              : 'text-[var(--text-secondary)] font-medium'
          }`}
        >
          Amigos ({mockFriends.length})
        </button>
        <button
          onClick={() => setActiveTab('solicitudes')}
          className={`flex-1 h-11 flex items-center justify-center font-body text-sm ${
            activeTab === 'solicitudes'
              ? 'text-[var(--sputnik-teal)] font-semibold border-b-2 border-[var(--sputnik-teal)]'
              : 'text-[var(--text-secondary)] font-medium'
          }`}
        >
          Solicitudes ({mockRequests.length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-4">
        {activeTab === 'amigos' ? (
          <div className="flex flex-col gap-2">
            {mockFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
              >
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-body text-lg font-semibold"
                    style={{ backgroundColor: friend.color }}
                  >
                    {friend.initial}
                  </div>
                  {friend.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[var(--grade-green)] border-2 border-[var(--bg-surface)]" />
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="font-body text-sm font-semibold text-[var(--text-primary)]">{friend.name}</span>
                  <span className="font-body text-xs text-[var(--text-tertiary)]">{friend.lastActivity}</span>
                </div>
                <span className="font-body text-xs text-[var(--text-muted)]">{friend.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {mockRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-body text-lg font-semibold"
                  style={{ backgroundColor: request.color }}
                >
                  {request.initial}
                </div>
                <span className="flex-1 font-body text-sm font-semibold text-[var(--text-primary)]">{request.name}</span>
                <div className="flex gap-2">
                  <button className="h-9 px-4 rounded-lg bg-[var(--sputnik-teal)] font-body text-sm font-semibold text-white">
                    Aceptar
                  </button>
                  <button className="h-9 px-4 rounded-lg bg-[var(--bg-elevated)] font-body text-sm font-medium text-[var(--text-secondary)]">
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

<BottomNav />
    </div>
  )
}
