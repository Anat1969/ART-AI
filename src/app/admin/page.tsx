import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getGalleries } from '@/lib/actions/galleries'
import { getArtworks } from '@/lib/actions/artworks'
import { AdminPanel } from '@/components/AdminPanel'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const isAdmin = user.user_metadata?.role === 'admin'
  if (!isAdmin) redirect('/')

  const [{ data: galleries }, { data: artworks }] = await Promise.all([
    getGalleries(),
    getArtworks(),
  ])

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <AdminPanel galleries={galleries ?? []} artworks={artworks ?? []} />
    </main>
  )
}
