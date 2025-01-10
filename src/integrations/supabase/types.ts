export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string | null
          id: string
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string | null
          id?: string
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string | null
          id?: string
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      help_content: {
        Row: {
          content: string
          context: string | null
          created_at: string | null
          id: string
          topic: string
          updated_at: string | null
        }
        Insert: {
          content: string
          context?: string | null
          created_at?: string | null
          id?: string
          topic: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          context?: string | null
          created_at?: string | null
          id?: string
          topic?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          client_address: string | null
          client_email: string
          client_name: string
          created_at: string | null
          currency: string
          id: string
          invoice_number: string
          items: Json
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          client_address?: string | null
          client_email: string
          client_name: string
          created_at?: string | null
          currency?: string
          id?: string
          invoice_number: string
          items: Json
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          client_address?: string | null
          client_email?: string
          client_name?: string
          created_at?: string | null
          currency?: string
          id?: string
          invoice_number?: string
          items?: Json
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          payment_date: string | null
          payment_method: string | null
          reference_number: string | null
          service_request_id: string | null
          status: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          reference_number?: string | null
          service_request_id?: string | null
          status: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          reference_number?: string | null
          service_request_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_logo: string | null
          company_name: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          last_login: string | null
          onboarding_completed: boolean | null
          phone_number: string | null
          setup_progress: number | null
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          company_logo?: string | null
          company_name?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          last_login?: string | null
          onboarding_completed?: boolean | null
          phone_number?: string | null
          setup_progress?: number | null
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          company_logo?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          last_login?: string | null
          onboarding_completed?: boolean | null
          phone_number?: string | null
          setup_progress?: number | null
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      purchase_codes: {
        Row: {
          code: string
          created_at: string | null
          id: string
          is_used: boolean | null
          used_at: string | null
          used_by_user_id: string | null
          used_for_resource_id: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          is_used?: boolean | null
          used_at?: string | null
          used_by_user_id?: string | null
          used_for_resource_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          is_used?: boolean | null
          used_at?: string | null
          used_by_user_id?: string | null
          used_for_resource_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_codes_used_by_user_id_fkey"
            columns: ["used_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_codes_used_for_resource_id_fkey"
            columns: ["used_for_resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_images: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          id: string
          mime_type: string | null
          resource_id: string
          size: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          id?: string
          mime_type?: string | null
          resource_id: string
          size?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          id?: string
          mime_type?: string | null
          resource_id?: string
          size?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resource_images_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          category: string
          cover_image: string | null
          created_at: string | null
          description: string | null
          file_url: string
          id: string
          price: number
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          file_url: string
          id?: string
          price: number
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          file_url?: string
          id?: string
          price?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          assigned_to: string | null
          client_id: string | null
          cost: number | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          paid_amount: number | null
          priority:
            | Database["public"]["Enums"]["service_request_priority"]
            | null
          request_date: string | null
          service_type_id: string | null
          status: Database["public"]["Enums"]["service_request_status"] | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          client_id?: string | null
          cost?: number | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          paid_amount?: number | null
          priority?:
            | Database["public"]["Enums"]["service_request_priority"]
            | null
          request_date?: string | null
          service_type_id?: string | null
          status?: Database["public"]["Enums"]["service_request_status"] | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          client_id?: string | null
          cost?: number | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          paid_amount?: number | null
          priority?:
            | Database["public"]["Enums"]["service_request_priority"]
            | null
          request_date?: string | null
          service_type_id?: string | null
          status?: Database["public"]["Enums"]["service_request_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
        ]
      }
      service_types: {
        Row: {
          base_cost: number | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          base_cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          base_cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_progress_steps: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          step_name: string
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          step_name: string
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          step_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_steps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_purchases: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          purchased_at: string | null
          resource_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          purchased_at?: string | null
          resource_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          purchased_at?: string | null
          resource_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_purchases_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_link_performance: {
        Args: {
          views: number
          clicks: number
          rotation_count: number
        }
        Returns: number
      }
      calculate_link_performance_score: {
        Args: {
          p_views: number
          p_clicks: number
          p_shares: number
          p_time_on_page: number
          p_bounce_rate: number
        }
        Returns: number
      }
      export_links_data: {
        Args: {
          format: string
          start_date: string
          end_date: string
        }
        Returns: string
      }
      generate_random_code: {
        Args: {
          length: number
        }
        Returns: string
      }
    }
    Enums: {
      service_request_priority: "low" | "medium" | "high"
      service_request_status:
        | "new"
        | "in_progress"
        | "pending_payment"
        | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
