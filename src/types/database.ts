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
      aai_galleries: {
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
        Relationships: []
      }
      aai_artworks: {
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
        Relationships: [
          {
            foreignKeyName: "artworks_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "aai_galleries"
            referencedColumns: ["id"]
          }
        ]
      }
      aai_favorites: {
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
        Relationships: [
          {
            foreignKeyName: "favorites_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "aai_artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Gallery = Database['public']['Tables']['aai_galleries']['Row']
export type GalleryInsert = Database['public']['Tables']['aai_galleries']['Insert']
export type GalleryUpdate = Database['public']['Tables']['aai_galleries']['Update']

export type Artwork = Database['public']['Tables']['aai_artworks']['Row']
export type ArtworkInsert = Database['public']['Tables']['aai_artworks']['Insert']
export type ArtworkUpdate = Database['public']['Tables']['aai_artworks']['Update']

export type Favorite = Database['public']['Tables']['aai_favorites']['Row']
export type FavoriteInsert = Database['public']['Tables']['aai_favorites']['Insert']

// Extended types with relations
export type ArtworkWithGallery = Artwork & {
  gallery?: Gallery | null
}

export type GalleryWithArtworks = Gallery & {
  artworks?: Artwork[]
  artwork_count?: number
}
