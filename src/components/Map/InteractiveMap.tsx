'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Boulder, Sector } from '@/types'
import { BoulderMarker } from './BoulderMarker'

interface InteractiveMapProps {
  mapImageUrl: string
  sectors: Sector[]
  boulders: Boulder[]
  userAscents: Set<string>
  onBoulderClick: (boulder: Boulder) => void
  onSectorClick?: (sector: Sector) => void
}

export function InteractiveMap({
  mapImageUrl,
  sectors,
  boulders,
  userAscents,
  onBoulderClick,
  onSectorClick,
}: InteractiveMapProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale((prev) => Math.min(Math.max(prev * delta, 0.5), 3))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetView = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950 rounded-lg">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => setScale((prev) => Math.min(prev * 1.2, 3))}
          className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-white"
        >
          +
        </button>
        <button
          onClick={() => setScale((prev) => Math.max(prev * 0.8, 0.5))}
          className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-white"
        >
          -
        </button>
        <button
          onClick={resetView}
          className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-white text-xs"
        >
          Reset
        </button>
      </div>

      {/* Map container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative transition-transform"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Map image */}
          <div className="relative w-[1200px] h-[800px]">
            {mapImageUrl ? (
              <Image
                src={mapImageUrl}
                alt="Mapa del rocódromo"
                fill
                className="object-contain"
                priority
                draggable={false}
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                <p>Imagen del mapa no disponible</p>
              </div>
            )}

            {/* SVG overlay for sectors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {sectors.map((sector) =>
                sector.svg_path ? (
                  <path
                    key={sector.id}
                    d={sector.svg_path}
                    fill="transparent"
                    stroke="rgba(59, 130, 246, 0.5)"
                    strokeWidth="2"
                    className="pointer-events-auto cursor-pointer hover:fill-blue-500/20 transition-colors"
                    onClick={() => onSectorClick?.(sector)}
                  />
                ) : null
              )}
            </svg>

            {/* Boulder markers */}
            {boulders.map((boulder) => {
              const sector = sectors.find((s) => s.id === boulder.sector_id)
              if (!sector) return null

              return (
                <div
                  key={boulder.id}
                  className="absolute"
                  style={{
                    left: sector.position_x,
                    top: sector.position_y,
                  }}
                >
                  <BoulderMarker
                    boulder={boulder}
                    onClick={() => onBoulderClick(boulder)}
                    isSent={userAscents.has(boulder.id)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
