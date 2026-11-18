import { getGalleries } from '@/lib/actions/galleries'
import { GalleryGrid } from '@/components/GalleryGrid'

export const revalidate = 60

export default async function HomePage() {
  const { data: galleries, error } = await getGalleries()

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          גלריות{' '}
          <span className="text-accent">AI</span>
        </h1>
        <p className="text-muted mt-2">פלטפורמת תיק עבודות לאומנית AI ואדריכלית</p>
      </div>

      <GalleryGrid galleries={galleries} error={error} />
    </main>
  )
}
