import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ProgressStep = {
  id: string;
  step_name: string;
  completed: boolean;
  completed_at: string | null;
};

export const useUserProgress = () => {
  const queryClient = useQueryClient();

  const { data: progressSteps, isLoading } = useQuery({
    queryKey: ['userProgress'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_progress_steps')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as ProgressStep[];
    }
  });

  const { mutate: updateStep } = useMutation({
    mutationFn: async ({ stepName, completed }: { stepName: string; completed: boolean }) => {
      const { error } = await supabase
        .from('user_progress_steps')
        .upsert({
          step_name: stepName,
          completed,
          completed_at: completed ? new Date().toISOString() : null
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    }
  });

  const calculateProgress = () => {
    if (!progressSteps?.length) return 0;
    const completedSteps = progressSteps.filter(step => step.completed).length;
    return Math.round((completedSteps / progressSteps.length) * 100);
  };

  return {
    progressSteps,
    isLoading,
    updateStep,
    progress: calculateProgress()
  };
};