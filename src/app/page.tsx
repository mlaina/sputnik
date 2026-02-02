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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Filters */}
      <div className="space-y-4 mb-6">
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
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyUnsent}
                onChange={(e) => setShowOnlyUnsent(e.target.checked)}
                className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              Solo sin enviar
            </label>
          )}
        </div>

        {/* View toggle */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            {filteredBoulders.length} bloques encontrados
          </p>
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Mapa
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'map' ? (
        <div className="h-[600px]">
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
  )
}
