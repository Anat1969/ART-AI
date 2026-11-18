'use client'

import { useState } from 'react'
import { GalleryWithArtworks, Artwork } from '@/types/database'
import { ArtworkCard } from './ArtworkCard'
import { ArtworkModal } from './ArtworkModal'
import { EmptyState } from './ui/EmptyState'

interface GalleryRoomProps {
  gallery: GalleryWithArtworks
  favoriteIds?: string[]
  isAuthenticated?: boolean
}

export function GalleryRoom({ gallery, favoriteIds = [], isAuthenticated = false }: GalleryRoomProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [favs, setFavs] = useState<Set<string>>(new Set(favoriteIds))

  function handleFavoriteChange(artworkId: string, isFav: boolean) {
    setFavs(prev => {
      const next = new Set(prev)
      if (isFav) next.add(artworkId)
      else next.delete(artworkId)
      return next
    })
  }

  const artworks = gallery.artworks ?? []

  return (
    <div>
      {/* Gallery header */}
      <div className="mb-8">
        <div className="flex items-start gap-3 mb-2">
          {gallery.category && <span className="tag-active">{gallery.category}</span>}
        </div>
        <h1 className="text-3xl font-bold text-foreground">{gallery.name}</h1>
        {gallery.description && (
          <p className="text-muted mt-2 max-w-2xl">{gallery.description}</p>
        )}
        <p className="text-muted text-sm mt-3">{artworks.length} יצירות</p>
      </div>

      {/* Artworks grid */}
      {artworks.length === 0 ? (
        <EmptyState
          title="הגלריה ריקה"
          description="יצירות יתווספו לכאן בקרוב"
          icon="🎨"
        />
      ) : (
        <div className="gallery-grid">
          {artworks.map(artwork => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              isFavorite={favs.has(artwork.id)}
              isAuthenticated={isAuthenticated}
              onFavoriteChange={handleFavoriteChange}
              onClick={setSelectedArtwork}
            />
          ))}
        </div>
      )}

      {/* Artwork detail modal */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          isFavorite={favs.has(selectedArtwork.id)}
          isAuthenticated={isAuthenticated}
          onFavoriteChange={handleFavoriteChange}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  )
}
