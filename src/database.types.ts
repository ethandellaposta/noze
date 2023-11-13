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
      Pins: {
        Row: {
          content: string | null
          created_at: string
          id: number
          location: Json | null
          title: string | null
          type: string | null
          user_id: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          location?: Json | null
          title?: string | null
          type?: string | null
          user_id?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          location?: Json | null
          title?: string | null
          type?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Pins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          }
        ]
      }
      Users: {
        Row: {
          created_at: string
          id: number
          username: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          username?: string | null
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
