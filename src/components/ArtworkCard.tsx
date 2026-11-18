'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Artwork } from '@/types/database'
import { toggleFavorite } from '@/lib/actions/favorites'

interface ArtworkCardProps {
  artwork: Artwork
  isFavorite?: boolean
  isAuthenticated?: boolean
  onFavoriteChange?: (artworkId: string, isFav: boolean) => void
  onClick?: (artwork: Artwork) => void
}

export function ArtworkCard({ artwork, isFavorite = false, isAuthenticated = false, onFavoriteChange, onClick }: ArtworkCardProps) {
  const [fav, setFav] = useState(isFavorite)
  const [loading, setLoading] = useState(false)

  async function handleFavorite(e: React.MouseEvent) {
    e.stopPropagation()
    if (!isAuthenticated) return
    setLoading(true)
    const { isFavorite: newFav, error } = await toggleFavorite(artwork.id)
    if (!error) {
      setFav(newFav)
      onFavoriteChange?.(artwork.id, newFav)
    }
    setLoading(false)
  }

  return (
    <article
      className="card cursor-pointer group"
      onClick={() => onClick?.(artwork)}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick?.(artwork)}
      role="button"
      aria-label={artwork.title}
    >
      {/* Image */}
      <div className="relative aspect-square bg-surface overflow-hidden">
        {artwork.image_url ? (
          <Image
            src={artwork.image_url}
            alt={artwork.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-muted">
            🎨
          </div>
        )}

        {/* Favorite button */}
        {isAuthenticated && (
          <button
            onClick={handleFavorite}
            disabled={loading}
            className="absolute top-2 left-2 w-9 h-9 flex items-center justify-center rounded-full bg-bg/70 backdrop-blur-sm border border-border hover:border-accent transition-all"
            aria-label={fav ? 'הסר ממועדפים' : 'הוסף למועדפים'}
          >
            {fav ? '❤️' : '🤍'}
          </button>
        )}

        {/* Year badge */}
        {artwork.year && (
          <span className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded-full bg-bg/70 backdrop-blur-sm text-muted">
            {artwork.year}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground leading-snug line-clamp-1">{artwork.title}</h3>
        {artwork.topic && (
          <p className="text-muted text-sm mt-0.5 line-clamp-1">{artwork.topic}</p>
        )}
        {artwork.tags && artwork.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {artwork.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
