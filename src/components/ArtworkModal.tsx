'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Artwork } from '@/types/database'
import { toggleFavorite } from '@/lib/actions/favorites'
import { ShareExport } from './ShareExport'

interface ArtworkModalProps {
  artwork: Artwork
  isFavorite?: boolean
  isAuthenticated?: boolean
  onFavoriteChange?: (artworkId: string, isFav: boolean) => void
  onClose: () => void
}

export function ArtworkModal({ artwork, isFavorite = false, isAuthenticated = false, onFavoriteChange, onClose }: ArtworkModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  async function handleFavorite() {
    if (!isAuthenticated) return
    const { isFavorite: newFav } = await toggleFavorite(artwork.id)
    onFavoriteChange?.(artwork.id, newFav)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-surface border border-border rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-bg/70 border border-border hover:border-accent transition-all"
          aria-label="סגור"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative aspect-video w-full bg-bg overflow-hidden rounded-t-xl">
          {artwork.image_url ? (
            <Image src={artwork.image_url} alt={artwork.title} fill className="object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">🎨</div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">{artwork.title}</h2>
              {artwork.topic && <p className="text-muted text-sm mt-0.5">{artwork.topic}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {isAuthenticated && (
                <button onClick={handleFavorite} className="btn-ghost min-h-0 h-9 px-3 text-base">
                  {isFavorite ? '❤️' : '🤍'}
                </button>
              )}
              <ShareExport artwork={artwork} />
            </div>
          </div>

          {artwork.concept && (
            <div>
              <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">קונספט</h3>
              <p className="text-foreground text-sm">{artwork.concept}</p>
            </div>
          )}

          {artwork.post && (
            <div>
              <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">תיאור</h3>
              <p className="text-foreground text-sm whitespace-pre-line">{artwork.post}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 text-sm text-muted">
            {artwork.style && <span>סגנון: <span className="text-foreground">{artwork.style}</span></span>}
            {artwork.year && <span>שנה: <span className="text-foreground">{artwork.year}</span></span>}
          </div>

          {artwork.tags && artwork.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {artwork.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          )}

          {artwork.inspiration_url && (
            <a
              href={artwork.inspiration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-sm hover:underline"
            >
              מקור השראה ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
