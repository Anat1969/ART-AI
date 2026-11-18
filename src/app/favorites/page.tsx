import { getFavorites } from '@/lib/actions/favorites'
import { FavoritesBoard } from '@/components/FavoritesBoard'

export default async function FavoritesPage() {

  const { data: artworks, error } = await getFavorites()

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          המועדפות שלי{' '}
          <span className="text-accent">❤️</span>
        </h1>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      <FavoritesBoard artworks={artworks ?? []} />
    </main>
  )
}
