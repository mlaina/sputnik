'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/Auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { Sector } from '@/types'
import { Modal } from '@/components/ui/Modal'

export default function AdminSectorsPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [sectors, setSectors] = useState<Sector[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSector, setEditingSector] = useState<Sector | null>(null)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    position_x: 0,
    position_y: 0,
    svg_path: '',
  })

  useEffect(() => {
    if (!loading && (!user || !profile?.is_admin)) {
      router.push('/')
    }
  }, [user, profile, loading, router])

  useEffect(() => {
    async function fetchSectors() {
      const { data } = await supabase
        .from('sectors')
        .select('*')
        .order('name')

      if (data) setSectors(data)
    }

    if (profile?.is_admin) {
      fetchSectors()
    }
  }, [supabase, profile])

  const openCreateModal = () => {
    setEditingSector(null)
    setFormData({
      name: '',
      position_x: 0,
      position_y: 0,
      svg_path: '',
    })
    setIsModalOpen(true)
  }

  const openEditModal = (sector: Sector) => {
    setEditingSector(sector)
    setFormData({
      name: sector.name,
      position_x: sector.position_x,
      position_y: sector.position_y,
      svg_path: sector.svg_path || '',
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const sectorData = {
      name: formData.name,
      position_x: formData.position_x,
      position_y: formData.position_y,
      svg_path: formData.svg_path || null,
    }

    if (editingSector) {
      const { data } = await supabase
        .from('sectors')
        .update(sectorData)
        .eq('id', editingSector.id)
        .select()
        .single()

      if (data) {
        setSectors((prev) =>
          prev.map((s) => (s.id === data.id ? data : s))
        )
      }
    } else {
      const { data } = await supabase
        .from('sectors')
        .insert(sectorData)
        .select()
        .single()

      if (data) {
        setSectors((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)))
      }
    }

    setIsModalOpen(false)
    setSaving(false)
  }

  const handleDelete = async (sector: Sector) => {
    if (!confirm(`Eliminar sector "${sector.name}"? Los bloques asociados quedaran sin sector.`)) return

    await supabase.from('sectors').delete().eq('id', sector.id)
    setSectors((prev) => prev.filter((s) => s.id !== sector.id))
  }

  if (loading || !profile?.is_admin) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-white">Gestionar Sectores</h1>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Nuevo Sector
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
        <p className="text-blue-400 text-sm">
          Los sectores definen las zonas del mapa. La posicion X/Y indica donde se colocaran los marcadores de bloques.
          El SVG Path (opcional) permite definir areas clickeables en el mapa.
        </p>
      </div>

      {/* Sectors list */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Nombre</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Posicion</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">SVG Path</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sectors.map((sector) => (
              <tr key={sector.id} className="hover:bg-gray-750">
                <td className="px-4 py-3 text-white">{sector.name}</td>
                <td className="px-4 py-3 text-gray-400">
                  X: {sector.position_x}, Y: {sector.position_y}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {sector.svg_path ? (
                    <span className="text-green-400">Definido</span>
                  ) : (
                    <span className="text-gray-500">No definido</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => openEditModal(sector)}
                    className="text-blue-400 hover:text-blue-300 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(sector)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sectors.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hay sectores creados
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSector ? 'Editar Sector' : 'Nuevo Sector'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nombre</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Posicion X</label>
              <input
                type="number"
                value={formData.position_x}
                onChange={(e) =>
                  setFormData({ ...formData, position_x: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Posicion Y</label>
              <input
                type="number"
                value={formData.position_y}
                onChange={(e) =>
                  setFormData({ ...formData, position_y: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">SVG Path (opcional)</label>
            <textarea
              value={formData.svg_path}
              onChange={(e) => setFormData({ ...formData, svg_path: e.target.value })}
              rows={3}
              placeholder="M 100 100 L 200 100 L 200 200 L 100 200 Z"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Define el area clickeable del sector en formato SVG path
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            {saving ? 'Guardando...' : editingSector ? 'Guardar cambios' : 'Crear sector'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
