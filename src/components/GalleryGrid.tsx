import { GalleryWithArtworks } from '@/types/database'
import { GalleryCard } from './GalleryCard'
import { GalleryCardSkeleton } from './ui/Skeleton'
import { EmptyState } from './ui/EmptyState'
import { ErrorState } from './ui/ErrorState'

interface GalleryGridProps {
  galleries?: GalleryWithArtworks[] | null
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
}

export function GalleryGrid({ galleries, isLoading, error, onRetry }: GalleryGridProps) {
  if (isLoading) {
    return (
      <div className="gallery-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <GalleryCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />
  }

  if (!galleries || galleries.length === 0) {
    return (
      <EmptyState
        title="אין גלריות עדיין"
        description="גלריות יופיעו כאן לאחר שיתווספו"
        icon="🖼️"
      />
    )
  }

  return (
    <div className="gallery-grid">
      {galleries.map(gallery => (
        <GalleryCard key={gallery.id} gallery={gallery} />
      ))}
    </div>
  )
}
