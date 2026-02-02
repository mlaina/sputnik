'use client'

import Link from 'next/link'

const settingsGroups = [
  {
    title: 'Cuenta',
    items: [
      { icon: 'user', label: 'Perfil', href: '/profile' },
      { icon: 'bell', label: 'Notificaciones', href: '/notifications' },
      { icon: 'lock', label: 'Privacidad', href: '/settings/privacy' },
    ],
  },
  {
    title: 'Aplicación',
    items: [
      { icon: 'palette', label: 'Apariencia', href: '/settings/appearance' },
      { icon: 'globe', label: 'Idioma', href: '/settings/language', value: 'Español' },
      { icon: 'wifi', label: 'Datos offline', href: '/settings/offline' },
    ],
  },
  {
    title: 'Soporte',
    items: [
      { icon: 'help', label: 'Ayuda', href: '/help' },
      { icon: 'message', label: 'Contacto', href: '/contact' },
      { icon: 'info', label: 'Acerca de', href: '/about' },
    ],
  },
]

const iconPaths: Record<string, string> = {
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  bell: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  lock: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  palette: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  globe: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  wifi: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
  help: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  message: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center gap-3 h-14 px-5">
        <Link href="/profile" className="text-[var(--text-primary)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Ajustes</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-4">
        {settingsGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <h2 className="font-body text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
              {group.title}
            </h2>
            <div className="rounded-2xl bg-[var(--bg-surface)] overflow-hidden">
              {group.items.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3.5 ${
                    index !== group.items.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[item.icon]} />
                    </svg>
                  </div>
                  <span className="flex-1 font-body text-[15px] text-[var(--text-primary)]">{item.label}</span>
                  {item.value && (
                    <span className="font-body text-sm text-[var(--text-tertiary)]">{item.value}</span>
                  )}
                  <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button className="w-full py-3.5 rounded-2xl bg-[var(--bg-surface)] font-body text-[15px] text-[var(--grade-red)]">
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
