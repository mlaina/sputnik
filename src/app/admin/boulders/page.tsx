'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/components/Auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { Boulder, Sector, GradeColor } from '@/types'
import { GRADES, GRADE_LIST } from '@/lib/constants/grades'
import { Modal } from '@/components/ui/Modal'

export default function AdminBouldersPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [boulders, setBoulders] = useState<Boulder[]>([])
  const [sectors, setSectors] = useState<Sector[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBoulder, setEditingBoulder] = useState<Boulder | null>(null)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    grade: 'verde' as GradeColor,
    hold_color: '',
    sector_id: '',
    description: '',
    setter: '',
    image: null as File | null,
  })

  useEffect(() => {
    if (!loading && (!user || !profile?.is_admin)) {
      router.push('/')
    }
  }, [user, profile, loading, router])

  useEffect(() => {
    async function fetchData() {
      const [bouldersRes, sectorsRes] = await Promise.all([
        supabase
          .from('boulders')
          .select('*, sector:sectors(*)')
          .order('created_at', { ascending: false }),
        supabase.from('sectors').select('*').order('name'),
      ])

      if (bouldersRes.data) setBoulders(bouldersRes.data)
      if (sectorsRes.data) setSectors(sectorsRes.data)
    }

    if (profile?.is_admin) {
      fetchData()
    }
  }, [supabase, profile])

  const openCreateModal = () => {
    setEditingBoulder(null)
    setFormData({
      name: '',
      grade: 'verde',
      hold_color: '',
      sector_id: sectors[0]?.id || '',
      description: '',
      setter: '',
      image: null,
    })
    setIsModalOpen(true)
  }

  const openEditModal = (boulder: Boulder) => {
    setEditingBoulder(boulder)
    setFormData({
      name: boulder.name,
      grade: boulder.grade,
      hold_color: boulder.hold_color,
      sector_id: boulder.sector_id,
      description: boulder.description || '',
      setter: boulder.setter || '',
      image: null,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    let image_url = editingBoulder?.image_url || null

    // Upload image if new one selected
    if (formData.image) {
      const fileExt = formData.image.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('boulders')
        .upload(fileName, formData.image)

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('boulders')
          .getPublicUrl(fileName)
        image_url = publicUrl
      }
    }

    const gradeInfo = GRADES[formData.grade]
    const boulderData = {
      name: formData.name,
      grade: formData.grade,
      grade_range: gradeInfo.range,
      hold_color: formData.hold_color,
      sector_id: formData.sector_id || null,
      description: formData.description || null,
      setter: formData.setter || null,
      image_url,
    }

    if (editingBoulder) {
      const { data } = await supabase
        .from('boulders')
        .update(boulderData)
        .eq('id', editingBoulder.id)
        .select('*, sector:sectors(*)')
        .single()

      if (data) {
        setBoulders((prev) =>
          prev.map((b) => (b.id === data.id ? data : b))
        )
      }
    } else {
      const { data } = await supabase
        .from('boulders')
        .insert(boulderData)
        .select('*, sector:sectors(*)')
        .single()

      if (data) {
        setBoulders((prev) => [data, ...prev])
      }
    }

    setIsModalOpen(false)
    setSaving(false)
  }

  const handleDelete = async (boulder: Boulder) => {
    if (!confirm(`Eliminar bloque "${boulder.name}"?`)) return

    await supabase.from('boulders').delete().eq('id', boulder.id)
    setBoulders((prev) => prev.filter((b) => b.id !== boulder.id))
  }

  const toggleActive = async (boulder: Boulder) => {
    const { data } = await supabase
      .from('boulders')
      .update({ is_active: !boulder.is_active })
      .eq('id', boulder.id)
      .select('*, sector:sectors(*)')
      .single()

    if (data) {
      setBoulders((prev) =>
        prev.map((b) => (b.id === data.id ? data : b))
      )
    }
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
          <h1 className="text-3xl font-bold text-white">Gestionar Bloques</h1>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Nuevo Bloque
        </button>
      </div>

      {/* Boulders list */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Imagen</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Nombre</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Grado</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Sector</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Estado</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {boulders.map((boulder) => {
              const grade = GRADES[boulder.grade]
              return (
                <tr key={boulder.id} className="hover:bg-gray-750">
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 rounded bg-gray-700 overflow-hidden">
                      {boulder.image_url && (
                        <Image
                          src={boulder.image_url}
                          alt={boulder.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white">{boulder.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded text-xs font-bold"
                      style={{ backgroundColor: grade.hex, color: grade.textColor }}
                    >
                      {grade.range}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {boulder.sector?.name || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(boulder)}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        boulder.is_active
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {boulder.is_active ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEditModal(boulder)}
                      className="text-blue-400 hover:text-blue-300 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(boulder)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {boulders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hay bloques creados
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBoulder ? 'Editar Bloque' : 'Nuevo Bloque'}
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

          <div>
            <label className="block text-sm text-gray-400 mb-1">Grado</label>
            <div className="flex flex-wrap gap-2">
              {GRADE_LIST.map((grade) => (
                <button
                  key={grade.color}
                  type="button"
                  onClick={() => setFormData({ ...formData, grade: grade.color })}
                  className={`px-3 py-1.5 rounded text-sm font-bold transition-all ${
                    formData.grade === grade.color
                      ? 'ring-2 ring-white'
                      : 'opacity-50 hover:opacity-75'
                  }`}
                  style={{ backgroundColor: grade.hex, color: grade.textColor }}
                >
                  {grade.range}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Color de presas</label>
            <input
              type="text"
              required
              placeholder="ej: rojas, azules"
              value={formData.hold_color}
              onChange={(e) => setFormData({ ...formData, hold_color: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Sector</label>
            <select
              value={formData.sector_id}
              onChange={(e) => setFormData({ ...formData, sector_id: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Sin sector</option>
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Equipador</label>
            <input
              type="text"
              value={formData.setter}
              onChange={(e) => setFormData({ ...formData, setter: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Descripcion</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files?.[0] || null })
              }
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            {saving ? 'Guardando...' : editingBoulder ? 'Guardar cambios' : 'Crear bloque'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
