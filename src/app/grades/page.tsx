'use client'

import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

const gradesInfo = [
  { name: 'Blanco', color: 'var(--grade-white)', textColor: '#0A0A0A', range: '4 - 5a', description: 'Iniciación. Presas grandes y movimientos básicos.', hasBorder: false },
  { name: 'Verde', color: 'var(--grade-green)', textColor: '#FFFFFF', range: '5a - 5c', description: 'Principiante. Introduce técnica de pies y equilibrio.', hasBorder: false },
  { name: 'Amarillo', color: 'var(--grade-yellow)', textColor: '#0A0A0A', range: '5c - 6a+', description: 'Intermedio bajo. Requiere fuerza de dedos básica.', hasBorder: false },
  { name: 'Azul', color: 'var(--grade-blue)', textColor: '#FFFFFF', range: '6a+ - 6b+', description: 'Intermedio. Movimientos dinámicos y técnicos.', hasBorder: false },
  { name: 'Morado', color: 'var(--grade-purple)', textColor: '#FFFFFF', range: '6b+ - 6c+', description: 'Avanzado. Alta exigencia física y técnica.', hasBorder: false },
  { name: 'Rojo', color: 'var(--grade-red)', textColor: '#FFFFFF', range: '6c+ - 7a+', description: 'Experto. Bloques de competición.', hasBorder: false },
  { name: 'Negro', color: 'var(--grade-black)', textColor: '#FFFFFF', range: '7b+', description: 'Elite. Máxima dificultad disponible.', hasBorder: true },
]

export default function GradesGuidePage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center p-4 px-5 bg-[var(--bg-surface)]">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Guía de Grados</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-5">
        <p className="font-body text-sm text-[var(--text-secondary)] mb-6">
          En Sputnik usamos un sistema de colores para indicar la dificultad de los bloques.
          Cada color corresponde a un rango de grados en la escala francesa.
        </p>

        <div className="flex flex-col gap-3">
          {gradesInfo.map((grade) => (
            <div
              key={grade.name}
              className="flex items-start gap-4 p-4 rounded-xl bg-[var(--bg-surface)]"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-display text-lg font-bold flex-shrink-0"
                style={{
                  backgroundColor: grade.color,
                  color: grade.textColor,
                  border: grade.hasBorder ? '2px solid var(--border-muted)' : 'none',
                }}
              >
                {grade.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-base font-semibold text-[var(--text-primary)]">{grade.name}</span>
                  <span className="font-mono text-sm text-[var(--sputnik-teal)]">{grade.range}</span>
                </div>
                <p className="font-body text-sm text-[var(--text-tertiary)]">{grade.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
