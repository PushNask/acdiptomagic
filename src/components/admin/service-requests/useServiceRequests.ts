import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useServiceRequests = () => {
  return useQuery({
    queryKey: ["serviceRequests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_requests")
        .select(`
          *,
          service_types (
            name,
            base_cost
          ),
          profiles!service_requests_client_id_fkey (
            full_name,
            email
          ),
          assigned:profiles!service_requests_assigned_to_fkey (
            full_name
          ),
          payments (
            amount,
            status
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching service requests:", error);
        toast.error("Failed to load service requests");
        throw error;
      }
      return data;
    },
  });
};