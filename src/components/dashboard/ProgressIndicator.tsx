import { Progress } from "@/components/ui/progress";
import { useUserProgress } from "@/hooks/useUserProgress";
import { CheckCircle2, Circle } from "lucide-react";

export const ProgressIndicator = () => {
  const { progressSteps, progress, isLoading } = useUserProgress();

  if (isLoading) return <Progress value={0} className="w-full" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Setup Progress</h3>
        <span className="text-sm text-muted-foreground">{progress}% Complete</span>
      </div>
      
      <Progress value={progress} className="w-full" />
      
      <div className="grid gap-2">
        {progressSteps?.map((step) => (
          <div key={step.id} className="flex items-center gap-2">
            {step.completed ? (
              <CheckCircle2 className="h-4 w-4 text-primary" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm">{step.step_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};