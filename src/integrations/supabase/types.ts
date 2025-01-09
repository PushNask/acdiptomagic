export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Database types
export type Database = {
  public: {
    Tables: {
      audit_logs: AuditLogsTable
      invoices: InvoicesTable
      profiles: ProfilesTable
      resources: ResourcesTable
      user_purchases: UserPurchasesTable
    }
    Views: {
      [_ in never]: never
    }
    Functions: DatabaseFunctions
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Table interfaces
interface AuditLogsTable {
  Row: {
    id: string
    user_id: string | null
    action: string
    table_name: string
    record_id: string | null
    changes: Json | null
    created_at: string | null
  }
  Insert: {
    id?: string
    user_id?: string | null
    action: string
    table_name: string
    record_id?: string | null
    changes?: Json | null
    created_at?: string | null
  }
  Update: {
    id?: string
    user_id?: string | null
    action?: string
    table_name?: string
    record_id?: string | null
    changes?: Json | null
    created_at?: string | null
  }
}

interface InvoicesTable {
  Row: {
    id: string
    user_id: string | null
    invoice_number: string
    client_name: string
    client_email: string
    client_address: string | null
    amount: number
    currency: string
    items: Json
    status: string
    created_at: string | null
    updated_at: string | null
  }
  Insert: {
    id?: string
    user_id?: string | null
    invoice_number: string
    client_name: string
    client_email: string
    client_address?: string | null
    amount: number
    currency?: string
    items: Json
    status?: string
    created_at?: string | null
    updated_at?: string | null
  }
  Update: {
    id?: string
    user_id?: string | null
    invoice_number?: string
    client_name?: string
    client_email?: string
    client_address?: string | null
    amount?: number
    currency?: string
    items?: Json
    status?: string
    created_at?: string | null
    updated_at?: string | null
  }
}

interface ProfilesTable {
  Row: {
    id: string
    email: string
    full_name: string | null
    company_name: string | null
    company_logo: string | null
    created_at: string | null
    updated_at: string | null
    phone_number: string | null
    user_type: string | null
  }
  Insert: {
    id: string
    email: string
    full_name?: string | null
    company_name?: string | null
    company_logo?: string | null
    created_at?: string | null
    updated_at?: string | null
    phone_number?: string | null
    user_type?: string | null
  }
  Update: {
    id?: string
    email?: string
    full_name?: string | null
    company_name?: string | null
    company_logo?: string | null
    created_at?: string | null
    updated_at?: string | null
    phone_number?: string | null
    user_type?: string | null
  }
}

interface ResourcesTable {
  Row: {
    id: string
    title: string
    description: string | null
    file_url: string
    price: number
    created_at: string | null
    updated_at: string | null
    category: string
    cover_image: string | null
  }
  Insert: {
    id?: string
    title: string
    description?: string | null
    file_url: string
    price: number
    created_at?: string | null
    updated_at?: string | null
    category?: string
    cover_image?: string | null
  }
  Update: {
    id?: string
    title?: string
    description?: string | null
    file_url?: string
    price?: number
    created_at?: string | null
    updated_at?: string | null
    category?: string
    cover_image?: string | null
  }
}

interface UserPurchasesTable {
  Row: {
    id: string
    user_id: string | null
    resource_id: string | null
    purchased_at: string | null
    expires_at: string
    created_at: string | null
  }
  Insert: {
    id?: string
    user_id?: string | null
    resource_id?: string | null
    purchased_at?: string | null
    expires_at: string
    created_at?: string | null
  }
  Update: {
    id?: string
    user_id?: string | null
    resource_id?: string | null
    purchased_at?: string | null
    expires_at?: string
    created_at?: string | null
  }
}

// Database functions
interface DatabaseFunctions {
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
}

// Helper types
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