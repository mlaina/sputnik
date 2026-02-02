'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/Auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'

export default function AdminPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [stats, setStats] = useState({
    boulders: 0,
    sectors: 0,
    users: 0,
    ascents: 0,
  })

  useEffect(() => {
    if (!loading && (!user || !profile?.is_admin)) {
      router.push('/')
    }
  }, [user, profile, loading, router])

  useEffect(() => {
    async function fetchStats() {
      const [boulders, sectors, users, ascents] = await Promise.all([
        supabase.from('boulders').select('*', { count: 'exact', head: true }),
        supabase.from('sectors').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('ascents').select('*', { count: 'exact', head: true }),
      ])

      setStats({
        boulders: boulders.count || 0,
        sectors: sectors.count || 0,
        users: users.count || 0,
        ascents: ascents.count || 0,
      })
    }

    if (profile?.is_admin) {
      fetchStats()
    }
  }, [supabase, profile])

  if (loading || !profile?.is_admin) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-white mb-8">Panel de Administracion</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-3xl font-bold text-white">{stats.boulders}</p>
          <p className="text-gray-400">Bloques</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-3xl font-bold text-white">{stats.sectors}</p>
          <p className="text-gray-400">Sectores</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-3xl font-bold text-white">{stats.users}</p>
          <p className="text-gray-400">Usuarios</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-3xl font-bold text-white">{stats.ascents}</p>
          <p className="text-gray-400">Envios totales</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/map-editor"
          className="bg-blue-600 hover:bg-blue-700 rounded-lg p-6 transition-colors"
        >
          <h2 className="text-xl font-semibold text-white mb-2">Editor de Mapa</h2>
          <p className="text-blue-200">Dibujar zonas y colocar sectores visualmente</p>
        </Link>

        <Link
          href="/admin/boulders"
          className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors"
        >
          <h2 className="text-xl font-semibold text-white mb-2">Gestionar Bloques</h2>
          <p className="text-gray-400">Crear, editar y eliminar bloques del rocodromo</p>
        </Link>

        <Link
          href="/admin/sectors"
          className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors"
        >
          <h2 className="text-xl font-semibold text-white mb-2">Gestionar Sectores</h2>
          <p className="text-gray-400">Configurar las zonas del mapa</p>
        </Link>
      </div>
    </div>
  )
}
