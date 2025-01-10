import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type HelpContent = {
  id: string;
  topic: string;
  content: string;
  context: string | null;
};

export const useHelpContent = (context?: string) => {
  return useQuery({
    queryKey: ['helpContent', context],
    queryFn: async () => {
      const query = supabase
        .from('help_content')
        .select('*');
      
      if (context) {
        query.eq('context', context);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as HelpContent[];
    }
  });
};