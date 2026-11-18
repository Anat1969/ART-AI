'use server'

import { createClient } from '@/lib/supabase/server'
import { ArtworkWithGallery } from '@/types/database'

const ANON_USER_ID = '00000000-0000-0000-0000-000000000001'

export async function getFavorites(): Promise<{ data: ArtworkWithGallery[] | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('aai_favorites')
      .select('artwork:aai_artworks(*, gallery:aai_galleries(*))')
      .eq('user_id', ANON_USER_ID)
      .order('created_at', { ascending: false })

    if (error) return { data: null, error: error.message }

    const artworks = (data as { artwork: ArtworkWithGallery }[]).map(f => f.artwork).filter(Boolean)
    return { data: artworks, error: null }
  } catch {
    return { data: null, error: 'שגיאה בטעינת מועדפים' }
  }
}

export async function getFavoriteIds(): Promise<{ data: string[] | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('aai_favorites')
      .select('artwork_id')
      .eq('user_id', ANON_USER_ID)

    if (error) return { data: null, error: error.message }
    return { data: data.map(f => f.artwork_id), error: null }
  } catch {
    return { data: null, error: 'שגיאה בטעינת מועדפים' }
  }
}

export async function toggleFavorite(artworkId: string): Promise<{ isFavorite: boolean; error: string | null }> {
  try {
    const supabase = await createClient()

    const { data: existing } = await supabase
      .from('aai_favorites')
      .select('id')
      .eq('user_id', ANON_USER_ID)
      .eq('artwork_id', artworkId)
      .single()

    if (existing) {
      await supabase.from('aai_favorites').delete().eq('id', existing.id)
      return { isFavorite: false, error: null }
    } else {
      await supabase.from('aai_favorites').insert({ user_id: ANON_USER_ID, artwork_id: artworkId })
      return { isFavorite: true, error: null }
    }
  } catch {
    return { isFavorite: false, error: 'שגיאה בעדכון מועדפים' }
  }
}
