export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          store: 'seven' | 'lawson' | 'familymart'
          name: string
          price: number
          protein: number
          fat: number
          carbs: number
          calories: number
          protein_per_100yen: number
          category: string
          image_url: string | null
          affiliate_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      posts: {
        Row: {
          id: string
          platform: 'twitter' | 'instagram'
          content: string
          product_id: string | null
          posted_at: string
          impressions: number
          engagements: number
          clicks: number
          template_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
      }
      templates: {
        Row: {
          id: string
          name: string
          content: string
          variables: string[]
          performance_score: number
          usage_count: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['templates']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['templates']['Insert']>
      }
      metrics: {
        Row: {
          id: string
          date: string
          page_views: number
          unique_visitors: number
          affiliate_clicks: number
          conversions: number
          revenue: number
          twitter_followers: number
          instagram_followers: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['metrics']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['metrics']['Insert']>
      }
      optimization_log: {
        Row: {
          id: string
          optimization_type: string
          previous_value: Record<string, unknown>
          new_value: Record<string, unknown>
          trigger_metric: string
          reasoning: string
          auto_approved: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['optimization_log']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['optimization_log']['Insert']>
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row']
export type Post = Database['public']['Tables']['posts']['Row']
export type Template = Database['public']['Tables']['templates']['Row']
export type Metrics = Database['public']['Tables']['metrics']['Row']
export type OptimizationLog = Database['public']['Tables']['optimization_log']['Row']
