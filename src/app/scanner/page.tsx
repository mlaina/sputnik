'use client'

import Link from 'next/link'
import { useState } from 'react'

const gradeColors = [
  { name: 'Blanco', hex: 'var(--grade-white)' },
  { name: 'Verde', hex: 'var(--grade-green)' },
  { name: 'Amarillo', hex: 'var(--grade-yellow)' },
  { name: 'Azul', hex: 'var(--grade-blue)' },
  { name: 'Morado', hex: 'var(--grade-purple)' },
  { name: 'Rojo', hex: 'var(--grade-red)' },
  { name: 'Negro', hex: 'var(--grade-black)' },
]

export default function ScannerPage() {
  const [selectedColor, setSelectedColor] = useState(1) // Green by default

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5 bg-transparent absolute top-0 left-0 right-0 z-10">
        <Link href="/" className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
        <span className="font-display text-lg font-semibold text-white">Escanear Bloque</span>
        <button className="text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </header>

      {/* Camera View */}
      <div className="flex-1 relative bg-[#1a1a1a]">
        {/* Simulated wall with holds */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[350px] h-[500px] bg-[#2a2a2a] rounded-xl">
            {/* Simulated holds */}
            <div className="absolute w-10 h-9 rounded-full" style={{ backgroundColor: gradeColors[selectedColor].hex, left: '80px', top: '120px' }} />
            <div className="absolute w-9 h-10 rounded-full" style={{ backgroundColor: gradeColors[selectedColor].hex, left: '150px', top: '80px' }} />
            <div className="absolute w-11 h-8 rounded-full" style={{ backgroundColor: gradeColors[selectedColor].hex, left: '220px', top: '150px' }} />
            <div className="absolute w-10 h-10 rounded-full" style={{ backgroundColor: gradeColors[selectedColor].hex, left: '120px', top: '220px' }} />
            <div className="absolute w-12 h-9 rounded-full" style={{ backgroundColor: gradeColors[selectedColor].hex, left: '200px', top: '280px' }} />
            <div className="absolute w-10 h-10 rounded-full" style={{ backgroundColor: gradeColors[selectedColor].hex, left: '280px', top: '200px' }} />
            <div className="absolute w-9 h-11 rounded-full" style={{ backgroundColor: gradeColors[selectedColor].hex, left: '160px', top: '350px' }} />
            <div className="absolute w-12 h-10 rounded-full" style={{ backgroundColor: gradeColors[selectedColor].hex, left: '260px', top: '380px' }} />

            {/* Start hold */}
            <div className="absolute w-14 h-11 rounded-full border-[3px] border-white" style={{ backgroundColor: gradeColors[selectedColor].hex, left: '148px', top: '420px' }}>
            </div>
            <div className="absolute px-2 py-1 rounded bg-white" style={{ left: '153px', top: '465px' }}>
              <span className="font-mono text-[10px] font-bold text-black">START</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-[240px] left-5 right-5">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-black/70">
            <svg className="w-4 h-4 text-[var(--sputnik-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-body text-sm text-white">Toca una presa del color deseado</span>
          </div>
        </div>

        {/* Color Picker Card */}
        <div className="absolute bottom-[80px] left-5 right-5 p-4 rounded-2xl bg-black/80">
          <span className="font-body text-xs text-[var(--text-secondary)] block mb-3">Color detectado</span>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full" style={{ backgroundColor: gradeColors[selectedColor].hex }} />
            <div>
              <span className="font-display text-base font-semibold text-white block">{gradeColors[selectedColor].name}</span>
              <span className="font-body text-xs text-[var(--text-tertiary)]">5b - 5c+</span>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--sputnik-teal)]">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-body text-sm font-semibold text-white">Confirmar Seleccion</span>
          </button>
        </div>

        {/* Color Palette */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {gradeColors.map((color, idx) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(idx)}
              className={`w-7 h-7 rounded-full ${idx === selectedColor ? 'ring-2 ring-white' : 'ring-1 ring-white/30'}`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
