export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      galleries: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string | null
          slug: string | null
          cover_image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: string | null
          slug?: string | null
          cover_image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string | null
          slug?: string | null
          cover_image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      artworks: {
        Row: {
          id: string
          gallery_id: string | null
          title: string
          topic: string | null
          post: string | null
          image_url: string | null
          tags: string[] | null
          style: string | null
          concept: string | null
          year: number | null
          inspiration_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          gallery_id?: string | null
          title: string
          topic?: string | null
          post?: string | null
          image_url?: string | null
          tags?: string[] | null
          style?: string | null
          concept?: string | null
          year?: number | null
          inspiration_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          gallery_id?: string | null
          title?: string
          topic?: string | null
          post?: string | null
          image_url?: string | null
          tags?: string[] | null
          style?: string | null
          concept?: string | null
          year?: number | null
          inspiration_url?: string | null
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          artwork_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          artwork_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          artwork_id?: string
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Convenience types
export type Gallery = Database['public']['Tables']['galleries']['Row']
export type GalleryInsert = Database['public']['Tables']['galleries']['Insert']
export type GalleryUpdate = Database['public']['Tables']['galleries']['Update']

export type Artwork = Database['public']['Tables']['artworks']['Row']
export type ArtworkInsert = Database['public']['Tables']['artworks']['Insert']
export type ArtworkUpdate = Database['public']['Tables']['artworks']['Update']

export type Favorite = Database['public']['Tables']['favorites']['Row']
export type FavoriteInsert = Database['public']['Tables']['favorites']['Insert']

// Extended types with relations
export type ArtworkWithGallery = Artwork & {
  gallery?: Gallery | null
}

export type GalleryWithArtworks = Gallery & {
  artworks?: Artwork[]
  artwork_count?: number
}
