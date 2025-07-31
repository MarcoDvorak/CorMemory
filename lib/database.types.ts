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
      memories: {
        Row: {
          id: string
          cover_photo_url: string
          cover_photo_aspect_ratio: number
          additional_photos: Json | null
          note: string | null
          tags: string[]
          location_name: string
          location_lat: number
          location_lng: number
          location_place_id: string
          collection: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cover_photo_url: string
          cover_photo_aspect_ratio: number
          additional_photos?: Json | null
          note?: string | null
          tags: string[]
          location_name: string
          location_lat: number
          location_lng: number
          location_place_id: string
          collection?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cover_photo_url?: string
          cover_photo_aspect_ratio?: number
          additional_photos?: Json | null
          note?: string | null
          tags?: string[]
          location_name?: string
          location_lat?: number
          location_lng?: number
          location_place_id?: string
          collection?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}