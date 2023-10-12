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
      ai_annotation_log: {
        Row: {
          created_at: string
          id: number
          message: string | null
          page_id: string | null
          page_url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          page_id?: string | null
          page_url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          page_id?: string | null
          page_url?: string | null
        }
        Relationships: []
      }
      discord_message_reactions: {
        Row: {
          created_at: string | null
          discord_user_id: string
          emoji_id: string | null
          emoji_name: string
          id: number
          message_id: string
        }
        Insert: {
          created_at?: string | null
          discord_user_id: string
          emoji_id?: string | null
          emoji_name: string
          id?: number
          message_id: string
        }
        Update: {
          created_at?: string | null
          discord_user_id?: string
          emoji_id?: string | null
          emoji_name?: string
          id?: number
          message_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discord_message_reactions_message_id_fkey"
            columns: ["message_id"]
            referencedRelation: "portfolio_posts"
            referencedColumns: ["discord_message_id"]
          }
        ]
      }
      portfolio_pages: {
        Row: {
          ai_annotation: Json | null
          annotated_at: string | null
          created_at: string | null
          data: Json | null
          id: string
          portfolio_id: string
          scraped_data: Json | null
          updated_at: string
          url: string
          title_text: string | null
        }
        Insert: {
          ai_annotation?: Json | null
          annotated_at?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          portfolio_id: string
          scraped_data?: Json | null
          updated_at?: string
          url: string
        }
        Update: {
          ai_annotation?: Json | null
          annotated_at?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          portfolio_id?: string
          scraped_data?: Json | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_pages_portfolio_id_fkey"
            columns: ["portfolio_id"]
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          }
        ]
      }
      portfolio_posts: {
        Row: {
          created_at: string | null
          description: string | null
          discord_message_id: string | null
          id: string
          portfolio_id: string
          published_at: string | null
          thumbnail_url: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          discord_message_id?: string | null
          id?: string
          portfolio_id: string
          published_at?: string | null
          thumbnail_url?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          discord_message_id?: string | null
          id?: string
          portfolio_id?: string
          published_at?: string | null
          thumbnail_url?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_posts_portfolio_id_fkey"
            columns: ["portfolio_id"]
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          }
        ]
      }
      portfolios: {
        Row: {
          created_at: string | null
          description: string | null
          feed_url: string | null
          id: string
          image_url: string | null
          is_public: boolean
          name: string | null
          platform: string
          profile_id: string | null
          study_start_semester_kind: string | null
          study_start_semester_year: number | null
          title: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          feed_url?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean
          name?: string | null
          platform?: string
          profile_id?: string | null
          study_start_semester_kind?: string | null
          study_start_semester_year?: number | null
          title?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          feed_url?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean
          name?: string | null
          platform?: string
          profile_id?: string | null
          study_start_semester_kind?: string | null
          study_start_semester_year?: number | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolios_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      portfolios_duplicate: {
        Row: {
          created_at: string | null
          description: string | null
          feed_url: string | null
          id: string
          image_url: string | null
          is_public: boolean
          name: string | null
          platform: string
          profile_id: string | null
          study_start_semester_kind: string | null
          study_start_semester_year: number | null
          title: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          feed_url?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean
          name?: string | null
          platform?: string
          profile_id?: string | null
          study_start_semester_kind?: string | null
          study_start_semester_year?: number | null
          title?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          feed_url?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean
          name?: string | null
          platform?: string
          profile_id?: string | null
          study_start_semester_kind?: string | null
          study_start_semester_year?: number | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolios_duplicate_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          analytics_access: boolean | null
          full_name: string | null
          id: string
          is_public: boolean
          study_start_semester_kind: string | null
          study_start_semester_year: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          analytics_access?: boolean | null
          full_name?: string | null
          id?: string
          is_public?: boolean
          study_start_semester_kind?: string | null
          study_start_semester_year?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          analytics_access?: boolean | null
          full_name?: string | null
          id?: string
          is_public?: boolean
          study_start_semester_kind?: string | null
          study_start_semester_year?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fetch_portfolios_posts: {
        Args: Record<PropertyKey, never>
        Returns: {
          now: string
          id: string
          feed_url: string
          request_id: number
        }[]
      }
      fetch_portfolios_posts_from_feed_processing_queue: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
        }[]
      }
      get_curated_posts: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          title: string
          url: string
          published_at: string
          thumbnail_url: string
          description: string
          portfolio_id: string
          portfolio_title: string
          portfolio_name: string
          portfolio_feed_url: string
          portfolio_image: string
        }[]
      }
      get_posts:
        | {
            Args: Record<PropertyKey, never>
            Returns: {
              id: string
              title: string
              url: string
              published_at: string
              thumbnail_url: string
              description: string
              portfolio_id: string
              portfolio_title: string
              portfolio_name: string
              portfolio_feed_url: string
              portfolio_image: string
              reactions: Json
            }[]
          }
        | {
            Args: {
              l: number
              o: number
            }
            Returns: {
              id: string
              title: string
              url: string
              published_at: string
              thumbnail_url: string
              description: string
              portfolio_id: string
              portfolio_title: string
              portfolio_name: string
              portfolio_feed_url: string
              portfolio_image: string
              reactions: Json
            }[]
          }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      search_pages: {
        Args: {
          cohorts: Json
          keywords?: string
          courses?: string[]
          kinds?: string[]
          profilations?: string[]
          tones?: string[]
          languages?: string[]
          show_private?: boolean
          items_limit?: number
          items_offset?: number
        }
        Returns: {
          id: string
          title: string
          url: string
          published_at: string
          courses: Json
          content_types: Json
          profilations: Json
          tones: Json
          dominant_language: string
          portfolios: Json
        }[]
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      title_text: {
        Args: {
          "": unknown
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
