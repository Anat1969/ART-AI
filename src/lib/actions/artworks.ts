'use server'

import { createClient } from '@/lib/supabase/server'
import { Artwork, ArtworkInsert, ArtworkUpdate, ArtworkWithGallery } from '@/types/database'

export async function getArtworks(galleryId?: string): Promise<{ data: ArtworkWithGallery[] | null; error: string | null }> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('artworks')
      .select('*, gallery:galleries(*)')
      .order('created_at', { ascending: false })

    if (galleryId) query = query.eq('gallery_id', galleryId)

    const { data, error } = await query
    if (error) return { data: null, error: error.message }
    return { data: data as ArtworkWithGallery[], error: null }
  } catch {
    return { data: null, error: 'שגיאה בטעינת יצירות' }
  }
}

export async function getArtwork(id: string): Promise<{ data: ArtworkWithGallery | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('artworks')
      .select('*, gallery:galleries(*)')
      .eq('id', id)
      .single()

    if (error) return { data: null, error: error.message }
    return { data: data as ArtworkWithGallery, error: null }
  } catch {
    return { data: null, error: 'שגיאה בטעינת יצירה' }
  }
}

export async function searchArtworks(query: string, tags?: string[], style?: string): Promise<{ data: Artwork[] | null; error: string | null }> {
  try {
    const supabase = await createClient()
    let q = supabase.from('artworks').select('*')

    if (query) q = q.or(`title.ilike.%${query}%,topic.ilike.%${query}%,concept.ilike.%${query}%`)
    if (style) q = q.eq('style', style)
    if (tags && tags.length > 0) q = q.overlaps('tags', tags)

    const { data, error } = await q.order('created_at', { ascending: false })
    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch {
    return { data: null, error: 'שגיאה בחיפוש' }
  }
}

export async function createArtwork(artwork: ArtworkInsert): Promise<{ data: Artwork | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('artworks')
      .insert(artwork)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch {
    return { data: null, error: 'שגיאה ביצירת יצירה' }
  }
}

export async function updateArtwork(id: string, updates: ArtworkUpdate): Promise<{ data: Artwork | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('artworks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch {
    return { data: null, error: 'שגיאה בעדכון יצירה' }
  }
}

export async function deleteArtwork(id: string): Promise<{ error: string | null }> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('artworks').delete().eq('id', id)
    if (error) return { error: error.message }
    return { error: null }
  } catch {
    return { error: 'שגיאה במחיקת יצירה' }
  }
}
