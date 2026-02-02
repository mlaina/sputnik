'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

type TabType = 'todas' | 'menciones' | 'actividad'

const mockNotifications = [
  { id: '1', type: 'like', user: 'Carlos M.', avatar: 'C', color: 'var(--sputnik-teal)', message: 'le gustó tu envío en "Placa Vertical #08"', time: 'hace 2h', read: false },
  { id: '2', type: 'comment', user: 'María G.', avatar: 'M', color: 'var(--grade-blue)', message: 'comentó: "¡Gran trabajo! 🔥"', time: 'hace 3h', read: false },
  { id: '3', type: 'follow', user: 'Laura S.', avatar: 'L', color: 'var(--grade-green)', message: 'comenzó a seguirte', time: 'hace 5h', read: true },
  { id: '4', type: 'achievement', user: 'Sistema', avatar: '🏆', color: 'var(--sputnik-gold)', message: 'Desbloqueaste el logro "En racha"', time: 'hace 1d', read: true },
  { id: '5', type: 'boulder', user: 'Sputnik', avatar: '🧗', color: 'var(--grade-purple)', message: '5 nuevos bloques añadidos en Sector B', time: 'hace 2d', read: true },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('todas')

  const tabs: { key: TabType; label: string }[] = [
    { key: 'todas', label: 'Todas' },
    { key: 'menciones', label: 'Menciones' },
    { key: 'actividad', label: 'Actividad' },
  ]

  const unreadCount = mockNotifications.filter(n => !n.read).length

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 px-5 bg-[var(--bg-surface)]">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Notificaciones</h1>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[var(--grade-red)] font-mono text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <button className="font-body text-sm text-[var(--sputnik-teal)]">Marcar leídas</button>
      </header>

      {/* Tabs */}
      <div className="flex px-5 border-b border-[var(--border-subtle)]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 h-11 flex items-center justify-center font-body text-sm ${
              activeTab === tab.key
                ? 'text-[var(--sputnik-teal)] font-semibold border-b-2 border-[var(--sputnik-teal)]'
                : 'text-[var(--text-secondary)] font-medium'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {mockNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-start gap-3 p-4 border-b border-[var(--border-subtle)] ${
              !notif.read ? 'bg-[var(--bg-surface)]' : ''
            }`}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-body text-lg flex-shrink-0"
              style={{ backgroundColor: typeof notif.color === 'string' && notif.color.startsWith('var') ? notif.color : 'var(--bg-elevated)' }}
            >
              {notif.avatar.length > 1 ? notif.avatar : notif.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-[var(--text-primary)]">
                <span className="font-semibold">{notif.user}</span>{' '}
                <span className="text-[var(--text-secondary)]">{notif.message}</span>
              </p>
              <span className="font-body text-xs text-[var(--text-muted)]">{notif.time}</span>
            </div>
            {!notif.read && (
              <div className="w-2 h-2 rounded-full bg-[var(--sputnik-teal)] flex-shrink-0 mt-2" />
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
