import Link from 'next/link'
import Image from 'next/image'
import { GalleryWithArtworks } from '@/types/database'

interface GalleryCardProps {
  gallery: GalleryWithArtworks
}

export function GalleryCard({ gallery }: GalleryCardProps) {
  const artworkCount = gallery.artwork_count ?? gallery.artworks?.length ?? 0

  return (
    <Link href={`/galleries/${gallery.slug ?? gallery.id}`} className="card block group">
      <div className="relative h-48 bg-surface overflow-hidden">
        {gallery.cover_image ? (
          <Image
            src={gallery.cover_image}
            alt={gallery.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-30">🖼️</span>
          </div>
        )}
        {gallery.category && (
          <span className="absolute top-2 right-2 tag-active text-xs">{gallery.category}</span>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
          {gallery.name}
        </h2>
        {gallery.description && (
          <p className="text-muted text-sm mt-1 line-clamp-2">{gallery.description}</p>
        )}
        {artworkCount > 0 && (
          <p className="text-muted text-xs mt-2">{artworkCount} יצירות</p>
        )}
      </div>
    </Link>
  )
}
