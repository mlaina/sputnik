'use client'

import Link from 'next/link'

const screens = [
  { category: 'Principal', items: [
    { name: '01 - Mapa', href: '/', status: 'done' },
    { name: '03 - Login', href: '/login', status: 'done' },
    { name: '04 - Detalle Bloque', href: '/boulder/1', status: 'done' },
    { name: '19/20 - Onboarding', href: '/onboarding', status: 'done' },
  ]},
  { category: 'Perfil & Progreso', items: [
    { name: '09 - Perfil Usuario', href: '/profile', status: 'done' },
    { name: '10 - Historial Perfil', href: '/profile/history', status: 'done' },
    { name: '11 - Detalle Grado', href: '/grade/green', status: 'done' },
    { name: '12 - Dashboard Progreso', href: '/progress', status: 'done' },
    { name: '13 - Estadísticas Estilo', href: '/statistics/style', status: 'done' },
    { name: '22/24 - Logros', href: '/achievements', status: 'done' },
    { name: '26 - Estadísticas', href: '/statistics', status: 'done' },
  ]},
  { category: 'Social', items: [
    { name: '14 - Actividad Amigos', href: '/friends', status: 'done' },
    { name: '24 - Leaderboard', href: '/leaderboard', status: 'done' },
    { name: '25/30 - Notificaciones', href: '/notifications', status: 'done' },
    { name: '26 - Perfil Equipador', href: '/setter/1', status: 'done' },
    { name: '31 - Feed Comunidad', href: '/community', status: 'done' },
    { name: '34 - Ubicación Amigos', href: '/friends/location', status: 'done' },
  ]},
  { category: 'Bloques & Sectores', items: [
    { name: '22 - Lista Bloques', href: '/boulders', status: 'done' },
    { name: '23 - Detalle Sector', href: '/sector/a', status: 'done' },
    { name: '25 - Búsqueda', href: '/search', status: 'done' },
    { name: '28 - Detalle Zona', href: '/zone/a', status: 'done' },
    { name: '29 - Ubicación Bloque', href: '/boulder/1/location', status: 'done' },
    { name: '33 - Bloques Nuevos', href: '/boulders/new', status: 'done' },
  ]},
  { category: 'Mapa & Filtros', items: [
    { name: '30 - Filtros Mapa', href: '/map/filters', status: 'done' },
    { name: '31 - Vista Heatmap', href: '/map/heatmap', status: 'done' },
    { name: '32 - Planificador Ruta', href: '/map/planner', status: 'done' },
    { name: '35 - Vista 3D', href: '/map/3d', status: 'done' },
  ]},
  { category: 'Media & Contenido', items: [
    { name: '05 - Galería Fotos', href: '/boulder/1/gallery', status: 'done' },
    { name: '06 - Compartir Instagram', href: '/share', status: 'done' },
    { name: '07 - Subir Video', href: '/upload', status: 'done' },
    { name: '23 - Comentarios Bloque', href: '/boulder/1/comments', status: 'done' },
  ]},
  { category: 'Sesión & Entrenamiento', items: [
    { name: '08 - Contador Intentos', href: '/session/tries', status: 'done' },
    { name: '21 - Tracker Sesión', href: '/session', status: 'done' },
    { name: '27 - Sugerencias Workout', href: '/workout', status: 'done' },
  ]},
  { category: 'Configuración', items: [
    { name: '15/29 - Ajustes', href: '/settings', status: 'done' },
    { name: '27 - Eventos', href: '/events', status: 'done' },
    { name: '28 - Guía Grados', href: '/grades', status: 'done' },
  ]},
  { category: 'Herramientas', items: [
    { name: '18 - Escáner Bloque', href: '/scanner', status: 'done' },
  ]},
]

export default function DevNavigationPage() {
  const totalScreens = screens.reduce((acc, cat) => acc + cat.items.length, 0)
  const doneScreens = screens.reduce((acc, cat) => acc + cat.items.filter(i => i.status === 'done').length, 0)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-2">
            🚀 Sputnik - Navegación Dev
          </h1>
          <p className="font-body text-[var(--text-secondary)]">
            Todas las pantallas definidas en Pencil
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--grade-green)]" />
              <span className="font-mono text-sm text-[var(--text-secondary)]">Implementado ({doneScreens})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--text-muted)]" />
              <span className="font-mono text-sm text-[var(--text-secondary)]">Pendiente ({totalScreens - doneScreens})</span>
            </div>
          </div>
          <div className="mt-2 h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
            <div
              className="h-full bg-[var(--grade-green)]"
              style={{ width: `${(doneScreens / totalScreens) * 100}%` }}
            />
          </div>
          <span className="font-mono text-xs text-[var(--text-tertiary)]">
            {Math.round((doneScreens / totalScreens) * 100)}% completado
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {screens.map((category) => (
            <div key={category.category} className="rounded-2xl bg-[var(--bg-surface)] p-5">
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-4">
                {category.category}
              </h2>
              <div className="flex flex-col gap-2">
                {category.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                      item.status === 'done'
                        ? 'bg-[var(--bg-elevated)] hover:bg-[var(--border-muted)]'
                        : 'bg-[var(--bg-primary)] opacity-60'
                    }`}
                  >
                    <span className="font-body text-sm text-[var(--text-primary)]">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[var(--text-tertiary)]">{item.href}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'done' ? 'bg-[var(--grade-green)]' : 'bg-[var(--text-muted)]'
                      }`} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
