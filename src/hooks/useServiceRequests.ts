import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useServiceRequests = () => {
  const queryClient = useQueryClient();

  const { data: serviceRequests, isLoading } = useQuery({
    queryKey: ['serviceRequests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          service_type:service_types(name, description),
          payments(amount, status)
        `)
        .eq('client_id', (await supabase.auth.getUser()).data.user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const { mutate: createServiceRequest } = useMutation({
    mutationFn: async (requestData: any) => {
      const { data, error } = await supabase
        .from('service_requests')
        .insert([{
          ...requestData,
          client_id: (await supabase.auth.getUser()).data.user?.id,
          status: 'new'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['serviceRequests'] });
    }
  });

  return {
    serviceRequests,
    isLoading,
    createServiceRequest
  };
};