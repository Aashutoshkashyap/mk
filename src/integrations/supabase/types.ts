export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      about_section: {
        Row: {
          description: string | null
          heading: string
          id: string
          image_url: string | null
          mission_text: string | null
          mission_title: string | null
          subheading: string | null
          updated_at: string
          vision_text: string | null
          vision_title: string | null
        }
        Insert: {
          description?: string | null
          heading: string
          id?: string
          image_url?: string | null
          mission_text?: string | null
          mission_title?: string | null
          subheading?: string | null
          updated_at?: string
          vision_text?: string | null
          vision_title?: string | null
        }
        Update: {
          description?: string | null
          heading?: string
          id?: string
          image_url?: string | null
          mission_text?: string | null
          mission_title?: string | null
          subheading?: string | null
          updated_at?: string
          vision_text?: string | null
          vision_title?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string | null
          category: string | null
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_1_url: string | null
          image_2_url: string | null
          is_featured: boolean
          is_published: boolean
          published_at: string | null
          slug: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_1_url?: string | null
          image_2_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          slug: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_1_url?: string | null
          image_2_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          slug?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          action_href: string | null
          action_label: string | null
          details: string[]
          icon_name: string
          id: string
          sort_order: number
          title: string
        }
        Insert: {
          action_href?: string | null
          action_label?: string | null
          details?: string[]
          icon_name: string
          id?: string
          sort_order?: number
          title: string
        }
        Update: {
          action_href?: string | null
          action_label?: string | null
          details?: string[]
          icon_name?: string
          id?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          status?: string
          created_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          sort_order: number | null
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question: string
          sort_order?: number | null
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      core_values: {
        Row: {
          description: string
          icon_name: string
          id: string
          sort_order: number
          title: string
        }
        Insert: {
          description: string
          icon_name: string
          id?: string
          sort_order?: number
          title: string
        }
        Update: {
          description?: string
          icon_name?: string
          id?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt_text: string | null
          id: string
          image_url: string
          sort_order: number
        }
        Insert: {
          alt_text?: string | null
          id?: string
          image_url: string
          sort_order?: number
        }
        Update: {
          alt_text?: string | null
          id?: string
          image_url?: string
          sort_order?: number
        }
        Relationships: []
      }
      hero_section: {
        Row: {
          cta_link: string | null
          cta_text: string | null
          description: string | null
          id: string
          secondary_cta_link: string | null
          secondary_cta_text: string | null
          subtitle: string
          title: string
          updated_at: string
        }
        Insert: {
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          id?: string
          secondary_cta_link?: string | null
          secondary_cta_text?: string | null
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Update: {
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          id?: string
          secondary_cta_link?: string | null
          secondary_cta_text?: string | null
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          id: string
          logo_url: string
          name: string
          sort_order: number
        }
        Insert: {
          id?: string
          logo_url: string
          name: string
          sort_order?: number
        }
        Update: {
          id?: string
          logo_url?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      prefooter_cta: {
        Row: {
          cta_link: string | null
          cta_text: string | null
          description: string | null
          heading: string
          id: string
          updated_at: string
        }
        Insert: {
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          heading?: string
          id?: string
          updated_at?: string
        }
        Update: {
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          heading?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          description: string
          icon_name: string
          id: string
          image_url: string | null
          sort_order: number
          title: string
        }
        Insert: {
          description: string
          icon_name: string
          id?: string
          image_url?: string | null
          sort_order?: number
          title: string
        }
        Update: {
          description?: string
          icon_name?: string
          id?: string
          image_url?: string | null
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          company_name: string | null
          favicon_url: string | null
          id: string
          logo_url: string | null
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          icon_name: string
          id: string
          label: string
          sort_order: number
          updated_at: string
          value: string
        }
        Insert: {
          icon_name: string
          id?: string
          label: string
          sort_order?: number
          updated_at?: string
          value: string
        }
        Update: {
          icon_name?: string
          id?: string
          label?: string
          sort_order?: number
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          name: string
          role: string | null
          sort_order: number | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          name: string
          role?: string | null
          sort_order?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string
          role?: string | null
          sort_order?: number | null
        }
        Relationships: []
      }
      sub_services: {
        Row: {
          icon_name: string
          id: string
          label: string
          service_id: string
          sort_order: number
        }
        Insert: {
          icon_name: string
          id?: string
          label: string
          service_id: string
          sort_order?: number
        }
        Update: {
          icon_name?: string
          id?: string
          label?: string
          service_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "sub_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          bio: string | null
          experience: string | null
          id: string
          image_url: string | null
          name: string
          role: string
          sort_order: number
        }
        Insert: {
          bio?: string | null
          experience?: string | null
          id?: string
          image_url?: string | null
          name: string
          role: string
          sort_order?: number
        }
        Update: {
          bio?: string | null
          experience?: string | null
          id?: string
          image_url?: string | null
          name?: string
          role?: string
          sort_order?: number
        }
        Relationships: []
      }
      team_sectors: {
        Row: {
          icon_name: string
          id: string
          label: string
          sort_order: number
          team_member_id: string
        }
        Insert: {
          icon_name: string
          id?: string
          label: string
          sort_order?: number
          team_member_id: string
        }
        Update: {
          icon_name?: string
          id?: string
          label?: string
          sort_order?: number
          team_member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_sectors_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
