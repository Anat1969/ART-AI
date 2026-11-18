'use server'

import { createClient } from '@/lib/supabase/server'
import { Gallery, GalleryInsert, GalleryUpdate, GalleryWithArtworks } from '@/types/database'

export async function getGalleries(): Promise<{ data: GalleryWithArtworks[] | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('aai_galleries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return { data: null, error: error.message }
    return { data: data as GalleryWithArtworks[], error: null }
  } catch {
    return { data: null, error: 'שגיאה בטעינת גלריות' }
  }
}

export async function getGalleryBySlug(slug: string): Promise<{ data: GalleryWithArtworks | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('aai_galleries')
      .select('*, aai_artworks(*)')
      .eq('slug', slug)
      .single()

    if (error) return { data: null, error: error.message }
    return { data: data as GalleryWithArtworks, error: null }
  } catch {
    return { data: null, error: 'שגיאה בטעינת גלריה' }
  }
}

export async function createGallery(gallery: GalleryInsert): Promise<{ data: Gallery | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('aai_galleries')
      .insert(gallery)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch {
    return { data: null, error: 'שגיאה ביצירת גלריה' }
  }
}

export async function updateGallery(id: string, updates: GalleryUpdate): Promise<{ data: Gallery | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('aai_galleries')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch {
    return { data: null, error: 'שגיאה בעדכון גלריה' }
  }
}

export async function deleteGallery(id: string): Promise<{ error: string | null }> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('aai_galleries').delete().eq('id', id)
    if (error) return { error: error.message }
    return { error: null }
  } catch {
    return { error: 'שגיאה במחיקת גלריה' }
  }
}
