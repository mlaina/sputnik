'use client'

import Link from 'next/link'
import { useState } from 'react'

const gradeOptions = [
  { label: 'B', color: 'var(--grade-white)', textColor: '#0A0A0A' },
  { label: 'V', color: 'var(--grade-green)', textColor: '#0A0A0A' },
  { label: 'A', color: 'var(--grade-yellow)', textColor: '#0A0A0A' },
  { label: 'Az', color: 'var(--grade-blue)', textColor: '#FFFFFF' },
  { label: 'M', color: 'var(--grade-purple)', textColor: '#FFFFFF' },
  { label: 'R', color: 'var(--grade-red)', textColor: '#FFFFFF' },
  { label: 'N', color: 'var(--grade-black)', textColor: '#FFFFFF' },
]

const typeOptions = ['Desplome', 'Placa', 'Vertical', 'Techo']
const statusOptions = ['Todos', 'Pendientes', 'Tachados']
const setterOptions = ['Todos', 'Pablo R.', 'Maria G.']
const dateOptions = ['Todos', 'Esta semana', 'Este mes']

export default function MapFiltersPage() {
  const [selectedGrades, setSelectedGrades] = useState<string[]>(['B', 'V', 'M'])
  const [selectedType, setSelectedType] = useState('Desplome')
  const [selectedStatus, setSelectedStatus] = useState('Todos')
  const [selectedSetter, setSelectedSetter] = useState('Todos')
  const [selectedDate, setSelectedDate] = useState('Esta semana')

  const toggleGrade = (label: string) => {
    setSelectedGrades((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    )
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[var(--text-primary)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
          <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Filtros</h1>
        </div>
        <button className="font-body text-sm text-[var(--sputnik-teal)]">Resetear</button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-4 space-y-6">
        {/* Grade */}
        <div>
          <span className="font-body text-base font-semibold text-[var(--text-primary)] block mb-3">Grado</span>
          <div className="grid grid-cols-4 gap-2">
            {gradeOptions.slice(0, 4).map((grade) => (
              <button
                key={grade.label}
                onClick={() => toggleGrade(grade.label)}
                className={`h-11 rounded-lg font-body text-sm font-semibold flex items-center justify-center ${
                  selectedGrades.includes(grade.label) ? 'ring-2 ring-[var(--sputnik-teal)]' : ''
                }`}
                style={{
                  backgroundColor: selectedGrades.includes(grade.label) ? grade.color : '#3F3F46',
                  color: selectedGrades.includes(grade.label) ? grade.textColor : 'var(--text-secondary)',
                }}
              >
                {grade.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {gradeOptions.slice(4).map((grade) => (
              <button
                key={grade.label}
                onClick={() => toggleGrade(grade.label)}
                className={`h-11 rounded-lg font-body text-sm font-semibold flex items-center justify-center ${
                  selectedGrades.includes(grade.label) ? 'ring-2 ring-[var(--sputnik-teal)]' : ''
                }`}
                style={{
                  backgroundColor: selectedGrades.includes(grade.label) ? grade.color : '#3F3F46',
                  color: selectedGrades.includes(grade.label) ? grade.textColor : 'var(--text-secondary)',
                }}
              >
                {grade.label}
              </button>
            ))}
            <div className="h-11" />
          </div>
        </div>

        {/* Type */}
        <div>
          <span className="font-body text-base font-semibold text-[var(--text-primary)] block mb-3">Tipo de bloque</span>
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2.5 rounded-lg font-body text-sm ${
                  selectedType === type
                    ? 'bg-[var(--bg-surface)] ring-2 ring-[var(--sputnik-teal)] text-[var(--text-primary)]'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <span className="font-body text-base font-semibold text-[var(--text-primary)] block mb-3">Estado</span>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2.5 rounded-lg font-body text-sm ${
                  selectedStatus === status
                    ? 'bg-[var(--sputnik-teal)] text-white'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Setter */}
        <div>
          <span className="font-body text-base font-semibold text-[var(--text-primary)] block mb-3">Setter</span>
          <div className="flex flex-wrap gap-2">
            {setterOptions.map((setter) => (
              <button
                key={setter}
                onClick={() => setSelectedSetter(setter)}
                className={`px-4 py-2.5 rounded-lg font-body text-sm ${
                  selectedSetter === setter
                    ? 'bg-[var(--sputnik-teal)] text-white'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                }`}
              >
                {setter}
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div>
          <span className="font-body text-base font-semibold text-[var(--text-primary)] block mb-3">Fecha de creacion</span>
          <div className="flex flex-wrap gap-2">
            {dateOptions.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2.5 rounded-lg font-body text-sm ${
                  selectedDate === date
                    ? 'bg-[var(--sputnik-gold)] text-[#0A0A0A]'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="px-5 pb-5">
        <Link
          href="/"
          className="w-full h-12 rounded-xl bg-[var(--sputnik-teal)] font-body text-base font-semibold text-white flex items-center justify-center"
        >
          Aplicar filtros (23 bloques)
        </Link>
      </div>
    </div>
  )
}
