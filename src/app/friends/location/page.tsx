'use client'

import Link from 'next/link'

const friendsAtGym = [
  { id: '1', name: 'Ana M.', initials: 'AM', color: 'var(--sputnik-teal)', zone: 'Zona A', boulder: 'El Desplome', grade: 'R', gradeColor: 'var(--grade-red)' },
  { id: '2', name: 'Luis C.', initials: 'LC', color: '#8B5CF6', zone: 'Zona B', boulder: 'La Serpiente', grade: 'M', gradeColor: 'var(--grade-purple)' },
  { id: '3', name: 'Diana G.', initials: 'DG', color: '#EC4899', zone: 'Zona C', boulder: 'Azul Profundo', grade: 'Az', gradeColor: 'var(--grade-blue)' },
  { id: '4', name: 'Marco R.', initials: 'MR', color: '#F59E0B', zone: 'Zona D', boulder: 'Tecnico Fino', grade: 'A', gradeColor: 'var(--grade-yellow)' },
]

export default function FriendsLocationPage() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Map Area */}
      <div className="relative h-[500px] bg-[#1a1a1a]">
        {/* Header - overlayed */}
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between h-14 px-5 pt-[54px]">
          <div className="flex items-center gap-3">
            <Link href="/friends" className="text-[var(--text-primary)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Amigos en el gym</h1>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-[#22C55E] font-body text-xs font-semibold text-white">
            4 aqui
          </span>
        </header>

        {/* Map Grid */}
        <div className="absolute inset-x-5 top-[100px] h-[340px] bg-[#27272A] rounded-xl">
          {/* Zones */}
          <div className="absolute w-[100px] h-[100px] rounded-lg bg-[#3F3F46]" style={{ left: '20px', top: '20px' }} />
          <div className="absolute w-[90px] h-[80px] rounded-lg bg-[#3F3F46]" style={{ left: '140px', top: '30px' }} />
          <div className="absolute w-[80px] h-[120px] rounded-lg bg-[#3F3F46]" style={{ left: '250px', top: '20px' }} />
          <div className="absolute w-[150px] h-[80px] rounded-lg bg-[#3F3F46]" style={{ left: '20px', top: '140px' }} />
          <div className="absolute w-[140px] h-[60px] rounded-lg bg-[#3F3F46]" style={{ left: '190px', top: '160px' }} />
          <div className="absolute w-[120px] h-[80px] rounded-lg bg-[#3F3F46]" style={{ left: '20px', top: '240px' }} />

          {/* Friend Avatars */}
          <div className="absolute" style={{ left: '50px', top: '45px' }}>
            <div className="w-9 h-9 rounded-full border-[3px] border-white flex items-center justify-center" style={{ backgroundColor: friendsAtGym[0].color }}>
              <span className="font-body text-xs font-bold text-white">{friendsAtGym[0].initials}</span>
            </div>
            <div className="absolute w-[52px] h-[52px] rounded-full border-2 -left-[7px] -top-[7px]" style={{ borderColor: friendsAtGym[0].color, backgroundColor: `${friendsAtGym[0].color}33` }} />
          </div>
          <div className="absolute" style={{ left: '170px', top: '55px' }}>
            <div className="w-9 h-9 rounded-full border-[3px] border-white flex items-center justify-center" style={{ backgroundColor: friendsAtGym[1].color }}>
              <span className="font-body text-xs font-bold text-white">{friendsAtGym[1].initials}</span>
            </div>
          </div>
          <div className="absolute" style={{ left: '275px', top: '75px' }}>
            <div className="w-9 h-9 rounded-full border-[3px] border-white flex items-center justify-center" style={{ backgroundColor: friendsAtGym[2].color }}>
              <span className="font-body text-xs font-bold text-white">{friendsAtGym[2].initials}</span>
            </div>
          </div>
          <div className="absolute" style={{ left: '80px', top: '165px' }}>
            <div className="w-9 h-9 rounded-full border-[3px] border-white flex items-center justify-center" style={{ backgroundColor: friendsAtGym[3].color }}>
              <span className="font-body text-xs font-bold text-white">{friendsAtGym[3].initials}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 -mt-[20px] rounded-t-3xl bg-[var(--bg-primary)] px-5 pt-5 pb-4 overflow-auto">
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-[#3F3F46] mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-display text-lg font-semibold text-[var(--text-primary)]">En el gimnasio ahora</span>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#22C55E]/20">
            <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="font-body text-xs font-bold text-[#22C55E]">EN VIVO</span>
          </div>
        </div>

        {/* Friends List */}
        <div className="space-y-3">
          {friendsAtGym.map((friend) => (
            <div key={friend.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)]">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: friend.color }}
              >
                <span className="font-body text-sm font-bold text-white">{friend.initials}</span>
              </div>
              <div className="flex-1">
                <span className="font-body text-sm font-semibold text-[var(--text-primary)] block">{friend.name}</span>
                <span className="font-body text-xs text-[var(--text-tertiary)]">{friend.zone} · {friend.boulder}</span>
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: friend.gradeColor }}
              >
                <span className="font-display text-xs font-bold text-white">{friend.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
