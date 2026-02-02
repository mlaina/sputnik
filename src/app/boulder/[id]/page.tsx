'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/Auth/AuthProvider'
import { Boulder, Ascent } from '@/types'
import { GRADES } from '@/lib/constants/grades'

export default function BoulderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const supabase = createClient()

  const [boulder, setBoulder] = useState<Boulder | null>(null)
  const [userAscent, setUserAscent] = useState<Ascent | null>(null)
  const [ascentCount, setAscentCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    async function fetchBoulder() {
      const { data: boulder } = await supabase
        .from('boulders')
        .select('*, sector:sectors(*)')
        .eq('id', params.id)
        .single()

      if (!boulder) {
        router.push('/')
        return
      }

      setBoulder(boulder)

      // Get ascent count
      const { count } = await supabase
        .from('ascents')
        .select('*', { count: 'exact', head: true })
        .eq('boulder_id', params.id)

      setAscentCount(count || 0)

      // Get user's ascent
      if (user) {
        const { data: ascent } = await supabase
          .from('ascents')
          .select('*')
          .eq('boulder_id', params.id)
          .eq('user_id', user.id)
          .single()

        setUserAscent(ascent)
      }

      setLoading(false)
    }

    fetchBoulder()
  }, [params.id, supabase, user, router])

  const handleSend = async () => {
    if (!user || !boulder) return

    setSending(true)

    if (userAscent) {
      // Remove ascent
      await supabase.from('ascents').delete().eq('id', userAscent.id)
      setUserAscent(null)
      setAscentCount((prev) => prev - 1)
    } else {
      // Add ascent
      const { data } = await supabase
        .from('ascents')
        .insert({
          user_id: user.id,
          boulder_id: boulder.id,
        })
        .select()
        .single()

      if (data) {
        setUserAscent(data)
        setAscentCount((prev) => prev + 1)
      }
    }

    setSending(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!boulder) return null

  const grade = GRADES[boulder.grade]

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver al mapa
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-800">
          {boulder.image_url ? (
            <Image
              src={boulder.image_url}
              alt={boulder.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Sin imagen
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{boulder.name}</h1>
            <div className="flex items-center gap-3">
              <span
                className="px-4 py-2 rounded-lg text-lg font-bold"
                style={{
                  backgroundColor: grade.hex,
                  color: grade.textColor,
                }}
              >
                {grade.range}
              </span>
              <span className="text-gray-400">
                Presas {boulder.hold_color}
              </span>
            </div>
          </div>

          {boulder.sector && (
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Sector</h3>
              <p className="text-white">{boulder.sector.name}</p>
            </div>
          )}

          {boulder.description && (
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Descripcion</h3>
              <p className="text-gray-300">{boulder.description}</p>
            </div>
          )}

          {boulder.setter && (
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Equipador</h3>
              <p className="text-white">{boulder.setter}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm text-gray-500 mb-1">Estadisticas</h3>
            <p className="text-white">{ascentCount} envios</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-1">Fecha de creacion</h3>
            <p className="text-white">
              {new Date(boulder.created_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* Send button */}
          {user ? (
            <button
              onClick={handleSend}
              disabled={sending}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                userAscent
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {sending
                ? 'Guardando...'
                : userAscent
                ? 'Enviado - Click para desmarcar'
                : 'Marcar como enviado'}
            </button>
          ) : (
            <Link
              href="/login"
              className="block w-full py-4 rounded-xl font-bold text-lg text-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            >
              Inicia sesion para marcar envios
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
