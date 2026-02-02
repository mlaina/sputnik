'use client'

import { useState } from 'react'
import Link from 'next/link'

const quickLinks = [
  { name: 'Perfil', href: '/profile', icon: '👤' },
  { name: 'Historial', href: '/profile/history', icon: '📜' },
  { name: 'Leaderboard', href: '/leaderboard', icon: '🏆' },
  { name: 'Amigos', href: '/friends', icon: '👥' },
  { name: 'Amigos Gym', href: '/friends/location', icon: '📍' },
  { name: 'Logros', href: '/achievements', icon: '⭐' },
  { name: 'Estadísticas', href: '/statistics', icon: '📊' },
  { name: 'Estilos', href: '/statistics/style', icon: '🎨' },
  { name: 'Progreso', href: '/progress', icon: '📈' },
  { name: 'Bloques', href: '/boulders', icon: '🧗' },
  { name: 'Nuevos', href: '/boulders/new', icon: '✨' },
  { name: 'Buscar', href: '/search', icon: '🔍' },
  { name: 'Sectores', href: '/sector/a', icon: '📍' },
  { name: 'Zona', href: '/zone/a', icon: '🗺️' },
  { name: 'Eventos', href: '/events', icon: '📅' },
  { name: 'Sesión', href: '/session', icon: '⏱️' },
  { name: 'Intentos', href: '/session/tries', icon: '🔢' },
  { name: 'Workout', href: '/workout', icon: '💪' },
  { name: 'Comunidad', href: '/community', icon: '💬' },
  { name: 'Notificaciones', href: '/notifications', icon: '🔔' },
  { name: 'Equipador', href: '/setter/1', icon: '🎯' },
  { name: 'Guía Grados', href: '/grades', icon: '📚' },
  { name: 'Grado', href: '/grade/green', icon: '🟢' },
  { name: 'Mapa Calor', href: '/map/heatmap', icon: '🔥' },
  { name: 'Circuito', href: '/map/planner', icon: '🛤️' },
  { name: 'Filtros Mapa', href: '/map/filters', icon: '⚡' },
  { name: 'Muro 3D', href: '/map/3d', icon: '🧱' },
  { name: 'Galería', href: '/boulder/1/gallery', icon: '🖼️' },
  { name: 'Comentarios', href: '/boulder/1/comments', icon: '💭' },
  { name: 'Ubicación', href: '/boulder/1/location', icon: '📌' },
  { name: 'Scanner', href: '/scanner', icon: '📷' },
  { name: 'Compartir', href: '/share', icon: '📤' },
  { name: 'Subir Video', href: '/upload', icon: '🎥' },
  { name: 'Ajustes', href: '/settings', icon: '⚙️' },
  { name: 'Onboarding', href: '/onboarding', icon: '🚀' },
  { name: 'Dev Menu', href: '/dev', icon: '🛠️' },
]

export function QuickLinksMenu() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowMenu(true)}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-[var(--sputnik-teal)] shadow-lg flex items-center justify-center z-40"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menu Drawer */}
      {showMenu && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[var(--bg-surface)] rounded-t-3xl max-h-[80vh] overflow-auto">
            <div className="sticky top-0 bg-[var(--bg-surface)] px-5 py-4 border-b border-[var(--border-muted)] flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">Navegación rápida</h2>
              <button
                onClick={() => setShowMenu(false)}
                className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 p-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setShowMenu(false)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--border-muted)] transition-colors"
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="font-body text-xs text-[var(--text-secondary)] text-center">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
