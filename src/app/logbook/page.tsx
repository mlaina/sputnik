'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/Auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { Boulder, Ascent } from '@/types'
import { GRADES, GRADE_LIST, GradeInfo } from '@/lib/constants/grades'
import { BoulderCard } from '@/components/Boulder/BoulderCard'

interface AscentWithBoulder extends Ascent {
  boulder: Boulder
}

export default function LogbookPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [ascents, setAscents] = useState<AscentWithBoulder[]>([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    async function fetchAscents() {
      if (!user) return

      const { data } = await supabase
        .from('ascents')
        .select('*, boulder:boulders(*, sector:sectors(*))')
        .eq('user_id', user.id)
        .order('sent_at', { ascending: false })

      if (data) {
        setAscents(data as AscentWithBoulder[])
      }
      setLoadingData(false)
    }

    if (user) {
      fetchAscents()
    }
  }, [supabase, user])

  if (loading || loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) return null

  // Calculate stats
  const stats = {
    total: ascents.length,
    byGrade: GRADE_LIST.reduce((acc, grade) => {
      acc[grade.color] = ascents.filter((a) => a.boulder.grade === grade.color).length
      return acc
    }, {} as Record<string, number>),
  }

  const maxGrade = GRADE_LIST.slice()
    .reverse()
    .find((grade) => stats.byGrade[grade.color] > 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-white mb-8">Mi Logbook</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-4xl font-bold text-white">{stats.total}</p>
          <p className="text-gray-400">Bloques enviados</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-4xl font-bold text-white">
            {maxGrade ? maxGrade.range : '-'}
          </p>
          <p className="text-gray-400">Grado maximo</p>
        </div>
      </div>

      {/* Grade distribution */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Distribucion por grado</h2>
        <div className="flex flex-wrap gap-3">
          {GRADE_LIST.map((grade) => {
            const count = stats.byGrade[grade.color]
            return (
              <div
                key={grade.color}
                className="flex items-center gap-2"
              >
                <span
                  className="px-3 py-1 rounded text-sm font-bold"
                  style={{ backgroundColor: grade.hex, color: grade.textColor }}
                >
                  {grade.range}
                </span>
                <span className="text-white font-medium">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Ascents list */}
      <h2 className="text-lg font-semibold text-white mb-4">Historial de envios</h2>

      {ascents.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 mb-4">Aun no has enviado ningun bloque</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Explorar bloques
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {ascents.map((ascent) => {
            const grade = GRADES[ascent.boulder.grade]
            return (
              <Link
                key={ascent.id}
                href={`/boulder/${ascent.boulder.id}`}
                className="block bg-gray-800 hover:bg-gray-750 rounded-lg p-4 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span
                      className="px-3 py-1 rounded text-sm font-bold"
                      style={{ backgroundColor: grade.hex, color: grade.textColor }}
                    >
                      {grade.range}
                    </span>
                    <div>
                      <p className="text-white font-medium">{ascent.boulder.name}</p>
                      <p className="text-sm text-gray-400">
                        {ascent.boulder.sector?.name || 'Sin sector'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      {new Date(ascent.sent_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
