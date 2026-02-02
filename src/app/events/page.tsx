'use client'

import Link from 'next/link'
import { BottomNav } from '@/components/ui/BottomNav'

// Mocked data
const featuredEvent = {
  id: '1',
  title: 'Campeonato de Bloque 2025',
  image: '/images/event-featured.jpg',
  badge: 'Destacado',
  date: '15 Feb',
  time: '10:00 - 18:00',
  location: 'Sputnik Legazpi',
}

const upcomingEvents = [
  { id: '2', title: 'Noche de Boulder', date: { day: '22', month: 'Feb' }, time: '20:00', category: 'Social' },
  { id: '3', title: 'Taller de Técnica', date: { day: '01', month: 'Mar' }, time: '17:00', category: 'Formación' },
]

export default function EventsPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 px-5 bg-[var(--bg-surface)]">
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Eventos</h1>
        <button className="w-10 h-10 rounded-[10px] bg-[var(--bg-elevated)] flex items-center justify-center">
          <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-5">
        {/* Featured Event */}
        <div className="rounded-2xl bg-[var(--bg-surface)] overflow-hidden mb-5">
          <div
            className="h-40 w-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%), url("${featuredEvent.image}")`,
              backgroundColor: 'var(--bg-elevated)',
            }}
          />
          <div className="p-4 flex flex-col gap-3">
            <span className="self-start px-2.5 py-1.5 rounded-lg bg-[var(--sputnik-gold)] font-body text-xs font-semibold text-[#0A0A0A]">
              {featuredEvent.badge}
            </span>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">{featuredEvent.title}</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-body text-sm text-[var(--text-secondary)]">{featuredEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-body text-sm text-[var(--text-secondary)]">{featuredEvent.time}</span>
              </div>
            </div>
            <button className="w-full h-11 rounded-xl bg-[var(--sputnik-teal)] font-body text-sm font-semibold text-white">
              Inscribirse
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-3">Próximos eventos</h3>
          <div className="flex flex-col gap-3">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]"
              >
                <div className="w-[50px] flex flex-col items-center p-2 rounded-lg bg-[var(--bg-elevated)]">
                  <span className="font-display text-lg font-bold text-[var(--text-primary)]">{event.date.day}</span>
                  <span className="font-body text-xs text-[var(--text-tertiary)]">{event.date.month}</span>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <span className="font-body text-sm font-semibold text-[var(--text-primary)]">{event.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-xs text-[var(--text-tertiary)]">{event.time}</span>
                    <span className="font-body text-xs text-[var(--sputnik-teal)]">• {event.category}</span>
                  </div>
                </div>
                <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

<BottomNav />
    </div>
  )
}
