import { notFound } from 'next/navigation'
import { getGalleryBySlug } from '@/lib/actions/galleries'
import { getFavoriteIds } from '@/lib/actions/favorites'
import { GalleryRoom } from '@/components/GalleryRoom'
import { createClient } from '@/lib/supabase/server'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params
  const { data: gallery, error } = await getGalleryBySlug(slug)

  if (error || !gallery) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAuthenticated = !!user

  const { data: favoriteIds } = isAuthenticated ? await getFavoriteIds() : { data: [] }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <GalleryRoom
        gallery={gallery}
        favoriteIds={favoriteIds ?? []}
        isAuthenticated={isAuthenticated}
      />
    </main>
  )
}
