'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/Auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { Sector } from '@/types'

type Tool = 'select' | 'draw' | 'place' | 'ai'

interface Point {
  x: number
  y: number
}

interface DetectedSegment {
  points: Point[]
  name: string
}

export default function MapEditorPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [sectors, setSectors] = useState<Sector[]>([])
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null)
  const [tool, setTool] = useState<Tool>('select')
  const [currentPoints, setCurrentPoints] = useState<Point[]>([])
  const [newSectorName, setNewSectorName] = useState('')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  // AI detection states
  const [aiLoading, setAiLoading] = useState(false)
  const [aiClickPoint, setAiClickPoint] = useState<Point | null>(null)
  const [detectedSegments, setDetectedSegments] = useState<DetectedSegment[]>([])
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!loading && (!user || !profile?.is_admin)) {
      router.push('/')
    }
  }, [user, profile, loading, router])

  useEffect(() => {
    async function fetchSectors() {
      const { data } = await supabase.from('sectors').select('*').order('name')
      if (data) setSectors(data)
    }
    if (profile?.is_admin) fetchSectors()
  }, [supabase, profile])

  useEffect(() => {
    const img = new Image()
    img.src = '/map/sputnik-map.jpg'
    img.onload = () => {
      setImage(img)
      setImageLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !image || !imageLoaded) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = image.width
    canvas.height = image.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0)

    // Draw existing sectors
    sectors.forEach((sector) => {
      if (sector.svg_path) {
        const path = new Path2D(sector.svg_path)
        ctx.fillStyle = selectedSector?.id === sector.id
          ? 'rgba(59, 130, 246, 0.4)'
          : 'rgba(59, 130, 246, 0.2)'
        ctx.fill(path)
        ctx.strokeStyle = selectedSector?.id === sector.id
          ? 'rgba(59, 130, 246, 1)'
          : 'rgba(59, 130, 246, 0.6)'
        ctx.lineWidth = 2
        ctx.stroke(path)
      }

      ctx.beginPath()
      ctx.arc(sector.position_x, sector.position_y, 8, 0, Math.PI * 2)
      ctx.fillStyle = selectedSector?.id === sector.id ? '#3B82F6' : '#1F2937'
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.font = '14px sans-serif'
      ctx.fillStyle = '#fff'
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 3
      ctx.strokeText(sector.name, sector.position_x + 12, sector.position_y + 5)
      ctx.fillText(sector.name, sector.position_x + 12, sector.position_y + 5)
    })

    // Draw detected segments from AI
    detectedSegments.forEach((segment, index) => {
      if (segment.points.length > 2) {
        ctx.beginPath()
        ctx.moveTo(segment.points[0].x, segment.points[0].y)
        segment.points.forEach((point, i) => {
          if (i > 0) ctx.lineTo(point.x, point.y)
        })
        ctx.closePath()
        ctx.fillStyle = selectedSegmentIndex === index
          ? 'rgba(234, 179, 8, 0.4)'
          : 'rgba(234, 179, 8, 0.2)'
        ctx.fill()
        ctx.strokeStyle = selectedSegmentIndex === index
          ? 'rgba(234, 179, 8, 1)'
          : 'rgba(234, 179, 8, 0.6)'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    })

    // Draw AI click point
    if (aiClickPoint) {
      ctx.beginPath()
      ctx.arc(aiClickPoint.x, aiClickPoint.y, 10, 0, Math.PI * 2)
      ctx.fillStyle = '#EAB308'
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.stroke()
    }

    // Draw current drawing points
    if (currentPoints.length > 0) {
      ctx.beginPath()
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y)
      currentPoints.forEach((point, i) => {
        if (i > 0) ctx.lineTo(point.x, point.y)
      })
      ctx.strokeStyle = '#22C55E'
      ctx.lineWidth = 2
      ctx.stroke()

      currentPoints.forEach((point, i) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = i === 0 ? '#EF4444' : '#22C55E'
        ctx.fill()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      if (currentPoints.length > 2) {
        ctx.beginPath()
        ctx.moveTo(currentPoints[currentPoints.length - 1].x, currentPoints[currentPoints.length - 1].y)
        ctx.lineTo(currentPoints[0].x, currentPoints[0].y)
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)'
        ctx.setLineDash([5, 5])
        ctx.stroke()
        ctx.setLineDash([])
      }
    }
  }, [image, imageLoaded, sectors, selectedSector, currentPoints, detectedSegments, selectedSegmentIndex, aiClickPoint])

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: Math.round((e.clientX - rect.left) * scaleX),
      y: Math.round((e.clientY - rect.top) * scaleY),
    }
  }

  const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getCanvasCoordinates(e)

    if (tool === 'ai') {
      setAiClickPoint(point)
      await detectWithAI(point)
    } else if (tool === 'draw') {
      if (currentPoints.length > 2) {
        const firstPoint = currentPoints[0]
        const distance = Math.sqrt(
          Math.pow(point.x - firstPoint.x, 2) + Math.pow(point.y - firstPoint.y, 2)
        )
        if (distance < 15) return
      }
      setCurrentPoints([...currentPoints, point])
    } else if (tool === 'place') {
      if (selectedSector) {
        updateSectorPosition(selectedSector.id, point.x, point.y)
      }
    } else if (tool === 'select') {
      const clickedSector = sectors.find((sector) => {
        const distance = Math.sqrt(
          Math.pow(point.x - sector.position_x, 2) + Math.pow(point.y - sector.position_y, 2)
        )
        return distance < 20
      })
      setSelectedSector(clickedSector || null)
    }
  }

  const detectWithAI = async (point: Point) => {
    setAiLoading(true)
    setDetectedSegments([])
    setSelectedSegmentIndex(null)

    try {
      // Get the image as base64 data URL
      const canvas = canvasRef.current
      if (!canvas || !image) return

      // Create a temporary canvas to get clean image (without drawings)
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = image.width
      tempCanvas.height = image.height
      const tempCtx = tempCanvas.getContext('2d')
      if (!tempCtx) return
      tempCtx.drawImage(image, 0, 0)
      const imageDataUrl = tempCanvas.toDataURL('image/jpeg', 0.8)

      const response = await fetch('/api/analyze-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: imageDataUrl,
          points: [point],
        }),
      })

      const data = await response.json()

      if (data.error) {
        alert(`Error: ${data.error}`)
        return
      }

      // Process segments from SAM response
      if (data.segments) {
        // SAM returns masks - we need to convert them to polygon points
        // For now, show a message that the feature is processing
        const mockSegment: DetectedSegment = {
          points: generatePolygonAroundPoint(point, 50),
          name: `Sector ${sectors.length + 1}`,
        }
        setDetectedSegments([mockSegment])
        setSelectedSegmentIndex(0)
      }
    } catch (error) {
      console.error('AI detection error:', error)
      alert('Error al detectar con IA. Verifica que REPLICATE_API_TOKEN está configurado.')
    } finally {
      setAiLoading(false)
    }
  }

  // Helper to generate a polygon around a point (placeholder until SAM integration)
  const generatePolygonAroundPoint = (center: Point, radius: number): Point[] => {
    const points: Point[] = []
    const sides = 8
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2
      points.push({
        x: Math.round(center.x + Math.cos(angle) * radius),
        y: Math.round(center.y + Math.sin(angle) * radius),
      })
    }
    return points
  }

  const pointsToSvgPath = (points: Point[]): string => {
    if (points.length < 3) return ''
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    return `${path} Z`
  }

  const saveSector = async () => {
    if (!newSectorName || currentPoints.length < 3) return

    const svgPath = pointsToSvgPath(currentPoints)
    const centerX = Math.round(currentPoints.reduce((sum, p) => sum + p.x, 0) / currentPoints.length)
    const centerY = Math.round(currentPoints.reduce((sum, p) => sum + p.y, 0) / currentPoints.length)

    const { data } = await supabase
      .from('sectors')
      .insert({
        name: newSectorName,
        svg_path: svgPath,
        position_x: centerX,
        position_y: centerY,
      })
      .select()
      .single()

    if (data) {
      setSectors([...sectors, data])
      setCurrentPoints([])
      setNewSectorName('')
      setTool('select')
    }
  }

  const saveDetectedSegment = async () => {
    if (selectedSegmentIndex === null || !detectedSegments[selectedSegmentIndex]) return
    const segment = detectedSegments[selectedSegmentIndex]
    if (!segment.name) return

    const svgPath = pointsToSvgPath(segment.points)
    const centerX = Math.round(segment.points.reduce((sum, p) => sum + p.x, 0) / segment.points.length)
    const centerY = Math.round(segment.points.reduce((sum, p) => sum + p.y, 0) / segment.points.length)

    const { data } = await supabase
      .from('sectors')
      .insert({
        name: segment.name,
        svg_path: svgPath,
        position_x: centerX,
        position_y: centerY,
      })
      .select()
      .single()

    if (data) {
      setSectors([...sectors, data])
      setDetectedSegments([])
      setSelectedSegmentIndex(null)
      setAiClickPoint(null)
      setTool('select')
    }
  }

  const updateSectorPosition = async (id: string, x: number, y: number) => {
    const { data } = await supabase
      .from('sectors')
      .update({ position_x: x, position_y: y })
      .eq('id', id)
      .select()
      .single()

    if (data) {
      setSectors(sectors.map((s) => (s.id === data.id ? data : s)))
    }
  }

  const deleteSector = async (id: string) => {
    if (!confirm('Eliminar este sector?')) return
    await supabase.from('sectors').delete().eq('id', id)
    setSectors(sectors.filter((s) => s.id !== id))
    setSelectedSector(null)
  }

  const cancelDrawing = () => {
    setCurrentPoints([])
    setNewSectorName('')
    setDetectedSegments([])
    setSelectedSegmentIndex(null)
    setAiClickPoint(null)
    setTool('select')
  }

  if (loading || !profile?.is_admin) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-white">Editor de Mapa</h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setTool('select')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tool === 'select' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Seleccionar
            </button>
            <button
              onClick={() => { setTool('draw'); setCurrentPoints([]); setDetectedSegments([]) }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tool === 'draw' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Dibujar
            </button>
            <button
              onClick={() => { setTool('ai'); setCurrentPoints([]); setDetectedSegments([]) }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tool === 'ai' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Detectar IA
            </button>
            <button
              onClick={() => setTool('place')}
              disabled={!selectedSector}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tool === 'place' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Mover
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Canvas */}
        <div ref={containerRef} className="flex-1 overflow-auto p-4">
          <div className="inline-block relative">
            {imageLoaded ? (
              <>
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="cursor-crosshair max-w-full h-auto"
                  style={{ maxHeight: 'calc(100vh - 150px)' }}
                />
                {aiLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-gray-800 rounded-lg p-6 text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500 mx-auto mb-3"></div>
                      <p className="text-white">Analizando con IA...</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-800 rounded-lg">
                <p className="text-gray-400">Cargando imagen...</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
          {/* AI Tool Panel */}
          {tool === 'ai' && (
            <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-600/50 rounded-lg">
              <h3 className="font-medium text-yellow-400 mb-3">Deteccion con IA</h3>
              <p className="text-sm text-gray-300 mb-3">
                Haz click en una pared del mapa y la IA intentara detectar su contorno automaticamente.
              </p>
              {detectedSegments.length > 0 && selectedSegmentIndex !== null && (
                <>
                  <input
                    type="text"
                    placeholder="Nombre del sector"
                    value={detectedSegments[selectedSegmentIndex]?.name || ''}
                    onChange={(e) => {
                      const newSegments = [...detectedSegments]
                      newSegments[selectedSegmentIndex].name = e.target.value
                      setDetectedSegments(newSegments)
                    }}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white mb-3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveDetectedSegment}
                      className="flex-1 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={cancelDrawing}
                      className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Draw Tool Panel */}
          {tool === 'draw' && (
            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="font-medium text-white mb-3">Nueva Zona</h3>
              <p className="text-sm text-gray-400 mb-3">
                Haz click en el mapa para dibujar los puntos del poligono.
                {currentPoints.length > 2 && ' Click cerca del primer punto (rojo) para cerrar.'}
              </p>
              <p className="text-sm text-green-400 mb-3">
                Puntos: {currentPoints.length}
              </p>

              {currentPoints.length >= 3 && (
                <>
                  <input
                    type="text"
                    placeholder="Nombre del sector"
                    value={newSectorName}
                    onChange={(e) => setNewSectorName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white mb-3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveSector}
                      disabled={!newSectorName}
                      className="flex-1 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-medium"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={cancelDrawing}
                      className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}

              {currentPoints.length > 0 && currentPoints.length < 3 && (
                <button
                  onClick={cancelDrawing}
                  className="w-full py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium"
                >
                  Cancelar
                </button>
              )}
            </div>
          )}

          <h3 className="font-medium text-white mb-3">Sectores ({sectors.length})</h3>

          <div className="space-y-2">
            {sectors.map((sector) => (
              <div
                key={sector.id}
                onClick={() => setSelectedSector(sector)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedSector?.id === sector.id
                    ? 'bg-blue-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{sector.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteSector(sector.id)
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Pos: {sector.position_x}, {sector.position_y}
                </p>
              </div>
            ))}

            {sectors.length === 0 && (
              <p className="text-gray-500 text-sm">
                No hay sectores. Usa &quot;Dibujar&quot; o &quot;Detectar IA&quot; para crear uno.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
