'use client'

import { useState } from 'react'
import { ArtworkWithGallery, Artwork } from '@/types/database'
import { ArtworkCard } from './ArtworkCard'
import { ArtworkModal } from './ArtworkModal'
import { EmptyState } from './ui/EmptyState'

interface FavoritesBoardProps {
  artworks: ArtworkWithGallery[]
}

export function FavoritesBoard({ artworks: initial }: FavoritesBoardProps) {
  const [artworks, setArtworks] = useState(initial)
  const [selected, setSelected] = useState<Artwork | null>(null)
  const [favIds] = useState(new Set(initial.map(a => a.id)))

  function handleFavoriteChange(artworkId: string, isFav: boolean) {
    if (!isFav) setArtworks(prev => prev.filter(a => a.id !== artworkId))
  }

  if (artworks.length === 0) {
    return (
      <EmptyState
        title="אין מועדפים עדיין"
        description="לחצי על ❤️ בכל יצירה כדי להוסיף למועדפים"
        icon="🤍"
      />
    )
  }

  return (
    <div>
      <div className="gallery-grid">
        {artworks.map(artwork => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            isFavorite={favIds.has(artwork.id)}
            isAuthenticated
            onFavoriteChange={handleFavoriteChange}
            onClick={setSelected}
          />
        ))}
      </div>

      {selected && (
        <ArtworkModal
          artwork={selected}
          isFavorite
          isAuthenticated
          onFavoriteChange={handleFavoriteChange}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
