'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/Auth/AuthProvider'
import { InteractiveMap } from '@/components/Map/InteractiveMap'
import { BoulderList } from '@/components/Boulder/BoulderList'
import { GradeFilter } from '@/components/Filters/GradeFilter'
import { SectorFilter } from '@/components/Filters/SectorFilter'
import { Modal } from '@/components/ui/Modal'
import { Boulder, Sector, GradeColor } from '@/types'
import { GRADES } from '@/lib/constants/grades'
import Link from 'next/link'
import Image from 'next/image'
import { BottomNav } from '@/components/ui/BottomNav'

type ViewMode = 'map' | 'list'

export default function HomePage() {
  const { user } = useAuth()
  const supabase = createClient()

  const [boulders, setBoulders] = useState<Boulder[]>([])
  const [sectors, setSectors] = useState<Sector[]>([])
  const [userAscents, setUserAscents] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  const [viewMode, setViewMode] = useState<ViewMode>('map')
  const [selectedGrades, setSelectedGrades] = useState<GradeColor[]>([])
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [showOnlyUnsent, setShowOnlyUnsent] = useState(false)

  const [selectedBoulder, setSelectedBoulder] = useState<Boulder | null>(null)

  useEffect(() => {
    async function fetchData() {
      const [bouldersRes, sectorsRes] = await Promise.all([
        supabase
          .from('boulders')
          .select('*, sector:sectors(*)')
          .eq('is_active', true)
          .order('created_at', { ascending: false }),
        supabase.from('sectors').select('*').order('name'),
      ])

      if (bouldersRes.data) {
        // Get ascent counts
        const { data: ascentCounts } = await supabase
          .from('ascents')
          .select('boulder_id')

        const countMap = new Map<string, number>()
        ascentCounts?.forEach((a) => {
          countMap.set(a.boulder_id, (countMap.get(a.boulder_id) || 0) + 1)
        })

        const bouldersWithCounts = bouldersRes.data.map((b) => ({
          ...b,
          ascent_count: countMap.get(b.id) || 0,
        }))
        setBoulders(bouldersWithCounts)
      }

      if (sectorsRes.data) setSectors(sectorsRes.data)

      if (user) {
        const { data: ascents } = await supabase
          .from('ascents')
          .select('boulder_id')
          .eq('user_id', user.id)

        if (ascents) {
          setUserAscents(new Set(ascents.map((a) => a.boulder_id)))
        }
      }

      setLoading(false)
    }

    fetchData()
  }, [supabase, user])

  const filteredBoulders = boulders.filter((boulder) => {
    if (selectedGrades.length > 0 && !selectedGrades.includes(boulder.grade)) {
      return false
    }
    if (selectedSector && boulder.sector_id !== selectedSector) {
      return false
    }
    if (showOnlyUnsent && userAscents.has(boulder.id)) {
      return false
    }
    return true
  })

  const handleBoulderClick = (boulder: Boulder) => {
    setSelectedBoulder(boulder)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const quickNavItems = [
    { name: 'Sesion', href: '/session', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ), color: 'var(--sputnik-teal)' },
    { name: 'Circuito', href: '/map/planner', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ), color: 'var(--sputnik-gold)' },
    { name: 'Nuevos', href: '/boulders/new', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ), color: 'var(--grade-green)' },
    { name: 'Amigos', href: '/friends/location', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ), color: '#8B5CF6' },
    { name: 'Mapa Calor', href: '/map/heatmap', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ), color: '#EF4444' },
    { name: 'Scanner', href: '/scanner', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ), color: '#EC4899' },
    { name: 'Estadisticas', href: '/statistics', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ), color: 'var(--grade-blue)' },
    { name: 'Perfil', href: '/profile', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ), color: '#F59E0B' },
  ]

  return (
    <div className="flex flex-col h-full">
    <div className="flex-1 overflow-auto max-w-7xl mx-auto px-4 pt-4 pb-6 w-full">
      {/* Quick Navigation */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {quickNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <div style={{ color: item.color }}>{item.icon}</div>
            </div>
            <span className="font-body text-xs text-[var(--text-secondary)] text-center">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <GradeFilter selected={selectedGrades} onChange={setSelectedGrades} />
          <SectorFilter
            sectors={sectors}
            selected={selectedSector}
            onChange={setSelectedSector}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {user && (
            <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyUnsent}
                onChange={(e) => setShowOnlyUnsent(e.target.checked)}
                className="rounded bg-[var(--bg-elevated)] border-[var(--border-muted)] text-[var(--sputnik-teal)] focus:ring-[var(--sputnik-teal)]"
              />
              Solo sin enviar
            </label>
          )}
        </div>

        {/* View toggle */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--text-tertiary)]">
            {filteredBoulders.length} bloques
          </p>
          <div className="flex bg-[var(--bg-surface)] rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-[var(--sputnik-teal)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-[var(--sputnik-teal)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Mapa
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'map' ? (
        <div className="h-[400px] rounded-2xl overflow-hidden">
          <InteractiveMap
            mapImageUrl="/map/sputnik-map.jpg"
            sectors={sectors}
            boulders={filteredBoulders}
            userAscents={userAscents}
            onBoulderClick={handleBoulderClick}
          />
        </div>
      ) : (
        <BoulderList
          boulders={filteredBoulders}
          userAscents={userAscents}
          showSector
        />
      )}

      {/* Boulder preview modal */}
      <Modal
        isOpen={!!selectedBoulder}
        onClose={() => setSelectedBoulder(null)}
        title={selectedBoulder?.name}
      >
        {selectedBoulder && (
          <div className="space-y-4">
            {selectedBoulder.image_url && (
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={selectedBoulder.image_url}
                  alt={selectedBoulder.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 rounded text-sm font-bold"
                style={{
                  backgroundColor: GRADES[selectedBoulder.grade].hex,
                  color: GRADES[selectedBoulder.grade].textColor,
                }}
              >
                {GRADES[selectedBoulder.grade].range}
              </span>
              <span className="text-gray-400">
                Presas {selectedBoulder.hold_color}
              </span>
            </div>

            {selectedBoulder.description && (
              <p className="text-gray-300">{selectedBoulder.description}</p>
            )}

            <div className="flex items-center justify-between text-sm text-gray-400">
              {selectedBoulder.setter && <span>by {selectedBoulder.setter}</span>}
              <span>{selectedBoulder.ascent_count} envios</span>
            </div>

            <Link
              href={`/boulder/${selectedBoulder.id}`}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Ver detalle
            </Link>
          </div>
        )}
      </Modal>
    </div>
    <BottomNav />
    </div>
  )
}
