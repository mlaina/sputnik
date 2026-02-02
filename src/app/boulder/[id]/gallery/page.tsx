'use client'

import { use } from 'react'
import Link from 'next/link'

const mockPhotos = [
  { id: '1', url: 'https://images.unsplash.com/photo-1577434150092-38785fc2074d?w=400', user: 'Carlos' },
  { id: '2', url: 'https://images.unsplash.com/photo-1598275780810-8b109f4753db?w=400', user: 'Maria' },
  { id: '3', url: 'https://images.unsplash.com/photo-1624410722274-5bb8a47adf4d?w=400', user: 'Pablo' },
  { id: '4', url: 'https://images.unsplash.com/photo-1665734421158-1bf3c0cfb2a1?w=400', user: 'Laura' },
  { id: '5', url: 'https://images.unsplash.com/photo-1612430555067-17d36b24cc28?w=400', user: 'Diego' },
  { id: '6', url: 'https://images.unsplash.com/photo-1759532184105-1c5bbda598fc?w=400', user: 'Ana' },
]

export default function PhotoGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-5">
        <div className="flex items-center gap-3">
          <Link href={`/boulder/${id}`} className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
            <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-display text-xl font-semibold text-[var(--text-primary)]">Fotos</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-[var(--sputnik-teal)] flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </header>

      {/* Info */}
      <div className="flex items-center gap-2 px-5 pb-3">
        <span className="font-display text-base font-semibold text-[var(--text-primary)]">Cave Bori #24</span>
        <span className="text-[var(--text-muted)]">·</span>
        <span className="font-body text-sm text-[var(--text-tertiary)]">{mockPhotos.length} fotos</span>
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-auto px-1">
        <div className="flex flex-col gap-1">
          {[0, 2, 4].map((startIdx) => (
            <div key={startIdx} className="flex gap-1">
              {mockPhotos.slice(startIdx, startIdx + 2).map((photo) => (
                <div
                  key={photo.id}
                  className="flex-1 aspect-square rounded overflow-hidden bg-[var(--bg-surface)]"
                  style={{
                    backgroundImage: `url(${photo.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
